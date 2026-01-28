# GEVA-Sco Voice Assistant V3 - Dockerfile
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY backend/package*.json ./backend/

# Installer les dépendances backend
RUN cd backend && npm install --production

# Copier le code source
COPY backend/ ./backend/
COPY js/ ./js/
COPY css/ ./css/
COPY *.html ./
COPY *.md ./

# Créer le répertoire uploads
RUN mkdir -p backend/uploads && chmod 777 backend/uploads

# Exposer le port
EXPOSE 3000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000

# Vérification de santé
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Démarrer le serveur
CMD ["node", "backend/server.js"]
