# 📊 Structure des Données Firebase - LogeVite

## 🔥 Configuration Firebase

### SDK Utilisé
- **Firebase Web SDK** (v10+) pour compatibilité avec Expo Go
- **Migration future** vers React Native Firebase pour la production

### Services Configurés
- **Authentication** : Email/Password, Phone, Google, Facebook
- **Firestore** : Base de données NoSQL
- **Storage** : Stockage de fichiers (images, documents)
- **Cloud Functions** : Logique métier côté serveur

### Persistance
- **AsyncStorage** pour React Native
- **Session persistante** entre les redémarrages de l'app

## 🗄️ Collections Firestore

### 👤 utilisateurs
Structure des profils utilisateur

```javascript
{
  id: "uid_utilisateur",
  prenom: "Maurice",
  nom: "Mansaré",
  email: "maurice@example.com",
  telephone: "+22462123456",
  typeUtilisateur: "professionnel", // "particulier" | "professionnel"
  typeProfessionnel: "agence", // seulement si professionnel: "agence" | "demarcheur" | "promoteur"
  nomEntreprise: "MANSCORP Immobilier", // seulement si professionnel
  descriptionEntreprise: "Agence immobilière spécialisée...",
  biographie: "Professionnel de l'immobilier depuis 10 ans",
  photoProfil: "url_photo",
  logoEntreprise: "url_logo", // seulement si professionnel
  localisation: {
    ville: "Conakry",
    commune: "Kaloum",
    adresse: "Rue KA-001",
    latitude: 9.5370,
    longitude: -13.6785
  },
  statutVerification: "verifie", // "en_attente" | "verifie" | "refuse"
  dateCreation: "2024-01-15T10:30:00Z",
  derniereActivite: "2024-01-20T15:45:00Z",
  jetonsFCM: ["token1", "token2"], // pour notifications push
  preferences: {
    notifications: {
      correspondances: true,
      messages: true,
      marketing: false
    },
    langue: "fr"
  },
  statistiques: {
    nombreAnnonces: 15,
    noteMoyenne: 4.2,
    nombreAvis: 8
  }
}
```

### 🏠 annonces
Structure des annonces immobilières

```javascript
{
  id: "id_annonce",
  idProprietaire: "uid_proprietaire",
  titre: "Belle villa moderne à Kaloum",
  description: "Magnifique villa de 4 chambres...",
  typeBien: "villa", // "appartement" | "maison" | "villa" | "terrain" | "bureau" | "commerce" | "entrepot"
  typeTransaction: "vente", // "vente" | "location"
  prix: 250000000, // en GNF
  prixNegociable: true,
  devise: "GNF",
  surface: 180, // en m²
  nombrePieces: 5,
  nombreChambres: 4,
  nombreSallesBain: 3,
  nombreWC: 2,
  etage: 1, // pour appartements
  nombreEtages: 2, // pour maisons/villas
  anneeConstruction: 2020,
  localisation: {
    adresse: "Quartier Almamya, Kaloum",
    ville: "Conakry",
    commune: "Kaloum",
    quartier: "Almamya",
    latitude: 9.5370,
    longitude: -13.6785,
    pointsRepere: ["Près de la mosquée centrale", "Face au marché"]
  },
  images: [
    {
      url: "url_image_1",
      legende: "Façade principale",
      estPrincipale: true
    },
    {
      url: "url_image_2",
      legende: "Salon",
      estPrincipale: false
    }
  ],
  caracteristiques: {
    climatisation: true,
    garage: true,
    jardin: true,
    piscine: false,
    securite: true,
    meuble: false,
    acces: {
      eau: true,
      electricite: true,
      internet: true,
      routeGoudronee: true
    }
  },
  statut: "active", // "active" | "inactive" | "vendue" | "louee" | "brouillon" | "expiree"
  dateCreation: "2024-01-15T10:30:00Z",
  dateMiseAJour: "2024-01-16T14:20:00Z",
  dateExpiration: "2024-04-15T10:30:00Z",
  estBoostee: false,
  dateFinBoost: null,
  vues: 45,
  favoris: 12,
  partages: 3,
  contact: {
    telephone: "+22462123456",
    email: "contact@manscorp.gn",
    whatsapp: "+22462123456",
    disponibiliteVisite: {
      lundi: { debut: "09:00", fin: "17:00" },
      mardi: { debut: "09:00", fin: "17:00" },
      // ... autres jours
    }
  }
}
```

