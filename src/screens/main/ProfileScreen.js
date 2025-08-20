/**
 * Écran de Profil Utilisateur
 * 
 * Gestion du profil et paramètres utilisateur
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS } from '../../constants/colors';
import Header from '../../components/ui/Header';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import PhotoProfil from '../../components/ui/PhotoProfil';

const ProfileScreen = ({ navigation }) => {
  const { utilisateur, profilUtilisateur, seDeconnecter } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Déconnecter',
          style: 'destructive',
          onPress: async () => {
            try {
              await seDeconnecter();
            } catch (error) {
              console.error('Erreur lors de la déconnexion:', error);
            }
          }
        }
      ]
    );
  };

  const getUserTypeLabel = () => {
    switch (profilUtilisateur?.typeUtilisateur) {
      case 'particulier':
        return 'Particulier - Recherche';
      case 'mixte':
        return 'Particulier - Mixte';
      case 'professionnel':
        return 'Professionnel';
      case 'non_defini':
        return 'À définir';
      default:
        return 'Non défini';
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Mon Profil"
        subtitle="Gérez vos informations"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Carte de profil principal */}
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <PhotoProfil
              userId={utilisateur?.uid}
              photoUrl={profilUtilisateur?.photoProfil}
              size={120}
              editable={false}
            />
            
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {profilUtilisateur?.prenom && profilUtilisateur?.nom 
                  ? `${profilUtilisateur.prenom} ${profilUtilisateur.nom}`
                  : utilisateur?.displayName || 'Utilisateur'
                }
              </Text>
              <Text style={styles.profileEmail}>
                {utilisateur?.email}
              </Text>
              <Text style={styles.profileType}>
                {getUserTypeLabel()}
              </Text>
            </View>
          </View>
          
          {profilUtilisateur?.profilMinimal && (
            <View style={styles.incompleteWarning}>
              <Text style={styles.warningText}>
                ⚠️ Profil incomplet - Complétez vos informations pour une meilleure expérience
              </Text>
              <Button
                title="Compléter maintenant"
                onPress={() => navigation.getParent()?.navigate('Profile')}
                variant="primary"
                size="sm"
                style={styles.completeButton}
              />
            </View>
          )}
        </Card>

        {/* Informations utilisateur */}
        {!profilUtilisateur?.profilMinimal && (
          <Card style={styles.infoCard}>
            <Text style={styles.cardTitle}>Informations</Text>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Téléphone</Text>
              <Text style={styles.infoValue}>
                {profilUtilisateur?.telephone || 'Non renseigné'}
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Localisation</Text>
              <Text style={styles.infoValue}>
                {profilUtilisateur?.localisation?.ville || 'Non renseignée'}
                {profilUtilisateur?.localisation?.commune && 
                  `, ${profilUtilisateur.localisation.commune}`
                }
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Membre depuis</Text>
              <Text style={styles.infoValue}>
                {new Date().toLocaleDateString('fr-FR')}
              </Text>
            </View>
          </Card>
        )}

        {/* Actions */}
        <Card style={styles.actionsCard}>
          <Text style={styles.cardTitle}>Actions</Text>
          
          <Button
            title="Modifier mon profil"
            onPress={() => navigation.getParent()?.navigate('Profile', { screen: 'EditionProfil' })}
            variant="outline"
            size="lg"
            style={styles.actionButton}
          />
          
          <Button
            title="Paramètres"
            onPress={() => Alert.alert('Paramètres', 'Fonctionnalité bientôt disponible')}
            variant="outline"
            size="lg"
            style={styles.actionButton}
          />
          
          <Button
            title="Aide et Support"
            onPress={() => Alert.alert('Support', 'Contactez-nous à support@logevite.com')}
            variant="outline"
            size="lg"
            style={styles.actionButton}
          />
          
          <Button
            title="Se déconnecter"
            onPress={handleLogout}
            variant="outline"
            size="lg"
            style={[styles.actionButton, styles.logoutButton]}
          />
        </Card>

        {/* Espacement pour le bottom tab */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  content: {
    flex: 1,
    padding: 16
  },
  profileCard: {
    padding: 20,
    marginBottom: 16
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 16
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 4
  },
  profileEmail: {
    fontSize: 16,
    color: COLORS.text.secondary,
    marginBottom: 8
  },
  profileType: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    backgroundColor: `${COLORS.primary}15`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12
  },
  incompleteWarning: {
    backgroundColor: `${COLORS.warning}10`,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: `${COLORS.warning}30`,
    alignItems: 'center'
  },
  warningText: {
    fontSize: 14,
    color: COLORS.warning,
    textAlign: 'center',
    marginBottom: 12
  },
  completeButton: {
    width: '100%'
  },
  infoCard: {
    padding: 20,
    marginBottom: 16
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text.primary,
    marginBottom: 16
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200]
  },
  infoLabel: {
    fontSize: 16,
    color: COLORS.text.secondary,
    fontWeight: '500'
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.text.primary,
    textAlign: 'right',
    flex: 1,
    marginLeft: 16
  },
  actionsCard: {
    padding: 20,
    marginBottom: 16
  },
  actionButton: {
    marginBottom: 12
  },
  logoutButton: {
    borderColor: COLORS.error,
    marginTop: 8
  },
  bottomSpacer: {
    height: 20
  }
});

export default ProfileScreen;
