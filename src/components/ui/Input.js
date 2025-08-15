import React, { useState, forwardRef } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { COLORS, SIZES, RADIUS, FONTS } from '../../constants/theme';

/**
 * Reusable Input Component
 * @param {object} props - Component props
 * @param {string} props.label - Input label
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.value - Input value
 * @param {function} props.onChangeText - Change handler
 * @param {string} props.error - Error message
 * @param {string} props.size - Input size (sm, md, lg)
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.required - Required field indicator
 * @param {boolean} props.secureTextEntry - Password field
 * @param {string} props.keyboardType - Keyboard type
 * @param {React.ReactNode} props.leftIcon - Left icon component
 * @param {React.ReactNode} props.rightIcon - Right icon component
 * @param {function} props.onRightIconPress - Right icon press handler
 * @param {object} props.style - Container styles
 * @param {object} props.inputStyle - Input styles
 * @param {boolean} props.multiline - Multiline input
 * @param {number} props.numberOfLines - Number of lines for multiline
 */
const Input = forwardRef(({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  size = 'md',
  disabled = false,
  required = false,
  secureTextEntry = false,
  keyboardType = 'default',
  leftIcon = null,
  rightIcon = null,
  onRightIconPress,
  style = {},
  inputStyle = {},
  multiline = false,
  numberOfLines = 1,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  
  // Get size configuration
  const sizeConfig = SIZES.input[size] || SIZES.input.md;
  
  // Container styles
  const containerStyle = [
    {
      marginBottom: 16,
    },
    style,
  ];
  
  // Label styles
  const labelStyle = {
    fontSize: FONTS.sizes.sm,
    fontFamily: FONTS.families.inter.medium,
    color: COLORS.text.primary,
    marginBottom: 8,
  };
  
  // Input container styles
  const inputContainerStyle = {
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    backgroundColor: COLORS.background.primary,
    borderWidth: 1,
    borderColor: error 
      ? COLORS.error 
      : isFocused 
        ? COLORS.primary[500] 
        : COLORS.border.light,
    borderRadius: RADIUS.md,
    paddingHorizontal: sizeConfig.paddingHorizontal,
    minHeight: multiline ? sizeConfig.height * numberOfLines : sizeConfig.height,
    opacity: disabled ? 0.6 : 1,
  };
  
  // Input styles
  const textInputStyle = [
    {
      flex: 1,
      fontSize: sizeConfig.fontSize,
      fontFamily: FONTS.families.inter.regular,
      color: COLORS.text.primary,
      paddingVertical: multiline ? 12 : 0,
      textAlignVertical: multiline ? 'top' : 'center',
    },
    inputStyle,
  ];
  
  // Error text styles
  const errorStyle = {
    fontSize: FONTS.sizes.sm,
    fontFamily: FONTS.families.inter.regular,
    color: COLORS.error,
    marginTop: 4,
  };
  
  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  // Render password toggle icon
  const renderPasswordToggle = () => {
    if (!secureTextEntry) return null;
    
    return (
      <TouchableOpacity
        onPress={togglePasswordVisibility}
        style={{ padding: 4, marginLeft: 8 }}
      >
        <Text style={{ fontSize: 16, color: COLORS.text.secondary }}>
          {isPasswordVisible ? '🙈' : '👁️'}
        </Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={containerStyle}>
      {/* Label */}
      {label && (
        <Text style={labelStyle}>
          {label}
          {required && <Text style={{ color: COLORS.error }}> *</Text>}
        </Text>
      )}
      
      {/* Input Container */}
      <View style={inputContainerStyle}>
        {/* Left Icon */}
        {leftIcon && (
          <View style={{ marginRight: 12 }}>
            {leftIcon}
          </View>
        )}
        
        {/* Text Input */}
        <TextInput
          ref={ref}
          style={textInputStyle}
          placeholder={placeholder}
          placeholderTextColor={COLORS.text.tertiary}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          {...props}
        />
        
        {/* Right Icon */}
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={{ marginLeft: 12 }}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
        
        {/* Password Toggle */}
        {renderPasswordToggle()}
      </View>
      
      {/* Error Message */}
      {error && <Text style={errorStyle}>{error}</Text>}
    </View>
  );
});

Input.displayName = 'Input';

export default Input;
