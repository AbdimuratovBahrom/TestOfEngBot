import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import dotenv from 'dotenv';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
let google;
try {
  const googleModule = await import('googleapis');
  google = googleModule.google;
} catch (err) {
  console.error('❌ Ошибка загрузки googleapis:', err.message);
  process.exit(1);
}
import fs from 'fs';
import { authenticate } from '@google-cloud/local-auth';

import {
  beginnerQuestions,
  intermediateQuestions,
  advancedQuestions,
} from './questions.js';

dotenv.config({ debug: true });

const TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const PORT = parseInt(process.env.PORT, 10) || 3000;
const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

if (!TOKEN || !WEBHOOK_URL || !FOLDER_ID) {
  console.error('❌ BOT_TOKEN, WEBHOOK_URL и GOOGLE_DRIVE_FOLDER_ID должны быть заданы в .env');
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: false });

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

export async function t(chatId, key, ...args) {
  const state = userStates.get(chatId);
  const lang = state?.lang || 'ru';
  const text = translations[lang][key];
  if (!text) {
    console.error(`❌ Translation key "${key}" not found for language "${lang}"`);
    return `Translation missing for "${key}"`;
  }
  const result = typeof text === 'function' ? text(...args) : text;
  const userCount = await getUserCount();
  return result.replace('%userCount%', userCount?.toString() || '0').replace('%activeTests%', userStates.size.toString());
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
  const fullName = msg.from.first_name || msg.from.username || (await t(chatId, 'unknownUser'));

  const db = await dbPromise;
  try {
    await db.run('INSERT OR IGNORE INTO users (telegram_id, full_name) VALUES (?, ?)', [telegramId, fullName]);
    await db.run('UPDATE users SET test_count = test_count + 1 WHERE telegram_id = ?', [telegramId]);
    console.log(`Регистрация пользователя ${telegramId} (${fullName})`);
    const userCount = await db.get('SELECT COUNT(*) as count FROM users');
    console.log(`Текущий счетчик пользователей: ${userCount.count}`);
  } catch (err) {
    console.error(`❌ Ошибка регистрации пользователя ${telegramId}:`, err.message);
  }

  const welcomeMessage = await t(chatId, 'welcome');
  if (!welcomeMessage) {
    console.error('❌ Пустое сообщение welcome для chatId:', chatId);
    return;
  }
  bot.sendMessage(chatId, welcomeMessage, {
    reply_markup: {
      inline_keyboard: [
        [{ text: translations.ru.langButton, callback_data: 'lang_ru' }],
        [{ text: translations.uz.langButton, callback_data: 'lang_uz' }],
        [{ text: translations.kk.langButton, callback_data: 'lang_kk' }],
      ],
    },
  }).catch(err => console.error('❌ Ошибка отправки welcome:', err.message));
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
    const langSetMessage = await t(chatId, 'langSet');
    if (!langSetMessage) {
      console.error('❌ Пустое сообщение langSet для chatId:', chatId);
      return;
    }
    bot.sendMessage(chatId, langSetMessage, {
      reply_markup: {
        inline_keyboard: [[{ text: await t(chatId, 'startQuiz'), callback_data: 'level_menu' }]],
      },
    }).catch(err => console.error('❌ Ошибка отправки langSet:', err.message));
    return;
  }

  if (data === 'level_menu') {
    await showLevelMenu(chatId);
  } else if (data.startsWith('level_')) {
    const level = data.replace('level_', '');
    startQuiz(chatId, level);
  } else if (data === 'stats') {
    const userCount = await getUserCount();
    const activeTests = userStates.size;
    const statsMessage = (await t(chatId, 'stats'))
      .replace('%userCount%', userCount?.toString() || '0')
      .replace('%activeTests%', activeTests.toString());
    if (!statsMessage) {
      console.error('❌ Пустое сообщение stats для chatId:', chatId);
      return;
    }
    bot.sendMessage(chatId, statsMessage, { parse_mode: 'HTML' })
      .catch(err => console.error('❌ Ошибка отправки stats:', err.message));
  } else if (state && state.questions) {
    const q = state.questions[state.index];
    const userAnswer = data;
    const isCorrect = q.options.includes(userAnswer) && userAnswer === q.correctAnswer;
    const feedback = isCorrect ? await t(chatId, 'correct') : await t(chatId, 'wrong', q.correctAnswer);
    if (!feedback) {
      console.error('❌ Пустое сообщение feedback для chatId:', chatId);
      return;
    }
    await bot.sendMessage(chatId, feedback)
      .catch(err => console.error('❌ Ошибка отправки feedback:', err.message));
    if (isCorrect) state.correct++;
    state.index++;
    setTimeout(() => sendNextQuestion(chatId), 1000);
  }
});

