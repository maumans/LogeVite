import React from 'react';
import { View, Text } from 'react-native';
import { COLORS, RADIUS, FONTS } from '../../constants/theme';

/**
 * Reusable Badge Component
 * @param {object} props - Component props
 * @param {string} props.text - Badge text
 * @param {string} props.variant - Badge variant (primary, secondary, success, warning, error, info)
 * @param {string} props.size - Badge size (sm, md, lg)
 * @param {object} props.style - Additional container styles
 * @param {object} props.textStyle - Additional text styles
 */
const Badge = ({
  text,
  variant = 'primary',
  size = 'md',
  style = {},
  textStyle = {},
  ...props
}) => {
  // Size configurations
  const sizeConfig = {
    sm: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      fontSize: FONTS.sizes.xs,
      borderRadius: RADIUS.sm,
    },
    md: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      fontSize: FONTS.sizes.sm,
      borderRadius: RADIUS.base,
    },
    lg: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      fontSize: FONTS.sizes.base,
      borderRadius: RADIUS.md,
    },
  };
  
  // Variant styles
  const variantStyles = {
    primary: {
      backgroundColor: COLORS.primary[500],
      color: COLORS.white,
    },
    secondary: {
      backgroundColor: COLORS.secondary[500],
      color: COLORS.white,
    },
    accent: {
      backgroundColor: COLORS.accent[500],
      color: COLORS.white,
    },
    success: {
      backgroundColor: COLORS.success,
      color: COLORS.white,
    },
    warning: {
      backgroundColor: COLORS.warning,
      color: COLORS.white,
    },
    error: {
      backgroundColor: COLORS.error,
      color: COLORS.white,
    },
    info: {
      backgroundColor: COLORS.info,
      color: COLORS.white,
    },
    light: {
      backgroundColor: COLORS.gray[100],
      color: COLORS.gray[700],
    },
    dark: {
      backgroundColor: COLORS.gray[800],
      color: COLORS.white,
    },
    outline: {
      backgroundColor: 'transparent',
      color: COLORS.primary[500],
      borderWidth: 1,
      borderColor: COLORS.primary[500],
    },
  };
  
  const currentSize = sizeConfig[size] || sizeConfig.md;
  const currentVariant = variantStyles[variant] || variantStyles.primary;
  
  // Container styles
  const containerStyle = [
    {
      paddingHorizontal: currentSize.paddingHorizontal,
      paddingVertical: currentSize.paddingVertical,
      borderRadius: currentSize.borderRadius,
      backgroundColor: currentVariant.backgroundColor,
      alignSelf: 'flex-start',
      alignItems: 'center',
      justifyContent: 'center',
    },
    currentVariant.borderWidth && {
      borderWidth: currentVariant.borderWidth,
      borderColor: currentVariant.borderColor,
    },
    style,
  ];
  
  // Text styles
  const badgeTextStyle = [
    {
      fontSize: currentSize.fontSize,
      fontFamily: FONTS.families.inter.medium,
      color: currentVariant.color,
      textAlign: 'center',
    },
    textStyle,
  ];
  
  return (
    <View style={containerStyle} {...props}>
      <Text style={badgeTextStyle} numberOfLines={1}>
        {text}
      </Text>
    </View>
  );
};

export default Badge;
