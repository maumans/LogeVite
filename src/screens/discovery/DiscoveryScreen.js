/**
 * Écran de découverte de l'application
 * Design moderne et professionnel avec animations et UX premium
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, Icon, Icons } from '../../components/ui';
import { COLORS } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const DiscoveryScreen = ({ navigation }) => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const carouselAnim = useRef(new Animated.Value(0)).current;

  // Fonctionnalités à présenter
  const features = [
    {
      id: 1,
      title: 'Recherche Intelligente',
      description: 'Trouvez votre logement idéal avec nos filtres avancés et notre système de recommandation intelligent.',
      icon: Icons.search,
      color: COLORS.primary[500],
      gradient: [COLORS.primary[400], COLORS.primary[600]],
      examples: ['Appartements', 'Maisons', 'Terrains', 'Bureaux']
    },
    {
      id: 2,
      title: 'Professionnels Vérifiés',
      description: 'Connectez-vous avec des agents immobiliers certifiés et des promoteurs de confiance.',
      icon: Icons.checkCircle,
      color: COLORS.secondary[500],
      gradient: [COLORS.secondary[400], COLORS.secondary[600]],
      examples: ['Agents certifiés', 'Promoteurs vérifiés', 'Consultants experts']
    },
    {
      id: 3,
      title: 'Géolocalisation Précise',
      description: 'Localisez les biens sur une carte interactive et découvrez les quartiers qui vous conviennent.',
      icon: Icons.location,
      color: COLORS.accent[500],
      gradient: [COLORS.accent[400], COLORS.accent[600]],
      examples: ['Cartes interactives', 'Quartiers détaillés', 'Transports à proximité']
    },
    {
      id: 4,
      title: 'Messagerie Intégrée',
      description: 'Communiquez directement avec les vendeurs et agents via notre messagerie sécurisée.',
      icon: Icons.message,
      color: COLORS.success[500],
      gradient: [COLORS.success[400], COLORS.success[600]],
      examples: ['Chat en temps réel', 'Notifications push', 'Historique des conversations']
    },
    {
      id: 5,
      title: 'Gestion de Favoris',
      description: 'Sauvegardez vos biens préférés et créez des alertes personnalisées.',
      icon: Icons.favorite,
      color: COLORS.error[500],
      gradient: [COLORS.error[400], COLORS.error[600]],
      examples: ['Liste de favoris', 'Alertes personnalisées', 'Comparaison de biens']
    }
  ];

  // Types de biens populaires
  const popularProperties = [
    { type: 'Appartement', count: '2,450+', icon: Icons.apartment, color: COLORS.primary[500] },
    { type: 'Maison', count: '1,890+', icon: Icons.house, color: COLORS.secondary[500] },
    { type: 'Terrain', count: '890+', icon: Icons.location, color: COLORS.success[500] },
    { type: 'Bureau', count: '450+', icon: Icons.apartment, color: COLORS.accent[500] },
    { type: 'Commerce', count: '320+', icon: Icons.apartment, color: COLORS.warning[500] },
    { type: 'Villa', count: '180+', icon: Icons.house, color: COLORS.error[500] }
  ];

  // Villes populaires
  const popularCities = [
    { name: 'Conakry', count: '3,200+ biens', region: 'Capitale', image: '🏙️' },
    { name: 'Kankan', count: '890+ biens', region: 'Haute-Guinée', image: '🏘️' },
    { name: 'Kindia', count: '650+ biens', region: 'Basse-Guinée', image: '🏡' },
    { name: 'N\'Zérékoré', count: '420+ biens', region: 'Guinée Forestière', image: '🌲' }
  ];

  // Statistiques de l'application
  const stats = [
    { label: 'Biens disponibles', value: '5,890+', color: COLORS.primary[500], icon: Icons.house },
    { label: 'Professionnels', value: '450+', color: COLORS.secondary[500], icon: Icons.person },
    { label: 'Utilisateurs', value: '12,500+', color: COLORS.accent[500], icon: Icons.account },
    { label: 'Transactions', value: '2,100+', color: COLORS.success[500], icon: Icons.checkCircle }
  ];

  // Animations d'entrée
  useEffect(() => {
    setIsVisible(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, scaleAnim]);

  // Animation du carousel
  useEffect(() => {
    Animated.timing(carouselAnim, {
      toValue: currentFeature,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentFeature, carouselAnim]);

  const nextFeature = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const handleNavigateToAuth = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Auth');
    }
  };

  const AnimatedCard = ({ children, style, delay = 0 }) => {
    const cardAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      if (isVisible) {
        Animated.timing(cardAnim, {
          toValue: 1,
          duration: 600,
          delay: delay,
          useNativeDriver: true,
        }).start();
      }
    }, [isVisible, cardAnim, delay]);

    return (
      <Animated.View
        style={[
          style,
          {
            opacity: cardAnim,
            transform: [
              {
                translateY: cardAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          }
        ]}
      >
        {children}
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary[600]} />
      
      {/* Header moderne avec gradient */}
      <LinearGradient
        colors={[COLORS.primary[600], COLORS.primary[500]]}
        style={styles.header}
      >
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <View style={styles.backButtonInner}>
            <Text style={styles.backButtonText}>←</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Découvrir LogeVite</Text>
        <View style={styles.placeholder} />
      </LinearGradient>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section avec gradient et animations */}
        <Animated.View 
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <LinearGradient
            colors={[COLORS.primary[600], COLORS.primary[400], COLORS.secondary[500]]}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Bienvenue sur LogeVite</Text>
              <Text style={styles.heroSubtitle}>
                La plateforme immobilière la plus complète de Guinée
              </Text>
              
              {/* Statistiques animées */}
              <View style={styles.heroStats}>
                {stats.map((stat, index) => (
                  <Animated.View 
                    key={`stat-${index}`} 
                    style={[
                      styles.statItem,
                      {
                        opacity: fadeAnim,
                        transform: [
                          {
                            translateY: fadeAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [30, 0],
                            }),
                          },
                        ],
                      }
                    ]}
                  >
                    <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                      <Icon {...stat.icon} size={24} color={stat.color} />
                    </View>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </Animated.View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Feature Carousel moderne */}
        <AnimatedCard delay={200}>
          <Card style={styles.featureCard}>
            <Text style={styles.sectionTitle}>Fonctionnalités Principales</Text>
            
            <View style={styles.carouselContainer}>
              <TouchableOpacity onPress={prevFeature} style={styles.carouselButton}>
                <LinearGradient
                  colors={[COLORS.grey[100], COLORS.grey[200]]}
                  style={styles.carouselButtonGradient}
                >
                  <Text style={styles.carouselButtonText}>‹</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <View style={styles.featureContent}>
                <Animated.View 
                  style={[
                    styles.featureIcon,
                    {
                      transform: [
                        {
                          rotateY: carouselAnim.interpolate({
                            inputRange: [0, features.length - 1],
                            outputRange: ['0deg', '360deg'],
                          }),
                        },
                      ],
                    }
                  ]}
                >
                  <LinearGradient
                    colors={features[currentFeature]?.gradient || [COLORS.primary[400], COLORS.primary[600]]}
                    style={styles.featureIconGradient}
                  >
                    {features[currentFeature]?.icon && (
                      <Icon {...features[currentFeature].icon} size={40} color="white" />
                    )}
                  </LinearGradient>
                </Animated.View>
                
                <Text style={styles.featureTitle}>{features[currentFeature]?.title}</Text>
                <Text style={styles.featureDescription}>{features[currentFeature]?.description}</Text>
                
                <View style={styles.examplesContainer}>
                  {features[currentFeature]?.examples?.map((example, index) => (
                    <Animated.View 
                      key={`example-${index}`} 
                      style={[
                        styles.exampleTag,
                        {
                          opacity: fadeAnim,
                          transform: [
                            {
                              scale: fadeAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.8, 1],
                              }),
                            },
                          ],
                        }
                      ]}
                    >
                      <Text style={styles.exampleText}>{example}</Text>
                    </Animated.View>
                  ))}
                </View>
              </View>
              
              <TouchableOpacity onPress={nextFeature} style={styles.carouselButton}>
                <LinearGradient
                  colors={[COLORS.grey[100], COLORS.grey[200]]}
                  style={styles.carouselButtonGradient}
                >
                  <Text style={styles.carouselButtonText}>›</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            
            {/* Indicateurs de carousel modernes */}
            <View style={styles.carouselDots}>
              {features.map((_, index) => (
                <TouchableOpacity
                  key={`dot-${index}`}
                  onPress={() => setCurrentFeature(index)}
                  style={[
                    styles.dot,
                    index === currentFeature && styles.activeDot
                  ]}
                >
                  <Animated.View
                    style={[
                      styles.dotInner,
                      {
                        backgroundColor: index === currentFeature ? COLORS.primary[500] : 'transparent',
                        transform: [
                          {
                            scale: index === currentFeature ? 1 : 0.5,
                          },
                        ],
                      }
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </AnimatedCard>

        {/* Types de Biens avec design moderne */}
        <AnimatedCard delay={400}>
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Types de Biens Disponibles</Text>
            <View style={styles.propertiesGrid}>
              {popularProperties.map((property, index) => (
                <TouchableOpacity key={`property-${index}`} style={styles.propertyCard}>
                  <LinearGradient
                    colors={[property.color + '10', property.color + '20']}
                    style={styles.propertyCardGradient}
                  >
                    <View style={styles.propertyIconContainer}>
                      <Icon {...property.icon} size={32} color={property.color} />
                    </View>
                    <Text style={styles.propertyType}>{property.type}</Text>
                    <Text style={[styles.propertyCount, { color: property.color }]}>{property.count}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </AnimatedCard>

        {/* Villes Populaires avec design premium */}
        <AnimatedCard delay={600}>
          <Card style={styles.section}>
            <Text style={styles.sectionTitle}>Villes Populaires</Text>
            <View style={styles.citiesContainer}>
              {popularCities.map((city, index) => (
                <TouchableOpacity key={`city-${index}`} style={styles.cityCard}>
                  <LinearGradient
                    colors={[COLORS.grey[50], COLORS.white]}
                    style={styles.cityCardGradient}
                  >
                    <View style={styles.cityImageContainer}>
                      <Text style={styles.cityImage}>{city.image}</Text>
                    </View>
                    <View style={styles.cityInfo}>
                      <Text style={styles.cityName}>{city.name}</Text>
                      <Text style={styles.cityRegion}>{city.region}</Text>
                    </View>
                    <View style={styles.cityCountContainer}>
                      <Text style={styles.cityCount}>{city.count}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </Card>
        </AnimatedCard>

        {/* Call to Action premium */}
        <AnimatedCard delay={800}>
          <Card style={styles.ctaCard}>
            <LinearGradient
              colors={[COLORS.primary[50], COLORS.secondary[50]]}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaTitle}>Prêt à commencer ?</Text>
              <Text style={styles.ctaDescription}>
                Créez votre compte gratuitement et accédez à toutes les fonctionnalités
              </Text>
              <View style={styles.ctaButtons}>
                <TouchableOpacity onPress={handleNavigateToAuth} style={styles.ctaPrimaryButton}>
                  <LinearGradient
                    colors={[COLORS.primary[500], COLORS.primary[600]]}
                    style={styles.ctaButtonGradient}
                  >
                    <Text style={styles.ctaPrimaryButtonText}>Créer un compte</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNavigateToAuth} style={styles.ctaSecondaryButton}>
                  <Text style={styles.ctaSecondaryButtonText}>Se connecter</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </Card>
        </AnimatedCard>

        {/* Espacement final */}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 8,
    shadowColor: COLORS.primary[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  backButton: {
    padding: 4
  },
  backButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)'
  },
  backButtonText: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: '600'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.white,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  placeholder: {
    width: 60
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 20
  },
  heroSection: {
    marginBottom: 24
  },
  heroGradient: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderRadius: 0
  },
  heroContent: {
    alignItems: 'center'
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4
  },
  heroSubtitle: {
    fontSize: 18,
    color: COLORS.white + 'E6',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontWeight: '500'
  },
  heroStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    flexWrap: 'wrap',
    gap: 16
  },
  statItem: {
    alignItems: 'center',
    minWidth: 80
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8
  },
  statIconText: {
    fontSize: 20
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.white + 'CC',
    textAlign: 'center',
    fontWeight: '500'
  },
  featureCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
    shadowColor: COLORS.primary[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 24,
    textAlign: 'center'
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  carouselButton: {
    elevation: 4,
    shadowColor: COLORS.grey[400],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  carouselButtonGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.grey[200]
  },
  carouselButtonText: {
    fontSize: 24,
    color: COLORS.text.primary,
    fontWeight: '700'
  },
  featureContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20
  },
  featureIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    elevation: 8,
    shadowColor: COLORS.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8
  },
  featureIconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  featureIconText: {
    fontSize: 48
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 12,
    textAlign: 'center'
  },
  featureDescription: {
    fontSize: 15,
    color: COLORS.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    fontWeight: '400'
  },
  examplesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10
  },
  exampleTag: {
    backgroundColor: COLORS.grey[100],
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.grey[200]
  },
  exampleText: {
    fontSize: 13,
    color: COLORS.text.secondary,
    fontWeight: '500'
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.grey[200],
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeDot: {
    backgroundColor: COLORS.primary[100]
  },
  dotInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary[500]
  },
  section: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
    shadowColor: COLORS.grey[400],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8
  },
  propertiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16
  },
  propertyCard: {
    width: (width - 80) / 3,
    elevation: 4,
    shadowColor: COLORS.grey[400],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  propertyCardGradient: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.grey[200]
  },
  propertyIconContainer: {
    marginBottom: 12,
    alignItems: 'center'
  },
  propertyType: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text.primary,
    marginBottom: 6,
    textAlign: 'center'
  },
  propertyCount: {
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center'
  },
  citiesContainer: {
    gap: 16
  },
  cityCard: {
    elevation: 4,
    shadowColor: COLORS.grey[400],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  cityCardGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.grey[200]
  },
  cityImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16
  },
  cityImage: {
    fontSize: 28
  },
  cityInfo: {
    flex: 1
  },
  cityName: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text.primary,
    marginBottom: 4
  },
  cityRegion: {
    fontSize: 14,
    color: COLORS.text.secondary,
    fontWeight: '500'
  },
  cityCountContainer: {
    backgroundColor: COLORS.primary[100],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12
  },
  cityCount: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary[600]
  },
  ctaCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 6,
    shadowColor: COLORS.primary[500],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12
  },
  ctaGradient: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primary[200]
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary[700],
    marginBottom: 12,
    textAlign: 'center'
  },
  ctaDescription: {
    fontSize: 16,
    color: COLORS.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
    fontWeight: '400'
  },
  ctaButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16
  },
  ctaPrimaryButton: {
    flex: 1,
    maxWidth: 160,
    elevation: 4,
    shadowColor: COLORS.primary[500],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  ctaButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ctaPrimaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white
  },
  ctaSecondaryButton: {
    flex: 1,
    maxWidth: 160,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white
  },
  ctaSecondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primary[500]
  },
  bottomSpacer: {
    height: 32
  }
});

export default DiscoveryScreen;
