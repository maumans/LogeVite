# 📝 Règles de Commentaires - LogeVite

## 🎯 Objectif
Standardiser la documentation du code pour une maintenance facile et une compréhension rapide par tous les développeurs, en particulier en français.

## 📋 Règles Générales

### 1. **Langue des Commentaires**
- ✅ **TOUS les commentaires en français**
- ✅ Utiliser un français technique clair et précis
- ✅ Éviter l'argot ou les expressions familières
- ✅ Privilégier les termes métier de l'immobilier

### 2. **Types de Commentaires Obligatoires**

#### 🏗️ **Commentaires de Fichier (Header)**
```javascript
/**
 * Nom du fichier - Description courte
 * 
 * Description détaillée du rôle du fichier dans l'application.
 * Expliquer le contexte métier si nécessaire.
 * 
 * Exemples d'usage si pertinent.
 */
```

#### 🔧 **Commentaires de Fonction/Composant**
```javascript
/**
 * Nom de la fonction - Description courte
 * 
 * Description détaillée de ce que fait la fonction.
 * Expliquer la logique métier si complexe.
 * 
 * @param {type} parametre - Description du paramètre
 * @returns {type} Description du retour
 * 
 * @example
 * // Exemple d'utilisation
 * const resultat = maFonction(valeur);
 */
```

#### 📊 **Commentaires de Constantes/Variables**
```javascript
// Description courte - usage ou signification
const MA_CONSTANTE = 'valeur'; // Contexte additionnel si nécessaire

// Pour les objets complexes :
const CONFIGURATION = {
  // Section 1 - description de cette partie
  propriete1: 'valeur',  // Usage spécifique
  propriete2: 42,        // Unité ou signification
  
  // Section 2 - autre partie
  propriete3: true,      // Condition ou état
};
```

#### 🔄 **Commentaires de Logique Complexe**
```javascript
// Étape 1 : Explication de cette partie de l'algorithme
const etape1 = processus();

// Vérification des conditions métier spécifiques à LogeVite
if (conditionComplexe) {
  // Pourquoi cette condition est importante
  // Quel cas métier elle couvre
  traiterCas();
}
```

### 3. **Commentaires Spécifiques LogeVite**

#### 🏠 **Logique Immobilière**
```javascript
// Calcul du prix au m² selon les standards guinéens
const prixParM2 = prixTotal / surface;

// Vérification des critères de matching annonce/demande
// Prend en compte : localisation, budget, type de bien
if (estCorrespondanceValide(annonce, demande)) {
  // Notifier le particulier de la correspondance
  envoyerNotification(demande.idUtilisateur);
}
```

#### 🇬🇳 **Spécificités Guinéennes**
```javascript
// Validation du format de téléphone guinéen (+224 XX XX XX XX)
const estTelephoneValide = verifierFormatGuineen(telephone);

// Communes de Conakry : Kaloum, Dixinn, Matam, Ratoma, Matoto
const communesConakry = LOCALISATIONS_GUINEE.CONAKRY.communes;
```

#### 🔒 **Règles de Sécurité Firebase**
```javascript
// Règle : Seul le propriétaire peut modifier son annonce
// Vérifie que l'utilisateur authentifié est bien le propriétaire
function estProprietaire(idUtilisateur) {
  return request.auth.uid == idUtilisateur;
}
```

### 4. **Commentaires à Éviter**

#### ❌ **Commentaires Évidents**
```javascript
// ❌ MAUVAIS
const nom = 'Maurice'; // Assigne 'Maurice' à nom

// ✅ BON
const nomUtilisateurConnecte = 'Maurice'; // Nom affiché dans l'en-tête
```

#### ❌ **Commentaires Obsolètes**
- Supprimer les commentaires qui ne correspondent plus au code
- Mettre à jour les commentaires lors des modifications

#### ❌ **Commentaires en Anglais**
```javascript
// ❌ MAUVAIS
// TODO: Fix this bug

// ✅ BON
// TODO: Corriger le bug de validation du prix
```

### 5. **Commentaires TODO et FIXME**

```javascript
// TODO: [Priorité] Description de ce qui doit être fait
// TODO: [URGENT] Ajouter la validation des images d'annonces
// TODO: [MOYEN] Optimiser la requête de recherche
// TODO: [BAS] Ajouter des animations de transition

// FIXME: [Description du problème] - [Impact]
// FIXME: Le calcul du prix ne prend pas en compte les frais - Impact: prix incorrect
// FIXME: Memory leak dans la liste d'annonces - Impact: performance

// HACK: [Pourquoi cette solution temporaire]
// HACK: Contournement pour le bug de React Navigation - À remplacer en v6.1
```

