import 'dotenv/config';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import { initDB, saveResult, getTop10, getUserResults } from './db.js';
import { beginnerQuestions, intermediateQuestions, advancedQuestions } from './questions.js';
import shuffle from 'lodash.shuffle';

// Инициализация
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const app = express();
const port = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Главное меню
const mainMenu = {
  reply_markup: {
    keyboard: [
      ['🚀 Начать', '📚 Помощь'],
      ['ℹ️ Информация', '🏆 Топ 10'],
      ['🎯 Уровень', '📈 Мои результаты']
    ],
    resize_keyboard: true
  }
};

// Состояния пользователей
const userStates = new Map();

// Выбор уровня
function startQuiz(chatId, level) {
  let questions = [];
  if (level === 'beginner') questions = beginnerQuestions;
  else if (level === 'intermediate') questions = intermediateQuestions;
  else if (level === 'advanced') questions = advancedQuestions;

  const selected = shuffle(questions).slice(0, 20);
  userStates.set(chatId, { level, questions: selected, index: 0, correct: 0 });
  sendNextQuestion(chatId);
}

// Отправка вопроса
async function sendNextQuestion(chatId) {
  const state = userStates.get(chatId);
  if (state.index >= state.questions.length) {
    bot.sendMessage(chatId, `✅ Викторина завершена!\nПравильных ответов: ${state.correct}/20`, mainMenu);
    saveResult(chatId, state.level, state.correct);
    userStates.delete(chatId);
    return;
  }

  const q = state.questions[state.index];
  const progress = `${state.index + 1}/20`;

  await bot.sendMessage(chatId, `❓ Вопрос ${progress}:\n${q.question}`, {
    reply_markup: {
      inline_keyboard: q.options.map(opt => ([{
        text: `🔘 ${opt}`,
        callback_data: opt
      }]))
    }
  });
}

// Команды и меню
bot.onText(/\/start|Начать/, (msg) => {
  bot.sendMessage(msg.chat.id, '👋 Добро пожаловать! Выберите действие из меню ниже:', mainMenu);
});

bot.onText(/\/help|Помощь/, (msg) => {
  bot.sendMessage(msg.chat.id, `📚 Помощь:

🚀 Начать — пройти тест  
🎯 Уровень — выбрать сложность  
🏆 Топ 10 — лучшие участники  
📈 Мои результаты — ваши успехи  
ℹ️ Информация — о боте`, mainMenu);
});

bot.onText(/\/info|Информация/, (msg) => {
  bot.sendMessage(msg.chat.id, `ℹ️ Этот бот поможет вам улучшить знание английского языка.  
Выберите уровень и пройдите 20 случайных вопросов.`, mainMenu);
});

bot.onText(/\/level|Уровень/, (msg) => {
  bot.sendMessage(msg.chat.id, '🎯 Выберите уровень сложности:', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🟢 Beginner', callback_data: 'level_beginner' }],
        [{ text: '🟡 Intermediate', callback_data: 'level_intermediate' }],
        [{ text: '🔴 Advanced', callback_data: 'level_advanced' }]
      ]
    }
  });
});

bot.onText(/\/top10|Топ 10/, async (msg) => {
  const top = await getTop10();
  const text = top.map((r, i) => `${i + 1}. ${r.user_id}: ${r.score} (${r.level})`).join('\n');
  bot.sendMessage(msg.chat.id, `🏆 Топ 10 пользователей:\n${text || 'Пока нет данных.'}`, mainMenu);
});

bot.onText(/\/myresults|Мои результаты/, async (msg) => {
  const rows = await getUserResults(msg.chat.id);
  const text = rows.map((r, i) => `${i + 1}. ${r.score} (${r.level})`).join('\n');
  bot.sendMessage(msg.chat.id, `📈 Ваши результаты:\n${text || 'Пока нет данных.'}`, mainMenu);
});

// Обработка выбора уровня и ответа
bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const state = userStates.get(chatId);

  if (query.data.startsWith('level_')) {
    const level = query.data.replace('level_', '');
    startQuiz(chatId, level);
  } else if (state) {
    const q = state.questions[state.index];
    const isCorrect = query.data === q.correctAnswer;
    const resultMsg = isCorrect ? '✅ Верно!' : `❌ Неверно. Правильный ответ: ${q.correctAnswer}`;
    if (isCorrect) state.correct++;
    await bot.sendMessage(chatId, resultMsg);
    state.index++;
    setTimeout(() => sendNextQuestion(chatId), 1000);
  }

  bot.answerCallbackQuery(query.id);
});

// HTTP сервер
app.get('/', (req, res) => res.send('🤖 Бот работает.'));
app.listen(port, async () => {
  console.log(`🌐 WEBHOOK_URL: ${WEBHOOK_URL}`);
  console.log(`📡 PORT: ${port}`);
  await initDB();
});
