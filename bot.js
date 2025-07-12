import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import dotenv from 'dotenv';
import { beginnerQuestions, intermediateQuestions, advancedQuestions } from './questions.js';
import { saveResult, getTop10Results, getUserResults } from './db.js';

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;
const PORT = parseInt(process.env.PORT, 10) || 3000;

if (!TOKEN || !WEBHOOK_URL) {
  console.error('❌ BOT_TOKEN и WEBHOOK_URL должны быть заданы в .env');
  process.exit(1);
}

// Инициализация бота
const bot = new TelegramBot(TOKEN);

// Кэш для хранения username
const userCache = new Map();

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

// Локализация
const translations = {
  ru: {
    welcome: '👋 Выберите язык:',
    help: `ℹ️ <b>Как пользоваться:</b>\n\n1. Нажмите "📚 Выбрать уровень".\n2. Ответьте на 20 вопросов.\n3. Узнайте свой результат.\n4. Смотрите Топ 10.\n\nПриятного обучения! 🎓`,
    info: `🤖 <b>English Quiz Bot</b>\n📌 Автор: @AbdimuratovBahrom\n💡 Уровни: Начальный, Средний, Продвинутый\n📊 Команды: /level, /top10, /myresults`,
    selectLevel: '📚 Выберите уровень сложности:',
    correct: '✅ Правильно!',
    wrong: (answer) => `❌ Неправильно. Правильный ответ: ${answer}`,
    done: (score, total) => `🎉 Викторина завершена!\nВаш результат: ${score}/${total}`,
    top10Empty: '❌ Результаты не найдены.',
    top10Header: '🏆 <b>Топ 10 результатов:</b>\n\n',
    userResultsEmpty: '❌ Ваши результаты не найдены.',
    userResultsHeader: '📊 <b>Ваши результаты:</b>\n\n',
    langButton: '🇷🇺 Русский',
    levelBeginner: '🔰 Начальный',
    levelIntermediate: '⚙️ Средний',
    levelAdvanced: '🚀 Продвинутый',
    optionPrefix: '🔘',
    langSet: '✅ Язык установлен. Нажмите, чтобы начать викторину.',
    startQuiz: '📚 Начать викторину',
    question: (index, total) => `Вопрос ${index}/${total}`,
    unknownUser: 'Неизвестный пользователь',
    noDate: 'Дата недоступна',
  },
  uz: {
    welcome: '👋 Tilni tanlang:',
    help: `ℹ️ <b>Qanday foydalaniladi:</b>\n\n1. "📚 Darajani tanlash" tugmasini bosing.\n2. 20 ta savolga javob bering.\n3. Natijangizni ko'ring.\n4. Top 10 ni ko'ring.\n\nOmad! 🎓`,
    info: `🤖 <b>English Quiz Bot</b>\n📌 Muallif: @AbdimuratovBahrom\n💡 Darajalar: Boshlang'ich, O'rta, Ilg'or\n📊 Buyruqlar: /level, /top10, /myresults`,
    selectLevel: '📚 Qiyinlik darajasini tanlang:',
    correct: '✅ To‘g‘ri!',
    wrong: (answer) => `❌ Noto‘g‘ri. To‘g‘ri javob: ${answer}`,
    done: (score, total) => `🎉 Viktorina tugadi!\nNatijangiz: ${score}/${total}`,
    top10Empty: '❌ Natijalar topilmadi.',
    top10Header: '🏆 <b>Eng yaxshi 10 natija:</b>\n\n',
    userResultsEmpty: '❌ Natijalaringiz topilmadi.',
    userResultsHeader: '📊 <b>Sizning natijalaringiz:</b>\n\n',
    langButton: '🇺🇿 Oʻzbekcha',
    levelBeginner: '🔰 Boshlang‘ich',
    levelIntermediate: '⚙️ O‘rta',
    levelAdvanced: '🚀 Ilg‘or',
    optionPrefix: '🔘',
    langSet: '✅ Til o‘rnatildi. Viktorinani boshlash uchun bosing.',
    startQuiz: '📚 Viktorinani boshlash',
    question: (index, total) => `Savol ${index}/${total}`,
    unknownUser: "Noma'lum foydalanuvchi",
    noDate: 'Sana mavjud emas',
  },
  kk: {
    welcome: '👋 Til saylañ:',
    help: `ℹ️ <b>Qalay paydalanıw kerek:</b>\n\n1. "📚 Daraja saylañ" tugmasın basıñ.\n2. 20 sorawğa jawap beriñ.\n3. Nátiyjeni kóriñ.\n4. Top 10 dı kóriñ.\n\nSáttilik! 🎓`,
    info: `🤖 <b>English Quiz Bot</b>\n📌 Avtor: @AbdimuratovBahrom\n💡 Darajalar: Baslang‘ish, Orta, Ilgeri\n📊 Komandalar: /level, /top10, /myresults`,
    selectLevel: '📚 Qıyınlıq darajasın saylañ:',
    correct: '✅ Dúris!',
    wrong: (answer) => `❌ Qáte. Dúris jawap: ${answer}`,
    done: (score, total) => `🎉 Viktorina ayaqtaldı!\nNátiyjeñiz: ${score}/${total}`,
    top10Empty: '❌ Nátiyjeler tabılmadı.',
    top10Header: '🏆 <b>Eñ úzdik 10 nátiyje:</b>\n\n',
    userResultsEmpty: '❌ Nátiyjeleriñiz tabılmadı.',
    userResultsHeader: '📊 <b>Sizdiñ nátiyjeleriñiz:</b>\n\n',
    langButton: '🇰🇿 Qaraqalpaqsha',
    levelBeginner: '🔰 Baslang‘ish',
    levelIntermediate: '⚙️ Orta',
    levelAdvanced: '🚀 Ilgeri',
    optionPrefix: '🔘',
    langSet: '✅ Til ornatıldı. Viktorinanı baslaw ushın basıñ.',
    startQuiz: '📚 Viktorinanı baslaw',
    question: (index, total) => `Soraw ${index}/${total}`,
    unknownUser: 'Belgisiz paydalanıwshı',
    noDate: 'Sana joq',
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
  return typeof text === 'function' ? text(...args) : text;
}

// Функция для перемешивания массива
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Выбор языка
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
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
  } else if (state && state.questions) {
    const q = state.questions[state.index];
    const isCorrect = data === q.options[q.correctAnswer];
    await bot.sendMessage(chatId, isCorrect ? t(chatId, 'correct') : t(chatId, 'wrong', q.options[q.correctAnswer]));
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
  showLevelMenu(msg.chat.id);
});

