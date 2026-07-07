import db from './database.js';

export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    let tablesCreated = 0;
    const totalTables = 4;

    const checkAllTablesCreated = () => {
      tablesCreated++;
      if (tablesCreated === totalTables) {
        resolve();
      }
    };

    // Créer la table users
    db.run(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        firstName TEXT,
        lastName TEXT,
        dateOfBirth TEXT,
        bloodType TEXT,
        allergies TEXT,
        chronicDiseases TEXT,
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error('Erreur lors de la création de la table users:', err);
          reject(err);
        } else {
          console.log('✅ Table users prête');
          checkAllTablesCreated();
        }
      }
    );

    // Créer la table appointments
    db.run(
      `CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        doctor TEXT NOT NULL,
        reason TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )`,
      (err) => {
        if (err) {
          console.error('Erreur lors de la création de la table appointments:', err);
          reject(err);
        } else {
          console.log('✅ Table appointments prête');
          checkAllTablesCreated();
        }
      }
    );

    // Créer la table documents
    db.run(
      `CREATE TABLE IF NOT EXISTS documents (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT,
        fileData BLOB,
        fileSize INTEGER,
        uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )`,
      (err) => {
        if (err) {
          console.error('Erreur lors de la création de la table documents:', err);
          reject(err);
        } else {
          console.log('✅ Table documents prête');
          checkAllTablesCreated();
        }
      }
    );

    // Créer la table vitals
    db.run(
      `CREATE TABLE IF NOT EXISTS vitals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        date TEXT NOT NULL,
        weight REAL,
        height REAL,
        waistCircumference REAL,
        bloodPressure TEXT,
        temperature REAL,
        heartRate INTEGER,
        notes TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )`,
      (err) => {
        if (err) {
          console.error('Erreur lors de la création de la table vitals:', err);
          reject(err);
        } else {
          console.log('✅ Table vitals prête');
          checkAllTablesCreated();
        }
      }
    );
  });
};
