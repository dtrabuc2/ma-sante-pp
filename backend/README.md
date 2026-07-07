# 🏥 Ma Santé ++ - Backend

Backend Express.js avec authentification JWT, base de données SQLite et architecture MVC.

## 📋 Structure du Projet

```
backend/
├── config/
│   ├── database.js      # Configuration SQLite
│   └── initDb.js        # Initialisation des tables
├── models/
│   └── User.js          # Modèle User (CRUD)
├── controllers/
│   └── authController.js # Logique d'authentification
├── routes/
│   └── auth.js          # Routes d'authentification
├── middleware/
│   └── auth.js          # Middleware de vérification JWT
├── db/
│   └── santé.db         # Base de données SQLite (généré)
├── server.js            # Point d'entrée
├── package.json
├── .env
└── .gitignore
```

## 🚀 Démarrage

### 1. Installation des dépendances
```bash
cd backend
npm install
```

### 2. Configuration
Le fichier `.env` contient:
- `PORT=5000` - Port du serveur
- `JWT_SECRET=your_super_secret_jwt_key_change_in_production_env` - Clé secrète JWT
- `NODE_ENV=development` - Environnement

### 3. Démarrage du serveur
```bash
# Développement (avec nodemon)
npm run dev

# Production
npm start
```

Le serveur démarre sur `http://localhost:5000`

## 🔐 Endpoints d'Authentification

### Inscription
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}
```

**Réponse (201):**
```json
{
  "message": "Inscription réussie",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

### Connexion
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Réponse (200):**
```json
{
  "message": "Connexion réussie",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Récupérer le Profil
```http
GET /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Réponse (200):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "bloodType": "O+",
    "allergies": "Pénicilline",
    "chronicDiseases": "Diabète",
    "notes": "Notes personnelles",
    "createdAt": "2025-01-01T12:00:00.000Z"
  }
}
```

### Mettre à Jour le Profil
```http
PUT /api/auth/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "bloodType": "O+",
  "allergies": "Pénicilline",
  "chronicDiseases": "Diabète",
  "notes": "Notes mises à jour"
}
```

## 🗄️ Base de Données

### Tables créées automatiquement

**users**
- id (PRIMARY KEY)
- email (UNIQUE)
- password (bcrypted)
- firstName, lastName, dateOfBirth, bloodType, allergies, chronicDiseases, notes
- createdAt, updatedAt

**appointments** (futur)
- Liée à users via userId

**documents** (futur)
- Liée à users via userId

**vitals** (futur)
- Liée à users via userId

## 🔑 Authentification JWT

Tous les endpoints protégés nécessitent un token JWT dans le header:
```
Authorization: Bearer <token>
```

Le token expire après 24h. Les tokens expirés retournent une erreur 403.

## 🛡️ Sécurité

- ✅ Mots de passe hashés avec **bcryptjs** (10 salts)
- ✅ JWT pour l'authentification stateless
- ✅ CORS configuré pour le frontend (localhost:5173)
- ✅ Validation des entrées
- ✅ Gestion des erreurs appropriée

## 🔄 Flux d'Authentification

```
1. Utilisateur s'inscrit (register)
   → Mot de passe hashé
   → Utilisateur créé en BD
   → JWT généré et renvoyé

2. Utilisateur se connecte (login)
   → Email trouvé en BD
   → Mot de passe vérifié
   → JWT généré et renvoyé

3. Requêtes protégées
   → Token vérifié via middleware
   → userId extrait du token
   → Données utilisateur retournées
```

## 📦 Dépendances

- **express** - Framework web
- **sqlite3** - Base de données
- **bcryptjs** - Hashage des mots de passe
- **jsonwebtoken** - Génération/vérification JWT
- **cors** - Gestion CORS
- **dotenv** - Variables d'environnement
- **nodemon** (dev) - Auto-restart en développement

## 🐛 Troubleshooting

### Erreur: "Cannot find module 'sqlite3'"
```bash
npm install sqlite3
```

### Erreur: "EADDRINUSE: address already in use :::5000"
Un serveur utilise déjà le port 5000. Changez le PORT dans .env ou arrêtez le processus.

### Token expiré
Reconnectez-vous pour obtenir un nouveau token.

## 🚧 Prochaines Étapes

- [ ] Routes pour appointments (CRUD)
- [ ] Routes pour documents (CRUD)
- [ ] Routes pour vitals (CRUD)
- [ ] Gestion complète des fichiers
- [ ] Logs des activités
- [ ] API de recherche

---

**Version:** 1.0.0  
**Développé pour:** Ma santé ++  
**Framework:** Express.js + SQLite + JWT
