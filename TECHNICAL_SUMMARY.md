# 🔧 Résumé Technique - Backend Express + SQLite

## 📝 Fichiers Créés

### Backend
```
backend/
├── package.json              # Dépendances (express, sqlite3, bcryptjs, jwt, cors)
├── server.js                 # Point d'entrée Express
├── .env                      # Configuration (PORT, JWT_SECRET, NODE_ENV)
├── .gitignore                # Exclusions git
│
├── config/
│   ├── database.js           # Connexion SQLite
│   └── initDb.js             # Création des 4 tables
│
├── models/
│   └── User.js               # Modèle User avec CRUD
│       ├── create(email, password)
│       ├── findByEmail(email)
│       ├── findById(id)
│       ├── verifyPassword(plain, hashed)
│       └── updateProfile(userId, userData)
│
├── controllers/
│   └── authController.js     # Logique authentification
│       ├── register()        # Inscription
│       ├── login()           # Connexion
│       ├── getProfile()      # Récupérer profil
│       └── updateProfile()   # Mettre à jour profil
│
├── routes/
│   └── auth.js               # Routes /api/auth/*
│       ├── POST   /register
│       ├── POST   /login
│       ├── GET    /profile   (protégé)
│       └── PUT    /profile   (protégé)
│
├── middleware/
│   └── auth.js               # Vérification JWT
│       └── verifyToken()     # Middleware Express
│
├── db/
│   └── santé.db              # Base de données SQLite (généré)
│
└── README.md                 # Documentation backend
```

### Frontend
```
src/
├── pages/
│   ├── Login.jsx             # ✨ NEW - Formulaire connexion
│   └── Register.jsx          # ✨ NEW - Formulaire inscription
│
├── hooks/
│   └── useAuth.js            # ✨ NEW - Hook d'authentification
│                             # - login(email, password)
│                             # - register(email, password, confirm)
│                             # - logout()
│                             # - getAuthHeaders()
│                             # - user, token, isAuthenticated, loading, error
│
├── services/
│   └── api.js                # ✨ NEW - Service API centralisé
│                             # - apiCall(endpoint, options)
│                             # - appointmentAPI
│                             # - documentAPI
│                             # - vitalAPI
│
├── styles/
│   └── Auth.css              # ✨ NEW - Styles login/register
│
├── App.jsx                   # ✅ UPDATED
│                             # - Routes protégées
│                             # - Navbar conditionnelle
│                             # - Dropdown utilisateur
│                             # - Logout button
│
└── hooks/index.js            # ✅ UPDATED - Export useAuth
```

### Documentation
```
├── GETTING_STARTED.md        # Guide de démarrage (ce que tu lis)
├── SETUP_COMPLETE.md         # Récapitulatif final et architecture
├── BACKEND_SETUP.md          # Guide détaillé backend + endpoints
│
├── start.sh                  # Script lancement Linux/Mac
└── start.bat                 # Script lancement Windows
```

---

## 🔌 Endpoints API Implémentés

### Public (sans authentification)

```http
POST /api/auth/register
{
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
Response: { message, token, user }
Status: 201
```

```http
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
Response: { message, token, user }
Status: 200
```

```http
GET /api/health
Response: { message: "✅ Backend est opérationnel" }
Status: 200
```

### Protégés (JWT requis)

```http
GET /api/auth/profile
Header: Authorization: Bearer <token>
Response: { user: {...} }
Status: 200
```

```http
PUT /api/auth/profile
Header: Authorization: Bearer <token>
Body: { firstName, lastName, dateOfBirth, bloodType, allergies, ... }
Response: { message, user }
Status: 200
```

---

## 🔐 Flux de Sécurité

### 1. Inscription
```
Frontend sends email + password
    ↓
Backend validates input
    ↓
Backend checks email not exists
    ↓
Backend hashes password (bcryptjs 10 salts)
    ↓
Backend creates user in SQLite
    ↓
Backend generates JWT (valid 24h)
    ↓
Response: token + user data
    ↓
Frontend saves token to localStorage
```

### 2. Connexion
```
Frontend sends email + password
    ↓
Backend finds user by email
    ↓
Backend verifies password (bcryptjs compare)
    ↓
Backend generates JWT (valid 24h)
    ↓
Response: token + user data
    ↓
Frontend saves token to localStorage
```

### 3. Requête Protégée
```
Frontend adds header: Authorization: Bearer <token>
    ↓
Backend middleware verifyToken()
    ↓
Backend extracts userId from JWT
    ↓
Backend processes request with userId
    ↓
Response: protected data
```

### 4. Token Expiré
```
Frontend requests with old token
    ↓
Backend JWT.verify() fails
    ↓
Backend returns 403 Forbidden
    ↓
Frontend catches error
    ↓
Frontend clears localStorage
    ↓
Frontend redirects to /login
```

---

## 🗄️ Structure Base de Données

### Table: users
```sql
CREATE TABLE users (
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
);
```

