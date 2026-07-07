# 🚀 Guide Complet - Intégration React + Express + SQLite

## 📁 Structure du Projet

```
ma-santé-pp/
├── src/                          # Frontend React
│   ├── pages/
│   │   ├── Login.jsx            # ✨ Nouvelle: Page de connexion
│   │   ├── Register.jsx         # ✨ Nouvelle: Page d'inscription
│   │   ├── Dashboard.jsx
│   │   ├── Planning.jsx
│   │   ├── Documents.jsx
│   │   ├── Profile.jsx
│   │   └── Vitals.jsx
│   ├── hooks/
│   │   ├── useAuth.js           # ✨ Nouvelle: Hook d'authentification
│   │   └── ...
│   ├── services/
│   │   └── api.js               # ✨ Nouveau: Service API centralisé
│   ├── styles/
│   │   └── Auth.css             # ✨ Nouveau: Styles d'authentification
│   ├── App.jsx                  # ✅ Mis à jour: Routes protégées + navbar
│   └── ...
├── backend/                      # ✨ Nouveau: Backend Express
│   ├── config/
│   │   ├── database.js          # Configuration SQLite
│   │   └── initDb.js            # Création des tables
│   ├── controllers/
│   │   └── authController.js    # Logique authentification
│   ├── models/
│   │   └── User.js              # Modèle User (CRUD)
│   ├── routes/
│   │   └── auth.js              # Routes /api/auth/*
│   ├── middleware/
│   │   └── auth.js              # Middleware JWT
│   ├── db/                       # Base de données SQLite
│   ├── server.js                # Point d'entrée
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   └── README.md
├── package.json
└── vite.config.js
```

---

## ⚙️ Installation & Configuration

### Étape 1: Frontend - Dépendances React (déjà installées)
```bash
cd ma-santé-pp
npm install
```

### Étape 2: Backend - Installer les dépendances Node
```bash
cd backend
npm install
```

