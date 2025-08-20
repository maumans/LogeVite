import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../../constants/colors';
import { SIZES, RADIUS, FONTS } from '../../constants/theme';

/**
 * Composant Bouton Réutilisable - LogeVite
 * 
 * Bouton principal de l'application avec support de multiples variants,
 * tailles, états de chargement et icônes.
 * 
 * Variants disponibles :
 * - primary : Bouton principal (vert LogeVite)
 * - secondary : Bouton secondaire (orange LogeVite) 
 * - accent : Bouton d'accent (bleu)
 * - outline : Bouton avec bordure uniquement
 * - ghost : Bouton transparent
 * - success/warning/error : Boutons sémantiques
 * 
 * @param {object} props - Propriétés du composant
 * @param {string} props.title - Texte affiché sur le bouton
 * @param {function} props.onPress - Fonction appelée lors du clic
 * @param {string} props.variant - Variant du bouton (primary, secondary, outline, ghost, etc.)
 * @param {string} props.size - Taille du bouton (sm, md, lg)
 * @param {boolean} props.disabled - État désactivé du bouton
 * @param {boolean} props.loading - État de chargement (affiche un spinner)
 * @param {object} props.style - Styles additionnels pour le conteneur
 * @param {object} props.textStyle - Styles additionnels pour le texte
 * @param {React.ReactNode} props.icon - Composant icône à afficher
 * @param {string} props.iconPosition - Position de l'icône (left, right)
 */
const Button = ({
  title,
  onPress,
  variant = 'primary',        // Variant par défaut : bouton principal
  size = 'md',               // Taille par défaut : moyenne
  disabled = false,          // Non désactivé par défaut
  loading = false,           // Pas en chargement par défaut
  style = {},               // Styles personnalisés vides par défaut
  textStyle = {},           // Styles de texte personnalisés vides
  icon = null,              // Pas d'icône par défaut
  iconPosition = 'left',    // Icône à gauche par défaut
  ...props                  // Autres props React Native
}) => {
  // Récupération de la configuration de taille depuis le thème
  // Fallback sur 'md' si la taille demandée n'existe pas
  const sizeConfig = SIZES.button[size] || SIZES.button.md;
  
  // Styles de base appliqués à tous les boutons
  const baseStyle = {
    height: sizeConfig.height,                    // Hauteur selon la taille
    paddingHorizontal: sizeConfig.paddingHorizontal, // Padding horizontal
    borderRadius: RADIUS.md,                      // Coins arrondis moyens
    flexDirection: 'row',                         // Layout horizontal pour icône + texte
    alignItems: 'center',                         // Centrage vertical
    justifyContent: 'center',                     // Centrage horizontal
    opacity: (disabled || loading) ? 0.6 : 1,    // Opacité réduite si désactivé/chargement
  };
  
  // Styles spécifiques à chaque variant de bouton
  const variantStyles = {
    // Bouton principal - vert LogeVite, utilisé pour actions importantes
    primary: {
      backgroundColor: COLORS.primary[500],  // Fond vert principal
      borderWidth: 0,                        // Pas de bordure
    },
    // Bouton secondaire - orange LogeVite, pour actions secondaires
    secondary: {
      backgroundColor: COLORS.secondary[500], // Fond orange secondaire
      borderWidth: 0,
    },
    // Bouton d'accent - bleu, pour actions spéciales
    accent: {
      backgroundColor: COLORS.accent[500],    // Fond bleu d'accent
      borderWidth: 0,
    },
    // Bouton outline - transparent avec bordure, style discret
    outline: {
      backgroundColor: 'transparent',         // Fond transparent
      borderWidth: 1,                         // Bordure fine
      borderColor: COLORS.primary[500],       // Bordure verte
    },
    // Bouton ghost - complètement transparent, très discret
    ghost: {
      backgroundColor: 'transparent',         // Fond transparent
      borderWidth: 0,                         // Pas de bordure
    },
    // Boutons sémantiques - pour actions avec signification particulière
    success: {
      backgroundColor: COLORS.success,        // Fond vert de succès
      borderWidth: 0,
    },
    warning: {
      backgroundColor: COLORS.warning,        // Fond orange d'alerte
      borderWidth: 0,
    },
    error: {
      backgroundColor: COLORS.error,          // Fond rouge d'erreur
      borderWidth: 0,
    },
  };
  
  // Text styles
  const baseTextStyle = {
    fontSize: sizeConfig.fontSize,
    fontFamily: FONTS.families.poppins.medium,
    textAlign: 'center',
  };
  
  const variantTextStyles = {
    primary: {
      color: COLORS.white,
    },
    secondary: {
      color: COLORS.white,
    },
    accent: {
      color: COLORS.white,
    },
    outline: {
      color: COLORS.primary[500],
    },
    ghost: {
      color: COLORS.primary[500],
    },
    success: {
      color: COLORS.white,
    },
    warning: {
      color: COLORS.white,
    },
    error: {
      color: COLORS.white,
    },
  };
  
  const buttonStyle = [
    baseStyle,
    variantStyles[variant],
    style,
  ];
  
  const textStyles = [
    baseTextStyle,
    variantTextStyles[variant],
    textStyle,
  ];
  
  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={variantTextStyles[variant].color}
        />
      );
    }
    
    const textElement = <Text style={textStyles}>{title}</Text>;
    
    if (!icon) {
      return textElement;
    }
    
    if (iconPosition === 'right') {
      return (
        <>
          {textElement}
          <React.Fragment style={{ marginLeft: 8 }}>
            {icon}
          </React.Fragment>
        </>
      );
    }
    
    return (
      <>
        <React.Fragment style={{ marginRight: 8 }}>
          {icon}
        </React.Fragment>
        {textElement}
      </>
    );
  };
  
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
