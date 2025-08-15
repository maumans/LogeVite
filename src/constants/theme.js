import { COLORS } from './colors';

// Typography scale
export const FONTS = {
  // Font families
  families: {
    poppins: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      semibold: 'Poppins-SemiBold',
      bold: 'Poppins-Bold',
    },
    inter: {
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      semibold: 'Inter-SemiBold',
      bold: 'Inter-Bold',
    },
  },

  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  // Line heights
  lineHeights: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 28,
    '2xl': 32,
    '3xl': 36,
    '4xl': 40,
  },
};

// Spacing scale
export const SPACING = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  56: 224,
  64: 256,
};

// Border radius scale
export const RADIUS = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// Shadows
export const SHADOWS = {
  sm: {
    shadowColor: COLORS.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: COLORS.shadow.medium,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: COLORS.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: COLORS.shadow.medium,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 8,
  },
  xl: {
    shadowColor: COLORS.shadow.dark,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 25,
    elevation: 12,
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
