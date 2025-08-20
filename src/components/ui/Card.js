import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/colors';
import { RADIUS, SHADOWS } from '../../constants/theme';

/**
 * Reusable Card Component
 * @param {object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {function} props.onPress - Press handler (makes card touchable)
 * @param {string} props.variant - Card variant (default, elevated, outlined)
 * @param {object} props.style - Additional styles
 * @param {boolean} props.disabled - Disabled state
 */
const Card = ({
  children,
  onPress,
  variant = 'default',
  style = {},
  disabled = false,
  ...props
}) => {
  // Base styles
  const baseStyle = {
    backgroundColor: COLORS.background.primary,
    borderRadius: RADIUS.lg,
    padding: 16,
    opacity: disabled ? 0.6 : 1,
  };
  
  // Variant styles
  const variantStyles = {
    default: {
      ...SHADOWS.sm,
    },
    elevated: {
      ...SHADOWS.lg,
    },
    outlined: {
      borderWidth: 1,
      borderColor: COLORS.border.light,
      shadowOpacity: 0,
      elevation: 0,
    },
    flat: {
      shadowOpacity: 0,
      elevation: 0,
    },
  };
  
  const cardStyle = [
    baseStyle,
    variantStyles[variant],
    style,
  ];
  
  // If onPress is provided, make it touchable
  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.7}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
  
  // Otherwise, render as View
  return (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );
};

export default Card;
