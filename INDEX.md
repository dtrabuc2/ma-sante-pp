# 📚 INDEX - DOCUMENTATION MA SANTÉ ++

## 🎯 OÙ COMMENCER?

### **Pour Démarrer Immédiatement:**
```bash
bash start.sh      # Linux/Mac
# ou
start.bat          # Windows
```
Puis ouvrir: **http://localhost:5173**

---

## 📖 GUIDE DE DOCUMENTATION

### 🟢 **ESSENTIELS** (À Lire D'abord)

1. **[GETTING_STARTED.md](GETTING_STARTED.md)**
   - ⏱️ Temps: 5 min
   - 📝 Contenu: Guide de démarrage, structure, commandes
   - 🎯 Pour: Première fois sur le projet

2. **[COMMANDS.md](COMMANDS.md)**
   - ⏱️ Temps: 2 min
   - 📝 Contenu: Commandes essentielles et tests rapides
   - 🎯 Pour: Lancer et tester rapidement

### 🟡 **RECOMMANDÉS** (Pour Comprendre)

3. **[SETUP_COMPLETE.md](SETUP_COMPLETE.md)**
   - ⏱️ Temps: 15 min
   - 📝 Contenu: Récapitulatif complet, architecture, flux
   - 🎯 Pour: Vue d'ensemble du projet

4. **[SUMMARY.md](SUMMARY.md)**
   - ⏱️ Temps: 10 min
   - 📝 Contenu: Résumé visuel, statistiques, checklist
   - 🎯 Pour: Impression générale

### 🔵 **DÉTAILLÉS** (Pour Approfondir)

5. **[BACKEND_SETUP.md](BACKEND_SETUP.md)**
   - ⏱️ Temps: 20 min
   - 📝 Contenu: Guide backend, endpoints, troubleshooting
   - 🎯 Pour: Comprendre le backend Express

6. **[TECHNICAL_SUMMARY.md](TECHNICAL_SUMMARY.md)**
   - ⏱️ Temps: 20 min
   - 📝 Contenu: Résumé technique, code, architecture DB
   - 🎯 Pour: Développeurs expérimentés

7. **[backend/README.md](backend/README.md)**
   - ⏱️ Temps: 10 min
   - 📝 Contenu: Endpoints API, base de données
   - 🎯 Pour: Documentation API

---

## 🗺️ PARCOURS PAR BESOIN

### "Je veux juste lancer l'app"
```
1. Lire: GETTING_STARTED.md (5 min)
2. Exécuter: bash start.sh
3. Ouvrir: http://localhost:5173
✅ Terminé!
```

### "Je veux comprendre comment ça marche"
```
1. Lire: SUMMARY.md (10 min)
2. Lire: SETUP_COMPLETE.md (15 min)
3. Consulter: BACKEND_SETUP.md (20 min)
✅ Vous êtes expert!
```

### "Je veux modifier le code"
```
1. Lire: TECHNICAL_SUMMARY.md (20 min)
2. Consulter: backend/README.md (10 min)
3. Explorer: Code source
4. Lancer avec: npm run dev
✅ Prêt à coder!
```

### "J'ai une erreur"
```
1. Consulter: COMMANDS.md (Troubleshooting)
2. Consulter: BACKEND_SETUP.md (Troubleshooting)
3. Vérifier: terminal pour messages d'erreur
4. Tester: curl http://localhost:5000/api/health
✅ Problème résolu!
```

---

## 📂 STRUCTURE DES FICHIERS

```
ma-santé-pp/
│
├── 📖 DOCUMENTATION
│   ├── README.md                 ← Guide principal
│   ├── GETTING_STARTED.md        ← Commencer ici ⭐
│   ├── SETUP_COMPLETE.md         ← Vue complète
│   ├── BACKEND_SETUP.md          ← Backend détaillé
│   ├── TECHNICAL_SUMMARY.md      ← Technique
│   ├── COMMANDS.md               ← Commandes
│   ├── SUMMARY.md                ← Résumé visuel
│   └── INDEX.md                  ← Ce fichier
│
├── 🚀 SCRIPTS
│   ├── start.sh                  ← Lancer (Linux/Mac)
│   └── start.bat                 ← Lancer (Windows)
│
├── 🎨 FRONTEND (src/)
│   ├── pages/
│   │   ├── Login.jsx             ← Page de connexion
│   │   ├── Register.jsx          ← Page d'inscription
│   │   └── ...autres pages
│   ├── hooks/
│   │   ├── useAuth.js            ← Hook d'authentification
│   │   └── ...autres hooks
│   ├── services/
│   │   └── api.js                ← Service API
│   └── App.jsx                   ← Routing + Auth
│
├── 🔌 BACKEND (backend/)
│   ├── server.js                 ← Serveur Express
│   ├── config/
│   │   ├── database.js           ← SQLite config
│   │   └── initDb.js             ← Création tables
│   ├── models/
│   │   └── User.js               ← Modèle User
│   ├── controllers/
│   │   └── authController.js     ← Logique auth
│   ├── routes/
│   │   └── auth.js               ← Routes API
│   ├── middleware/
│   │   └── auth.js               ← Middleware JWT
│   ├── db/
│   │   └── santé.db              ← Base de données
│   ├── package.json
│   ├── .env
│   ├── .gitignore
│   └── README.md                 ← Endpoints API
│
└── 📦 CONFIGURATION
    ├── package.json              ← Dépendances frontend
    ├── vite.config.js
    └── ...autres config
```

