# ⚡ Commandes Essentielles

## 🚀 Démarrer l'Application

### Option 1: Script Automatique (Recommandé)
```bash
# Linux/Mac
bash start.sh

# Windows
start.bat
```

### Option 2: Manuel (2 Terminaux)
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
npm run dev
```

---

## 🌐 Accès

| Composant | URL |
|-----------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| Health Check | http://localhost:5000/api/health |

---

## 📱 Test Rapide

1. Ouvrir http://localhost:5173
2. Cliquer "S'inscrire"
3. Email: `test@example.com` | Mot de passe: `password123`
4. Cliquer "S'inscrire"
5. ✅ Devrait afficher le dashboard

---

## 🔧 Commandes Utiles

### Frontend
```bash
npm run dev       # Démarrer dev
npm run build     # Build production
npm run preview   # Prévisualiser build
```

### Backend
```bash
npm run dev       # Avec auto-restart
npm start         # Production
npm install       # Installer dépendances
```

### Base de Données
```bash
sqlite3 backend/db/santé.db
.tables           # Voir tables
SELECT * FROM users;  # Voir users
.exit             # Quitter
```

---

## 🧪 Tests API

### Vérifier le backend
```bash
curl http://localhost:5000/api/health
```

### Inscription
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Connexion
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@test.com",
    "password": "password123"
  }'
```

---

## 📂 Fichiers Clés

| Fichier | Rôle |
|---------|------|
| `backend/server.js` | Serveur Express |
| `backend/config/initDb.js` | Création des tables |
| `backend/models/User.js` | Modèle User |
| `backend/controllers/authController.js` | Logique auth |
| `src/App.jsx` | Routing + Auth |
| `src/hooks/useAuth.js` | Hook auth React |
| `src/pages/Login.jsx` | Page login |

---

## 🐛 Troubleshooting Rapide

| Problème | Solution |
|----------|----------|
| Backend ne démarre | `lsof -i :5000` → `kill -9 <PID>` |
| CORS error | Vérifier localhost:5173 et :5000 |
| Token expiré | `localStorage.clear()` → Se reconnecter |
| BD corrompue | `rm backend/db/santé.db` → Relancer |

---

## 📚 Documentation

- **[GETTING_STARTED.md](GETTING_STARTED.md)** ← Commencer ici
- **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)** - Complet
- **[BACKEND_SETUP.md](BACKEND_SETUP.md)** - Backend
- **[TECHNICAL_SUMMARY.md](TECHNICAL_SUMMARY.md)** - Technique

---

**Version:** 1.0.0  
**Status:** ✅ Prêt à utiliser
