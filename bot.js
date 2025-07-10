// Updated bot.js with language selection
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
const userLanguages = new Map();

const translations = {
  ru: {
    welcome: '👋 Добро пожаловать в бот для тренировки английского! Выберите команду:',
    help: `ℹ️ <b>Как пользоваться:</b>\n1. Нажмите \"📚 Выбрать уровень\".\n2. Ответьте на 20 вопросов.\n3. Узнайте свой результат.\n4. Смотрите Топ 10.\n\nПриятного обучения! 🎓`,
    info: `🤖 <b>English Quiz Bot</b>\n📌 Автор: @AbdimuratovBahrom\n💡 Уровни: Beginner, Intermediate, Advanced\n📊 Команды: /level, /top10, /myresults`,
    chooseLevel: '📚 Выберите уровень сложности:',
    top10: '🏆 <b>Топ 10 результатов:</b>',
    myresults: '📈 <b>Ваши результаты:</b>',
    noResults: '❌ Результаты не найдены.',
    quizEnd: (score, total) => `🎉 Викторина завершена!\nВаш результат: ${score}/${total}`,
    correct: '✅ Правильно!',
    wrong: (correctAnswer) => `❌ Неправильно. Правильный ответ: ${correctAnswer}`,
    level: {
      beginner: '🔰 Beginner',
      intermediate: '⚙️ Intermediate',
      advanced: '🚀 Advanced',
    },
    keyboard: [
      [{ text: '📚 Выбрать уровень /level' }],
      [{ text: 'ℹ️ Помощь /help' }, { text: '🏆 Топ 10 /top10' }],
    ],
    languageSelect: '🌐 Пожалуйста, выберите язык / Iltimos, tilni tanlang / Til tanlań:',
    languages: [
      [{ text: '🇷🇺 Русский', callback_data: 'lang_ru' }],
      [{ text: '🇺🇿 Oʻzbekcha', callback_data: 'lang_uz' }],
      [{ text: '🇰🇿 Qaraqalpaqsha', callback_data: 'lang_kk' }],
    ],
  },
  uz: {
    welcome: '👋 Ingliz tili bo‘yicha mashq qilish uchun botga xush kelibsiz! Buyruqni tanlang:',
    help: `ℹ️ <b>Foydalanish:</b>\n1. \"📚 Darajani tanlang\" tugmasini bosing.\n2. 20 ta savolga javob bering.\n3. Natijani bilib oling.\n4. Top 10 ro‘yxatini ko‘ring.\n\nOmad! 🎓`,
    info: `🤖 <b>English Quiz Bot</b>\n📌 Muallif: @AbdimuratovBahrom\n💡 Darajalar: Beginner, Intermediate, Advanced\n📊 Buyruqlar: /level, /top10, /myresults`,
    chooseLevel: '📚 Qiyinchilik darajasini tanlang:',
    top10: '🏆 <b>Eng yaxshi 10 natija:</b>',
    myresults: '📈 <b>Sizning natijalaringiz:</b>',
    noResults: '❌ Natijalar topilmadi.',
    quizEnd: (score, total) => `🎉 Viktorina tugadi!\nNatijangiz: ${score}/${total}`,
    correct: '✅ To‘g‘ri!',
    wrong: (correctAnswer) => `❌ Noto‘g‘ri. To‘g‘ri javob: ${correctAnswer}`,
    level: {
      beginner: '🔰 Beginner',
      intermediate: '⚙️ Intermediate',
      advanced: '🚀 Advanced',
    },
    keyboard: [
      [{ text: '📚 Darajani tanlash /level' }],
      [{ text: 'ℹ️ Yordam /help' }, { text: '🏆 Top 10 /top10' }],
    ],
    languageSelect: '🌐 Iltimos, tilni tanlang:',
    languages: [
      [{ text: '🇷🇺 Rus tili', callback_data: 'lang_ru' }],
      [{ text: '🇺🇿 Oʻzbekcha', callback_data: 'lang_uz' }],
      [{ text: '🇰🇿 Qaraqalpaqsha', callback_data: 'lang_kk' }],
    ],
  },
  kk: {
    welcome: '👋 Ingiliz tilin úyreniw ushın botqa xosh kelipsiz! Búyruq saylań:',
    help: `ℹ️ <b>Qanday paydalaniladi:</b>\n1. \"📚 Dárajesin saylań\".\n2. 20 sorawǵa juwap beriń.\n3. Natijeni biliń.\n4. Eń jaqsı 10-she tiklew.\n\nSátti bolsin! 🎓`,
    info: `🤖 <b>English Quiz Bot</b>\n📌 Avtor: @AbdimuratovBahrom\n💡 Dárajeler: Beginner, Intermediate, Advanced\n📊 Búyruqlar: /level, /top10, /myresults`,
    chooseLevel: '📚 Qiynshiliq dárejesin saylań:',
    top10: '🏆 <b>Eń jaqsı 10 natije:</b>',
    myresults: '📈 <b>Sizdiń natijelerińiz:</b>',
    noResults: '❌ Natijeler tabılmadi.',
    quizEnd: (score, total) => `🎉 Viktorina ayaqlandi!\nNatijeńiz: ${score}/${total}`,
    correct: '✅ Dúrís!',
    wrong: (correctAnswer) => `❌ Nádúrís. Dúrís juwap: ${correctAnswer}`,
    level: {
      beginner: '🔰 Beginner',
      intermediate: '⚙️ Intermediate',
      advanced: '🚀 Advanced',
    },
    keyboard: [
      [{ text: '📚 Dáreje saylaw /level' }],
      [{ text: 'ℹ️ Kómek /help' }, { text: '🏆 Top 10 /top10' }],
    ],
    languageSelect: '🌐 Til tanlań:',
    languages: [
      [{ text: '🇷🇺 Russha', callback_data: 'lang_ru' }],
      [{ text: '🇺🇿 Oʻzbeksha', callback_data: 'lang_uz' }],
      [{ text: '🇰🇿 Qaraqalpaqsha', callback_data: 'lang_kk' }],
    ],
  },
};

// Language selection
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  if (!userLanguages.has(chatId)) {
    bot.sendMessage(chatId, translations.ru.languageSelect, {
      reply_markup: { inline_keyboard: translations.ru.languages },
    });
  } else {
    const lang = userLanguages.get(chatId);
    bot.sendMessage(chatId, translations[lang].welcome, {
      reply_markup: {
        keyboard: translations[lang].keyboard,
        resize_keyboard: true,
      },
    });
  }
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data.startsWith('lang_')) {
    const lang = data.replace('lang_', '');
    userLanguages.set(chatId, lang);
    await bot.sendMessage(chatId, translations[lang].welcome, {
      reply_markup: {
        keyboard: translations[lang].keyboard,
        resize_keyboard: true,
      },
    });
    return;
  }

  const state = userStates.get(chatId);

  if (data.startsWith('level_')) {
    const level = data.replace('level_', '');
    startQuiz(chatId, level);
  } else if (state) {
    const q = state.questions[state.index];
    const isCorrect = data === q.correctAnswer;
    const lang = userLanguages.get(chatId) || 'ru';
    await bot.sendMessage(chatId,
      isCorrect ? translations[lang].correct : translations[lang].wrong(q.correctAnswer));
    if (isCorrect) state.correct++;
    state.index++;
    setTimeout(() => sendNextQuestion(chatId), 1000);
  }
});
