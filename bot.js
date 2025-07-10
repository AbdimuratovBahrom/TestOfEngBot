import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import dotenv from 'dotenv';
import { beginnerQuestions, intermediateQuestions, advancedQuestions } from './questions.js';
import { saveResult, getTop10Results, getUserResults } from './db.js';

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const PORT = process.env.PORT || 3000;

if (!TOKEN || !WEBHOOK_URL) {
  console.error('❌ BOT_TOKEN и WEBHOOK_URL должны быть заданы в .env');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { webHook: true });

const app = express();
app.use(express.json());

app.get('/', (_, res) => res.send('🤖 Бот работает!'));
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  bot.setWebHook(`${WEBHOOK_URL}/bot${TOKEN}`);
});

const userStates = new Map();

function getRandomQuestions(questions, count = 20) {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function createQuestionMessage(state) {
  const q = state.questions[state.index];
  return `🧠 <b>Вопрос ${state.index + 1}/${state.questions.length}:</b>\n${q.question}`;
}

function sendNextQuestion(chatId) {
  const state = userStates.get(chatId);

  if (!state || state.index >= state.questions.length) {
    const score = state.correct;
    const total = state.questions.length;
    const level = state.level;
    bot.sendMessage(chatId, `🎉 Викторина завершена!\nВаш результат: ${score}/${total}`, {
      reply_markup: {
        remove_keyboard: true,
      },
    });
    saveResult(chatId, level, score);
    userStates.delete(chatId);
    return;
  }

  const q = state.questions[state.index];
  const message = createQuestionMessage(state);
  const buttons = q.options.map((opt) => [{ text: `🔘 ${opt}`, callback_data: opt }]);

  bot.sendMessage(chatId, message, {
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: buttons },
  });
}

bot.setMyCommands([
  { command: 'start', description: 'Начать' },
  { command: 'help', description: 'Помощь' },
  { command: 'info', description: 'О боте' },
  { command: 'level', description: 'Выбрать уровень' },
  { command: 'top10', description: '🏆 Топ 10' },
  { command: 'myresults', description: '📈 Мои результаты' },
]);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '👋 Добро пожаловать в бот для тренировки английского! Выберите команду:', {
    reply_markup: {
      keyboard: [
        [{ text: '📚 Выбрать уровень /level' }],
        [{ text: 'ℹ️ Помощь /help' }, { text: '🏆 Топ 10 /top10' }],
      ],
      resize_keyboard: true,
    },
  });
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, `ℹ️ <b>Как пользоваться:</b>

1. Нажмите "📚 Выбрать уровень".
2. Ответьте на 20 вопросов.
3. Узнайте свой результат.
4. Смотрите Топ 10.

Приятного обучения! 🎓`, { parse_mode: 'HTML' });
});

bot.onText(/\/info/, (msg) => {
  bot.sendMessage(msg.chat.id, `🤖 <b>English Quiz Bot</b>
📌 Автор: @AbdimuratovBahrom
💡 Уровни: Beginner, Intermediate, Advanced
📊 Команды: /level, /top10, /myresults
`, { parse_mode: 'HTML' });
});

bot.onText(/\/level/, (msg) => {
  const levels = [
    [{ text: '🔰 Beginner', callback_data: 'level_beginner' }],
    [{ text: '⚙️ Intermediate', callback_data: 'level_intermediate' }],
    [{ text: '🚀 Advanced', callback_data: 'level_advanced' }],
  ];
  bot.sendMessage(msg.chat.id, '📚 Выберите уровень сложности:', {
    reply_markup: { inline_keyboard: levels },
  });
});

bot.onText(/\/top10/, async (msg) => {
  const top = await getTop10Results();
  if (top.length === 0) return bot.sendMessage(msg.chat.id, '❌ Результаты не найдены.');
  const message = '🏆 <b>Топ 10 результатов:</b>\n\n' + top.map((r, i) =>
    `${i + 1}. 👤 <b>${r.user_id}</b> — ${r.score}/20 (${r.level})`).join('\n');
  bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
});

bot.onText(/\/myresults/, async (msg) => {
  const results = await getUserResults(msg.chat.id);
  if (results.length === 0) return bot.sendMessage(msg.chat.id, '❌ У вас ещё нет результатов.');
  const message = '📈 <b>Ваши результаты:</b>\n\n' + results.map((r) =>
    `— ${r.score}/20 (${r.level})`).join('\n');
  bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  try {
    await bot.answerCallbackQuery(query.id);
  } catch (err) {
    console.warn('⚠️ answerCallbackQuery error:', err.message);
  }

  const state = userStates.get(chatId);

  if (data.startsWith('level_')) {
    const level = data.replace('level_', '');
    startQuiz(chatId, level);
  } else if (state) {
    const q = state.questions[state.index];
    const isCorrect = data === q.correctAnswer;

    await bot.sendMessage(chatId,
      isCorrect ? '✅ Правильно!' : `❌ Неправильно. Правильный ответ: ${q.correctAnswer}`
    );

    if (isCorrect) state.correct++;
    state.index++;

    setTimeout(() => sendNextQuestion(chatId), 1000);
  }
});

function startQuiz(chatId, level) {
  let questions;
  switch (level) {
    case 'beginner': questions = beginnerQuestions; break;
    case 'intermediate': questions = intermediateQuestions; break;
    case 'advanced': questions = advancedQuestions; break;
    default: return;
  }

  const selected = getRandomQuestions(questions);
  userStates.set(chatId, { level, questions: selected, index: 0, correct: 0 });
  sendNextQuestion(chatId);
}
