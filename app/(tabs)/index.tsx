// HomeScreen.tsx
import React, { useState } from 'react';
import { TextInput, ScrollView, View, Text, Image, TouchableOpacity, Platform, LayoutAnimation, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const categories = [
  { name: 'Cafe', icon: 'utensils' },
  { name: 'Class Rooms', icon: 'chalkboard-teacher' },
  { name: 'Lecture halls', icon: 'university' },
  { name: 'Library', icon: 'book' },
  { name: 'Lab', icon: 'flask' },
  { name: 'Clinic', icon: 'clinic-medical' },
  { name: 'shop', icon: 'store' },
  { name: 'Collages', icon: 'graduation-cap' },
  { name: 'Offices', icon: 'building' },
  { name: 'Parking', icon: 'parking' },
  { name: 'Dorm', icon: 'bed' },
  { name: 'Event', icon: 'calendar-alt' },
  { name: 'GameZone', icon: 'gamepad' },
  { name: 'sports', icon: 'football-ball' },
  { name: 'Clubs', icon: 'users' },
];

const events = [
  {
    id: 1,
    title: 'Hackathon',
    location: 'Blue Carpet',
    time: '10:00 PM',
    image: require('@/assets/images/event1.jpeg'),
  },
  {
    id: 2,
    title: 'Musical',
    location: 'Auditorium',
    time: '8:00 PM',
    image: require('@/assets/images/event2.jpeg'),
  },
  {
    id: 3,
    title: 'Football Match',
    location: 'Main Field',
    time: '4:00 PM',
    image: require('@/assets/images/event3.jpeg'),
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  return (
    <ScrollView style={styles.container}>
      {/* Embedded Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.push('/(tabs)')}>
          <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        </TouchableOpacity>
        <View style={styles.navIcons}>
          <TouchableOpacity onPress={() => router.push('/header/notification')}>
            <FontAwesome5 name="bell" size={22} color="gold" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <FontAwesome5 name="user-circle" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/header/menu')}>
            <FontAwesome5 name="bars" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Section with Search */}
      <View style={styles.heroSection}>
        <Image source={require('@/assets/images/j.jpeg')} style={styles.mapImage} resizeMode="cover" />
        <View style={styles.searchContainer}>
          <FontAwesome5 name="search" size={16} color="#fff" style={styles.searchIcon} />
          <TextInput
            placeholder="Search for a place..."
            placeholderTextColor="#ddd"
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Places to Look Into</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        {categories.map((cat, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryItem}
            onPress={() => router.push(`/Categories/${cat.name.toLowerCase()}`)}
          >
            <View style={styles.categoryIcon}>
              <FontAwesome5 name={cat.icon} size={22} color="brown" />
            </View>
            <Text style={styles.categoryText}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Events */}
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.eventRow}>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Image source={event.image} style={styles.eventImage} />
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.meta}>
              <FontAwesome5 name="map-marker-alt" size={12} color="red" /> {event.location}
            </Text>
            <Text style={styles.meta}>{event.time}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  navIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  heroSection: {
    height: 160,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  searchContainer: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    borderRadius: 20,
    height: 40,
    zIndex: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    width: 80,
  },
  categoryIcon: {
    backgroundColor: '#f1f1f1',
    borderRadius: 30,
    padding: 12,
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
  },
  eventRow: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 20,
  },
  eventCard: {
    width: 220,
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    padding: 10,
  },
  eventImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  meta: {
    fontSize: 13,
    color: '#444',
  },
});
