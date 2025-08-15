import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { COLORS, SIZES, RADIUS, FONTS } from '../../constants/theme';

/**
 * Reusable Button Component
 * @param {object} props - Component props
 * @param {string} props.title - Button text
 * @param {function} props.onPress - Press handler
 * @param {string} props.variant - Button variant (primary, secondary, outline, ghost)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {object} props.style - Additional styles
 * @param {object} props.textStyle - Additional text styles
 * @param {React.ReactNode} props.icon - Icon component
 * @param {string} props.iconPosition - Icon position (left, right)
 */
const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  style = {},
  textStyle = {},
  icon = null,
  iconPosition = 'left',
  ...props
}) => {
  // Get size configuration
  const sizeConfig = SIZES.button[size] || SIZES.button.md;
  
  // Base styles
  const baseStyle = {
    height: sizeConfig.height,
    paddingHorizontal: sizeConfig.paddingHorizontal,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: (disabled || loading) ? 0.6 : 1,
  };
  
  // Variant styles
  const variantStyles = {
    primary: {
      backgroundColor: COLORS.primary[500],
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: COLORS.secondary[500],
      borderWidth: 0,
    },
    accent: {
      backgroundColor: COLORS.accent[500],
      borderWidth: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: COLORS.primary[500],
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
    success: {
      backgroundColor: COLORS.success,
      borderWidth: 0,
    },
    warning: {
      backgroundColor: COLORS.warning,
      borderWidth: 0,
    },
    error: {
      backgroundColor: COLORS.error,
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
