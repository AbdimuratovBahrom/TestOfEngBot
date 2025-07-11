

// bot.js
import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import dotenv from 'dotenv';
import { beginnerQuestions, intermediateQuestions, advancedQuestions } from './questions.js';
import { saveResult, getTop10Results, getUserResults } from './db.js';

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const PORT = process.env.PORT;


if (!TOKEN || !WEBHOOK_URL) {
  console.error('❌ BOT_TOKEN и WEBHOOK_URL должны быть заданы в .env');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { webHook: { port: PORT } });
bot.setWebHook(`${WEBHOOK_URL}/bot${TOKEN}`);

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
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Порт ${PORT} уже используется`);
  } else {
    console.error('❌ Ошибка сервера:', err);
  }
});


const userStates = new Map();

// Локализация
const translations = {
  ru: {
    welcome: '👋 Выберите язык / Tilni tanlang / Til saylañ:',
    help: `ℹ️ <b>Как пользоваться:</b>\n\n1. Нажмите "📚 Выбрать уровень".\n2. Ответьте на 20 вопросов.\n3. Узнайте свой результат.\n4. Смотрите Топ 10.\n\nПриятного обучения! 🎓`,
    info: `🤖 <b>English Quiz Bot</b>\n📌 Автор: @AbdimuratovBahrom\n💡 Уровни: Beginner, Intermediate, Advanced\n📊 Команды: /level, /top10, /myresults`,
    selectLevel: '📚 Выберите уровень сложности:',
    correct: '✅ Правильно!',
    wrong: (answer) => `❌ Неправильно. Правильный ответ: ${answer}`,
    done: (score, total) => `🎉 Викторина завершена!\nВаш результат: ${score}/${total}`,
    top10Empty: '❌ Результаты не найдены.',
    top10Header: '🏆 <b>Топ 10 результатов:</b>\n\n',
  },
  uz: {
    welcome: '👋 Tilni tanlang / Выберите язык / Til saylañ:',
    help: `ℹ️ <b>Qanday foydalaniladi:</b>\n\n1. "📚 Darajani tanlash" tugmasini bosing.\n2. 20 ta savolga javob bering.\n3. Natijangizni ko'ring.\n4. Top 10 ni ko'ring.\n\nOmad! 🎓`,
    info: `🤖 <b>English Quiz Bot</b>\n📌 Muallif: @AbdimuratovBahrom\n💡 Darajalar: Beginner, Intermediate, Advanced\n📊 Buyruqlar: /level, /top10, /myresults`,
    selectLevel: '📚 Qiyinlik darajasini tanlang:',
    correct: '✅ To‘g‘ri!',
    wrong: (answer) => `❌ Noto‘g‘ri. To‘g‘ri javob: ${answer}`,
    done: (score, total) => `🎉 Viktorina tugadi!\nNatijangiz: ${score}/${total}`,
    top10Empty: '❌ Natijalar topilmadi.',
    top10Header: '🏆 <b>Eng yaxshi 10 natija:</b>\n\n',
  },
  kk: {
    welcome: '👋 Til saylañ / Выберите язык / Tilni tanlang:',
    help: `ℹ️ <b>Qalay paydalanıw kerek:</b>\n\n1. "📚 Daraja saylañ.\n2. 20 sorawğa jawap beriñ.\n3. Nátiyjeni biling.\n4. Eñ jaqsı Top10 kóriñ.\n\nSizge amad tiley! 🎓`,
    info: `🤖 <b>English Quiz Bot</b>\n📌 Avtor: @AbdimuratovBahrom\n💡 Darajalar: Beginner, Intermediate, Advanced\n📊 Komandalar: /level, /top10, /myresults`,
    selectLevel: '📚 Qıyınlıq darajasın saylañ:',
    correct: '✅ Dúris!',
    wrong: (answer) => `❌ Qáte. Dúris jawap: ${answer}`,
    done: (score, total) => `🎉 Викторина аяқталды!\nНәтижеңіз: ${score}/${total}`,
    top10Empty: '❌ Нәтижелер табылмады.',
    top10Header: '🏆 <b>Ең үздік 10 нәтиже:</b>\n\n',
  }
};

