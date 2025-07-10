import 'dotenv/config';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import { initDB, saveResult, getTop10, getUserResults } from './db.js';
import { beginnerQuestions, intermediateQuestions, advancedQuestions } from './questions.js';
import shuffle from 'lodash.shuffle';

const token = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

const bot = new TelegramBot(token);
const app = express();
const port = process.env.PORT || 3000;

// Настройка webhook
bot.setWebHook(`${WEBHOOK_URL}/bot${token}`);
app.use(`/bot${token}`, express.json(), (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get('/', (req, res) => res.send('Бот запущен 🚀'));
app.listen(port, async () => {
  console.log(`🌐 WEBHOOK_URL: ${WEBHOOK_URL}`);
  console.log(`📡 PORT: ${port}`);
  await initDB();
});

// Установка меню
bot.setMyCommands([
  { command: '/start', description: 'Начать' },
  { command: '/help', description: 'Помощь' },
  { command: '/info', description: 'О боте' },
  { command: '/level', description: 'Выбрать уровень' },
  { command: '/top10', description: 'Топ 10 игроков' },
  { command: '/myresults', description: 'Мои результаты' },
]);

const userStates = new Map();

function getQuestionsByLevel(level) {
  if (level === 'beginner') return beginnerQuestions;
  if (level === 'intermediate') return intermediateQuestions;
  if (level === 'advanced') return advancedQuestions;
  return beginnerQuestions;
}

function startQuiz(chatId, level) {
  const questions = shuffle(getQuestionsByLevel(level)).slice(0, 20);
  userStates.set(chatId, { level, questions, index: 0, correct: 0 });
  sendNextQuestion(chatId);
}

function sendNextQuestion(chatId) {
  const state = userStates.get(chatId);
  if (!state || state.index >= state.questions.length) {
    bot.sendMessage(chatId, `✅ Викторина завершена! Правильных ответов: ${state.correct}/20`);
    saveResult(chatId, state.level, state.correct);
    userStates.delete(chatId);
    return;
  }

  const q = state.questions[state.index];
  const progress = `${state.index + 1}/20`;

  bot.sendMessage(chatId, `❓ ${q.question}\n📊 Вопрос ${progress}`, {
    reply_markup: {
      inline_keyboard: q.options.map(opt => [{
        text: `🔘 ${opt}`,
        callback_data: opt
      }])
    }
  });
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '👋 Добро пожаловать! Выберите уровень сложности:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🟢 Beginner', callback_data: 'level_beginner' }],
        [{ text: '🟡 Intermediate', callback_data: 'level_intermediate' }],
        [{ text: '🔴 Advanced', callback_data: 'level_advanced' }]
      ]
    }
  });
});

bot.onText(/\/level/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Выберите уровень сложности:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🟢 Beginner', callback_data: 'level_beginner' }],
        [{ text: '🟡 Intermediate', callback_data: 'level_intermediate' }],
        [{ text: '🔴 Advanced', callback_data: 'level_advanced' }]
      ]
    }
  });
});

bot.onText(/\/top10/, async (msg) => {
  const top = await getTop10();
  const text = top.length
    ? top.map((r, i) => `${i + 1}. ${r.user_id}: ${r.score} (${r.level})`).join('\n')
    : 'Нет данных.';
  bot.sendMessage(msg.chat.id, `🏆 Топ 10 игроков:\n${text}`);
});

bot.onText(/\/myresults/, async (msg) => {
  const rows = await getUserResults(msg.chat.id);
  const text = rows.length
    ? rows.map((r, i) => `${i + 1}. ${r.score} (${r.level})`).join('\n')
    : 'Нет ваших результатов.';
  bot.sendMessage(msg.chat.id, `📊 Ваши результаты:\n${text}`);
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, `🆘 Помощь:
- /start — начать викторину
- /level — выбрать уровень
- /top10 — топ игроков
- /myresults — ваши результаты
- /info — информация о боте`);
});

bot.onText(/\/info/, (msg) => {
  bot.sendMessage(msg.chat.id, 'ℹ️ Этот бот поможет вам тренировать английский язык через тесты.');
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
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

    setTimeout(() => {
      sendNextQuestion(chatId);
    }, 1000);
  }

  bot.answerCallbackQuery(query.id);
});
