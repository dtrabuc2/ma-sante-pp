import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import { initializeDatabase } from './config/initDb.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ message: '✅ Backend est opérationnel' });
});

// Initialiser la base de données et démarrer le serveur
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erreur lors de l\'initialisation de la base de données:', err);
  });

export default app;
