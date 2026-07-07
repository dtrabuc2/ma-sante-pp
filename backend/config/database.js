import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, '../db/santé.db');

// Créer et connecter la base de données
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Erreur lors de la connexion à la base de données:', err);
  } else {
    console.log('✅ Connecté à la base de données SQLite');
  }
});

// Activer les clés étrangères
db.run('PRAGMA foreign_keys = ON');

export default db;