### Table: appointments (pré-créée, non utilisée)
```sql
CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  doctor TEXT NOT NULL,
  reason TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

### Table: documents (pré-créée, non utilisée)
```sql
CREATE TABLE documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  fileData BLOB,
  fileSize INTEGER,
  uploadDate DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
```

### Table: vitals (pré-créée, non utilisée)
```sql
CREATE TABLE vitals (
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
);
```

---

## 🎯 Flux React

### ProtectedRoute Component
```javascript
function ProtectedRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" />;
}
```

### useAuth Hook
```javascript
const {
  user,                    // { id, email, firstName, lastName }
  token,                   // JWT string
  isAuthenticated,         // boolean
  loading,                 // boolean
  error,                   // string | null
  register,                // async (email, password, confirm)
  login,                   // async (email, password)
  logout,                  // () => void
  getAuthHeaders           // () => { Authorization: 'Bearer ...' }
} = useAuth();
```

### App.jsx Routes
```javascript
<Routes>
  {/* Public */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  {/* Protected */}
  <Route path="/" element={<ProtectedRoute element={<Dashboard />} ... />} />
  <Route path="/planning" element={<ProtectedRoute element={<Planning />} ... />} />
  <Route path="/documents" element={<ProtectedRoute element={<Documents />} ... />} />
  <Route path="/profile" element={<ProtectedRoute element={<Profile />} ... />} />
  <Route path="/vitals" element={<ProtectedRoute element={<Vitals />} ... />} />

  {/* Fallback */}
  <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
</Routes>
```

---

## 🛠️ Dépendances Installées

### Backend (npm install dans /backend)
```
├── express@4.18.2              # Framework web
├── sqlite3@5.1.7               # Database
├── bcryptjs@2.4.3              # Password hashing
├── jsonwebtoken@9.0.0          # JWT
├── cors@2.8.5                  # CORS handling
├── dotenv@16.0.3               # Env variables
└── nodemon@3.0.1 (dev)         # Auto-restart
```

### Frontend (package.json existant)
```
├── react@19.2.7
├── react-dom@19.2.7
├── react-router-dom@7.18.1
├── bootstrap@5.3.3
└── vite@5.4.11
```

---

## 🚀 Lancement

### Script Automatique
```bash
# Linux/Mac
bash start.sh

# Windows
start.bat
```

### Manuel (2 terminaux)

**Terminal 1:**
```bash
cd backend
npm run dev
# Serveur: http://localhost:5000
```

**Terminal 2:**
```bash
cd .. (retour au root)
npm run dev
# Serveur: http://localhost:5173
```

---

## ✅ Vérification

### Backend fonctionne?
```bash
curl http://localhost:5000/api/health
# Response: { "message": "✅ Backend est opérationnel" }
```

### Inscription fonctionne?
1. Ouvrir http://localhost:5173
2. Cliquer "S'inscrire"
3. Remplir formulaire
4. Vérifier redirection au dashboard

### Token sauvegardé?
```javascript
// DevTools Console
localStorage.getItem('token')    // Voir le JWT
localStorage.getItem('user')     // Voir les données utilisateur
```

### Base de données créée?
```bash
ls -la backend/db/santé.db       # Fichier devrait exister
```

---

## 🔄 Prochaines Étapes

### Court terme
- [ ] Routes GET /api/appointments
- [ ] Routes POST /api/appointments
- [ ] Routes DELETE /api/appointments/:id
- [ ] Même pour documents et vitals

### Intégration Frontend
- [ ] Modifier Planning.jsx pour appeler backend
- [ ] Modifier Documents.jsx pour appeler backend
- [ ] Modifier Vitals.jsx pour appeler backend
- [ ] Mettre à jour Dashboard.jsx

### Sécurité
- [ ] Refresh tokens (rotation)
- [ ] Rate limiting
- [ ] HttpOnly cookies (au lieu de localStorage)
- [ ] HTTPS en production

---

## 📚 Fichiers Importants à Consulter

1. **backend/server.js** - Point d'entrée du serveur
2. **backend/config/initDb.js** - Création des tables
3. **backend/models/User.js** - Logique User (CRUD)
4. **backend/controllers/authController.js** - Logique métier
5. **src/hooks/useAuth.js** - Hook d'authentification React
6. **src/App.jsx** - Routing et auth guard
7. **backend/.env** - Configuration (JWT_SECRET, PORT)

---

## 🎓 Concepts Clés

1. **JWT (JSON Web Token)** - Token sans état qui identifie l'utilisateur
2. **Bcryptjs** - Hashage sécurisé des mots de passe avec salts
3. **CORS** - Partage de ressources entre domaines (React → Express)
4. **SQLite** - Base de données fichier pour développement local
5. **Middleware** - Fonction qui traite les requêtes avant les routes
6. **MVC** - Model, View, Controller (architecture)

---

**Status:** ✅ PRODUCTION READY (pour développement local)  
**Version:** 1.0.0  
**Architecture:** React + Express + SQLite + JWT + Bcrypt
