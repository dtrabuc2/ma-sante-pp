# 📚 Ma Santé ++ - Guide de Démarrage

Bienvenue! Ton application healthcare complète avec **React + Express + SQLite** est prête! 🎉

---

## 🎯 Par Où Commencer?

### **1️⃣ Première Fois - Configuration (5 min)**

Si c'est la première fois que tu lances l'app:

```bash
# (Les dépendances sont déjà installées)
# Just launch!

# Linux/Mac:
bash start.sh

# Windows:
start.bat
```

### **2️⃣ Lancer l'Application (2 min)**

**Option A - Automatique (Recommandé):**
```bash
bash start.sh        # Linux/Mac
# ou
start.bat            # Windows
```

**Option B - Manuel (2 terminaux):**

Terminal 1:
```bash
cd backend && npm run dev
```

Terminal 2:
```bash
npm run dev
```

### **3️⃣ Tester l'Application (3 min)**

1. Ouvrir http://localhost:5173
2. Cliquer "S'inscrire"
3. Remplir le formulaire:
   - Email: `test@example.com`
   - Mot de passe: `password123` (min 6 chars)
   - Confirmer: `password123`
4. Vérifier:
   - ✅ Redirection au Dashboard
   - ✅ Email visible dans la navbar
   - ✅ Bouton "Déconnexion" visible

---

## 📁 Structure du Projet

```
ma-santé-pp/
├── src/                    # 🎨 Frontend React
│   ├── pages/
│   │   ├── Login.jsx       # ✨ Nouvelle page
│   │   ├── Register.jsx    # ✨ Nouvelle page
│   │   ├── Dashboard.jsx
│   │   ├── Planning.jsx
│   │   ├── Documents.jsx
│   │   ├── Profile.jsx
│   │   └── Vitals.jsx
│   ├── hooks/
│   │   ├── useAuth.js      # ✨ Nouveau hook
│   │   └── ...autres hooks
│   ├── services/
│   │   └── api.js          # ✨ Nouveau service API
│   ├── styles/
│   │   └── Auth.css        # ✨ Nouveau style
│   └── App.jsx             # ✅ Mis à jour
│
├── backend/                # 🔌 Backend Express
│   ├── server.js           # Point d'entrée
│   ├── config/
│   │   ├── database.js
│   │   └── initDb.js
│   ├── models/
│   │   └── User.js
│   ├── controllers/
│   │   └── authController.js
│   ├── routes/
│   │   └── auth.js
│   ├── middleware/
│   │   └── auth.js
│   ├── db/
│   │   └── santé.db        # Base de données SQLite
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── BACKEND_SETUP.md        # 📖 Guide complet backend
├── SETUP_COMPLETE.md       # 📖 Récapitulatif final
├── start.sh                # 🚀 Script launcher
└── start.bat               # 🚀 Script launcher Windows
```

---

## ✨ Nouvelles Fonctionnalités

### 🔐 **Authentification**
- ✅ Inscription avec validation
- ✅ Connexion sécurisée
- ✅ JWT tokens (24h)
- ✅ Mots de passe hashés (bcrypt)
- ✅ Routes protégées

### 🎯 **Pages Nouvelles**
- `/login` - Connexion
- `/register` - Inscription

### 🏗️ **Architecture Complète**
- ✅ **MVC Backend** (Models, Controllers, Routes)
- ✅ **SQLite Database** (4 tables pré-créées)
- ✅ **JWT Middleware** (Authentification)
- ✅ **CORS Configured** (React ↔ Express)

---

## 🔑 Points Clés