bot.onText(/\/thanks/, async (msg) => {
  const chatId = msg.chat.id;
  const thanksMessage = await t(chatId, 'thanksMessage');
  if (!thanksMessage) {
    console.error('❌ Пустое сообщение thanks для chatId:', chatId);
    return;
  }
  bot.sendMessage(chatId, thanksMessage, { parse_mode: 'Markdown' })
    .catch(err => console.error('❌ Ошибка отправки thanks:', err.message));
});

bot.onText(/\/help/, async (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = await t(chatId, 'help');
  if (!helpMessage) {
    console.error('❌ Пустое сообщение help для chatId:', chatId);
    return;
  }
  bot.sendMessage(chatId, helpMessage, { parse_mode: 'HTML' })
    .catch(err => console.error('❌ Ошибка отправки help:', err.message));
});

bot.onText(/\/info/, async (msg) => {
  const chatId = msg.chat.id;
  const infoMessage = await t(chatId, 'info');
  if (!infoMessage) {
    console.error('❌ Пустое сообщение info для chatId:', chatId);
    return;
  }
  bot.sendMessage(chatId, infoMessage, { parse_mode: 'HTML' })
    .catch(err => console.error('❌ Ошибка отправки info:', err.message));
});

bot.onText(/\/level/, async (msg) => {
  await showLevelMenu(msg.chat.id);
});

bot.onText(/\/top10/, async (msg) => {
  const chatId = msg.chat.id;
  const db = await dbPromise;
  const top = await db.all('SELECT telegram_id, level, score FROM test_results ORDER BY score DESC LIMIT 10');
  if (top.length === 0) {
    const emptyMessage = await t(chatId, 'top10Empty');
    if (!emptyMessage) {
      console.error('❌ Пустое сообщение top10Empty для chatId:', chatId);
      return;
    }
    bot.sendMessage(chatId, emptyMessage)
      .catch(err => console.error('❌ Ошибка отправки top10Empty:', err.message));
    return;
  }

  const results = await Promise.all(top.map(async (r, i) => {
    let username = userCache.get(r.telegram_id) || (await db.get('SELECT full_name FROM users WHERE telegram_id = ?', [r.telegram_id]))?.full_name;
    if (!username) {
      try {
        const chat = await bot.getChat(r.telegram_id);
        username = chat.username || chat.first_name || await t(chatId, 'unknownUser');
        userCache.set(r.telegram_id, username);
        await db.run('UPDATE users SET full_name = ? WHERE telegram_id = ?', [username, r.telegram_id]);
      } catch (err) {
        console.warn(`⚠️ Не удалось получить имя пользователя для user_id ${r.telegram_id}:`, err.message);
        username = await t(chatId, 'unknownUser');
      }
    }
    return `${i + 1}. 👤 <b>${username}</b> — ${r.score}/20 (${r.level})`;
  }));

  const headerMessage = await t(chatId, 'top10Header');
  if (!headerMessage) {
    console.error('❌ Пустое сообщение top10Header для chatId:', chatId);
    return;
  }
  const message = headerMessage + results.join('\n');
  bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
    .catch(err => console.error('❌ Ошибка отправки top10:', err.message));
});

