# 🔥 Guide de Migration Firebase - LogeVite

## 📋 Vue d'ensemble

Ce document décrit la migration de **Firebase Web SDK** vers **React Native Firebase** pour la production.

## 🎯 Pourquoi cette migration ?

### Firebase Web SDK (Développement)
- ✅ **Compatible Expo Go** - Développement immédiat
- ✅ **Setup simple** - Pas de build natif requis
- ✅ **API standard** - Documentation complète
- ❌ **Performance limitée** - Pas d'optimisations natives
- ❌ **Fonctionnalités limitées** - Certaines features RN Firebase uniquement

### React Native Firebase (Production)
- ✅ **Performance native** - Optimisations avancées
- ✅ **Fonctionnalités complètes** - Toutes les features Firebase
- ✅ **Intégration native** - Permissions, notifications push
- ❌ **Build natif requis** - Development Build nécessaire
- ❌ **Setup complexe** - Configuration native requise

## 🔄 Plan de Migration

### Phase 1 : Préparation (Actuel)
- [x] Configuration Firebase Web SDK
- [x] Authentification fonctionnelle
- [x] Structure de données définie
- [x] Règles de sécurité configurées

### Phase 2 : Development Build
- [ ] Installation EAS CLI
- [ ] Configuration EAS Build
- [ ] Création Development Build
- [ ] Test sur appareil physique

### Phase 3 : Migration Code
- [ ] Installation React Native Firebase
- [ ] Mise à jour imports
- [ ] Adaptation syntaxe API
- [ ] Tests complets

### Phase 4 : Optimisations
- [ ] Configuration notifications push
- [ ] Optimisations performance
- [ ] Tests de charge
- [ ] Déploiement production

## 📦 Dépendances à installer

```bash
# Désinstaller Firebase Web
npm uninstall firebase

# Installer React Native Firebase
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore @react-native-firebase/storage @react-native-firebase/messaging

# Installer EAS CLI
npm install -g @expo/eas-cli
```

## 🔧 Fichiers à modifier

### 1. Configuration Firebase
```javascript
// src/config/firebase.js
// Remplacer imports Firebase Web par React Native Firebase
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
```

### 2. Service d'authentification
```javascript
// src/services/authService.js
// Adapter toutes les fonctions pour la syntaxe RN Firebase
const userCredential = await auth().createUserWithEmailAndPassword(email, password);
```

### 3. Contexte d'authentification
```javascript
// src/contexts/AuthContext.js
// Mettre à jour les listeners d'authentification
const unsubscribe = auth().onAuthStateChanged(async (user) => {
```

## 🚀 Commandes de migration

### Créer Development Build
```bash
# Configuration EAS
eas build:configure

# Créer Development Build
eas build --profile development --platform ios
eas build --profile development --platform android
```

### Tester la migration
```bash
# Installer sur appareil
eas build:run --platform ios
eas build:run --platform android
```

## ⚠️ Points d'attention

### 1. Permissions natives
- **iOS** : Ajouter permissions dans `Info.plist`
- **Android** : Ajouter permissions dans `AndroidManifest.xml`

### 2. Configuration Firebase
- **google-services.json** pour Android
- **GoogleService-Info.plist** pour iOS

### 3. Notifications Push
- Configuration FCM différente
- Gestion des tokens d'appareil

### 4. Performance
- Optimiser les requêtes Firestore
- Gérer le cache local
- Optimiser les uploads d'images

## 📊 Comparaison des APIs

| Fonctionnalité | Firebase Web | React Native Firebase |
|----------------|---------------|----------------------|
| Authentification | `signInWithEmailAndPassword()` | `auth().signInWithEmailAndPassword()` |
| Firestore | `doc(), getDoc()` | `firestore().collection().doc().get()` |
| Storage | `uploadBytes()` | `storage().ref().putFile()` |
| Notifications | Web Push API | FCM natif |
| Performance | Standard | Optimisée |

## 🎯 Timeline recommandée

1. **Semaine 1** : Setup Development Build
2. **Semaine 2** : Migration authentification
3. **Semaine 3** : Migration Firestore/Storage
4. **Semaine 4** : Tests et optimisations
5. **Semaine 5** : Déploiement production

## 📞 Support

- **Documentation RN Firebase** : https://rnfirebase.io/
- **Expo Development Builds** : https://docs.expo.dev/development/introduction/
- **Firebase Console** : https://console.firebase.google.com/

---

*Ce guide sera mis à jour au fur et à mesure de l'avancement de la migration.*
