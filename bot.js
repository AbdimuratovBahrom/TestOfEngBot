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

const translations = {
  ru: {
    start: '👋 Добро пожаловать в бот для тренировки английского! Пожалуйста, выберите язык:',
    choose_level: '📚 Выберите уровень сложности:',
    help: `ℹ️ <b>Как пользоваться:</b>\n\n1. Нажмите "📚 Выбрать уровень".\n2. Ответьте на 20 вопросов.\n3. Узнайте свой результат.\n4. Смотрите Топ 10.\n\nПриятного обучения! 🎓`,
    info: `🤖 <b>@TestOfEngBot</b>\n📌 Автор: @Admin\n💡 Уровни: Beginner, Intermediate, Advanced\n📊 Команды: /level, /top10, /myresults`,
    result: (score, total) => `🎉 Викторина завершена!\nВаш результат: ${score}/${total}`,
    top10_empty: '❌ Результаты не найдены.',
    myresults_empty: '❌ У вас ещё нет результатов.',
    top10_title: '🏆 <b>Топ 10 результатов:</b>\n\n',
    your_results: '📈 <b>Ваши результаты:</b>\n\n',
    correct: '✅ Правильно!',
    wrong: (answer) => `❌ Неправильно. Правильный ответ: ${answer}`,
    choose_language: '🌐Выберите язык/Tilni tanlang/Til saylañ:',
    menu: (lang) => ({
      keyboard: [
        [{ text: '📚 Выбрать уровень /level' }],
        [{ text: 'ℹ️ Помощь /help' }, { text: '🏆 Топ 10 /top10' }]
      ],
      resize_keyboard: true,
    }),
    commands: {
      start: 'Начать',
      help: 'Помощь',
      info: 'О боте',
      level: 'Выбрать уровень',
      top10: '🏆 Топ 10',
      myresults: '📈 Мои результаты'
    }
  },
  uz: {
    start: '👋 Ingliz tilini o‘rganish uchun botga xush kelibsiz! Iltimos, tilni tanlang:',
    choose_level: '📚 Qiyinlik darajasini tanlang:',
    help: `ℹ️ <b>Qanday foydalaniladi:</b>\n\n1. "📚 Darajani tanlang" tugmasini bosing.\n2. 20 ta savolga javob bering.\n3. Natijani ko‘ring.\n4. Top 10 ni ko‘ring.\n\nOmad! 🎓`,
    info: `🤖 <b>@TestOfEngBot</b>\n📌 Muallif: @Admin\n💡 Darajalar: Beginner, Intermediate, Advanced\n📊 Buyruqlar: /level, /top10, /myresults`,
    result: (score, total) => `🎉 Viktorina yakunlandi!\nNatijangiz: ${score}/${total}`,
    top10_empty: '❌ Natijalar topilmadi.',
    myresults_empty: '❌ Sizda hali natijalar yo‘q.',
    top10_title: '🏆 <b>Top 10 natijalar:</b>\n\n',
    your_results: '📈 <b>Sizning natijalaringiz:</b>\n\n',
    correct: '✅ To‘g‘ri!',
    wrong: (answer) => `❌ Noto‘g‘ri. To‘g‘ri javob: ${answer}`,
    choose_language: '🌐 Iltimos, tilni tanlang:',
    menu: (lang) => ({
      keyboard: [
        [{ text: '📚 Darajani tanlash /level' }],
        [{ text: 'ℹ️ Yordam /help' }, { text: '🏆 Top 10 /top10' }]
      ],
      resize_keyboard: true,
    }),
    commands: {
      start: 'Boshlash',
      help: 'Yordam',
      info: 'Bot haqida',
      level: 'Darajani tanlash',
      top10: '🏆 Top 10',
      myresults: '📈 Mening natijalarim'
    }
  },
  kk: {
    start: '👋 Ағылшын тілін үйрену ботына қош келдіңіз! Тілді таңдаңыз:',
    choose_level: '📚 Қиындық деңгейін таңдаңыз:',
    help: `ℹ️ <b>Қалай қолдануға болады:</b>\n\n1. "📚 Деңгейді таңдау" түймесін басыңыз.\n2. 20 сұраққа жауап беріңіз.\n3. Нәтижені көріңіз.\n4. Top 10-ды қараңыз.\n\nСәттілік! 🎓`,
    info: `🤖 <b>@TestOfEngBot</b>\n📌 Авторы: @Admin\n💡 Деңгейлер: Beginner, Intermediate, Advanced\n📊 Бұйрықтар: /level, /top10, /myresults`,
    result: (score, total) => `🎉 Викторина аяқталды!\nНәтижеңіз: ${score}/${total}`,
    top10_empty: '❌ Нәтижелер табылмады.',
    myresults_empty: '❌ Сізде әлі нәтиже жоқ.',
    top10_title: '🏆 <b>Top 10 нәтижелер:</b>\n\n',
    your_results: '📈 <b>Сіздің нәтижелеріңіз:</b>\n\n',
    correct: '✅ Дұрыс!',
    wrong: (answer) => `❌ Қате. Дұрыс жауап: ${answer}`,
    choose_language: '🌐 Тілді таңдаңыз:',
    menu: (lang) => ({
      keyboard: [
        [{ text: '📚 Деңгейді таңдау /level' }],
        [{ text: 'ℹ️ Көмек /help' }, { text: '🏆 Top 10 /top10' }]
      ],
      resize_keyboard: true,
    }),
    commands: {
      start: 'Бастау',
      help: 'Көмек',
      info: 'Бот туралы',
      level: 'Деңгейді таңдау',
      top10: '🏆 Top 10',
      myresults: '📈 Менің нәтижелерім'
    }
  }
};

