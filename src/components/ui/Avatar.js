import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { getInitials } from '../../utils/formatters';

/**
 * Reusable Avatar Component
 * @param {object} props - Component props
 * @param {string} props.source - Image source URI
 * @param {string} props.name - User name for initials fallback
 * @param {string} props.size - Avatar size (sm, md, lg, xl, 2xl, 3xl)
 * @param {function} props.onPress - Press handler
 * @param {object} props.style - Additional styles
 * @param {string} props.backgroundColor - Custom background color
 * @param {string} props.textColor - Custom text color
 * @param {boolean} props.showBorder - Show border
 * @param {string} props.borderColor - Border color
 */
const Avatar = ({
  source,
  name,
  size = 'md',
  onPress,
  style = {},
  backgroundColor,
  textColor,
  showBorder = false,
  borderColor = COLORS.border.light,
  ...props
}) => {
  // Get size configuration
  const avatarSize = SIZES.avatar[size] || SIZES.avatar.md;
  
  // Generate initials if no image
  const initials = getInitials(name);
  
  // Base styles
  const containerStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: backgroundColor || COLORS.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: showBorder ? 2 : 0,
    borderColor: borderColor,
    ...style,
  };
  
  // Text styles for initials
  const textStyle = {
    fontSize: avatarSize * 0.4,
    fontFamily: FONTS.families.poppins.semibold,
    color: textColor || COLORS.primary[700],
    textAlign: 'center',
  };
  
  // Image styles
  const imageStyle = {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  };
  
  const renderContent = () => {
    if (source) {
      return (
        <Image
          source={{ uri: source }}
          style={imageStyle}
          defaultSource={require('../../../assets/images/avatar-placeholder.png')}
        />
      );
    }
    
    return (
      <Text style={textStyle}>
        {initials || '?'}
      </Text>
    );
  };
  
  // If onPress is provided, make it touchable
  if (onPress) {
    return (
      <TouchableOpacity
        style={containerStyle}
        onPress={onPress}
        activeOpacity={0.7}
        {...props}
      >
        {renderContent()}
      </TouchableOpacity>
    );
  }
  
  // Otherwise, render as View
  return (
    <View style={containerStyle} {...props}>
      {renderContent()}
    </View>
  );
};

export default Avatar;
