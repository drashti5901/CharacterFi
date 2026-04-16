/**
 * @file api/database.ts
 * @description SQLite database service using op-sqlite.
 * Handles all persistence for favourite characters.
 */

import { open } from '@op-engineering/op-sqlite';
import type { Character } from '../shared/types/api';

/** Database name stored on device */
const DB_NAME = 'rickandmorty.db';

/** Lazy-initialised DB connection */
let db: ReturnType<typeof open> | null = null;

/**
 * Get or create the SQLite database connection.
 * @returns Opened database instance
 */
function getDB(): ReturnType<typeof open> {
  if (!db) {
    db = open({ name: DB_NAME });
  }
  return db;
}

/**
 * Initialise the database and create tables if they don't exist.
 * Must be called once on app startup.
 */
export async function initDatabase(): Promise<void> {
  const database = getDB();
  await database.execute(`
    CREATE TABLE IF NOT EXISTS favourites (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT NOT NULL,
      species TEXT NOT NULL,
      type TEXT,
      gender TEXT NOT NULL,
      origin_name TEXT NOT NULL,
      origin_url TEXT NOT NULL,
      location_name TEXT NOT NULL,
      location_url TEXT NOT NULL,
      image TEXT NOT NULL,
      episode TEXT NOT NULL,
      url TEXT NOT NULL,
      created TEXT NOT NULL
    );
  `);
}

/**
 * Load all favourite characters from SQLite.
 * @returns Array of favourite Character objects
 */
export async function loadFavouritesFromDB(): Promise<Character[]> {
  const database = getDB();
  const result = await database.execute('SELECT * FROM favourites ORDER BY id ASC;');
  const rows = result.rows ?? [];

  return rows.map((row: Record<string, unknown>) => ({
    id: row.id as number,
    name: row.name as string,
    status: row.status as Character['status'],
    species: row.species as string,
    type: (row.type as string) || '',
    gender: row.gender as Character['gender'],
    origin: {
      name: row.origin_name as string,
      url: row.origin_url as string,
    },
    location: {
      name: row.location_name as string,
      url: row.location_url as string,
    },
    image: row.image as string,
    episode: JSON.parse(row.episode as string) as string[],
    url: row.url as string,
    created: row.created as string,
  }));
}

/**
 * Insert a character into the favourites table.
 * @param character - Character to save
 */
export async function addFavouriteToDB(character: Character): Promise<void> {
  const database = getDB();
  await database.execute(
    `INSERT OR REPLACE INTO favourites
      (id, name, status, species, type, gender,
       origin_name, origin_url, location_name, location_url,
       image, episode, url, created)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      character.id,
      character.name,
      character.status,
      character.species,
      character.type,
      character.gender,
      character.origin.name,
      character.origin.url,
      character.location.name,
      character.location.url,
      character.image,
      JSON.stringify(character.episode),
      character.url,
      character.created,
    ]
  );
}

/**
 * Remove a character from the favourites table by ID.
 * @param id - Character ID to remove
 */
export async function removeFavouriteFromDB(id: number): Promise<void> {
  const database = getDB();
  await database.execute('DELETE FROM favourites WHERE id = ?;', [id]);
}