### 🔍 demandes
Structure des demandes de particuliers

```javascript
{
  id: "id_demande",
  idUtilisateur: "uid_utilisateur",
  titre: "Recherche appartement 3 pièces Ratoma",
  description: "Je cherche un appartement moderne...",
  typeBien: "appartement",
  typeTransaction: "location",
  budgetMin: 800000, // en GNF
  budgetMax: 1500000,
  surfaceMin: 60, // en m²
  surfaceMax: 100,
  nombrePiecesMin: 3,
  nombrePiecesMax: 4,
  nombreChambresMin: 2,
  nombreChambresMax: 3,
  localisation: {
    ville: "Conakry",
    commune: "Ratoma", // peut être null pour recherche plus large
    rayonRecherche: 15, // en km
    latitude: 9.5370, // centre de recherche
    longitude: -13.6785
  },
  criteresSpecifiques: {
    climatisation: true,
    garage: false,
    jardin: false,
    meuble: true,
    acces: {
      eau: true,
      electricite: true,
      internet: true
    }
  },
  active: true,
  dateCreation: "2024-01-15T10:30:00Z",
  dateMiseAJour: "2024-01-16T14:20:00Z",
  nombreCorrespondances: 3,
  derniereCorrespondance: "2024-01-18T09:15:00Z",
  preferences: {
    notificationsInstantanees: true,
    resumeHebdomadaire: true,
    maxCorrespondancesParJour: 5
  }
}
```

### 💬 conversations
Structure des conversations entre utilisateurs

```javascript
{
  id: "id_conversation",
  participants: ["uid_utilisateur_1", "uid_utilisateur_2"],
  typeConversation: "annonce", // "annonce" | "demande" | "general"
  annonceAssociee: "id_annonce", // si applicable
  demandeAssociee: "id_demande", // si applicable
  dernierMessage: {
    texte: "Bonjour, l'appartement est-il toujours disponible ?",
    idExpediteur: "uid_utilisateur_1",
    dateEnvoi: "2024-01-20T15:30:00Z",
    type: "texte" // "texte" | "image" | "document"
  },
  dateCreation: "2024-01-20T15:25:00Z",
  dateDernierMessage: "2024-01-20T15:30:00Z",
  messagesNonLus: {
    "uid_utilisateur_1": 0,
    "uid_utilisateur_2": 1
  },
  archive: {
    "uid_utilisateur_1": false,
    "uid_utilisateur_2": false
  },
  bloque: {
    "uid_utilisateur_1": false,
    "uid_utilisateur_2": false
  }
}
```

### 📨 messages (sous-collection de conversations)
Structure des messages individuels

```javascript
{
  id: "id_message",
  idExpediteur: "uid_expediteur",
  type: "texte", // "texte" | "image" | "document" | "localisation"
  contenu: {
    texte: "Bonjour, l'appartement est-il disponible ?", // si type = texte
    urlFichier: "url_fichier", // si type = image/document
    nomFichier: "photo.jpg", // si type = image/document
    tailleFichier: 1024000, // en bytes
    localisation: { // si type = localisation
      latitude: 9.5370,
      longitude: -13.6785,
      adresse: "Kaloum, Conakry"
    }
  },
  dateEnvoi: "2024-01-20T15:30:00Z",
  lu: false,
  dateLecture: null,
  modifie: false,
  dateModification: null,
  repondA: "id_message_parent", // si c'est une réponse
  reactions: {
    "uid_utilisateur": "👍" // émojis de réaction
  }
}
```

### ⭐ favoris
Structure des annonces favorites

```javascript
{
  id: "id_favori",
  idUtilisateur: "uid_utilisateur",
  idAnnonce: "id_annonce",
  dateAjout: "2024-01-20T10:15:00Z",
  notes: "Intéressant pour investissement",
  alertePrix: {
    active: true,
    seuilBaisse: 0.1 // 10% de baisse
  }
}
```

### 📊 avis
Structure des évaluations et avis

