/**
 * Composant d'icône Material UI pour LogeVite
 * 
 * Utilise @expo/vector-icons avec le style Material Design
 * Fournit une interface unifiée pour toutes les icônes de l'application
 */

import React from 'react';
import { 
  MaterialIcons, 
  MaterialCommunityIcons, 
  Ionicons,
  FontAwesome5 
} from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const Icon = ({ 
  name, 
  set = 'MaterialIcons', 
  size = 24, 
  color = COLORS.text.primary,
  style,
  ...props 
}) => {
  // Sélectionner le bon set d'icônes
  const getIconComponent = () => {
    switch (set) {
      case 'MaterialIcons':
        return MaterialIcons;
      case 'MaterialCommunityIcons':
        return MaterialCommunityIcons;
      case 'Ionicons':
        return Ionicons;
      case 'FontAwesome5':
        return FontAwesome5;
      default:
        return MaterialIcons;
    }
  };

  const IconComponent = getIconComponent();

  return (
    <IconComponent
      name={name}
      size={size}
      color={color}
      style={style}
      {...props}
    />
  );
};

// Icônes prédéfinies pour Material UI
export const Icons = {
  // Authentification
  email: { name: 'email', set: 'MaterialIcons' },
  lock: { name: 'lock', set: 'MaterialIcons' },
  phone: { name: 'phone', set: 'MaterialIcons' },
  visibility: { name: 'visibility', set: 'MaterialIcons' },
  visibilityOff: { name: 'visibility-off', set: 'MaterialIcons' },
  person: { name: 'person', set: 'MaterialIcons' },
  
  // Navigation
  home: { name: 'home', set: 'MaterialIcons' },
  search: { name: 'search', set: 'MaterialIcons' },
  favorite: { name: 'favorite', set: 'MaterialIcons' },
  favoriteBorder: { name: 'favorite-border', set: 'MaterialIcons' },
  menu: { name: 'menu', set: 'MaterialIcons' },
  arrowBack: { name: 'arrow-back', set: 'MaterialIcons' },
  arrowForward: { name: 'arrow-forward', set: 'MaterialIcons' },
  
  // Actions
  add: { name: 'add', set: 'MaterialIcons' },
  edit: { name: 'edit', set: 'MaterialIcons' },
  delete: { name: 'delete', set: 'MaterialIcons' },
  save: { name: 'save', set: 'MaterialIcons' },
  share: { name: 'share', set: 'MaterialIcons' },
  moreVert: { name: 'more-vert', set: 'MaterialIcons' },
  
  // États
  error: { name: 'error', set: 'MaterialIcons' },
  warning: { name: 'warning', set: 'MaterialIcons' },
  info: { name: 'info', set: 'MaterialIcons' },
  checkCircle: { name: 'check-circle', set: 'MaterialIcons' },
  close: { name: 'close', set: 'MaterialIcons' },
  refresh: { name: 'refresh', set: 'MaterialIcons' },
  
  // Logement
  house: { name: 'house', set: 'MaterialCommunityIcons' },
  apartment: { name: 'apartment', set: 'MaterialIcons' },
  location: { name: 'location-on', set: 'MaterialIcons' },
  bed: { name: 'bed', set: 'MaterialCommunityIcons' },
  bath: { name: 'bathtub', set: 'MaterialIcons' },
  car: { name: 'directions-car', set: 'MaterialIcons' },
  
  // Social
  google: { name: 'google', set: 'MaterialCommunityIcons' },
  facebook: { name: 'facebook', set: 'MaterialCommunityIcons' },
  
  // Communication
  message: { name: 'message', set: 'MaterialIcons' },
  call: { name: 'call', set: 'MaterialIcons' },
  notifications: { name: 'notifications', set: 'MaterialIcons' },
  
  // Filtres et tri
  filter: { name: 'filter-list', set: 'MaterialIcons' },
  sort: { name: 'sort', set: 'MaterialIcons' },
  tune: { name: 'tune', set: 'MaterialIcons' },
  
  // Profil
  account: { name: 'account-circle', set: 'MaterialCommunityIcons' },
  settings: { name: 'settings', set: 'MaterialIcons' },
  logout: { name: 'logout', set: 'MaterialIcons' },
  
  // Utilitaires
  camera: { name: 'camera-alt', set: 'MaterialIcons' },
  image: { name: 'image', set: 'MaterialIcons' },
  attachment: { name: 'attach-file', set: 'MaterialIcons' },
  calendar: { name: 'calendar-today', set: 'MaterialIcons' },
  clock: { name: 'access-time', set: 'MaterialIcons' }
};

export default Icon;