| Aspect | Frontend | Backend |
|--------|----------|---------|
| **Framework** | React 19 | Express 4 |
| **Port** | 5173 | 5000 |
| **Data** | localStorage | SQLite |
| **Auth** | useAuth hook | JWT + Bcrypt |
| **API** | fetch + api.js | /api/auth/* |

---

## 📊 Flux Utilisateur

```
┌─────────────────────────────────────────┐
│  1. Arrive sur l'app                    │
│     ↓                                    │
│  2. Pas de token?                       │
│     → Redirection /login                │
│     ↓                                    │
│  3. Cliquer "S'inscrire"                │
│     → Remplir email + mdp              │
│     ↓                                    │
│  4. Backend valide                      │
│     → Hash password                     │
│     → Crée user en BD                   │
│     → Retourne JWT                      │
│     ↓                                    │
│  5. Frontend sauve JWT                  │
│     → localStorage.setItem('token')     │
│     ↓                                    │
│  6. Redirection /                       │
│     → Dashboard affiché                 │
│     ↓                                    │
│  7. Token valide?                       │
│     → Toutes les pages accessibles      │
│     ↓                                    │
│  8. Cliquer "Déconnexion"              │
│     → Token supprimé                    │
│     → Redirection /login                │
└─────────────────────────────────────────┘
```

---

## 🧪 Commandes Utiles

### Frontend
```bash
npm run dev          # Démarrer Vite
npm run build        # Build production
npm run preview      # Prévisualiser build
```

### Backend
```bash
npm run dev          # Démarrer avec nodemon (auto-restart)
npm start            # Démarrer production
npm install          # Installer dépendances
```

### Database
```bash
# Inspecter la BD SQLite
sqlite3 backend/db/santé.db

# Commandes SQLite:
.tables              # Voir les tables
SELECT * FROM users; # Voir les utilisateurs
.schema users        # Voir la structure
.exit                # Quitter
```

---

## 🐛 Troubleshooting

### ❌ "Cannot connect to backend"
```bash
# Vérifier que backend démarre
cd backend && npm run dev

# Vérifier le port 5000
lsof -i :5000
```

### ❌ "CORS error"
```bash
# Vérifier que CORS est activé dans backend/server.js
# Vérifier que frontend est sur localhost:5173
```

### ❌ "Module not found"
```bash
cd backend && npm install
```

### ❌ "Port already in use"
```bash
# Tuer le processus
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Ou changer le port dans .env
```

---

## 📖 Documentation

**À lire en priorité:**
1. **SETUP_COMPLETE.md** ← Résumé final et architecture
2. **BACKEND_SETUP.md** ← Guide détaillé backend
3. **backend/README.md** ← Endpoints API

**À consulter pour les détails:**
- [backend/config/database.js](backend/config/database.js) - Config SQLite
- [backend/models/User.js](backend/models/User.js) - Modèle User
- [src/hooks/useAuth.js](src/hooks/useAuth.js) - Hook authentification
- [src/App.jsx](src/App.jsx) - Routing + Auth guard

---

## 🎓 Concepts Appris

### Frontend
- ✅ Routes protégées avec ProtectedRoute
- ✅ Custom hooks pour l'authentification
- ✅ Service API centralisé
- ✅ localStorage pour la persistance JWT

### Backend
- ✅ Architecture MVC (Models, Controllers, Routes)
- ✅ Middleware JWT pour l'authentification
- ✅ Base de données SQLite avec relations
- ✅ Hashage de mots de passe avec bcrypt
- ✅ Gestion d'erreurs centralisée

### Fullstack
- ✅ Communication HTTP entre React et Express
- ✅ CORS et communication sécurisée
- ✅ JWT stateless authentication
- ✅ Persistence de données en BD

---

## 🚀 Prochaines Étapes

### Court terme (MVP 1 complet)
- [ ] Routes backend pour appointments/documents/vitals
- [ ] Intégrer backend au frontend (Planning, Documents, Vitals)
- [ ] Tests complets

### Moyen terme (MVP 2)
- [ ] Authentification avancée (refresh tokens)
- [ ] Sécurité renforcée
- [ ] Pagination et search

### Long terme (MVP 3+)
- [ ] Graphiques pour les vitals
- [ ] Synchronisation multi-appareils
- [ ] Export/Import données
- [ ] API Python pour IA

---

## ✅ Status

| Élément | Status |
|---------|--------|
| Frontend React | ✅ Complet |
| Authentification | ✅ Fonctionnelle |
| Backend Express | ✅ Fonctionnel |
| Base de données SQLite | ✅ Opérationnelle |
| Routes protégées | ✅ Implémentées |
| JWT + Bcrypt | ✅ Sécurisé |
| CORS | ✅ Configuré |
| Scripts de lancement | ✅ Prêts |

---

## 🎯 Rappel

Pour démarrer rapidement:

```bash
# Linux/Mac:
bash start.sh

# Windows:
start.bat
```

Puis ouvrir: **http://localhost:5173**

---

Bonne codification! 🚀  
N'hésite pas à consulter les fichiers README pour plus de détails.
