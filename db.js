import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

// Определяем __dirname в ES-модулях
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

async function initDB() {
  db = await open({
    filename: path.join(__dirname, 'quiz_results.db'),
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT,
      username TEXT,
      score INTEGER,
      total INTEGER,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      level TEXT
    )
  `);
}

async function saveResult(userId, username, score, total, level) {
  await db.run(
    'INSERT INTO results (userId, username, score, total, level) VALUES (?, ?, ?, ?, ?)',
    [userId, username, score, total, level]
  );
}

async function getTop10() {
  return await db.all(`
    SELECT username, level, MAX(score) as maxScore, total
    FROM results
    GROUP BY userId, level
    ORDER BY maxScore DESC
    LIMIT 10
  `);
}

async function getUserResults(userId) {
  return await db.all(
    'SELECT level, score, total, timestamp FROM results WHERE userId = ? ORDER BY timestamp DESC LIMIT 10',
    [userId]
  );
}

export { initDB, saveResult, getTop10, getUserResults };
