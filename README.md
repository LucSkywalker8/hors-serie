# Hors-Série.immo - Site Immobilier Premium

## 🏡 Description
Site web immobilier d'exception pour propriétés de prestige : châteaux, manoirs, lofts, villas et domaines viticoles dans le Maine-et-Loire. 

Architecture React/TypeScript avec backend Express et base de données PostgreSQL.

## 📁 Structure du Projet
```
hors-serie-immo-complete/
├── client/                 # Frontend React/TypeScript
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── pages/          # Pages de l'application
│   │   ├── hooks/          # Hooks personnalisés
│   │   └── lib/            # Utilitaires
│   └── index.html
├── server/                 # Backend Express/TypeScript
│   ├── index.ts            # Serveur principal
│   ├── routes.ts           # Routes API
│   ├── storage.ts          # Interface de stockage
│   └── auth.ts             # Authentification
├── shared/                 # Types et schémas partagés
│   └── schema.ts           # Schémas Drizzle ORM
├── attached_assets/        # Images et ressources
├── package.json            # Dépendances et scripts
├── vite.config.ts          # Configuration Vite
├── tailwind.config.ts      # Configuration Tailwind
├── drizzle.config.ts       # Configuration base de données
└── .env.example            # Variables d'environnement exemple
```

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

### 1. Installation des dépendances
```bash
cd hors-serie-immo-complete
npm install
```

### 2. Configuration de la base de données
Créez une base de données PostgreSQL et configurez les variables d'environnement :

```bash
# Copiez le fichier d'exemple
cp .env.example .env

# Éditez .env avec vos paramètres
DATABASE_URL="postgresql://username:password@localhost:5432/hors_serie_immo"
PORT=5000
NODE_ENV=production
SESSION_SECRET="your-super-secret-session-key-here"
```

### 3. Migration de la base de données
```bash
# Pousser le schéma vers la base de données
npm run db:push
```

### 4. Build et démarrage
```bash
# Build de production
npm run build

# Démarrage du serveur
npm start
```

Pour le développement :
```bash
npm run dev
```

## 🌐 Déploiement

### 🚀 Vercel (Recommandé pour le frontend)
1. Connectez votre repository GitHub
2. Configurez les variables d'environnement dans Vercel
3. Build command : `npm run build`
4. Output directory : `dist/public`

### 🐳 Railway (Full-stack)
1. Connectez votre repository GitHub  
2. Railway détecte automatiquement le `package.json`
3. Ajoutez les variables d'environnement :
   - `DATABASE_URL` (PostgreSQL fourni par Railway)
   - `PORT` (automatique)
   - `SESSION_SECRET`

### ☁️ Render
1. Créez un nouveau Web Service
2. Build command : `npm run build`
3. Start command : `npm start`
4. Ajoutez une base PostgreSQL

### 🌊 DigitalOcean App Platform
1. Connectez votre repository
2. Configurez le service :
   - Build : `npm run build`
   - Run : `npm start`
3. Ajoutez une base PostgreSQL

### 📦 VPS/Serveur dédié
```bash
# 1. Clonez le projet
git clone https://github.com/votre-username/hors-serie-immo
cd hors-serie-immo

# 2. Installez les dépendances
npm install

# 3. Configurez les variables d'environnement
cp .env.example .env
# Éditez .env avec vos paramètres

# 4. Build et migration
npm run build
npm run db:push

# 5. Démarrez avec PM2
npm install -g pm2
pm2 start dist/index.js --name "hors-serie-immo"

# 6. Configuration Nginx (optionnel)
# Proxy vers localhost:5000
```

## 🔧 Variables d'Environnement

| Variable | Description | Obligatoire | Défaut |
|----------|-------------|-------------|---------|
| `DATABASE_URL` | URL de connexion PostgreSQL | ✅ | - |
| `PORT` | Port du serveur | ❌ | 5000 |
| `NODE_ENV` | Environnement d'exécution | ❌ | development |
| `SESSION_SECRET` | Clé secrète pour les sessions | ✅ | - |
| `ALLOWED_ORIGINS` | Domaines CORS autorisés | ❌ | * |

## 🔒 Sécurité

### Sessions et authentification
- Sessions sécurisées avec PostgreSQL store
- Tokens JWT pour l'API (si implémenté)
- Validation Zod sur toutes les entrées

### Recommandations de production
1. Utilisez HTTPS obligatoirement
2. Configurez un WAF (Web Application Firewall)
3. Mettez en place un monitoring (Sentry, LogRocket)
4. Sauvegardez régulièrement la base de données
5. Utilisez des variables d'environnement sécurisées

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** + **TypeScript** : Interface utilisateur moderne
- **Vite** : Build rapide et développement optimisé
- **Tailwind CSS** : Styles utilitaires + shadcn/ui
- **Wouter** : Routage léger
- **TanStack Query** : Gestion d'état serveur
- **React Hook Form** : Gestion des formulaires
- **Zod** : Validation TypeScript

### Backend  
- **Express.js** + **TypeScript** : Serveur API REST
- **Drizzle ORM** : ORM type-safe pour PostgreSQL
- **PostgreSQL** : Base de données relationnelle
- **Express Session** : Gestion des sessions
- **CORS** : Sécurité cross-origin

### Outils de développement
- **ESBuild** : Bundling backend ultra-rapide
- **PostCSS** : Traitement CSS
- **Drizzle Kit** : Migrations de base de données

## 📱 Fonctionnalités

### Page d'accueil (`/`)
- Hero section avec image de territoire
- Section philosophie avec équipe
- Statistiques et présentation

### Catalogue des biens (`/properties`)
- Filtrage par type de propriété
- Recherche par ville/région
- Vue grille responsive avec images

### Détail d'un bien (`/property/:id`)
- Galerie d'images
- Informations détaillées
- Formulaire de contact

### Contact (`/contact`)
- Formulaire de demande d'information
- Validation côté client et serveur
- Envoi d'email (à implémenter)

### Administration (`/admin`)
- Dashboard de gestion des propriétés
- Authentification sécurisée
- CRUD complet des biens

## 🔄 API Endpoints

### Propriétés
- `GET /api/properties` - Liste toutes les propriétés
- `GET /api/properties/:id` - Détail d'une propriété
- `GET /api/properties/type/:type` - Propriétés par type
- `POST /api/properties` - Créer une propriété (admin)
- `PUT /api/properties/:id` - Modifier une propriété (admin)
- `DELETE /api/properties/:id` - Supprimer une propriété (admin)

### Contacts
- `POST /api/contacts` - Envoyer une demande de contact

### Auth (Admin)
- `POST /api/auth/login` - Connexion admin
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Profil utilisateur

## 🐛 Dépannage

### Erreurs courantes

1. **"Cannot find module"**
   ```bash
   # Réinstallez les dépendances
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Erreur de base de données**
   ```bash
   # Vérifiez la connexion DATABASE_URL
   # Relancez les migrations
   npm run db:push
   ```

3. **Port déjà utilisé**
   ```bash
   # Changez le port dans .env
   PORT=3000
   ```

### Logs et monitoring
- Logs serveur : `console.log` en développement
- Logs production : Utilisez un service comme Sentry
- Base de données : Monitoring via votre hébergeur

## 📞 Support

Pour toute question ou personnalisation :
1. Consultez la documentation technique dans le code
2. Vérifiez les logs d'erreur du navigateur (F12)
3. Contrôlez les variables d'environnement
4. Testez la connexion à la base de données

## 📄 Licence
MIT License - Libre d'utilisation pour projets commerciaux et personnels.