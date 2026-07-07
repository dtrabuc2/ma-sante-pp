import db from '../config/database.js';
import bcrypt from 'bcryptjs';

export class User {
  // Créer un nouvel utilisateur
  static create(email, password, userData = {}) {
    return new Promise((resolve, reject) => {
      const hashedPassword = bcrypt.hashSync(password, 10);

      db.run(
        `INSERT INTO users (
          email, password, firstName, lastName, 
          dateOfBirth, bloodType, allergies, chronicDiseases, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          email,
          hashedPassword,
          userData.firstName || '',
          userData.lastName || '',
          userData.dateOfBirth || '',
          userData.bloodType || '',
          userData.allergies || '',
          userData.chronicDiseases || '',
          userData.notes || ''
        ],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, email, ...userData });
          }
        }
      );
    });
  }

  // Trouver un utilisateur par email
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    });
  }

  // Trouver un utilisateur par ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT 
          id, email, firstName, lastName, dateOfBirth, 
          bloodType, allergies, chronicDiseases, notes, createdAt
        FROM users WHERE id = ?`,
        [id],
        (err, user) => {
          if (err) {
            reject(err);
          } else {
            resolve(user);
          }
        }
      );
    });
  }

  // Vérifier le mot de passe
  static verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  // Mettre à jour le profil utilisateur
  static updateProfile(userId, userData) {
    return new Promise((resolve, reject) => {
      const { firstName, lastName, dateOfBirth, bloodType, allergies, chronicDiseases, notes } = userData;

      db.run(
        `UPDATE users SET 
          firstName = ?, lastName = ?, dateOfBirth = ?, 
          bloodType = ?, allergies = ?, chronicDiseases = ?, 
          notes = ?, updatedAt = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [firstName, lastName, dateOfBirth, bloodType, allergies, chronicDiseases, notes, userId],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: userId, ...userData });
          }
        }
      );
    });
  }
}
