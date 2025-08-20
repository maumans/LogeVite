import { COLORS } from './colors';

/**
 * Système de design LogeVite - Thème principal
 * 
 * Ce fichier centralise tous les tokens de design :
 * - Typographie (polices, tailles, hauteurs de ligne)
 * - Espacements (marges, paddings)
 * - Rayons de bordure
 * - Ombres et élévations
 * - Tailles de composants
 * - Animations et transitions
 */

// Échelle typographique - hiérarchie de texte cohérente
export const FONTS = {
  // Familles de polices - utilisées selon le contexte
  families: {
    // Poppins - pour les titres, boutons, éléments importants (plus moderne)
    poppins: {
      regular: 'Poppins-Regular',    // Poids normal - titres secondaires
      medium: 'Poppins-Medium',      // Poids moyen - boutons, liens
      semibold: 'Poppins-SemiBold',  // Semi-gras - titres de sections
      bold: 'Poppins-Bold',          // Gras - titres principaux
    },
    // Inter - pour le contenu, textes longs (meilleure lisibilité)
    inter: {
      regular: 'Inter-Regular',      // Poids normal - texte de contenu
      medium: 'Inter-Medium',        // Poids moyen - labels, métadonnées
      semibold: 'Inter-SemiBold',    // Semi-gras - textes importants
      bold: 'Inter-Bold',            // Gras - emphase forte
    },
  },

  // Tailles de police - échelle harmonieuse basée sur 16px
  sizes: {
    xs: 12,    // Très petit - mentions légales, métadonnées
    sm: 14,    // Petit - labels, textes d'aide
    base: 16,  // Base - texte de contenu principal
    lg: 18,    // Grand - sous-titres, textes importants
    xl: 20,    // Très grand - titres de sections
    '2xl': 24, // Extra large - titres de pages
    '3xl': 30, // Énorme - titres principaux
    '4xl': 36, // Géant - titres d'accueil, splash
  },

  // Hauteurs de ligne - pour une lisibilité optimale
  lineHeights: {
    xs: 16,    // 1.33 ratio - textes très compacts
    sm: 20,    // 1.43 ratio - textes compacts
    base: 24,  // 1.5 ratio - texte de contenu (idéal)
    lg: 28,    // 1.56 ratio - textes aérés
    xl: 28,    // 1.4 ratio - titres moyens
    '2xl': 32, // 1.33 ratio - grands titres
    '3xl': 36, // 1.2 ratio - très grands titres
    '4xl': 40, // 1.11 ratio - titres géants
  },
};

// Échelle d'espacement - système de 4px pour cohérence
// Basé sur un multiplicateur de 4 pour alignement pixel-perfect
export const SPACING = {
  0: 0,      // Aucun espacement
  1: 4,      // Très petit - espacement minimal entre éléments
  2: 8,      // Petit - espacement léger
  3: 12,     // Moyen-petit - espacement standard entre éléments
  4: 16,     // Moyen - espacement confortable (base)
  5: 20,     // Moyen-grand - espacement généreux
  6: 24,     // Grand - séparation de sections
  8: 32,     // Très grand - espacement important
  10: 40,    // Extra grand - séparation majeure
  12: 48,    // Énorme - espacement de layout
  16: 64,    // Géant - grandes séparations
  20: 80,    // Très géant - espacement de page
  24: 96,    // Ultra grand - marges importantes
  32: 128,   // Massif - espacement de layout majeur
  40: 160,   // Colossal - grandes marges de page
  48: 192,   // Titanesque - espacement extrême
  56: 224,   // Gigantesque - très grandes marges
  64: 256,   // Maximum - espacement maximum
};

