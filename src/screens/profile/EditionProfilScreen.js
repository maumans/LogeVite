/**
 * Écran d'édition du profil utilisateur
 * 
 * Permet de modifier toutes les informations du profil avec un affichage
 * adaptatif selon le type d'utilisateur (particulier, professionnel, mixte)
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Button, Input } from '../../components/ui';
import PhotoProfil from '../../components/ui/PhotoProfil';
import { COLORS } from '../../constants/colors';
import { useProfil } from '../../hooks/useProfil';

const EditionProfilScreen = ({ navigation }) => {
  const {
    formData,
    chargement,
    erreur,
    mettreAJourChamp,
    mettreAJourLocalisation,
    mettreAJourProfessionnel,
    mettreAJourPreferences,
    mettreAJourReseauxSociaux,
    toggleSpecialite,
    toggleTypeBien,
    sauvegarderProfil,
    estParticulier,
    estProfessionnel,
    estMixte,
    profilComplet
  } = useProfil();

  /**
   * Gérer le changement de photo de profil
   */
  const gererChangementPhoto = (nouvellePhotoUrl) => {
    mettreAJourChamp('photoProfil', nouvellePhotoUrl);
  };

  /**
   * Sauvegarder les modifications
   */
  const sauvegarder = async () => {
    const succes = await sauvegarderProfil();
    if (succes) {
      Alert.alert(
        'Succès',
        'Votre profil a été mis à jour avec succès !',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } else if (erreur) {
      Alert.alert('Erreur', erreur);
    }
  };

  /**
   * Afficher le badge de type d'utilisateur
   */
  const BadgeTypeUtilisateur = () => {
    const getBadgeStyle = () => {
      if (estProfessionnel) return { backgroundColor: COLORS.primary, color: COLORS.white };
      if (estMixte) return { backgroundColor: COLORS.secondary, color: COLORS.white };
      return { backgroundColor: COLORS.gray[300], color: COLORS.gray[700] };
    };

    const getTypeLabel = () => {
      if (estProfessionnel) return 'PROFESSIONNEL';
      if (estMixte) return 'MIXTE';
      return 'PARTICULIER';
    };

    const style = getBadgeStyle();
    
    return (
      <View style={[styles.badge, { backgroundColor: style.backgroundColor }]}>
        <Text style={[styles.badgeText, { color: style.color }]}>
          {getTypeLabel()}
        </Text>
      </View>
    );
  };

  /**
   * Afficher les informations de capacité selon le type
   */
  const CapacitesInfo = () => {
    if (estParticulier) {
      return (
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>Capacités Particulier</Text>
          <Text style={styles.infoText}>• Recherche de biens immobiliers</Text>
          <Text style={styles.infoText}>• Sauvegarde de favoris</Text>
          <Text style={styles.infoText}>• Création de demandes personnalisées</Text>
        </Card>
      );
    }

    if (estProfessionnel) {
      return (
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>Capacités Professionnel</Text>
          <Text style={styles.infoText}>• Publication illimitée d'annonces</Text>
          <Text style={styles.infoText}>• Gestion complète de votre portefeuille</Text>
          <Text style={styles.infoText}>• Accès aux outils d'analyse</Text>
        </Card>
      );
    }

    if (estMixte) {
      return (
        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>Capacités Mixte</Text>
          <Text style={styles.infoText}>• Recherche de biens (illimitée)</Text>
          <Text style={styles.infoText}>• Publication limitée (5 annonces max)</Text>
          <Text style={styles.infoText}>• Idéal pour investisseurs particuliers</Text>
        </Card>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <Button
            title="Annuler"
            onPress={() => navigation.goBack()}
            variant="ghost"
            size="sm"
          />
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Éditer le profil</Text>
            <BadgeTypeUtilisateur />
          </View>
          <Button
            title={chargement ? "..." : "Sauvegarder"}
            onPress={sauvegarder}
            variant="primary"
            size="sm"
            disabled={chargement}
          />
        </View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Informations de capacité */}
          <CapacitesInfo />

          {/* Photo de profil */}
          <View style={styles.photoSection}>
            <PhotoProfil
              userId={formData.userId}
              photoUrl={formData.photoProfil}
              onPhotoChange={gererChangementPhoto}
              size={120}
              editable={true}
            />
            <Text style={styles.photoHint}>
              Touchez pour changer votre photo
            </Text>
          </View>

          {/* Informations personnelles */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Informations personnelles</Text>
            
            <Input
              label="Prénom *"
              value={formData.prenom}
              onChangeText={(text) => mettreAJourChamp('prenom', text)}
              placeholder="Votre prénom"
              autoCapitalize="words"
            />

            <Input
              label="Nom *"
              value={formData.nom}
              onChangeText={(text) => mettreAJourChamp('nom', text)}
              placeholder="Votre nom"
              autoCapitalize="words"
            />

            <Input
              label="Téléphone *"
              value={formData.telephone}
              onChangeText={(text) => mettreAJourChamp('telephone', text)}
              placeholder="+224 XX XX XX XX"
              keyboardType="phone-pad"
            />

            <Input
              label="Email"
              value={formData.email}
              onChangeText={(text) => mettreAJourChamp('email', text)}
              placeholder="votre@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </Card>

          {/* Localisation */}
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Localisation</Text>
            
            <Input
              label="Ville *"
              value={formData.localisation.ville}
              onChangeText={(text) => mettreAJourLocalisation('ville', text)}
              placeholder="Ex: Conakry"
              autoCapitalize="words"
            />

            <Input
              label="Commune"
              value={formData.localisation.commune}
              onChangeText={(text) => mettreAJourLocalisation('commune', text)}
              placeholder="Ex: Kaloum"
              autoCapitalize="words"
            />

            <Input
              label="Quartier"
              value={formData.localisation.quartier}
              onChangeText={(text) => mettreAJourLocalisation('quartier', text)}
              placeholder="Ex: Almamya"
              autoCapitalize="words"
            />
          </Card>

          {/* Informations professionnelles */}
          {(estProfessionnel || estMixte) && (
            <Card style={styles.section}>
              <Text style={styles.sectionTitle}>Informations professionnelles</Text>
              
              <Input
                label="Nom de l'entreprise *"
                value={formData.professionnel.nomEntreprise}
                onChangeText={(text) => mettreAJourProfessionnel('nomEntreprise', text)}
                placeholder="Nom de votre entreprise"
                autoCapitalize="words"
              />

              <Input
                label="Type de professionnel"
                value={formData.professionnel.typeProfessionnel}
                onChangeText={(text) => mettreAJourProfessionnel('typeProfessionnel', text)}
                placeholder="Ex: Agent immobilier, Promoteur"
                autoCapitalize="words"
              />

              <Input
                label="Numéro d'agrément"
                value={formData.professionnel.numeroAgrement}
                onChangeText={(text) => mettreAJourProfessionnel('numeroAgrement', text)}
                placeholder="Numéro d'agrément officiel"
              />

              <Input
                label="Description"
                value={formData.professionnel.descriptionEntreprise}
                onChangeText={(text) => mettreAJourProfessionnel('descriptionEntreprise', text)}
                placeholder="Décrivez votre activité"
                multiline={true}
                numberOfLines={3}
                maxLength={500}
              />

              <Input
                label="Adresse de l'entreprise"
                value={formData.professionnel.adresseEntreprise}
                onChangeText={(text) => mettreAJourProfessionnel('adresseEntreprise', text)}
                placeholder="Adresse complète"
                multiline={true}
                numberOfLines={2}
              />

              {/* Spécialités */}
              <View style={styles.specialitesSection}>
                <Text style={styles.subsectionTitle}>Spécialités *</Text>
                <View style={styles.specialitesGrid}>
                  {['Appartement', 'Maison', 'Terrain', 'Bureau', 'Commerce', 'Villa'].map((specialite) => (
                    <Button
                      key={specialite}
                      title={specialite}
                      variant={formData.professionnel.specialites.includes(specialite) ? 'primary' : 'outline'}
                      size="sm"
                      onPress={() => toggleSpecialite(specialite)}
                      style={styles.specialiteButton}
                    />
                  ))}
                </View>
              </View>

              {/* Réseaux sociaux */}
              <View style={styles.reseauxSection}>
                <Text style={styles.subsectionTitle}>Réseaux sociaux</Text>
                
                <Input
                  label="Facebook"
                  value={formData.professionnel.reseauxSociaux.facebook}
                  onChangeText={(text) => mettreAJourReseauxSociaux('facebook', text)}
                  placeholder="Lien vers votre page Facebook"
                  autoCapitalize="none"
                />

                <Input
                  label="WhatsApp"
                  value={formData.professionnel.reseauxSociaux.whatsapp}
                  onChangeText={(text) => mettreAJourReseauxSociaux('whatsapp', text)}
                  placeholder="Numéro WhatsApp"
                  keyboardType="phone-pad"
                />

                <Input
                  label="Telegram"
                  value={formData.professionnel.reseauxSociaux.telegram}
                  onChangeText={(text) => mettreAJourReseauxSociaux('telegram', text)}
                  placeholder="Nom d'utilisateur Telegram"
                  autoCapitalize="none"
                />

                <Input
                  label="Site web"
                  value={formData.professionnel.reseauxSociaux.siteWeb}
                  onChangeText={(text) => mettreAJourReseauxSociaux('siteWeb', text)}
                  placeholder="https://votre-site.com"
                  autoCapitalize="none"
                  keyboardType="url"
                />
              </View>
            </Card>
          )}

          {/* Préférences de recherche (particuliers et mixte) */}
          {(estParticulier || estMixte) && (
            <Card style={styles.section}>
              <Text style={styles.sectionTitle}>Préférences de recherche</Text>
              
              {/* Types de biens */}
              <View style={styles.typesSection}>
                <Text style={styles.subsectionTitle}>Types de biens recherchés *</Text>
                <View style={styles.typesGrid}>
                  {['Appartement', 'Maison', 'Terrain', 'Bureau', 'Commerce', 'Villa'].map((type) => (
                    <Button
                      key={type}
                      title={type}
                      variant={formData.preferences.typeBien.includes(type) ? 'primary' : 'outline'}
                      size="sm"
                      onPress={() => toggleTypeBien(type)}
                      style={styles.typeButton}
                    />
                  ))}
                </View>
              </View>

              {/* Budget */}
              <View style={styles.row}>
                <Input
                  label="Budget min (GNF)"
                  value={formData.preferences.budgetMin}
                  onChangeText={(text) => mettreAJourPreferences('budgetMin', text)}
                  placeholder="Ex: 500000"
                  keyboardType="numeric"
                  style={styles.halfInput}
                />

                <Input
                  label="Budget max (GNF)"
                  value={formData.preferences.budgetMax}
                  onChangeText={(text) => mettreAJourPreferences('budgetMax', text)}
                  placeholder="Ex: 2000000"
                  keyboardType="numeric"
                  style={styles.halfInput}
                />
              </View>

              {/* Surface et chambres */}
              <View style={styles.row}>
                <Input
                  label="Surface min (m²)"
                  value={formData.preferences.surfaceMin}
                  onChangeText={(text) => mettreAJourPreferences('surfaceMin', text)}
                  placeholder="Ex: 50"
                  keyboardType="numeric"
                  style={styles.halfInput}
                />

                <Input
                  label="Chambres"
                  value={formData.preferences.nombreChambres}
                  onChangeText={(text) => mettreAJourPreferences('nombreChambres', text)}
                  placeholder="Ex: 2"
                  keyboardType="numeric"
                  style={styles.halfInput}
                />
              </View>
            </Card>
          )}

          {/* Espacement pour le bouton */}
          <View style={styles.bottomSpacer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey[200]
  },
  headerCenter: {
    alignItems: 'center',
    flex: 1
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 4
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 80,
    alignItems: 'center'
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scrollView: {
    flex: 1
  },
  infoCard: {
    margin: 16,
    marginBottom: 8,
    backgroundColor: COLORS.primary + '10',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 8
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text.secondary,
    marginBottom: 4
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: COLORS.white,
    marginBottom: 8
  },
  photoHint: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.text.secondary,
    textAlign: 'center'
  },
  section: {
    margin: 16,
    marginBottom: 8
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 16
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text.primary,
    marginBottom: 12,
    marginTop: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12
  },
  halfInput: {
    flex: 1
  },
  specialitesSection: {
    marginTop: 16
  },
  specialitesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  specialiteButton: {
    marginBottom: 8
  },
  typesSection: {
    marginBottom: 16
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  typeButton: {
    marginBottom: 8
  },
  reseauxSection: {
    marginTop: 16
  },
  bottomSpacer: {
    height: 24
  }
});

export default EditionProfilScreen;