**Dépendances installées:**
- express (serveur web)
- sqlite3 (base de données)
- bcryptjs (hashage mots de passe)
- jsonwebtoken (JWT)
- cors (Cross-Origin requests)
- dotenv (variables d'env)
- nodemon (développement)

---

## 🎯 Lancement du Projet

### Terminal 1: Frontend React
```bash
cd ma-santé-pp
npm run dev
# Serveur: http://localhost:5173
```

### Terminal 2: Backend Express
```bash
cd ma-santé-pp/backend
npm run dev
# Serveur: http://localhost:5000
```

### Vérifier que tout fonctionne:
```bash
# Test backend
curl http://localhost:5000/api/health
# Réponse: { "message": "✅ Backend est opérationnel" }
```

---

## 🔐 Flux d'Authentification

### 1. **Utilisateur arrive sur l'app**
   - Vérification du token dans localStorage
   - Si pas de token → Redirection vers `/login`
   - Si token valide → Affichage du dashboard

### 2. **Inscription** (`/register`)
   - Formulaire: email, mdp, confirmation
   - **Frontend** envoie: `POST /api/auth/register`
   - **Backend** valide et crée l'utilisateur
   - **Response** contient JWT token
   - Token sauvegardé dans localStorage
   - Redirection vers `/` (dashboard)

### 3. **Connexion** (`/login`)
   - Formulaire: email, mdp
   - **Frontend** envoie: `POST /api/auth/login`
   - **Backend** valide les identifiants
   - **Response** contient JWT token
   - Token sauvegardé dans localStorage
   - Redirection vers `/` (dashboard)

### 4. **Requêtes Protégées**
   - Frontend ajoute: `Authorization: Bearer <token>`
   - Backend vérifie le token
   - Si valide → Données retournées
   - Si expiré → Déconnexion automatique

### 5. **Déconnexion**
   - Clic sur "Déconnexion" (dropdown profil)
   - Token supprimé de localStorage
   - Redirection vers `/login`

---

## 🧪 Tests Manuels

### Test 1: Vérifier que le backend démarre
```bash
cd backend
npm run dev

# Vérifier la réponse
curl http://localhost:5000/api/health
# { "message": "✅ Backend est opérationnel" }
```

### Test 2: Inscription
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'

# Réponse attendue:
# {
#   "message": "Inscription réussie",
#   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#   "user": { "id": 1, "email": "test@example.com" }
# }
```

### Test 3: Connexion
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Réponse attendue: token JWT
```

### Test 4: Requête protégée
```bash
# Récupérer le profil (remplacer TOKEN par le token reçu)
curl -X GET http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer TOKEN"
```

### Test 5: Via le Frontend
1. Ouvrir http://localhost:5173
2. Cliquer sur "S'inscrire"
3. Remplir: email, mdp (min 6 chars), confirmation
4. Vérifier redirection au dashboard
5. Voir l'email dans la navbar (dropdown)
6. Cliquer "Déconnexion"
7. Vérifier redirection au login

---

## 📊 Base de Données SQLite

### Fichier de base de données
```
backend/db/santé.db
```

### Inspecter la base de données
```bash
# Avec sqlite3 CLI
sqlite3 backend/db/santé.db

# Commandes utiles:
.tables                    # Voir toutes les tables
SELECT * FROM users;       # Voir tous les utilisateurs
.schema users              # Voir la structure de users
```

### Tables créées automatiquement:

**users** - Table d'authentification
```
id INTEGER PRIMARY KEY
email TEXT UNIQUE
password TEXT (bcrypted)
firstName, lastName, dateOfBirth
bloodType, allergies, chronicDiseases, notes
createdAt, updatedAt
```

**appointments, documents, vitals** (préparées pour évolution)
```
userId INTEGER (référence à users.id)
... données spécifiques
```

---

## 🔄 Prochaines Étapes

### Intégration des données utilisateur au backend
Les pages (Dashboard, Planning, Documents, Profile, Vitals) utilisent actuellement **localStorage**.
Pour les connecter au backend, créer des routes:

```javascript
// backend/routes/appointments.js
GET    /api/appointments          (récupérer les rendez-vous)
POST   /api/appointments          (créer un rendez-vous)
DELETE /api/appointments/:id      (supprimer)

// Même pattern pour documents, vitals, etc.
```

### Exemple - Modifier Planning.jsx:
```javascript
// Avant: useStorageData avec localStorage
const { formData, handleChange } = useForm({...});

// Après: apiCall avec backend
const [appointments, setAppointments] = useState([]);

useEffect(async () => {
  const data = await apiCall('/appointments');
  setAppointments(data.appointments);
}, []);

const handleAddAppointment = async (e) => {
  e.preventDefault();
  const result = await apiCall('/appointments', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  setAppointments([...appointments, result]);
};
```

---

## 🛡️ Sécurité

### ✅ Implémenté
- Mots de passe hashés avec bcryptjs
- JWT pour l'authentification stateless
- Token expire après 24h
- CORS configuré pour localhost:5173
- Validation des entrées

### 🚧 À faire (MVP 2)
- Refresh tokens (rotation)
- Rate limiting
- HTTPS en production
- Stockage sécurisé de JWT (HttpOnly cookies)
- Audit logs

---

## 📝 Variables d'Environnement

### Frontend (créer `.env.local` si nécessaire)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (`.env` - déjà créé)
```env
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_in_production_env
NODE_ENV=development
```

**IMPORTANT:** En production, changer `JWT_SECRET` !

---

## 🐛 Troubleshooting

### Erreur: "Cannot connect to backend"
- Vérifier que le backend démarre: `npm run dev` dans backend/
- Vérifier le port 5000: `lsof -i :5000`

### Erreur: "CORS error"
- Vérifier que CORS est configuré dans server.js
- Vérifier que frontend est sur localhost:5173

### Erreur: "Token invalide"
- Réinitialiser localStorage: DevTools → Application → Clear
- Réinscrire un nouvel utilisateur

### Erreur: "Cannot find module sqlite3"
```bash
cd backend
npm install sqlite3
```

### Base de données corrompue
```bash
# Supprimer la BD et relancer
rm backend/db/santé.db
npm run dev  # Recréation automatique
```

---

## 📚 Ressources

- [Express.js Docs](https://expressjs.com/)
- [SQLite3 Node Docs](https://github.com/mapbox/node-sqlite3)
- [JWT Docs](https://jwt.io/)
- [bcryptjs Docs](https://github.com/dcodeIO/bcrypt.js)
- [CORS Docs](https://expressjs.com/en/resources/middleware/cors.html)

---

**Status:** ✅ Prêt à utiliser  
**Version:** 1.0.0  
**Dernière mise à jour:** 2025-01-01
