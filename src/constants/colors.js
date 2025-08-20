/**
 * Constantes de couleurs pour l'application LogeVite
 * Basées sur les couleurs du drapeau guinéen et les principes d'UI moderne
 * 
 * Palette principale :
 * - Vert (drapeau guinéen) : couleur primaire pour actions importantes
 * - Orange/Or (drapeau guinéen) : couleur secondaire pour accents
 * - Bleu : couleur d'accent pour informations et liens
 */

export const COLORS = {
  // Couleurs primaires (Vert - drapeau guinéen)
  // Utilisées pour les boutons principaux, liens actifs, états sélectionnés
  primary: {
    50: '#ecfdf5',   // Vert très clair (arrière-plans)
    100: '#d1fae5',  // Vert clair (survol léger)
    200: '#a7f3d0',  // Vert pastel
    300: '#6ee7b7',  // Vert moyen clair
    400: '#34d399',  // Vert moyen
    500: '#10b981',  // Vert principal - couleur de base LogeVite
    600: '#059669',  // Vert foncé (survol boutons)
    700: '#047857',  // Vert très foncé
    800: '#065f46',  // Vert sombre
    900: '#064e3b',  // Vert le plus sombre
  },

  // Couleurs secondaires (Orange/Or - drapeau guinéen)
  // Utilisées pour les accents, alertes importantes, prix
  secondary: {
    50: '#fffbeb',   // Orange très clair
    100: '#fef3c7',  // Orange clair
    200: '#fde68a',  // Orange pastel
    300: '#fcd34d',  // Orange moyen clair
    400: '#fbbf24',  // Orange moyen
    500: '#f59e0b',  // Orange principal - couleur d'accent LogeVite
    600: '#d97706',  // Orange foncé
    700: '#b45309',  // Orange très foncé
    800: '#92400e',  // Orange sombre
    900: '#78350f',  // Orange le plus sombre
  },

  // Couleurs d'accent (Bleu)
  // Utilisées pour les informations, liens, éléments interactifs
  accent: {
    50: '#eff6ff',   // Bleu très clair
    100: '#dbeafe',  // Bleu clair
    200: '#bfdbfe',  // Bleu pastel
    300: '#93c5fd',  // Bleu moyen clair
    400: '#60a5fa',  // Bleu moyen
    500: '#3b82f6',  // Bleu principal
    600: '#2563eb',  // Bleu foncé
    700: '#1d4ed8',  // Bleu très foncé
    800: '#1e40af',  // Bleu sombre
    900: '#1e3a8a',  // Bleu le plus sombre
  },

  // Couleurs sémantiques - significations universelles
  success: '#10b981', // Vert - succès, validation, disponible
  warning: '#f59e0b', // Orange - attention, en attente
  error: '#ef4444',   // Rouge - erreur, danger, indisponible
  info: '#3b82f6',    // Bleu - information, conseil

  // Couleurs neutres de base
  white: '#ffffff', // Blanc pur - arrière-plans principaux
  black: '#000000', // Noir pur - textes de contraste maximum
  
  // Échelle de gris - pour textes, bordures, arrière-plans secondaires
  gray: {
    50: '#f8fafc',   // Gris très clair - arrière-plans subtils
    100: '#f1f5f9',  // Gris clair - séparateurs légers
    200: '#e2e8f0',  // Gris pastel - bordures principales
    300: '#cbd5e1',  // Gris moyen clair - bordures moyennes
    400: '#94a3b8',  // Gris moyen - textes secondaires, icônes inactives
    500: '#64748b',  // Gris équilibré - textes tertiaires
    600: '#475569',  // Gris foncé - textes secondaires
    700: '#334155',  // Gris très foncé - textes importants
    800: '#1e293b',  // Gris sombre - titres, textes principaux
    900: '#0f172a',  // Gris le plus sombre - textes critiques
  },

  // Alias pour compatibilité (grey = gray)
  grey: {
    50: '#f8fafc',   // Gris très clair - arrière-plans subtils
    100: '#f1f5f9',  // Gris clair - séparateurs légers
    200: '#e2e8f0',  // Gris pastel - bordures principales
    300: '#cbd5e1',  // Gris moyen clair - bordures moyennes
    400: '#94a3b8',  // Gris moyen - textes secondaires, icônes inactives
    500: '#64748b',  // Gris équilibré - textes tertiaires
    600: '#475569',  // Gris foncé - textes secondaires
    700: '#334155',  // Gris très foncé - textes importants
    800: '#1e293b',  // Gris sombre - titres, textes principaux
    900: '#0f172a',  // Gris le plus sombre - textes critiques
  },

  // Couleurs d'arrière-plan - hiérarchie visuelle
  background: {
    primary: '#ffffff',   // Blanc - arrière-plan principal des cartes, modales
    secondary: '#f8fafc', // Gris très clair - arrière-plan de l'app
    tertiary: '#f1f5f9',  // Gris clair - zones de contenu secondaire
  },

  // Couleurs de texte - hiérarchie de lecture
  text: {
    primary: '#0f172a',   // Gris très sombre - titres, textes importants
    secondary: '#475569', // Gris foncé - textes de contenu
    tertiary: '#94a3b8',  // Gris moyen - textes d'aide, métadonnées
    inverse: '#ffffff',   // Blanc - texte sur fond sombre
  },

  // Couleurs de bordures - séparation visuelle
  border: {
    light: '#e2e8f0',  // Bordure légère - séparateurs subtils
    medium: '#cbd5e1', // Bordure moyenne - contours de composants
    dark: '#94a3b8',   // Bordure foncée - éléments actifs
  },

  // Couleurs d'ombres - profondeur et élévation
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',  // Ombre légère - cartes au repos
    medium: 'rgba(0, 0, 0, 0.1)',  // Ombre moyenne - cartes en survol
    dark: 'rgba(0, 0, 0, 0.25)',   // Ombre forte - modales, menus
  },
};

// Accès rapide aux couleurs principales - pour usage fréquent
// Évite d'avoir à écrire COLORS.primary[500] à chaque fois
export const PRIMARY = COLORS.primary[500];   // #10b981 - Vert LogeVite
export const SECONDARY = COLORS.secondary[500]; // #f59e0b - Orange LogeVite
export const ACCENT = COLORS.accent[500];     // #3b82f6 - Bleu d'accent
export const SUCCESS = COLORS.success;       // #10b981 - Vert de succès
export const WARNING = COLORS.warning;       // #f59e0b - Orange d'alerte
export const ERROR = COLORS.error;           // #ef4444 - Rouge d'erreur
export const INFO = COLORS.info;             // #3b82f6 - Bleu d'information

// Export par défaut pour import facile
export default COLORS;
