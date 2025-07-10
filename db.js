import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export async function initDb() {
  db = await open({
    filename: './quiz.db',
    driver: sqlite3.Database
  });

  await db.run(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      level TEXT,
      score INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function saveResult(userId, level, score) {
  if (!db) await initDb();
  await db.run(
    'INSERT INTO results (user_id, level, score) VALUES (?, ?, ?)',
    [userId, level, score]
  );
}

export async function getTop10Results() {
  if (!db) await initDb();
  return await db.all(
    'SELECT user_id, level, score FROM results ORDER BY score DESC LIMIT 10'
  );
}

export async function getUserResults(userId) {
  if (!db) await initDb();
  return await db.all(
    'SELECT level, score, created_at FROM results WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
    [userId]
  );
}