```javascript
{
  id: "id_avis",
  idEvaluateur: "uid_evaluateur", // qui donne l'avis
  idCible: "uid_cible", // qui reçoit l'avis
  typeCible: "utilisateur", // "utilisateur" | "annonce"
  note: 4, // 1 à 5 étoiles
  commentaire: "Très professionnel et réactif",
  criteres: {
    professionnalisme: 5,
    reactivite: 4,
    honnetetete: 4,
    qualiteService: 4
  },
  annonceAssociee: "id_annonce", // si applicable
  dateCreation: "2024-01-20T16:45:00Z",
  verifie: true, // avis vérifié après transaction
  signale: false,
  reponseProprietaire: {
    texte: "Merci pour votre confiance !",
    date: "2024-01-21T09:00:00Z"
  }
}
```

### 🚨 signalements
Structure des signalements d'abus

```javascript
{
  id: "id_signalement",
  idSignaleur: "uid_signaleur",
  typeCible: "annonce", // "annonce" | "utilisateur" | "message"
  idCible: "id_cible",
  raison: "contenu_inapproprie", // "spam" | "contenu_inapproprie" | "fausse_info" | "arnaque"
  description: "Cette annonce semble être une arnaque...",
  preuves: ["url_capture_1", "url_capture_2"],
  dateSignalement: "2024-01-20T11:30:00Z",
  statut: "en_attente", // "en_attente" | "en_cours" | "resolu" | "rejete"
  actionPrise: null, // "avertissement" | "suspension" | "suppression" | null
  dateResolution: null,
  commentaireAdmin: null
}
```

### 🔔 notifications
Structure des notifications

```javascript
{
  id: "id_notification",
  idUtilisateur: "uid_utilisateur",
  type: "correspondance", // "correspondance" | "message" | "avis" | "systeme"
  titre: "Nouvelle correspondance trouvée !",
  message: "Une annonce correspond à votre demande d'appartement",
  donnees: {
    idAnnonce: "id_annonce",
    idDemande: "id_demande",
    // autres données selon le type
  },
  lue: false,
  dateCreation: "2024-01-20T14:20:00Z",
  dateLecture: null,
  priorite: "normale", // "basse" | "normale" | "haute" | "urgente"
  actionRequise: false,
  lienAction: "/annonces/id_annonce",
  expirationDate: "2024-02-20T14:20:00Z"
}
```

### 📈 statistiques
Données analytiques (accès restreint aux admins et fonctions cloud)

```javascript
{
  id: "stats_quotidiennes_2024_01_20",
  date: "2024-01-20",
  type: "quotidien", // "quotidien" | "mensuel" | "annuel"
  utilisateurs: {
    nouveauxUtilisateurs: 12,
    utilisateursActifs: 245,
    particuliers: 180,
    professionnels: 65
  },
  annonces: {
    nouvellesAnnonces: 8,
    annoncesActives: 156,
    annoncesVendues: 3,
    annoncesLouees: 2
  },
  demandes: {
    nouvellesDemandes: 15,
    demandesActives: 89,
    correspondancesTrouvees: 23
  },
  engagement: {
    messagesEnvoyes: 127,
    vuesAnnonces: 1250,
    partagesAnnonces: 34,
    favorisAjoutes: 67
  }
}
```

## 🗂️ Structure de Stockage Firebase Storage

### Dossiers principaux :
- `/utilisateurs/{idUtilisateur}/profil/` - Photos de profil
- `/utilisateurs/{idUtilisateur}/entreprise/` - Logos d'entreprise  
- `/utilisateurs/{idUtilisateur}/documents/` - Documents KYC
- `/annonces/{idAnnonce}/` - Images d'annonces
- `/conversations/{idConversation}/messages/{idMessage}/` - Pièces jointes
- `/temporaire/{idUtilisateur}/` - Uploads temporaires
- `/public/` - Ressources publiques de l'app
- `/sauvegardes/` - Sauvegardes automatiques

## 🔐 Règles de Sécurité

### Principes généraux :
1. **Authentification requise** pour toutes les opérations
2. **Propriété des données** : les utilisateurs ne peuvent modifier que leurs propres données
3. **Validation des données** : types et formats vérifiés côté serveur
4. **Accès restreint** aux données sensibles (admin, statistiques)
5. **Fonctions cloud uniquement** pour les opérations critiques (matching, notifications)

### Exemples de règles appliquées :
- Un utilisateur ne peut voir que ses propres demandes
- Seul le propriétaire d'une annonce peut la modifier
- Les conversations sont accessibles uniquement aux participants
- Les statistiques ne sont accessibles qu'aux fonctions cloud
- Les signalements ne sont visibles que par les admins

Cette structure garantit la sécurité, la performance et la maintenabilité de l'application LogeVite.
