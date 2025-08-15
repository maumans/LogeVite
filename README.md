# 📱 LogeVite - Application Immobilière Guinéenne

[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~53.0.20-black.svg)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-20.5.0-orange.svg)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.14-blue.svg)](https://tailwindcss.com/)

## 🎯 À Propos

LogeVite est une application mobile moderne qui connecte les particuliers cherchant à acheter, louer ou vendre un bien immobilier avec les professionnels (agences, démarcheurs, promoteurs) en Guinée.

### Fonctionnalités Principales

- 🏠 **Publication d'annonces** par les professionnels
- 🔍 **Demandes personnalisées** par les particuliers
- 🎯 **Matching automatique** entre demandes et annonces
- 💬 **Messagerie intégrée** temps réel
- 📱 **Intégrations réseaux sociaux** (Facebook, WhatsApp, Telegram)
- 🔔 **Notifications push** intelligentes
- 📍 **Géolocalisation** et cartes interactives
- 💰 **Système d'abonnements** pour les professionnels

## 🛠 Stack Technique

- **Frontend**: React Native 0.79.5 + Expo 53
- **Styling**: NativeWind (TailwindCSS pour React Native)
- **Navigation**: React Navigation 6
- **Backend**: Firebase (Auth, Firestore, Storage, Functions)
- **State Management**: Context API + useReducer
- **Notifications**: Firebase Cloud Messaging
- **Maps**: React Native Maps
- **Social Auth**: Google Sign-In, Facebook SDK

## 🚀 Installation & Setup

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (pour Android)
- Xcode (pour iOS, sur macOS uniquement)

### Installation

1. **Cloner le repository**
   ```bash
   git clone <your-repo-url>
   cd LogeVite
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration Firebase**
   - Créer un projet Firebase sur [console.firebase.google.com](https://console.firebase.google.com)
   - Télécharger `google-services.json` (Android) et `GoogleService-Info.plist` (iOS)
   - Placer les fichiers dans le dossier racine du projet
   - Configurer les règles Firestore et Storage (fichiers inclus dans `/firebase/`)

4. **Variables d'environnement**
   ```bash
   # Créer un fichier .env à la racine
   FIREBASE_API_KEY=your_api_key
   FIREBASE_AUTH_DOMAIN=your_auth_domain
   FIREBASE_PROJECT_ID=your_project_id
   # ... autres variables Firebase
   ```

5. **Démarrer le serveur de développement**
   ```bash
   npm start
   ```

## 📁 Structure du Projet

```
LogeVite/
├── src/
│   ├── components/
│   │   ├── ui/              # Composants UI réutilisables
│   │   ├── forms/           # Composants de formulaires
│   │   ├── screens/         # Écrans de l'application
│   │   └── navigation/      # Configuration de navigation
│   ├── constants/           # Constantes (couleurs, thème, etc.)
│   ├── utils/              # Utilitaires (formatters, validators)
│   ├── services/           # Services (Firebase, API)
│   ├── hooks/              # Hooks personnalisés
│   ├── contexts/           # Contextes React
│   └── assets/             # Images, fonts, etc.
├── firebase/               # Configuration Firebase
│   ├── firestore.rules     # Règles Firestore
│   ├── storage.rules       # Règles Storage
│   └── functions/          # Cloud Functions
├── devBook.md              # Guide de développement
└── README.md
```

## 🎨 Design System

### Couleurs Principales

- **Primary**: #10b981 (Vert Guinée)
- **Secondary**: #f59e0b (Orange/Or)
- **Accent**: #3b82f6 (Bleu)

### Composants UI

- `Button` - Boutons avec variants (primary, secondary, outline, etc.)
- `Input` - Champs de saisie avec validation
- `Card` - Cartes avec ombres et variants
- `Avatar` - Avatars avec initiales ou images
- `Badge` - Badges de statut
- `LoadingSpinner` - Indicateurs de chargement

## 🔧 Scripts Disponibles

```bash
# Développement
npm start              # Démarrer Expo
npm run android        # Lancer sur Android
npm run ios           # Lancer sur iOS
npm run web           # Lancer sur Web

# Qualité du code
npm run lint          # Vérifier le code avec ESLint
npm run lint:fix      # Corriger automatiquement les erreurs ESLint

# Tests
npm test              # Lancer les tests
npm run test:watch    # Tests en mode watch

# Build
npm run build         # Build de production
```

## 🌍 Adaptations Marché Guinéen

### Priorités UX
- Interface simple et intuitive
- Optimisation pour connexions lentes
- Support français + langues locales futures
- Utilisation maximale des réseaux sociaux populaires

### Intégrations Locales
- Numérotation guinéenne (+224)
- Devises en Franc Guinéen (GNF)
- Quartiers et communes de Conakry
- Support opérateurs télécom (Orange, MTN, Cellcom)

## 📋 Roadmap de Développement

### Phase 1 - MVP ✅
- [x] Setup projet et configuration
- [x] Design system et composants UI
- [x] Structure Firebase et règles de sécurité
- [ ] Authentification (email, téléphone, social)
- [ ] Profils utilisateurs (particulier/professionnel)
- [ ] Publication d'annonces
- [ ] Système de demandes
- [ ] Matching automatique

### Phase 2 - Communication
- [ ] Messagerie temps réel
- [ ] Intégrations réseaux sociaux
- [ ] Notifications push
- [ ] Partage d'annonces

### Phase 3 - Fonctionnalités Avancées
- [ ] Géolocalisation et cartes
- [ ] Système de favoris
- [ ] Évaluations et avis
- [ ] Recherche avancée

### Phase 4 - Monétisation
- [ ] Abonnements premium
- [ ] Boost d'annonces
- [ ] Publicités ciblées
- [ ] Analytics avancées

## 🧪 Tests

```bash
# Tests unitaires
npm test

# Tests d'intégration
npm run test:integration

# Tests E2E (à venir)
npm run test:e2e
```

## 📱 Déploiement

### Android
```bash
# Build APK
expo build:android

# Build AAB (pour Play Store)
expo build:android --type app-bundle
```

### iOS
```bash
# Build IPA
expo build:ios
```

### Web
```bash
# Build web
expo build:web
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence propriétaire MANSCORP. Tous droits réservés.

## 👨‍💻 Équipe

- **Développeur Principal**: Maurice (MANSCORP)
- **Designer UI/UX**: À définir
- **Product Manager**: À définir

## 📞 Support

Pour toute question ou support :
- 📧 Email: support@manscorp.com
- 📱 Téléphone: +224 XX XX XX XX
- 🌐 Site web: www.manscorp.com

---

**LogeVite** - Votre partenaire immobilier en Guinée 🇬🇳
