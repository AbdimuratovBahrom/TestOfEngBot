import 'dotenv/config';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import { initDB, saveResult, getTop10, getUserResults } from './db.js';
import { beginnerQuestions, intermediateQuestions, advancedQuestions } from './questions.js';
import shuffle from 'lodash.shuffle';

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const app = express();
const port = process.env.PORT || 3000;
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Хранение состояния пользователей
const userStates = new Map();

function startQuiz(chatId, level) {
  let questions;
  if (level === 'beginner') {
    questions = shuffle(beginnerQuestions).slice(0, 20);
  } else if (level === 'intermediate') {
    questions = shuffle(intermediateQuestions).slice(0, 20);
  } else if (level === 'advanced') {
    questions = shuffle(advancedQuestions).slice(0, 20);
  } else {
    bot.sendMessage(chatId, '⚠️ Unknown level selected.');
    return;
  }

  userStates.set(chatId, { level, questions, index: 0, correct: 0 });
  sendNextQuestion(chatId);
}

function sendNextQuestion(chatId) {
  const state = userStates.get(chatId);
  if (!state) return;

  if (state.index >= state.questions.length) {
    bot.sendMessage(chatId, `🎉 Quiz complete!\n✅ Correct answers: ${state.correct}/${state.questions.length}`);
    saveResult(chatId, state.level, state.correct);
    userStates.delete(chatId);
    return;
  }

  const q = state.questions[state.index];
  const questionNumber = `${state.index + 1}/${state.questions.length}`;
  const text = `📘 Question ${questionNumber}:\n\n❓ ${q.question}`;

  bot.sendMessage(chatId, text, {
    reply_markup: {
      inline_keyboard: q.options.map(opt => ([{ text: `👉 ${opt}`, callback_data: opt }]))
    }
  });
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, '👋 Welcome! Choose your level to begin the quiz:', {
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
  const text = top.map((r, i) => `${i + 1}. 🧑‍💻 ${r.user_id}: ${r.score} (${r.level})`).join('\n');
  bot.sendMessage(msg.chat.id, `🏆 Top 10:\n\n${text || 'No data yet.'}`);
});

bot.onText(/\/myresults/, async (msg) => {
  const rows = await getUserResults(msg.chat.id);
  const text = rows.map((r, i) => `${i + 1}. ✅ ${r.score} (${r.level})`).join('\n');
  bot.sendMessage(msg.chat.id, `📊 Your results:\n\n${text || 'No data yet.'}`);
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const state = userStates.get(chatId);

  if (query.data.startsWith('level_')) {
    const level = query.data.replace('level_', '');
    startQuiz(chatId, level);
    await bot.answerCallbackQuery(query.id);
  } else if (state) {
    const q = state.questions[state.index];
    const isCorrect = query.data === q.correctAnswer;
    if (isCorrect) state.correct++;

    const feedback = isCorrect
      ? '✅ Correct!'
      : `❌ Incorrect!\n✅ Correct answer: ${q.correctAnswer}`;

    await bot.answerCallbackQuery(query.id);
    await bot.sendMessage(chatId, feedback);

    state.index++;
    setTimeout(() => sendNextQuestion(chatId), 1000); // задержка 1 секунда
  }
});

app.get('/', (req, res) => res.send('🤖 Bot is running.'));
app.listen(port, async () => {
  console.log(`🌐 WEBHOOK_URL: ${WEBHOOK_URL}`);
  console.log(`📡 PORT: ${port}`);
  await initDB();
});