bot.onText(/\/myresults/, async (msg) => {
  const chatId = msg.chat.id;
  const state = userStates.get(chatId) || { lang: 'ru' };
  const locale = state.lang === 'uz' ? 'uz-UZ' : state.lang === 'kk' ? 'kk-KZ' : 'ru-RU';
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const db = await dbPromise;
  const results = await db.all('SELECT level, score, timestamp FROM test_results WHERE telegram_id = ? ORDER BY timestamp DESC', [chatId]);
  if (results.length === 0) {
    const emptyMessage = await t(chatId, 'userResultsEmpty');
    if (!emptyMessage) {
      console.error('❌ Пустое сообщение userResultsEmpty для chatId:', chatId);
      return;
    }
    bot.sendMessage(chatId, emptyMessage)
      .catch(err => console.error('❌ Ошибка отправки userResultsEmpty:', err.message));
    return;
  }

  const formattedResults = await Promise.all(results.map(async (r) => {
    let date = await t(chatId, 'noDate');
    if (r.timestamp) {
      const d = new Date(r.timestamp);
      date = !isNaN(d) ? d.toLocaleDateString(locale, options) : await t(chatId, 'noDate');
    }
    return `${r.score}/20 (${r.level}) — ${date}`;
  }));

  const headerMessage = await t(chatId, 'userResultsHeader');
  if (!headerMessage) {
    console.error('❌ Пустое сообщение userResultsHeader для chatId:', chatId);
    return;
  }
  const message = headerMessage + formattedResults.map((r, i) => `${i + 1}. ${r}`).join('\n');
  bot.sendMessage(chatId, message, { parse_mode: 'HTML' })
    .catch(err => console.error('❌ Ошибка отправки myresults:', err.message));
});

bot.onText(/\/stats/, async (msg) => {
  const chatId = msg.chat.id;
  const userCount = await getUserCount();
  const activeTests = userStates.size;
  const statsMessage = (await t(chatId, 'stats'))
    .replace('%userCount%', userCount?.toString() || '0')
    .replace('%activeTests%', activeTests.toString());
  if (!statsMessage) {
    console.error('❌ Пустое сообщение stats для chatId:', chatId);
    return;
  }
  bot.sendMessage(chatId, statsMessage, { parse_mode: 'HTML' })
    .catch(err => console.error('❌ Ошибка отправки stats:', err.message));
});

export async function showLevelMenu(chatId) {
  const levels = [
    [{ text: await t(chatId, 'levelBeginner'), callback_data: 'level_beginner' }],
    [{ text: await t(chatId, 'levelIntermediate'), callback_data: 'level_intermediate' }],
    [{ text: await t(chatId, 'levelAdvanced'), callback_data: 'level_advanced' }],
    [{ text: await t(chatId, 'statsButton'), callback_data: 'stats' }],
  ];
  const selectLevelMessage = await t(chatId, 'selectLevel');
  if (!selectLevelMessage) {
    console.error('❌ Пустое сообщение selectLevel для chatId:', chatId);
    return;
  }
  bot.sendMessage(chatId, selectLevelMessage, {
    reply_markup: { inline_keyboard: levels },
  }).catch(err => console.error('❌ Ошибка отправки showLevelMenu:', err.message));
}

function getRandomQuestions(questions, count = 20) {
  return [...questions].sort(() => 0.5 - Math.random()).slice(0, count);
}

export async function createQuestionMessage(state) {
  const q = state.questions[state.index];
  const questionText = await t(state.chatId, 'question', state.index + 1, state.questions.length);
  return `🧠 <b>${questionText}</b>\n${q.question}`;
}