// /top10
bot.onText(/\/top10/, async (msg) => {
  const chatId = msg.chat.id;
  const top = await getTop10Results();
  if (top.length === 0) return bot.sendMessage(chatId, t(chatId, 'top10Empty'));

  const results = await Promise.all(top.map(async (r, i) => {
    let username = userCache.get(r.user_id) || r.username;
    if (!username) {
      try {
        const chat = await bot.getChat(r.user_id);
        username = chat.username || chat.first_name || t(chatId, 'unknownUser');
        userCache.set(r.user_id, username); // Кэшируем результат
      } catch (err) {
        console.warn(`⚠️ Не удалось получить имя пользователя для user_id ${r.user_id}:`, err.message);
        username = t(chatId, 'unknownUser');
      }
    }
    return `${i + 1}. 👤 <b>${username}</b> — ${r.score}/20 (${r.level})`;
  }));

  const message = t(chatId, 'top10Header') + results.join('\n');
  bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
});

// /myresults
bot.onText(/\/myresults/, async (msg) => {
  const chatId = msg.chat.id;
  const state = userStates.get(chatId) || { lang: 'ru' };
  const locale = state.lang === 'uz' ? 'uz-UZ' : state.lang === 'kk' ? 'kk-KZ' : 'ru-RU';
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' }; // Уточненный формат даты
  const results = await getUserResults(chatId);
  if (results.length === 0) return bot.sendMessage(chatId, t(chatId, 'userResultsEmpty'));

  const formattedResults = results.map((r) => {
    let date = t(chatId, 'noDate'); // Значение по умолчанию
    if (r.timestamp) {
      const d = new Date(r.timestamp);
      console.log(`Debug: Raw timestamp "${r.timestamp}" parsed to ${d}`); // Подробный лог
      date = !isNaN(d) ? d.toLocaleDateString(locale, options) : t(chatId, 'noDate');
    } else {
      console.warn(`⚠️ No timestamp for result: ${JSON.stringify(r)}`);
      // Запасной вариант: текущая дата
      date = new Date().toLocaleDateString(locale, options);
    }
    return `${r.score}/20 (${r.level}) — ${date}`;
  });

  const message = t(chatId, 'userResultsHeader') + formattedResults.map((r, i) => `${i + 1}. ${r}`).join('\n');
  bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
});

function showLevelMenu(chatId) {
  const levels = [
    [{ text: t(chatId, 'levelBeginner'), callback_data: 'level_beginner' }],
    [{ text: t(chatId, 'levelIntermediate'), callback_data: 'level_intermediate' }],
    [{ text: t(chatId, 'levelAdvanced'), callback_data: 'level_advanced' }],
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

function sendNextQuestion(chatId) {
  const state = userStates.get(chatId);
  if (!state || state.index >= state.questions.length) {
    const now = new Date().toISOString(); // Текущая дата в ISO формате
    bot.sendMessage(chatId, t(chatId, 'done', state.correct, state.questions.length), {
      reply_markup: { remove_keyboard: true },
    });
    console.log(`Debug: Saving result with timestamp ${now}`); // Отладочный лог
    saveResult(chatId, state.level, state.correct, now); // Передаем текущую дату
    userStates.delete(chatId);
    return;
  }

  const q = state.questions[state.index];
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

  // Выбираем случайные вопросы
  const selected = getRandomQuestions(questions);

  // Перемешиваем варианты ответа для каждого вопроса
  const shuffledQuestions = selected.map(q => {
    const options = [...q.options]; // Копируем массив опций
    shuffleArray(options); // Перемешиваем опции
    const newCorrectIndex = options.indexOf(q.correctAnswer); // Находим новую позицию правильного ответа
    return { ...q, options, correctAnswer: newCorrectIndex }; // Обновляем вопрос с новыми опциями и индексом
  });

  const prev = userStates.get(chatId) || { lang: 'ru' };
  userStates.set(chatId, {
    ...prev,
    level,
    questions: shuffledQuestions,
    index: 0,
    correct: 0,
    chatId,
  });

  sendNextQuestion(chatId);
}