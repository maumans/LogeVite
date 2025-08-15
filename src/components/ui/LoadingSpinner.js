import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

/**
 * Reusable Loading Spinner Component
 * @param {object} props - Component props
 * @param {string} props.size - Spinner size (small, large, or number)
 * @param {string} props.color - Spinner color
 * @param {string} props.text - Loading text
 * @param {boolean} props.overlay - Show as overlay
 * @param {object} props.style - Additional styles
 */
const LoadingSpinner = ({
  size = 'large',
  color = COLORS.primary[500],
  text,
  overlay = false,
  style = {},
  ...props
}) => {
  // Base container styles
  const containerStyle = [
    {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    overlay && {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      zIndex: 1000,
    },
    style,
  ];
  
  // Text styles
  const textStyle = {
    marginTop: 12,
    fontSize: FONTS.sizes.base,
    fontFamily: FONTS.families.inter.medium,
    color: COLORS.text.secondary,
    textAlign: 'center',
  };
  
  return (
    <View style={containerStyle} {...props}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={textStyle}>{text}</Text>}
    </View>
  );
};

export default LoadingSpinner;