---

## ⚡ COMMANDES RAPIDES

### Démarrage
```bash
bash start.sh                # Démarrer tout (Linux/Mac)
start.bat                    # Démarrer tout (Windows)
```

### Frontend
```bash
npm run dev                  # Démarrage développement
npm run build                # Build production
```

### Backend
```bash
cd backend && npm run dev    # Avec auto-restart
cd backend && npm start      # Production
cd backend && npm install    # Installer dépendances
```

### Database
```bash
sqlite3 backend/db/santé.db  # Accéder à la DB
.tables                      # Voir les tables
.exit                        # Quitter
```

### Tests
```bash
curl http://localhost:5000/api/health  # Vérifier backend
```

---

## 🎯 ENDPOINTS API

### Publics (Pas de token requis)
```
POST /api/auth/register    → Inscription
POST /api/auth/login       → Connexion
GET  /api/health           → Santé du serveur
```

### Protégés (JWT requis)
```
GET  /api/auth/profile     → Récupérer profil
PUT  /api/auth/profile     → Mettre à jour profil
```

---

## 📊 INFORMATIONS UTILES

### Ports
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **Database:** backend/db/santé.db

### Identifiants Test
- Email: `test@example.com`
- Mot de passe: `password123`

### Configuration
- **JWT_SECRET:** backend/.env
- **PORT:** backend/.env (par défaut 5000)
- **DATABASE:** backend/db/santé.db

---

## ✅ CHECKLIST RAPIDE

- [ ] Lire GETTING_STARTED.md
- [ ] Exécuter bash start.sh
- [ ] Ouvrir http://localhost:5173
- [ ] Créer un compte
- [ ] Se connecter
- [ ] Consulter le profil
- [ ] Tester la déconnexion
- [ ] Vérifier que tout fonctionne

---

## 🆘 AIDE RAPIDE

| Problème | Solution | Document |
|----------|----------|----------|
| "Je ne sais pas par où commencer" | Lire GETTING_STARTED.md | [Lien](GETTING_STARTED.md) |
| "Backend ne démarre pas" | Consulter BACKEND_SETUP.md (Troubleshooting) | [Lien](BACKEND_SETUP.md) |
| "Quelle commande utiliser?" | Consulter COMMANDS.md | [Lien](COMMANDS.md) |
| "Je veux comprendre l'architecture" | Lire SETUP_COMPLETE.md | [Lien](SETUP_COMPLETE.md) |
| "Je cherche un endpoint API" | Consulter backend/README.md | [Lien](backend/README.md) |

---

## 🎓 CONCEPTS CLÉ

### Authentification
- **JWT:** JSON Web Tokens (tokens sans état)
- **Bcrypt:** Hashage sécurisé des mots de passe
- **Token Expiration:** 24 heures

### Architecture
- **MVC:** Model, View, Controller
- **REST:** Representational State Transfer
- **CORS:** Cross-Origin Resource Sharing

### Database
- **SQLite:** Base de données fichier
- **Relations:** users ↔ appointments/documents/vitals
- **CRUD:** Create, Read, Update, Delete

---

## 🚀 PROCHAINES ÉTAPES

1. **Court terme:** Routes backend pour appointments/documents/vitals
2. **Moyen terme:** Intégrer backend au frontend
3. **Long terme:** Fonctionnalités avancées (refresh tokens, graphiques, etc.)

---

## 📞 QUESTIONS FRÉQUENTES

**Q: Comment démarrer l'application?**
A: `bash start.sh` (Linux/Mac) ou `start.bat` (Windows)

**Q: Où sont les documents?**
A: GETTING_STARTED.md pour commencer, SETUP_COMPLETE.md pour le complet

**Q: Où est la base de données?**
A: `backend/db/santé.db` (créée automatiquement)

**Q: Comment tester l'API?**
A: Voir COMMANDS.md (section Tests API)

**Q: Que signifie JWT?**
A: Voir TECHNICAL_SUMMARY.md (section Concepts Clé)

---

**Dernière Mise à Jour:** 2025-01-06  
**Version:** 1.0.0  
**Status:** ✅ Prêt à l'emploi

👉 **[Commencez par GETTING_STARTED.md →](GETTING_STARTED.md)**
