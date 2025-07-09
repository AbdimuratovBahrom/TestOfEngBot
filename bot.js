import 'dotenv/config';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import { initDB, saveResult, getTop10, getUserResults } from './db.js';
import shuffle from 'lodash.shuffle';



const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const app = express();
const port = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Примерные вопросы
const beginnerQuestions = Array.from({ length: 80 }, (_, i) => ({
  question: `Beginner Question ${i + 1}?`,
  options: ['A', 'B', 'C', 'D'],
  correctAnswer: 'A'
}));

// Текущее состояние пользователей
const userStates = new Map();

function startQuiz(chatId, level) {
  const questions = shuffle(beginnerQuestions).slice(0, 20);
  userStates.set(chatId, { level, questions, index: 0, correct: 0 });
  sendNextQuestion(chatId);
}

function sendNextQuestion(chatId) {
  const state = userStates.get(chatId);
  if (state.index >= state.questions.length) {
    bot.sendMessage(chatId, `✅ Quiz complete! Correct answers: ${state.correct}/20`);
    saveResult(chatId, state.level, state.correct);
    userStates.delete(chatId);
    return;
  }
  const q = state.questions[state.index];
  bot.sendMessage(chatId, `❓ ${q.question}`, {
    reply_markup: {
      inline_keyboard: [q.options.map(opt => ({ text: opt, callback_data: opt }))]
    }
  });
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Choose your level:', {
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
  const text = top.map((r, i) => `${i + 1}. ${r.user_id}: ${r.score} (${r.level})`).join('\n');
  bot.sendMessage(msg.chat.id, `🏆 Top 10:\n${text || 'No data yet.'}`);
});

bot.onText(/\/myresults/, async (msg) => {
  const rows = await getUserResults(msg.chat.id);
  const text = rows.map((r, i) => `${i + 1}. ${r.score} (${r.level})`).join('\n');
  bot.sendMessage(msg.chat.id, `📊 Your results:\n${text || 'No data yet.'}`);
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const state = userStates.get(chatId);

  if (query.data.startsWith('level_')) {
    const level = query.data.replace('level_', '');
    startQuiz(chatId, level);
  } else if (state) {
    const q = state.questions[state.index];
    if (query.data === q.correctAnswer) state.correct++;
    state.index++;
    sendNextQuestion(chatId);
  }
  bot.answerCallbackQuery(query.id);
});

app.get('/', (req, res) => res.send('Bot is running.'));
app.listen(port, async () => {
  console.log(`🌐 WEBHOOK_URL: ${WEBHOOK_URL}`);
  console.log(`📡 PORT: ${port}`);
  await initDB();
});