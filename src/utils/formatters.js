import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { fr } from 'date-fns/locale';

/**
 * Format price in Guinean Franc (GNF)
 * @param {number} price - Price in GNF
 * @param {boolean} showCurrency - Whether to show currency symbol
 * @returns {string} Formatted price
 */
export const formatPrice = (price, showCurrency = true) => {
  if (!price || price === 0) return showCurrency ? '0 GNF' : '0';
  
  const formatted = new Intl.NumberFormat('fr-FR', {
    style: showCurrency ? 'currency' : 'decimal',
    currency: 'GNF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
  
  // Replace EUR with GNF for proper display
  return showCurrency ? formatted.replace('EUR', 'GNF') : formatted;
};

/**
 * Format price in compact form (e.g., 1.5M GNF)
 * @param {number} price - Price in GNF
 * @returns {string} Compact formatted price
 */
export const formatPriceCompact = (price) => {
  if (!price || price === 0) return '0 GNF';
  
  if (price >= 1000000000) {
    return `${(price / 1000000000).toFixed(1)}Md GNF`;
  } else if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)}M GNF`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K GNF`;
  }
  
  return `${price} GNF`;
};

/**
 * Format phone number for Guinea
 * @param {string} phone - Phone number
 * @param {boolean} withCountryCode - Include country code
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone, withCountryCode = false) => {
  if (!phone) return '';
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle different input formats
  let number = cleaned;
  if (cleaned.startsWith('224')) {
    number = cleaned.slice(3); // Remove country code
  }
  
  // Format as XX XX XX XX
  if (number.length === 8) {
    const formatted = number.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    return withCountryCode ? `+224 ${formatted}` : formatted;
  }
  
  return phone; // Return original if can't format
};

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @param {string} formatType - Type of format (short, long, relative)
 * @returns {string} Formatted date
 */
export const formatDate = (date, formatType = 'short') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (formatType) {
    case 'relative':
      if (isToday(dateObj)) {
        return 'Aujourd\'hui';
      } else if (isYesterday(dateObj)) {
        return 'Hier';
      } else {
        return formatDistanceToNow(dateObj, { 
          addSuffix: true, 
          locale: fr 
        });
      }
    
    case 'long':
      return format(dateObj, 'EEEE dd MMMM yyyy', { locale: fr });
    
    case 'time':
      return format(dateObj, 'HH:mm', { locale: fr });
    
    case 'datetime':
      return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: fr });
    
    case 'short':
    default:
      return format(dateObj, 'dd/MM/yyyy', { locale: fr });
  }
};

/**
 * Format message time (smart format based on recency)
 * @param {Date|string} date - Message date
 * @returns {string} Formatted time
 */
export const formatMessageTime = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isToday(dateObj)) {
    return format(dateObj, 'HH:mm', { locale: fr });
  } else if (isYesterday(dateObj)) {
    return 'Hier';
  } else {
    return format(dateObj, 'dd/MM', { locale: fr });
  }
};

/**
 * Format distance
 * @param {number} distance - Distance in kilometers
 * @returns {string} Formatted distance
 */
export const formatDistance = (distance) => {
  if (!distance || distance === 0) return '';
  
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  } else if (distance < 10) {
    return `${distance.toFixed(1)}km`;
  } else {
    return `${Math.round(distance)}km`;
  }
};

/**
 * Format surface area
 * @param {number} surface - Surface in square meters
 * @returns {string} Formatted surface
 */
export const formatSurface = (surface) => {
  if (!surface || surface === 0) return '';
  
  return `${surface} m²`;
};

/**
 * Format number with thousand separators
 * @param {number} number - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (number) => {
  if (!number && number !== 0) return '';
  
  return new Intl.NumberFormat('fr-FR').format(number);
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Format property type for display
 * @param {string} type - Property type key
 * @returns {string} Display name
 */
export const formatPropertyType = (type) => {
  const types = {
    appartement: 'Appartement',
    maison: 'Maison',
    villa: 'Villa',
    terrain: 'Terrain',
    bureau: 'Bureau',
    commerce: 'Commerce',
    entrepot: 'Entrepôt',
  };
  
  return types[type] || type;
};

/**
 * Format transaction type for display
 * @param {string} type - Transaction type key
 * @returns {string} Display name
 */
export const formatTransactionType = (type) => {
  const types = {
    vente: 'Vente',
    location: 'Location',
  };
  
  return types[type] || type;
};

/**
 * Format user type for display
 * @param {string} type - User type key
 * @returns {string} Display name
 */
export const formatUserType = (type) => {
  const types = {
    particulier: 'Particulier',
    professionnel: 'Professionnel',
  };
  
  return types[type] || type;
};

/**
 * Format professional type for display
 * @param {string} type - Professional type key
 * @returns {string} Display name
 */
export const formatProfessionalType = (type) => {
  const types = {
    agence: 'Agence immobilière',
    demarcheur: 'Démarcheur',
    promoteur: 'Promoteur immobilier',
  };
  
  return types[type] || type;
};

/**
 * Generate initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '';
  
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};