### 6. **Documentation des Règles Métier**

```javascript
/**
 * Règles de matching LogeVite
 * 
 * Une annonce correspond à une demande si :
 * 1. Le type de bien est identique (appartement, maison, etc.)
 * 2. Le type de transaction est identique (vente/location)
 * 3. Le prix est dans la fourchette budgétaire
 * 4. La localisation est dans le rayon de recherche
 * 5. Les critères optionnels correspondent (climatisation, garage, etc.)
 */
function verifierCorrespondance(annonce, demande) {
  // Vérification type de bien
  if (annonce.typeBien !== demande.typeBien) {
    return false; // Types incompatibles
  }
  
  // Vérification budget - doit être dans la fourchette
  if (annonce.prix < demande.budgetMin || annonce.prix > demande.budgetMax) {
    return false; // Prix hors budget
  }
  
  // ... autres vérifications
}
```

### 7. **Commentaires de Performance**

```javascript
// PERFORMANCE: Cette fonction est appelée à chaque scroll
// Optimisée avec useMemo pour éviter les recalculs inutiles
const annoncesFiltrees = useMemo(() => {
  return filtrerAnnonces(annonces, filtres);
}, [annonces, filtres]);

// ATTENTION: Requête coûteuse - limiter à 20 résultats max
const resultats = await rechercherAnnonces(criteres, { limite: 20 });
```

### 8. **Commentaires de Débogage**

```javascript
// DEBUG: Affichage temporaire pour tracer le bug #123
console.log('État de l\'utilisateur:', utilisateur);

// NOTE: Ce console.log doit être supprimé avant la production
console.warn('Données de test:', donneesTest);
```

## 🔍 **Révision des Commentaires**

### Checklist avant commit :
- [ ] Tous les commentaires sont en français
- [ ] Les commentaires expliquent le "pourquoi", pas le "quoi"
- [ ] Les règles métier sont documentées
- [ ] Les TODO sont catégorisés par priorité
- [ ] Pas de commentaires obsolètes
- [ ] Les fonctions complexes ont des exemples
- [ ] Les constantes importantes sont expliquées

### Révision mensuelle :
- Nettoyer les TODO terminés
- Mettre à jour la documentation
- Vérifier la cohérence des commentaires
- Ajouter des exemples si nécessaire

## 📚 **Exemples Complets**

### Composant React Native
```javascript
/**
 * Composant CarteAnnonce - Affichage d'une annonce immobilière
 * 
 * Affiche les informations principales d'une annonce sous forme de carte.
 * Gère les interactions utilisateur (favoris, partage, navigation).
 * Optimisé pour les listes avec React.memo.
 * 
 * @param {object} props - Propriétés du composant
 * @param {object} props.annonce - Données de l'annonce à afficher
 * @param {function} props.surClic - Callback appelé lors du clic sur la carte
 * @param {boolean} props.estFavori - Indique si l'annonce est en favoris
 * 
 * @example
 * <CarteAnnonce 
 *   annonce={annonce} 
 *   surClic={() => navigation.navigate('DetailAnnonce')}
 *   estFavori={favoris.includes(annonce.id)}
 * />
 */
const CarteAnnonce = React.memo(({ annonce, surClic, estFavori }) => {
  // État local pour gérer l'animation du bouton favori
  const [animationFavori, setAnimationFavori] = useState(new Animated.Value(1));
  
  // Fonction pour basculer l'état favori avec animation
  const basculerFavori = useCallback(() => {
    // Animation de "pulse" pour feedback visuel
    Animated.sequence([
      Animated.timing(animationFavori, { toValue: 1.2, duration: 100 }),
      Animated.timing(animationFavori, { toValue: 1, duration: 100 }),
    ]).start();
    
    // Logique métier : ajouter/retirer des favoris
    if (estFavori) {
      retirerDesFavoris(annonce.id);
    } else {
      ajouterAuxFavoris(annonce.id);
    }
  }, [annonce.id, estFavori]);
  
  return (
    // ... JSX du composant
  );
});
```

Cette approche garantit un code maintenable et compréhensible par toute l'équipe LogeVite ! 🚀
