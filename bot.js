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

const LANG = {
  ru: {
    name: '🇷🇺 Русский',
    commands: {
      start: 'Начать',
      help: 'Помощь',
      info: 'О боте',
      level: 'Выбрать уровень',
      top10: '🏆 Топ 10',
      myresults: '📈 Мои результаты'
    },
    texts: {
      welcome: '👋 Добро пожаловать в бот для тренировки английского! Выберите команду:',
      help: `ℹ️ <b>Как пользоваться:</b>\n\n1. Нажмите "📚 Выбрать уровень".\n2. Ответьте на 20 вопросов.\n3. Узнайте свой результат.\n4. Смотрите Топ 10.\n\nПриятного обучения! 🎓`,
      info: `🤖 <b>English Quiz Bot</b>\n📌 Автор: @AbdimuratovBahrom\n💡 Уровни: Beginner, Intermediate, Advanced\n📊 Команды: /level, /top10, /myresults`,
      choose_level: '📚 Выберите уровень сложности:',
      no_results: '❌ Результаты не найдены.',
      your_results: '📈 <b>Ваши результаты:</b>\n\n',
      quiz_end: (score, total) => `🎉 Викторина завершена!\nВаш результат: ${score}/${total}`,
      correct: '✅ Правильно!',
      wrong: (answer) => `❌ Неправильно. Правильный ответ: ${answer}`
    }
  },
  uz: {
    name: '🇺🇿 Oʻzbekcha',
    commands: {
      start: 'Boshlash',
      help: 'Yordam',
      info: 'Bot haqida',
      level: 'Darajani tanlash',
      top10: '🏆 Eng yaxshi 10 talik',
      myresults: '📈 Mening natijalarim'
    },
    texts: {
      welcome: '👋 Ingliz tili bo‘yicha test botiga xush kelibsiz!',
      help: `ℹ️ <b>Qanday foydalaniladi:</b>\n\n1. "📚 Darajani tanlash" tugmasini bosing.\n2. 20 ta savolga javob bering.\n3. Natijangizni ko‘ring.\n4. Eng yaxshi 10 talikni ko‘ring.`,
      info: `🤖 <b>English Quiz Bot</b>\n📌 Muallif: @AbdimuratovBahrom\n💡 Darajalar: Beginner, Intermediate, Advanced\n📊 Buyruqlar: /level, /top10, /myresults`,
      choose_level: '📚 Qiyinlik darajasini tanlang:',
      no_results: '❌ Natijalar topilmadi.',
      your_results: '📈 <b>Sizning natijalaringiz:</b>\n\n',
      quiz_end: (score, total) => `🎉 Test tugadi!\nNatijangiz: ${score}/${total}`,
      correct: '✅ To‘g‘ri!',
      wrong: (answer) => `❌ Noto‘g‘ri. To‘g‘ri javob: ${answer}`
    }
  },
  kaa: {
    name: '🇰🇿 Qaraqalpaqsha',
    commands: {
      start: 'Baslaw',
      help: 'Kómek',
      info: 'Bot haqqında',
      level: 'Deńgeýdi táńlew',
      top10: '🏆 Eń jaqsi 10-lıq',
      myresults: '📈 Meniń nátíjelerim'
    },
    texts: {
      welcome: '👋 Inglis tilinen test botına xosh keldińiz!',
      help: `ℹ️ <b>Qanday paydalaniladi:</b>\n\n1. "📚 Deńgeýdi táńlew" túymesine basıń.\n2. 20 sawalǵa juwap beriń.\n3. Nátíjeni biliń.\n4. Eń jaqsi 10-lıqtı kóriń.`,
      info: `🤖 <b>English Quiz Bot</b>\n📌 Avtorı: @AbdimuratovBahrom\n💡 Deńgeýler: Beginner, Intermediate, Advanced\n📊 Buyruqlar: /level, /top10, /myresults`,
      choose_level: '📚 Deńgeýdi táńlew:',
      no_results: '❌ Nátíjeler tabılmadı.',
      your_results: '📈 <b>Sizdiń nátíjelerińiz:</b>\n\n',
      quiz_end: (score, total) => `🎉 Test ayaqtaldı!\nNátíje: ${score}/${total}`,
      correct: '✅ Dúris!',
      wrong: (answer) => `❌ Náwursız. Dúris juwap: ${answer}`
    }
  }
};

// Языковой выбор при первом входе
bot.onText(/\/start/, (msg) => {
const chatId = msg.chat.id;
const langButtons = Object.entries(LANG).map(([code, lang]) => [{ text: lang.name, callback_data: `lang_${code}` }]);

bot.sendMessage(chatId, '🌐 Пожалуйста, выберите язык / Iltimos, tilni tanlang / Til tańlań:', {
reply_markup: { inline_keyboard: langButtons }
});
});

