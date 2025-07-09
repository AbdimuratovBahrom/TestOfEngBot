import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export async function initDB() {
  db = await open({
    filename: './quiz-results.db',
    driver: sqlite3.Database
  });
  await db.exec(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT,
      level TEXT,
      score INTEGER,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

export async function saveResult(userId, level, score) {
  await db.run('INSERT INTO results (user_id, level, score) VALUES (?, ?, ?)', [userId, level, score]);
}

export async function getTop10() {
  return await db.all('SELECT user_id, level, score FROM results ORDER BY score DESC LIMIT 10');
}

export async function getUserResults(userId) {
  return await db.all('SELECT level, score, date FROM results WHERE user_id = ? ORDER BY date DESC', [userId]);
}