/**
 * Composant PhotoProfil
 * 
 * Gère l'affichage et la modification de la photo de profil utilisateur
 * Permet la sélection depuis la galerie ou l'appareil photo
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  StyleSheet 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../../constants/colors';
import { uploaderPhotoProfile } from '../../services/storageService';

const PhotoProfil = ({ 
  userId,
  photoUrl,
  onPhotoChange,
  size = 120,
  editable = true,
  style = {}
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  /**
   * Demander les permissions pour accéder aux photos et à la caméra
   */
  const demanderPermissions = async () => {
    try {
      // Permission pour la galerie
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      // Permission pour la caméra
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (galleryStatus !== 'granted' && cameraStatus !== 'granted') {
        Alert.alert(
          'Permissions requises',
          'L\'application a besoin d\'accéder à votre galerie et/ou caméra pour changer votre photo de profil.'
        );
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Erreur permissions:', error);
      return false;
    }
  };

  /**
   * Afficher les options de sélection d'image
   */
  const afficherOptionsSelection = () => {
    Alert.alert(
      'Photo de profil',
      'Choisissez une option',
      [
        {
          text: 'Galerie',
          onPress: () => selectionnerImage('galerie')
        },
        {
          text: 'Appareil photo',
          onPress: () => selectionnerImage('camera')
        },
        {
          text: 'Supprimer',
          onPress: () => supprimerPhoto(),
          style: 'destructive'
        },
        {
          text: 'Annuler',
          style: 'cancel'
        }
      ]
    );
  };

  /**
   * Sélectionner une image depuis la galerie ou l'appareil photo
   * @param {string} source - 'galerie' ou 'camera'
   */
  const selectionnerImage = async (source) => {
    try {
      const hasPermission = await demanderPermissions();
      if (!hasPermission) return;

      let result;
      
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: false
      };

      if (source === 'camera') {
        result = await ImagePicker.launchCameraAsync(options);
      } else {
        result = await ImagePicker.launchImageLibraryAsync(options);
      }

      if (!result.canceled && result.assets[0]) {
        await uploaderNouvellePhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erreur sélection image:', error);
      Alert.alert('Erreur', 'Impossible de sélectionner l\'image');
    }
  };

  /**
   * Uploader la nouvelle photo vers Firebase Storage
   * @param {string} uri - URI locale de l'image
   */
  const uploaderNouvellePhoto = async (uri) => {
    if (!userId) {
      Alert.alert('Erreur', 'Utilisateur non connecté');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const nouvellePhotoUrl = await uploaderPhotoProfile(
        userId, 
        uri, 
        (progress) => setUploadProgress(progress)
      );

      // Callback pour notifier le parent du changement
      if (onPhotoChange) {
        onPhotoChange(nouvellePhotoUrl);
      }

      Alert.alert('Succès', 'Photo de profil mise à jour !');
    } catch (error) {
      console.error('Erreur upload photo:', error);
      Alert.alert('Erreur', 'Impossible de télécharger la photo');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  /**
   * Supprimer la photo de profil actuelle
   */
  const supprimerPhoto = () => {
    Alert.alert(
      'Supprimer la photo',
      'Êtes-vous sûr de vouloir supprimer votre photo de profil ?',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => {
            if (onPhotoChange) {
              onPhotoChange(null);
            }
          }
        }
      ]
    );
  };

  /**
   * Obtenir les initiales de l'utilisateur pour l'avatar par défaut
   */
  const obtenirInitiales = () => {
    // Cette fonction pourrait recevoir le nom de l'utilisateur en props
    // Pour l'instant, on utilise une valeur par défaut
    return 'U';
  };

  const containerSize = { width: size, height: size };
  const borderRadius = size / 2;

  return (
    <View style={[styles.container, containerSize, style]}>
      <TouchableOpacity
        style={[styles.photoContainer, containerSize, { borderRadius }]}
        onPress={editable ? afficherOptionsSelection : null}
        disabled={uploading}
        activeOpacity={editable ? 0.7 : 1}
      >
        {photoUrl ? (
          <Image
            source={{ uri: photoUrl }}
            style={[styles.photo, containerSize, { borderRadius }]}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholder, containerSize, { borderRadius }]}>
            <Text style={[styles.initiales, { fontSize: size * 0.4 }]}>
              {obtenirInitiales()}
            </Text>
          </View>
        )}

        {/* Overlay d'édition */}
        {editable && (
          <View style={[styles.editOverlay, { borderRadius }]}>
            <Text style={styles.editIcon}>📷</Text>
          </View>
        )}

        {/* Indicateur de chargement */}
        {uploading && (
          <View style={[styles.loadingOverlay, containerSize, { borderRadius }]}>
            <ActivityIndicator color={COLORS.white} size="large" />
            <Text style={styles.progressText}>
              {Math.round(uploadProgress)}%
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Badge en ligne si en cours d'upload */}
      {uploading && (
        <View style={styles.uploadingBadge}>
          <Text style={styles.uploadingText}>Upload...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  photoContainer: {
    position: 'relative',
    backgroundColor: COLORS.grey[100],
    borderWidth: 3,
    borderColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  photo: {
    backgroundColor: COLORS.grey[200]
  },
  placeholder: {
    backgroundColor: COLORS.grey[300],
    alignItems: 'center',
    justifyContent: 'center'
  },
  initiales: {
    color: COLORS.grey[600],
    fontWeight: 'bold'
  },
  editOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%'
  },
  editIcon: {
    fontSize: 20
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressText: {
    color: COLORS.white,
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600'
  },
  uploadingBadge: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10
  },
  uploadingText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '600'
  }
});

export default PhotoProfil;
