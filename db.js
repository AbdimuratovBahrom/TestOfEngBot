import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'results.db');

export const initDB = async () => {
  return open({
    filename: dbPath,
    driver: sqlite3.Database
  });
};
