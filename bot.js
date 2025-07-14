import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import {
  beginnerQuestions,
  intermediateQuestions,
  advancedQuestions,
} from './questions.js';

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const PORT = parseInt(process.env.PORT, 10) || 3000;

if (!TOKEN || !WEBHOOK_URL) {
  console.error('❌ BOT_TOKEN и WEBHOOK_URL должны быть заданы в .env');
  process.exit(1);
}

// Инициализация бота
const bot = new TelegramBot(TOKEN, { polling: false });

// Подключение к базе данных SQLite
const dbPromise = open({
  filename: './bot_data.db',
  driver: sqlite3.Database,
}).then((db) => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      telegram_id INTEGER PRIMARY KEY,
      full_name TEXT,
      test_count INTEGER DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS test_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      telegram_id INTEGER,
      level TEXT,
      score INTEGER,
      timestamp TEXT,
      FOREIGN KEY (telegram_id) REFERENCES users(telegram_id)
    );
  `);
  return db;
});

const app = express();
app.use(express.json());

app.get('/', (_, res) => res.send('🤖 Бот работает!'));

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
  bot.setWebHook(`${WEBHOOK_URL}/bot${TOKEN}`)
    .then(() => console.log('✅ Вебхук успешно установлен'))
    .catch((err) => console.error('❌ Ошибка установки вебхука:', err.message));
});

const userStates = new Map();
const userCache = new Map();

// Локализация
const translations = {
  ru: {
    welcome: '👋 Выберите язык:',
    help: `ℹ️ <b>Как пользоваться:</b>\n\n1. Нажмите "📚 Выбрать уровень".\n2. Ответьте на 20 вопросов.\n3. Узнайте свой результат.\n4. Смотрите Топ 10.\n\nПриятного обучения! 🎓`,
    info: `🤖 <b>@TestOfEngBot</b>\n📌 Автор: @WolfOfAlpha\n💡 Уровни: Beginner, Intermediate, Advanced\n📊 Команды: /level, /top10, /myresults, /thanks`,
    selectLevel: '📚 Выберите уровень сложности:',
    correct: '✅ Правильно!',
    wrong: (answer) => `❌ Неправильно. Правильный ответ: ${answer || 'неизвестно'}`,
    done: (score, total) => `🎉 Викторина завершена!\nВаш результат: ${score}/${total}`,
    top10Empty: '❌ Результаты не найдены.',
    top10Header: '🏆 <b>Топ 10 результатов:</b>\n\n',
    userResultsEmpty: '❌ Ваши результаты не найдены.',
    userResultsHeader: '📊 <b>Ваши результаты:</b>\n\n',
    langButton: '🇷🇺 Русский',
    levelBeginner: '🔰 Beginner',
    levelIntermediate: '⚙️ Intermediate',
    levelAdvanced: '🚀 Advanced',
    optionPrefix: '🔘',
    langSet: '✅ Язык установлен. Нажмите, чтобы начать викторину.',
    startQuiz: '📚 Начать викторину',
    question: (index, total) => `Вопрос ${index}/${total}`,
    unknownUser: 'Неизвестный пользователь',
    noDate: 'Дата недоступна',
    thanksMessage: '❤️ Спасибо за использование бота! Если хотите поблагодарить автора, напишите ему: [t.me/WolfOfAlpha](https://t.me/WolfOfAlpha)',
    errorMessage: '❌ Ошибка: некорректные данные вопроса. Обратитесь к администратору. Подробности: [question: %question%, options: %options%, correctAnswer: %correctAnswer%]',
    stats: '📊 <b>Статистика бота:</b>\nВсего пользователей: %userCount%\nАктивные тесты: %activeTests%',
    statsButton: '📊 Статистика',
  },
  uz: {
    welcome: '👋 Tilni tanlang:',
    help: `ℹ️ <b>Qanday foydalaniladi:</b>\n\n1. "📚 Darajani tanlash" tugmasini bosing.\n2. 20 ta savolga javob bering.\n3. Natijangizni ko'ring.\n4. Top 10 ni ko'ring.\n\nOmad! 🎓`,
    info: `🤖 <b>@TestOfEngBot</b>\n📌 Muallif: @WolfOfAlpha\n💡 Darajalar: Beginner, Intermediate, Advanced\n📊 Buyruqlar: /level, /top10, /myresults, /thanks`,
    selectLevel: '📚 Qiyinlik darajasini tanlang:',
    correct: '✅ To‘g‘ri!',
    wrong: (answer) => `❌ Noto‘g‘ri. To‘g‘ri javob: ${answer || 'noma’lum'}`,
    done: (score, total) => `🎉 Viktorina tugadi!\nNatijangiz: ${score}/${total}`,
    top10Empty: '❌ Natijalar topilmadi.',
    top10Header: '🏆 <b>Eng yaxshi 10 natija:</b>\n\n',
    userResultsEmpty: '❌ Natijalaringiz topilmadi.',
    userResultsHeader: '📊 <b>Sizning natijalaringiz:</b>\n\n',
    langButton: '🇺🇿 Oʻzbekcha',
    levelBeginner: '🔰 Beginner',
    levelIntermediate: '⚙️ Intermediate',
    levelAdvanced: '🚀 Advanced',
    optionPrefix: '🔘',
    langSet: '✅ Til o‘rnatildi. Viktorinani boshlash uchun bosing.',
    startQuiz: '📚 Viktorinani boshlash',
    question: (index, total) => `Savol ${index}/${total}`,
    unknownUser: 'Nomalum foydalanuvchi',
    noDate: 'Sana mavjud emas',
    thanksMessage: '❤️ Botdan foydalanganingiz uchun rahmat! Muallifga minnatdorchilik bildirmoqchi bo‘lsangiz, unga yozing: [t.me/WolfOfAlpha](https://t.me/WolfOfAlpha)',
    errorMessage: '❌ Xato: savol ma’lumotlari noto‘g‘ri. Administratorga murojaat qiling. Batafsil: [savol: %question%, variantlar: %options%, to‘g‘ri javob: %correctAnswer%]',
    stats: '📊 <b>Bot statistikasi:</b>\nJami foydalanuvchilar: %userCount%\nFaol testlar: %activeTests%',
    statsButton: '📊 Statistika',
  },
  kk: {
    welcome: '👋 Til saylañ:',
    help: `ℹ️ <b>Qalay paydalanıw kerek:</b>\n\n1. "📚 Daraja saylañ" tugmasın basıñ.\n2. 20 sorawğa jawap beriñ.\n3. Nátiyjeni kóriñ.\n4. Top 10 dı kóriñ.\n\nJaqsı oqw kóriñ! 🎓`,
    info: `🤖 <b>@TestOfEngBot</b>\n📌 Avtor: @WolfOfAlpha\n💡 Darajalar: Beginner, Intermediate, Advanced\n📊 Komandalar: /level, /top10, /myresults, /thanks`,
    selectLevel: '📚 Qıyınlıq darajasın saylañ:',
    correct: '✅ Dúris!',
    wrong: (answer) => `❌ Qáte. Dúris jawap: ${answer || 'belgisiz'}`,
    done: (score, total) => `🎉 Viktorina tamamlandı!!\nSiziñ nátiyjeñiz: ${score}/${total}`,
    top10Empty: '❌ Nátiyjeler tabılmadı.',
    top10Header: '🏆 <b>Eñ jaqsı 10 nátiyje:</b>\n\n',
    userResultsEmpty: '❌ Siziñ nátiyjeleriñiz tabılmadı.',
    userResultsHeader: '📊 <b>Sizdiñ nátiyjeleriñiz:</b>\n\n',
    langButton: '🇰k Qaraqalpaqsha',
    levelBeginner: '🔰 Beginner',
    levelIntermediate: '⚙️ Intermediate',
    levelAdvanced: '🚀 Advanced',
    optionPrefix: '🔘',
    langSet: '✅ Til ornatıldı. Viktorinanı baslaw ushın basıñ.',
    startQuiz: '📚 Viktorinanı baslaw',
    question: (index, total) => `Soraw ${index}/${total}`,
    unknownUser: 'Belgisiz paydalanıwshı',
    noDate: 'Sáne qol jetimsiz',
    thanksMessage: "❤️ Bot tı paydalang'anıñız ushın rahmet! Eger avtordı qutlıqlag'ıñız kelse, oğan jazıñ: [t.me/@WolfOfAlpha](https://t.me/WolfOfAlpha)",
    errorMessage: "❌ Qáte: soraw derekleri dúris emes. Administratorğa xabarlasıñ. Toliq málimat: [soraw: %question%, saylawlar: %options%, dúris jawap: %correctAnswer%]",
    stats: '📊 <b>Bot statistikası:</b>\nJami paydalanıwshılar: %userCount%\nÁktiw testter: %activeTests%',
    statsButton: '📊 Statistika',
  },
};

function t(chatId, key, ...args) {
  const state = userStates.get(chatId);
  const lang = state?.lang || 'ru';
  const text = translations[lang][key];
  if (!text) {
    console.error(`❌ Translation key "${key}" not found for language "${lang}"`);
    return `Translation missing for "${key}"`;
  }
  const result = typeof text === 'function' ? text(...args) : text;
  return result.replace('%userCount%', getUserCount().toString()).replace('%activeTests%', userStates.size.toString());
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from.id;
  const fullName = msg.from.first_name || msg.from.username || t(chatId, 'unknownUser');

  const db = await dbPromise;
  await db.run('INSERT OR IGNORE INTO users (telegram_id, full_name) VALUES (?, ?)', [telegramId, fullName]);
  await db.run('UPDATE users SET test_count = test_count + 1 WHERE telegram_id = ?', [telegramId]);

  bot.sendMessage(chatId, t(chatId, 'welcome'), {
    reply_markup: {
      inline_keyboard: [
        [{ text: translations.ru.langButton, callback_data: 'lang_ru' }],
        [{ text: translations.uz.langButton, callback_data: 'lang_uz' }],
        [{ text: translations.kk.langButton, callback_data: 'lang_kk' }],
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

  const state = userStates.get(chatId) || { lang: 'ru' };

  if (data.startsWith('lang_')) {
    const lang = data.split('_')[1];
    userStates.set(chatId, { ...state, lang });
    bot.sendMessage(chatId, t(chatId, 'langSet'), {
      reply_markup: {
        inline_keyboard: [[{ text: t(chatId, 'startQuiz'), callback_data: 'level_menu' }]],
      },
    });
    return;
  }

  if (data === 'level_menu') {
    showLevelMenu(chatId);
  } else if (data.startsWith('level_')) {
    const level = data.replace('level_', '');
    startQuiz(chatId, level);
  } else if (data === 'stats') { // Обработка нажатия кнопки статистики
    const userCount = await getUserCount();
    const activeTests = userStates.size;
    const message = t(chatId, 'stats').replace('%userCount%', userCount.toString()).replace('%activeTests%', activeTests.toString());
    bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
  } else if (state && state.questions) {
    const q = state.questions[state.index];
    const userAnswer = data;
    const isCorrect = q.options.includes(userAnswer) && userAnswer === q.correctAnswer;
    await bot.sendMessage(chatId, isCorrect ? t(chatId, 'correct') : t(chatId, 'wrong', q.correctAnswer));
    if (isCorrect) state.correct++;
    state.index++;
    setTimeout(() => sendNextQuestion(chatId), 1000);
  }
});

bot.onText(/\/thanks/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, t(chatId, 'thanksMessage'), { parse_mode: 'Markdown' });
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, t(msg.chat.id, 'help'), { parse_mode: 'HTML' });
});

bot.onText(/\/info/, (msg) => {
  bot.sendMessage(msg.chat.id, t(msg.chat.id, 'info'), { parse_mode: 'HTML' });
});

bot.onText(/\/level/, (msg) => {
  showLevelMenu(msg.chat.id);
});

bot.onText(/\/top10/, async (msg) => {
  const chatId = msg.chat.id;
  const db = await dbPromise;
  const top = await db.all('SELECT telegram_id, level, score FROM test_results ORDER BY score DESC LIMIT 10');
  if (top.length === 0) return bot.sendMessage(chatId, t(chatId, 'top10Empty'));

  const results = await Promise.all(top.map(async (r, i) => {
    let username = userCache.get(r.telegram_id) || (await db.get('SELECT full_name FROM users WHERE telegram_id = ?', [r.telegram_id]))?.full_name;
    if (!username) {
      try {
        const chat = await bot.getChat(r.telegram_id);
        username = chat.username || chat.first_name || t(chatId, 'unknownUser');
        userCache.set(r.telegram_id, username);
        await db.run('UPDATE users SET full_name = ? WHERE telegram_id = ?', [username, r.telegram_id]);
      } catch (err) {
        console.warn(`⚠️ Не удалось получить имя пользователя для user_id ${r.telegram_id}:`, err.message);
        username = t(chatId, 'unknownUser');
      }
    }
    return `${i + 1}. 👤 <b>${username}</b> — ${r.score}/20 (${r.level})`;
  }));

  const message = t(chatId, 'top10Header') + results.join('\n');
  bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
});

bot.onText(/\/myresults/, async (msg) => {
  const chatId = msg.chat.id;
  const state = userStates.get(chatId) || { lang: 'ru' };
  const locale = state.lang === 'uz' ? 'uz-UZ' : state.lang === 'kk' ? 'kk-KZ' : 'ru-RU';
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const db = await dbPromise;
  const results = await db.all('SELECT level, score, timestamp FROM test_results WHERE telegram_id = ? ORDER BY timestamp DESC', [chatId]);
  if (results.length === 0) return bot.sendMessage(chatId, t(chatId, 'userResultsEmpty'));

  const formattedResults = results.map((r) => {
    let date = t(chatId, 'noDate');
    if (r.timestamp) {
      const d = new Date(r.timestamp);
      date = !isNaN(d) ? d.toLocaleDateString(locale, options) : t(chatId, 'noDate');
    }
    return `${r.score}/20 (${r.level}) — ${date}`;
  });

  const message = t(chatId, 'userResultsHeader') + formattedResults.map((r, i) => `${i + 1}. ${r}`).join('\n');
  bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
});

bot.onText(/\/stats/, async (msg) => {
  const chatId = msg.chat.id;
  const userCount = await getUserCount();
  const activeTests = userStates.size;
  const message = t(chatId, 'stats').replace('%userCount%', userCount.toString()).replace('%activeTests%', activeTests.toString());
  bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
});

function showLevelMenu(chatId) {
  const levels = [
    [{ text: t(chatId, 'levelBeginner'), callback_data: 'level_beginner' }],
    [{ text: t(chatId, 'levelIntermediate'), callback_data: 'level_intermediate' }],
    [{ text: t(chatId, 'levelAdvanced'), callback_data: 'level_advanced' }],
    [{ text: t(chatId, 'statsButton'), callback_data: 'stats' }],
  ];
  bot.sendMessage(chatId, t(chatId, 'selectLevel'), {
    reply_markup: { inline_keyboard: levels },
  });
}

function getRandomQuestions(questions, count = 20) {
  return [...questions].sort(() => 0.5 - Math.random()).slice(0, count);
}

function createQuestionMessage(state) {
  const q = state.questions[state.index];
  return `🧠 <b>${t(state.chatId, 'question', state.index + 1, state.questions.length)}</b>\n${q.question}`;
}

async function sendNextQuestion(chatId) {
  const state = userStates.get(chatId);
  if (!state || state.index >= state.questions.length) {
    const now = new Date().toISOString();
    await bot.sendMessage(chatId, t(chatId, 'done', state.correct, state.questions.length), {
      reply_markup: { remove_keyboard: true },
    });
    const db = await dbPromise;
    await db.run('INSERT INTO test_results (telegram_id, level, score, timestamp) VALUES (?, ?, ?, ?)', [chatId, state.level, state.correct, now]);
    userStates.delete(chatId);
    return;
  }

  const q = state.questions[state.index];
  if (!q.options || q.options.length !== 4 || !q.correctAnswer || !q.options.includes(q.correctAnswer)) {
    const errorMsg = t(chatId, 'errorMessage')
      .replace('%question%', q.question || 'не указан')
      .replace('%options%', JSON.stringify(q.options) || 'не указаны')
      .replace('%correctAnswer%', q.correctAnswer || 'не указан');
    bot.sendMessage(chatId, errorMsg);
    userStates.delete(chatId);
    return;
  }

  const message = createQuestionMessage({ ...state, chatId });
  const buttons = q.options.map((opt) => [{ text: `${t(chatId, 'optionPrefix')} ${opt}`, callback_data: opt }]);

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
  const prev = userStates.get(chatId) || { lang: 'ru' };
  userStates.set(chatId, {
    ...prev,
    level,
    questions: selected,
    index: 0,
    correct: 0,
    chatId,
  });

  sendNextQuestion(chatId);
}

async function getUserCount() {
  const db = await dbPromise;
  const count = await db.get('SELECT COUNT(*) as count FROM users');
  return count.count;
}