async function setCommandsForLanguage(chatId, langCode) {
const lang = LANG[langCode];
if (!lang) return;

userLanguages.set(chatId, langCode);

await bot.setMyCommands([
{ command: 'start', description: lang.commands.start },
{ command: 'help', description: lang.commands.help },
{ command: 'info', description: lang.commands.info },
{ command: 'level', description: lang.commands.level },
{ command: 'top10', description: lang.commands.top10 },
{ command: 'myresults', description: lang.commands.myresults }
], { language_code: langCode });
}

// Обработка выбора языка
bot.on('callback_query', async (query) => {
const chatId = query.message.chat.id;
const data = query.data;

if (data.startsWith('lang_')) {
const langCode = data.replace('lang_', '');
await setCommandsForLanguage(chatId, langCode);

javascript
Копировать
Редактировать
const lang = LANG[langCode];
if (lang) {
  bot.sendMessage(chatId, lang.texts.welcome, {
    reply_markup: {
      keyboard: [
        [{ text: `📚 ${lang.commands.level} /level` }],
        [
          { text: `ℹ️ ${lang.commands.help} /help` },
          { text: `🏆 ${lang.commands.top10} /top10` }
        ]
      ],
      resize_keyboard: true
    }
  });
}

await bot.answerCallbackQuery(query.id);
return;
}

const state = userStates.get(chatId);
if (data.startsWith('level_')) {
const level = data.replace('level_', '');
startQuiz(chatId, level);
} else if (state) {
const q = state.questions[state.index];
const langCode = userLanguages.get(chatId) || 'ru';
const t = LANG[langCode].texts;
const isCorrect = data === q.correctAnswer;

javascript
Копировать
Редактировать
await bot.sendMessage(chatId, isCorrect ? t.correct : t.wrong(q.correctAnswer));
if (isCorrect) state.correct++;
state.index++;
setTimeout(() => sendNextQuestion(chatId), 1000);
}
});

function sendNextQuestion(chatId) {
const state = userStates.get(chatId);
const langCode = userLanguages.get(chatId) || 'ru';
const t = LANG[langCode].texts;

if (!state || state.index >= state.questions.length) {
const score = state.correct;
const total = state.questions.length;
const level = state.level;
bot.sendMessage(chatId, t.quiz_end(score, total), {
reply_markup: { remove_keyboard: true }
});
saveResult(chatId, level, score);
userStates.delete(chatId);
return;
}

const q = state.questions[state.index];
const buttons = q.options.map((opt) => [{ text: `🔘 ${opt}`, callback_data: opt }]);

bot.sendMessage(chatId, `🧠 <b>Вопрос ${state.index + 1}/${state.questions.length}:</b>\n${q.question}`, {
parse_mode: 'HTML',
reply_markup: { inline_keyboard: buttons }
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
userStates.set(chatId, { level, questions: selected, index: 0, correct: 0 });
sendNextQuestion(chatId);
}

function getRandomQuestions(questions, count = 20) {
const shuffled = [...questions].sort(() => 0.5 - Math.random());
return shuffled.slice(0, count);
}

// Обработка команд
bot.onText(/\/help/, (msg) => {
const lang = LANG[userLanguages.get(msg.chat.id) || 'ru'];
bot.sendMessage(msg.chat.id, lang.texts.help, { parse_mode: 'HTML' });
});

bot.onText(/\/info/, (msg) => {
const lang = LANG[userLanguages.get(msg.chat.id) || 'ru'];
bot.sendMessage(msg.chat.id, lang.texts.info, { parse_mode: 'HTML' });
});

bot.onText(/\/level/, (msg) => {
const lang = LANG[userLanguages.get(msg.chat.id) || 'ru'];
const levels = [
[{ text: '🔰 Beginner', callback_data: 'level_beginner' }],
[{ text: '⚙️ Intermediate', callback_data: 'level_intermediate' }],
[{ text: '🚀 Advanced', callback_data: 'level_advanced' }]
];
bot.sendMessage(msg.chat.id, lang.texts.choose_level, {
reply_markup: { inline_keyboard: levels }
});
});

bot.onText(/\/top10/, async (msg) => {
const lang = LANG[userLanguages.get(msg.chat.id) || 'ru'];
const top = await getTop10Results();
if (top.length === 0) return bot.sendMessage(msg.chat.id, lang.texts.no_results);
const message = '🏆 <b>Top 10:</b>\n\n' + top.map((r, i) =>
`${i + 1}. 👤 <b>${r.user_id}</b> — ${r.score}/20 (${r.level})`).join('\n');
bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
});

bot.onText(/\/myresults/, async (msg) => {
const lang = LANG[userLanguages.get(msg.chat.id) || 'ru'];
const results = await getUserResults(msg.chat.id);
if (results.length === 0) return bot.sendMessage(msg.chat.id, lang.texts.no_results);
const message = lang.texts.your_results + results.map((r) =>
`— ${r.score}/20 (${r.level})`).join('\n');
bot.sendMessage(msg.chat.id, message, { parse_mode: 'HTML' });
});