export async function sendNextQuestion(chatId) {
  const state = userStates.get(chatId);
  if (!state || state.index >= state.questions.length) {
    const now = new Date().toISOString();
    const doneMessage = await t(chatId, 'done', state.correct, state.questions.length);
    if (!doneMessage) {
      console.error('❌ Пустое сообщение done для chatId:', chatId);
      return;
    }
    await bot.sendMessage(chatId, doneMessage, {
      reply_markup: { remove_keyboard: true },
    }).catch(err => console.error('❌ Ошибка отправки done:', err.message));
    const db = await dbPromise;
    try {
      await db.run('INSERT INTO test_results (telegram_id, level, score, timestamp) VALUES (?, ?, ?, ?)', [chatId, state.level, state.correct, now]);
      console.log(`Сохранен результат для ${chatId}: ${state.correct}/${state.questions.length} (${state.level})`);
      const resultCount = await db.get('SELECT COUNT(*) as count FROM test_results WHERE telegram_id = ?', [chatId]);
      console.log(`Текущий счетчик результатов для ${chatId}: ${resultCount.count}`);
      // Бэкап базы данных после каждого теста
      await backupDatabase();
    } catch (err) {
      console.error(`❌ Ошибка сохранения результата для ${chatId}:`, err.message);
    }
    userStates.delete(chatId);
    return;
  }

  const q = state.questions[state.index];
  if (!q.options || q.options.length !== 4 || !q.correctAnswer || !q.options.includes(q.correctAnswer)) {
    const errorMsg = await t(chatId, 'errorMessage')
      .replace('%question%', q.question || 'не указан')
      .replace('%options%', JSON.stringify(q.options) || 'не указаны')
      .replace('%correctAnswer%', q.correctAnswer || 'не указан');
    if (!errorMsg) {
      console.error('❌ Пустое сообщение errorMessage для chatId:', chatId);
      return;
    }
    bot.sendMessage(chatId, errorMsg)
      .catch(err => console.error('❌ Ошибка отправки errorMessage:', err.message));
    userStates.delete(chatId);
    return;
  }

  const message = await createQuestionMessage({ ...state, chatId });
  const buttons = await Promise.all(q.options.map(async (opt) => {
    const prefix = await t(state.chatId, 'optionPrefix');
    return [{ text: `${prefix} ${opt}`, callback_data: opt }];
  }));

  bot.sendMessage(chatId, message, {
    parse_mode: 'HTML',
    reply_markup: { inline_keyboard: buttons },
  }).catch(err => console.error('❌ Ошибка отправки вопроса:', err.message));
}

// Функция для бэкапа базы данных
export async function backupDatabase() {
  try {
    // Проверяем наличие GOOGLE_CREDENTIALS_JSON
    if (!process.env.GOOGLE_CREDENTIALS_JSON) {
      console.error('❌ Переменная окружения GOOGLE_CREDENTIALS_JSON не найдена');
      return;
    }

    // Парсим JSON из переменной окружения
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
    if (!credentials || !credentials.client_email || !credentials.private_key) {
      console.error('❌ Некорректные учетные данные в GOOGLE_CREDENTIALS_JSON');
      return;
    }

    // Инициализируем клиента Google Drive с учетными данными
    const auth = await google.auth.getClient({
      credentials: credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    const fileMetadata = {
      name: `bot_data_backup_${new Date().toISOString().replace(/[:.]/g, '-')}.db`,
      parents: [FOLDER_ID],
    };
    const media = {
      mimeType: 'application/x-sqlite3',
      body: fs.createReadStream('./bot_data.db'),
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });
    console.log(`✅ Бэкап создан: ${file.data.id}`);
  } catch (err) {
    console.error('❌ Ошибка создания бэкапа:', err.message);
  }
}

export function startQuiz(chatId, level) {
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

export async function getUserCount() {
  const db = await dbPromise;
  try {
    const count = await db.get('SELECT COUNT(*) as count FROM users');
    return count?.count || 0;
  } catch (err) {
    console.error('❌ Ошибка получения количества пользователей:', err.message);
    return 0;
  }
}