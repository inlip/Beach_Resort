import { mkdirSync } from 'fs';
import path from 'path';
import { DatabaseSync } from 'node:sqlite';

const dataDirectory = path.join(process.cwd(), 'data');
const databasePath = path.join(dataDirectory, 'resort.db');

function createDatabase() {
  mkdirSync(dataDirectory, { recursive: true });

  const database = new DatabaseSync(databasePath);
  database.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      guest_name TEXT NOT NULL,
      guest_phone TEXT NOT NULL,
      guest_email TEXT NOT NULL,
      check_in TEXT NOT NULL,
      check_out TEXT NOT NULL,
      adults INTEGER NOT NULL CHECK (adults BETWEEN 1 AND 6),
      children INTEGER NOT NULL CHECK (children BETWEEN 0 AND 4),
      room TEXT NOT NULL,
      nights INTEGER NOT NULL CHECK (nights > 0),
      requests TEXT NOT NULL DEFAULT '',
      total_inr INTEGER NOT NULL CHECK (total_inr >= 0),
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS bookings_created_at_idx
      ON bookings (created_at DESC);
    CREATE INDEX IF NOT EXISTS bookings_guest_email_idx
      ON bookings (guest_email);
  `);

  return database;
}

type DatabaseGlobal = typeof globalThis & {
  __azureaDatabase?: DatabaseSync;
};

const databaseGlobal = globalThis as DatabaseGlobal;

export const db =
  databaseGlobal.__azureaDatabase ?? createDatabase();

if (process.env.NODE_ENV !== 'production') {
  databaseGlobal.__azureaDatabase = db;
}
