#!/bin/bash

# Script pour démarrer le projet complet (Frontend + Backend)
# Usage: bash start.sh

echo "🚀 Démarrage de Ma Santé ++"
echo "================================"

# Déterminer le répertoire du script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Fonction pour afficher les instructions
show_instructions() {
  echo ""
  echo "================================"
  echo "✅ TOUS LES SERVEURS SONT LANCÉS"
  echo "================================"
  echo ""
  echo "🌐 Frontend React:"
  echo "   URL: http://localhost:5173"
  echo ""
  echo "🔌 Backend Express:"
  echo "   URL: http://localhost:5000"
  echo "   API: http://localhost:5000/api"
  echo ""
  echo "📝 Premières étapes:"
  echo "   1. Ouvrir http://localhost:5173"
  echo "   2. Créer un compte (S'inscrire)"
  echo "   3. Se connecter"
  echo "   4. Explorer l'application"
  echo ""
  echo "⚙️  Pour arrêter: Ctrl+C dans les terminaux"
  echo ""
}

# Démarrer le backend
echo "🔧 Démarrage du backend Express (port 5000)..."
cd "$SCRIPT_DIR/backend"
npm run dev &
BACKEND_PID=$!
sleep 2

# Démarrer le frontend
echo "⚛️  Démarrage du frontend React (port 5173)..."
cd "$SCRIPT_DIR"
npm run dev &
FRONTEND_PID=$!
sleep 2

show_instructions

# Garder le script en attente
wait