function t(chatId, key, ...args) {
  const state = userStates.get(chatId);
  const lang = state?.lang || 'ru';
  const text = translations[lang][key];
  return typeof text === 'function' ? text(...args) : text;
}

// Выбор языка
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, translations.ru.welcome, {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🇷🇺 Русский', callback_data: 'lang_ru' }],
        [{ text: '🇺🇿 Oʻzbekcha', callback_data: 'lang_uz' }],
        [{ text: '🇰k Qaraqalpaqsha', callback_data: 'lang_kk' }],
      ],
    },
  });
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

  if (data.startsWith('lang_')) {
    const lang = data.split('_')[1];
    userStates.set(chatId, { lang });
    bot.sendMessage(chatId, '✅ Язык установлен. Введите /level чтобы начать.');
    return;
  }

  if (data.startsWith('level_')) {
    const level = data.replace('level_', '');
    startQuiz(chatId, level);
  } else if (state && state.questions) {
    const q = state.questions[state.index];
    const isCorrect = data === q.correctAnswer;
    await bot.sendMessage(chatId, isCorrect ? t(chatId, 'correct') : t(chatId, 'wrong', q.correctAnswer));
    if (isCorrect) state.correct++;
    state.index++;
    setTimeout(() => sendNextQuestion(chatId), 1000);
  }
});

// /help
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, t(msg.chat.id, 'help'), { parse_mode: 'HTML' });
});

// /info
bot.onText(/\/info/, (msg) => {
  bot.sendMessage(msg.chat.id, t(msg.chat.id, 'info'), { parse_mode: 'HTML' });
});

// /level
bot.onText(/\/level/, (msg) => {
  const chatId = msg.chat.id;
  const levels = [
    [{ text: '🔰 Beginner', callback_data: 'level_beginner' }],
    [{ text: '⚙️ Intermediate', callback_data: 'level_intermediate' }],
    [{ text: '🚀 Advanced', callback_data: 'level_advanced' }],
  ];
  bot.sendMessage(chatId, t(chatId, 'selectLevel'), {
    reply_markup: { inline_keyboard: levels },
  });
});

// /top10
bot.onText(/\/top10/, async (msg) => {
  const top = await getTop10Results();
  if (top.length === 0) return bot.sendMessage(msg.chat.id, t(msg.chat.id, 'top10Empty'));
  const message = t(msg.chat.id, 'top10Header') + top.map((r, i) =>
    `${i + 1}. 👤 <b>${r.user_id}</b> — ${r.score}/20 (${r.level})`).join('\n');
  bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
});

function getRandomQuestions(questions, count = 20) {
  return [...questions].sort(() => 0.5 - Math.random()).slice(0, count);
}

function createQuestionMessage(state) {
  const q = state.questions[state.index];
  return `🧠 <b>Вопрос ${state.index + 1}/${state.questions.length}:</b>\n${q.question}`;
}

function sendNextQuestion(chatId) {
  const state = userStates.get(chatId);
  if (!state || state.index >= state.questions.length) {
    bot.sendMessage(chatId, t(chatId, 'done', state.correct, state.questions.length), {
      reply_markup: { remove_keyboard: true },
    });
    saveResult(chatId, state.level, state.correct);
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

function startQuiz(chatId, level) {
  let questions;
  switch (level) {
    case 'beginner': questions = beginnerQuestions; break;
    case 'intermediate': questions = intermediateQuestions; break;
    case 'advanced': questions = advancedQuestions; break;
    default: return;
  }

  const selected = getRandomQuestions(questions);
  const prev = userStates.get(chatId) || {};
  userStates.set(chatId, {
    ...prev,
    level,
    questions: selected,
    index: 0,
    correct: 0,
  });

  sendNextQuestion(chatId);
}



