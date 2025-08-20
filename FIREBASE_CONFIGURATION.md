# 🔥 Configuration Firebase - LogeVite

## 📋 Configuration Complète

### 1. **Configuration Firebase Console**

#### Projet Firebase
- **Nom du projet** : `logevite-96eda`
- **Project ID** : `logevite-96eda`
- **Région** : `us-central1` (recommandé)

#### Services Activés
- ✅ **Authentication** - Email/Password, Phone, Google, Facebook
- ✅ **Firestore Database** - Base de données NoSQL
- ✅ **Storage** - Stockage de fichiers
- ✅ **Cloud Functions** - Logique métier (à venir)

### 2. **Configuration Authentication**

#### Méthodes d'authentification activées :

##### Email/Password
- ✅ Activé
- ✅ Email verification : Optionnel
- ✅ Password reset : Activé

##### Phone Number
- ✅ Activé
- ✅ Test phone numbers : Activé pour développement
- ✅ SMS templates : Personnalisés

##### Google Sign-In
- ✅ Activé
- ✅ Web SDK configuration : Configuré
- ✅ OAuth consent screen : Configuré

##### Facebook Login
- ✅ Activé
- ✅ App ID : [Votre Facebook App ID]
- ✅ App Secret : [Votre Facebook App Secret]
- ✅ **URI de redirection OAuth** : `https://logevite-96eda.firebaseapp.com/__/auth/handler`

### 3. **Configuration Facebook Developer**

#### Dans Facebook Developer Console :
1. **App ID** : [Votre Facebook App ID]
2. **App Secret** : [Votre Facebook App Secret]
3. **Valid OAuth Redirect URIs** :
   ```
   https://logevite-96eda.firebaseapp.com/__/auth/handler
   ```

#### Permissions Facebook requises :
- `email` - Accès à l'email de l'utilisateur
- `public_profile` - Accès au profil public

### 4. **Configuration Firestore**

#### Règles de sécurité
- ✅ Fichier : `firebase/firestore.rules`
- ✅ Déployé : Oui
- ✅ Mode : Production

#### Indexes
- ✅ Fichier : `firebase/firestore.indexes.json`
- ✅ Déployé : Oui

### 5. **Configuration Storage**

#### Règles de sécurité
- ✅ Fichier : `firebase/storage.rules`
- ✅ Déployé : Oui
- ✅ Mode : Production

#### Structure des dossiers
```
/utilisateurs/{idUtilisateur}/profil/
/utilisateurs/{idUtilisateur}/entreprise/
/utilisateurs/{idUtilisateur}/documents/
/annonces/{idAnnonce}/
/conversations/{idConversation}/messages/{idMessage}/
/temporaire/{idUtilisateur}/
/public/
/sauvegardes/
```

### 6. **Variables d'environnement**

#### Fichier `.env` (à créer)
```bash
# Firebase Configuration
FIREBASE_API_KEY=AIzaSyDGpOk6qDxj9FD0d2pwWfFd3vtEXOYkcZI
FIREBASE_AUTH_DOMAIN=logevite-96eda.firebaseapp.com
FIREBASE_PROJECT_ID=logevite-96eda
FIREBASE_STORAGE_BUCKET=logevite-96eda.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=1094006078773
FIREBASE_APP_ID=1:1094006078773:web:c563441bc652f57824a07c
FIREBASE_MEASUREMENT_ID=G-K6NSCG4728

# Facebook Configuration
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Google Configuration
GOOGLE_WEB_CLIENT_ID=your_google_web_client_id
```

### 7. **Déploiement des règles**

#### Commandes de déploiement
```bash
# Déployer les règles Firestore
firebase deploy --only firestore:rules

# Déployer les règles Storage
firebase deploy --only storage

# Déployer les indexes Firestore
firebase deploy --only firestore:indexes

# Déployer tout
firebase deploy
```

### 8. **Test de la configuration**

#### Test d'authentification
1. **Email/Password** : ✅ Fonctionnel
2. **Phone Number** : ✅ Fonctionnel (mode test)
3. **Google Sign-In** : ✅ Fonctionnel
4. **Facebook Login** : ✅ Fonctionnel (après configuration OAuth)

#### Test Firestore
- ✅ Lecture/Écriture des utilisateurs
- ✅ Lecture/Écriture des annonces
- ✅ Règles de sécurité respectées

#### Test Storage
- ✅ Upload d'images de profil
- ✅ Upload d'images d'annonces
- ✅ Règles de sécurité respectées

### 9. **Monitoring et Analytics**

#### Firebase Analytics
- ✅ Activé
- ✅ Événements personnalisés configurés
- ✅ Conversion tracking activé

#### Crashlytics
- ✅ Activé (pour la production)
- ✅ Symbolication configurée

### 10. **Sécurité**

#### Règles de sécurité
- ✅ Authentification requise pour toutes les opérations
- ✅ Validation des données côté serveur
- ✅ Accès restreint aux données sensibles
- ✅ Protection contre les attaques courantes

#### Permissions
- ✅ iOS : Configurées dans `Info.plist`
- ✅ Android : Configurées dans `AndroidManifest.xml`

---

## 🚨 **Points d'attention**

### **URIs OAuth critiques**
- **Facebook** : `https://logevite-96eda.firebaseapp.com/__/auth/handler`
- **Google** : Configuré automatiquement par Firebase

### **Variables sensibles**
- Ne jamais commiter les clés secrètes dans Git
- Utiliser les variables d'environnement
- Rotation régulière des clés

### **Sécurité**
- Règles Firestore strictes
- Validation côté serveur
- Monitoring des accès

---

*Cette configuration doit être maintenue à jour lors des déploiements en production.*
