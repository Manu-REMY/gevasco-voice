#!/bin/bash

# GEVA-Sco Voice Assistant V3 - Script de démarrage automatique
# Usage: ./start.sh

set -e

echo "🎤 GEVA-Sco Voice Assistant V3"
echo "================================"
echo ""

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé"
    echo "📥 Installez Docker depuis: https://docs.docker.com/get-docker/"
    exit 1
fi

# Vérifier si docker-compose est disponible
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé"
    echo "📥 Installez Docker Compose depuis: https://docs.docker.com/compose/install/"
    exit 1
fi

# Vérifier la présence du fichier .env
if [ ! -f .env ]; then
    echo "⚠️  Fichier .env introuvable"
    echo "📝 Création du fichier .env depuis .env.example..."
    cp .env.example .env
    echo ""
    echo "⚠️  IMPORTANT: Éditez le fichier .env et ajoutez votre clé API OpenAI"
    echo "   Fichier: .env"
    echo "   Variable: OPENAI_API_KEY"
    echo ""
    read -p "Appuyez sur Entrée une fois la configuration terminée..."
fi

# Vérifier la clé API
if grep -q "sk-proj-votre-cle-api-ici" .env || grep -q "your_openai_api_key_here" .env; then
    echo "❌ La clé API OpenAI n'est pas configurée"
    echo "📝 Éditez le fichier .env et remplacez OPENAI_API_KEY par votre clé API"
    exit 1
fi

# Créer le répertoire uploads si nécessaire
mkdir -p backend/uploads

echo "🚀 Démarrage du serveur GEVA-Sco Voice..."
echo ""

# Détecter quelle commande docker-compose utiliser
if command -v docker-compose &> /dev/null; then
    COMPOSE_CMD="docker-compose"
else
    COMPOSE_CMD="docker compose"
fi

# Arrêter les conteneurs existants
echo "🛑 Arrêt des conteneurs existants..."
$COMPOSE_CMD down 2>/dev/null || true

# Construire et démarrer les conteneurs
echo "🔨 Construction de l'image Docker..."
$COMPOSE_CMD build

echo "▶️  Démarrage du conteneur..."
$COMPOSE_CMD up -d

# Attendre que le serveur soit prêt
echo "⏳ Attente du démarrage du serveur..."
sleep 5

# Vérifier l'état de santé
for i in {1..10}; do
    if curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
        echo ""
        echo "✅ Serveur démarré avec succès!"
        echo ""
        echo "🌐 Interface web: http://localhost:3000"
        echo "📊 Santé API: http://localhost:3000/api/health"
        echo ""
        echo "📋 Commandes utiles:"
        echo "   - Voir les logs: $COMPOSE_CMD logs -f"
        echo "   - Arrêter: $COMPOSE_CMD down"
        echo "   - Redémarrer: $COMPOSE_CMD restart"
        echo ""
        exit 0
    fi
    sleep 2
done

echo ""
echo "⚠️  Le serveur met plus de temps que prévu à démarrer"
echo "📋 Consultez les logs avec: $COMPOSE_CMD logs"
echo ""
