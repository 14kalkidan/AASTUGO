import React, { useState, useEffect } from 'react';
import { 
  TextInput, 
  ScrollView, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  Platform,
  SafeAreaView,
  Dimensions 
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Color palettes
const lightColors = {
  primary: '#052659',
  secondary: '#7DA0C4',
  background: '#FFFFFF',
  card: '#C1E8FF',
  text: '#021024',
  border: '#E0E0E0',
  notification: '#FF3B30',
  white: '#FFFFFF',
};

const darkColors = {
  primary: '#C1E8FF',
  secondary: '#052659',
  background: '#021024',
  card: '#052659',
  text: '#C1E8FF',
  border: '#333333',
  notification: '#FF5E5E',
  white: '#021024',
};

const categories = [
  { name: 'Cafe', icon: 'coffee' },
  { name: 'Class Rooms', icon: 'chalkboard-teacher' },
  { name: 'Lecture halls', icon: 'university' },
  { name: 'Library', icon: 'book' },
  { name: 'Lab', icon: 'flask' },
  { name: 'Clinic', icon: 'clinic-medical' },
  { name: 'Shop', icon: 'store' },
  { name: 'Offices', icon: 'building' },
  { name: 'Parking', icon: 'parking' },
  { name: 'Dorm', icon: 'bed' },
  { name: 'Events', icon: 'calendar-alt' },
  { name: 'Sports', icon: 'football-ball' },
];

const events = [
  {
    id: '1',
    title: 'Tech Conference',
    location: 'Main Auditorium',
    time: '10:00 AM',
    image: require('@/assets/images/event1.jpeg'),
  },
  {
    id: '2',
    title: 'Music Festival',
    location: 'University Grounds',
    time: '6:00 PM',
    image: require('@/assets/images/event2.jpeg'),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('eng');
  const [colors, setColors] = useState(lightColors);
  const [notificationCount, setNotificationCount] = useState(3);

  // Load saved preferences
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const [theme, lang] = await Promise.all([
          AsyncStorage.getItem('theme'),
          AsyncStorage.getItem('language')
        ]);
        
        if (theme === 'dark') {
          setIsDarkMode(true);
          setColors(darkColors);
        }
        
        if (lang) {
          setLanguage(lang);
        }
      } catch (error) {
        console.error('Failed to load preferences', error);
      }
    };
    
    loadPreferences();
  }, []);

  // Toggle dark/light mode
  const toggleTheme = async () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      setColors(newDarkMode ? darkColors : lightColors);
      await AsyncStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  // Toggle language
  const toggleLanguage = async () => {
    try {
      const newLanguage = language === 'eng' ? 'amh' : 'eng';
      setLanguage(newLanguage);
      await AsyncStorage.setItem('language', newLanguage);
    } catch (error) {
      console.error('Failed to save language', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    router.replace('/Authentication/signin');
    setIsMenuVisible(false);
  };

  // Navigate to profile
  const goToProfile = () => {
    router.push('/profile');
  };

  // Navigate to notifications
  const goToNotifications = () => {
    router.push('../header/notification');
    setNotificationCount(0);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Navigation Bar */}
        <View style={[styles.navbar, { 
          backgroundColor: colors.background, 
          borderBottomColor: colors.border 
        }]}>
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/')}
            accessibilityLabel="Home button"
            accessibilityHint="Navigates to home screen"
          >
            <Image 
              source={require('@/assets/images/logo.png')} 
              style={styles.logo} 
              accessibilityIgnoresInvertColors
            />
          </TouchableOpacity>
          
          <View style={styles.navIcons}>
            {/* Notification Icon with Badge */}
            <TouchableOpacity 
              onPress={goToNotifications}
              style={styles.iconWrapper}
              accessibilityLabel="Notifications"
              accessibilityHint={`${notificationCount} unread notifications`}
            >
              <FontAwesome5 
                name="bell" 
                size={22} 
                color={colors.text} 
              />
              {notificationCount > 0 && (
                <View style={[styles.badge, { backgroundColor: colors.notification }]}>
                  <Text style={styles.badgeText}>
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            
            {/* Profile Icon */}
            <TouchableOpacity 
              onPress={goToProfile}
              accessibilityLabel="User profile"
              accessibilityHint="Navigates to your profile"
            >
              <FontAwesome5 
                name="user-circle" 
                size={26} 
                color={colors.text} 
              />
            </TouchableOpacity>
            
            {/* Menu Icon */}
            <TouchableOpacity 
              onPress={() => setIsMenuVisible(true)}
              accessibilityLabel="Menu"
              accessibilityHint="Opens settings menu"
            >
              <FontAwesome5 
                name="bars" 
                size={24} 
                color={colors.text} 
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Modal */}
        <Modal
          visible={isMenuVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setIsMenuVisible(false)}
          statusBarTranslucent
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={() => setIsMenuVisible(false)}
          >
            <View style={[styles.menuContainer, { 
              backgroundColor: colors.card,
              shadowColor: colors.text 
            }]}>
              {/* Accessibility Option */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {
                  router.push('/profile/accessibility');
                  setIsMenuVisible(false);
                }}
                accessibilityLabel="Accessibility settings"
              >
                <FontAwesome5 
                  name="universal-access" 
                  size={20} 
                  color={colors.text} 
                  style={styles.menuIcon}
                />
                <Text style={[styles.menuText, { color: colors.text }]}>
                  Accessibility
                </Text>
              </TouchableOpacity>
              
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              
              {/* Language Option */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={toggleLanguage}
                accessibilityLabel="Change language"
              >
                <FontAwesome5 
                  name="language" 
                  size={20} 
                  color={colors.text} 
                  style={styles.menuIcon}
                />
                <Text style={[styles.menuText, { color: colors.text }]}>
                  {language === 'eng' ? 'Switch to Amharic' : 'ወደ እንግሊዝኛ ቀይር'}
                </Text>
              </TouchableOpacity>
              
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              
              {/* Theme Option */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={toggleTheme}
                accessibilityLabel={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <FontAwesome5 
                  name={isDarkMode ? "sun" : "moon"} 
                  size={20} 
                  color={colors.text} 
                  style={styles.menuIcon}
                />
                <Text style={[styles.menuText, { color: colors.text }]}>
                  {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </Text>
              </TouchableOpacity>
              
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              
              {/* Logout Option */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={handleLogout}
                accessibilityLabel="Logout"
              >
                <FontAwesome5 
                  name="sign-out-alt" 
                  size={20} 
                  color={colors.text} 
                  style={styles.menuIcon}
                />
                <Text style={[styles.menuText, { color: colors.text }]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Hero Section with Search */}
        <View style={styles.heroSection}>
          <Image 
            source={require('@/assets/images/j.jpeg')} 
            style={styles.mapImage} 
            resizeMode="cover" 
            accessibilityLabel="Campus map"
          />
          <View style={[
            styles.searchContainer, 
            { 
              backgroundColor: isDarkMode ? 'rgba(193, 232, 255, 0.2)' : 'rgba(2, 16, 36, 0.7)',
              borderColor: colors.border,
            }
          ]}>
            <FontAwesome5 
              name="search" 
              size={16} 
              color={colors.white} 
              style={styles.searchIcon} 
            />
            <TextInput
              placeholder="Search for places..."
              placeholderTextColor={colors.white}
              style={[styles.searchInput, { color: colors.white }]}
              value={query}
              onChangeText={setQuery}
              accessibilityLabel="Search input"
              accessibilityHint="Type to search for places on campus"
              returnKeyType="search"
              clearButtonMode="while-editing"
            />
          </View>
        </View>

        {/* Categories Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {language === 'eng' ? 'Explore Places' : 'ቦታዎችን ያስሱ'}
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={`category-${index}`}
              style={styles.categoryItem}
              onPress={() => router.push(`/Categories/${category.name.toLowerCase().replace(' ', '-')}`)}
              accessibilityLabel={category.name}
              accessibilityHint={`Navigate to ${category.name} section`}
            >
              <View style={[styles.categoryIcon, { backgroundColor: colors.card }]}>
                <FontAwesome5 
                  name={category.icon} 
                  size={20} 
                  color={colors.text} 
                />
              </View>
              <Text 
                style={[styles.categoryText, { color: colors.text }]}
                numberOfLines={2}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Events Section */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {language === 'eng' ? 'Upcoming Events' : 'የሚመጡ ዝግጅቶች'}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventsContainer}
        >
          {events.map((event) => (
            <TouchableOpacity
              key={`event-${event.id}`}
              style={[styles.eventCard, { 
                backgroundColor: colors.card,
                shadowColor: colors.text 
              }]}
              onPress={() => router.push(`map/${event.id}`)}
              accessibilityLabel={`Event: ${event.title}`}
              accessibilityHint={`Details about ${event.title}`}
            >
              <Image 
                source={event.image} 
                style={styles.eventImage} 
                accessibilityIgnoresInvertColors
              />
              <View style={styles.eventDetails}>
                <Text 
                  style={[styles.eventTitle, { color: colors.text }]}
                  numberOfLines={1}
                >
                  {event.title}
                </Text>
                <View style={styles.eventMeta}>
                  <FontAwesome5 
                    name="map-marker-alt" 
                    size={12} 
                    color={colors.text} 
                  />
                  <Text 
                    style={[styles.eventText, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {event.location}
                  </Text>
                </View>
                <View style={styles.eventMeta}>
                  <FontAwesome5 
                    name="clock" 
                    size={12} 
                    color={colors.text} 
                  />
                  <Text 
                    style={[styles.eventText, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {event.time}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    resizeMode: 'contain',
  },
  navIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingRight: 20,
  },
  menuContainer: {
    width: 250,
    borderRadius: 12,
    paddingVertical: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuIcon: {
    marginRight: 15,
    width: 20,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  divider: {
    height: 1,
    marginHorizontal: 15,
  },
  heroSection: {
    height: SCREEN_HEIGHT * 0.25,
    margin: 15,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 25,
    height: 45,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 15,
    marginTop: 25,
    marginBottom: 15,
  },
  categoryContainer: {
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 15,
    width: 80,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  eventsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  eventCard: {
    width: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 120,
  },
  eventDetails: {
    padding: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventText: {
    fontSize: 13,
    marginLeft: 5,
    flexShrink: 1,
  },
});