// Команды с переводом
bot.setMyCommands([
  { command: 'start', description: 'Start' },
  { command: 'help', description: 'Help' },
  { command: 'info', description: 'Info' },
  { command: 'level', description: 'Choose level' },
  { command: 'top10', description: 'Top 10' },
  { command: 'myresults', description: 'My Results' },
]);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  userStates.set(chatId, { step: 'language' });

  const buttons = [
    [{ text: '🇷🇺 Русский', callback_data: 'lang_ru' }],
    [{ text: '🇺🇿 Oʻzbekcha', callback_data: 'lang_uz' }],
    [{ text: ' Qaraqalpaqsha', callback_data: 'lang_kk' }],
  ];

  bot.sendMessage(chatId, translations.ru.choose_language, {
    reply_markup: { inline_keyboard: buttons },
  });
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  try {
    await bot.answerCallbackQuery(query.id);
  } catch (err) {
    console.warn('CallbackQuery error:', err.message);
  }

  if (data.startsWith('lang_')) {
    const lang = data.split('_')[1];
    const state = { lang, level: null, questions: [], index: 0, correct: 0 };
    userStates.set(chatId, state);
    const t = translations[lang];

    bot.sendMessage(chatId, t.start, {
      reply_markup: t.menu(lang),
    });
    return;
  }

  const state = userStates.get(chatId);
  if (!state || !state.lang) return;

  const t = translations[state.lang];

  if (data.startsWith('level_')) {
    const level = data.replace('level_', '');
    state.level = level;
    let questions;
    if (level === 'beginner') questions = beginnerQuestions;
    else if (level === 'intermediate') questions = intermediateQuestions;
    else if (level === 'advanced') questions = advancedQuestions;
    else return;

    const selected = getRandomQuestions(questions);
    userStates.set(chatId, { ...state, questions: selected, index: 0, correct: 0 });
    sendNextQuestion(chatId);
  } else {
    const q = state.questions[state.index];
    const isCorrect = data === q.correctAnswer;

    await bot.sendMessage(chatId, isCorrect ? t.correct : t.wrong(q.correctAnswer));
    if (isCorrect) state.correct++;
    state.index++;
    setTimeout(() => sendNextQuestion(chatId), 1000);
  }
});

function sendNextQuestion(chatId) {
  const state = userStates.get(chatId);
  const t = translations[state?.lang || 'ru'];

  if (!state || state.index >= state.questions.length) {
    const msg = t.result(state.correct, state.questions.length);
    bot.sendMessage(chatId, msg, {
      reply_markup: { remove_keyboard: true },
    });
    saveResult(chatId, state.level, state.correct);
    userStates.delete(chatId);
    return;
  }

  const q = state.questions[state.index];
  const buttons = q.options.map((opt) => [{ text: `🔘 ${opt}`, callback_data: opt }]);
  const message = `🧠 <b>${state.index + 1}/${state.questions.length}</b>\n${q.question}`;
  bot.sendMessage(chatId, message, {
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: buttons },
  });
}

// Обработчики всех команд (локализованные)
function getLang(chatId) {
  return userStates.get(chatId)?.lang || 'ru';
}

bot.onText(/\/help/, (msg) => {
  const lang = getLang(msg.chat.id);
  bot.sendMessage(msg.chat.id, translations[lang].help, { parse_mode: 'HTML' });
});

bot.onText(/\/info/, (msg) => {
  const lang = getLang(msg.chat.id);
  bot.sendMessage(msg.chat.id, translations[lang].info, { parse_mode: 'HTML' });
});

bot.onText(/\/level/, (msg) => {
  const lang = getLang(msg.chat.id);
  const t = translations[lang];
  const levels = [
    [{ text: '🔰 Beginner', callback_data: 'level_beginner' }],
    [{ text: '⚙️ Intermediate', callback_data: 'level_intermediate' }],
    [{ text: '🚀 Advanced', callback_data: 'level_advanced' }],
  ];
  bot.sendMessage(msg.chat.id, t.choose_level, {
    reply_markup: { inline_keyboard: levels },
  });
});

bot.onText(/\/top10/, async (msg) => {
  const lang = getLang(msg.chat.id);
  const t = translations[lang];
  const top = await getTop10Results();
  if (top.length === 0) return bot.sendMessage(msg.chat.id, t.top10_empty);
  const message = t.top10_title + top.map((r, i) =>
    `${i + 1}. 👤 <b>${r.user_id}</b> — ${r.score}/20 (${r.level})`).join('\n');
  bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
});

bot.onText(/\/myresults/, async (msg) => {
  const lang = getLang(msg.chat.id);
  const t = translations[lang];
  const results = await getUserResults(msg.chat.id);
  if (results.length === 0) return bot.sendMessage(msg.chat.id, t.myresults_empty);
  const message = t.your_results + results.map((r) =>
    `— ${r.score}/20 (${r.level})`).join('\n');
  bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
});

function getRandomQuestions(questions, count = 20) {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