// Échelle de rayons de bordure - pour coins arrondis cohérents
export const RADIUS = {
  none: 0,     // Aucun arrondi - éléments carrés, design strict
  sm: 4,       // Petit arrondi - badges, petits boutons
  base: 8,     // Arrondi standard - inputs, cartes simples
  md: 12,      // Arrondi moyen - boutons, cartes principales
  lg: 16,      // Grand arrondi - grandes cartes, modales
  xl: 20,      // Très grand arrondi - éléments décoratifs
  '2xl': 24,   // Extra large - grandes sections
  '3xl': 32,   // Énorme - éléments spéciaux
  full: 9999,  // Complètement rond - avatars, boutons ronds
};

// Système d'ombres - élévation et profondeur Material Design
// Compatible iOS et Android avec elevation pour Android
export const SHADOWS = {
  // Ombre légère - cartes au repos, élévation minimale
  sm: {
    shadowColor: COLORS.shadow.light,        // Couleur d'ombre légère
    shadowOffset: { width: 0, height: 1 },   // Décalage vertical minimal
    shadowOpacity: 1,                        // Opacité complète (couleur gère transparence)
    shadowRadius: 2,                         // Flou léger
    elevation: 1,                            // Élévation Android
  },
  // Ombre standard - cartes normales, boutons au repos
  base: {
    shadowColor: COLORS.shadow.medium,       // Couleur d'ombre moyenne
    shadowOffset: { width: 0, height: 1 },   // Décalage vertical léger
    shadowOpacity: 1,
    shadowRadius: 3,                         // Flou standard
    elevation: 2,                            // Élévation Android standard
  },
  // Ombre moyenne - cartes en survol, éléments interactifs
  md: {
    shadowColor: COLORS.shadow.medium,
    shadowOffset: { width: 0, height: 4 },   // Décalage plus marqué
    shadowOpacity: 1,
    shadowRadius: 6,                         // Flou plus important
    elevation: 4,                            // Élévation Android moyenne
  },
  // Ombre large - modales, menus déroulants
  lg: {
    shadowColor: COLORS.shadow.medium,
    shadowOffset: { width: 0, height: 10 },  // Décalage important
    shadowOpacity: 1,
    shadowRadius: 15,                        // Flou large
    elevation: 8,                            // Élévation Android élevée
  },
  // Ombre très large - modales principales, overlays
  xl: {
    shadowColor: COLORS.shadow.dark,         // Couleur d'ombre foncée
    shadowOffset: { width: 0, height: 20 },  // Décalage maximum
    shadowOpacity: 1,
    shadowRadius: 25,                        // Flou maximum
    elevation: 12,                           // Élévation Android maximum
  },
};

// Component sizes
export const SIZES = {
  // Button sizes
  button: {
    sm: {
      height: 36,
      paddingHorizontal: SPACING[3],
      fontSize: FONTS.sizes.sm,
    },
    md: {
      height: 44,
      paddingHorizontal: SPACING[4],
      fontSize: FONTS.sizes.base,
    },
    lg: {
      height: 52,
      paddingHorizontal: SPACING[6],
      fontSize: FONTS.sizes.lg,
    },
  },

  // Input sizes
  input: {
    sm: {
      height: 36,
      paddingHorizontal: SPACING[3],
      fontSize: FONTS.sizes.sm,
    },
    md: {
      height: 44,
      paddingHorizontal: SPACING[4],
      fontSize: FONTS.sizes.base,
    },
    lg: {
      height: 52,
      paddingHorizontal: SPACING[4],
      fontSize: FONTS.sizes.lg,
    },
  },

  // Icon sizes
  icon: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
  },

  // Avatar sizes
  avatar: {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    '2xl': 80,
    '3xl': 96,
  },
};

// Animation durations
export const ANIMATIONS = {
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

// Default theme object
export const THEME = {
  colors: COLORS,
  fonts: FONTS,
  spacing: SPACING,
  radius: RADIUS,
  shadows: SHADOWS,
  sizes: SIZES,
  animations: ANIMATIONS,
  breakpoints: BREAKPOINTS,
};

export default THEME;
