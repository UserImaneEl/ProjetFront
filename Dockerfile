# Utiliser une image de base contenant Node.js
FROM node:20.11.1

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers du projet dans le conteneur
COPY . .

# Installer les dépendances du projet
RUN npm install

# Construire l'application
RUN npm run build --prod

# Commande par défaut pour exécuter l'application lorsque le conteneur démarre
CMD ["npm", "start"]
