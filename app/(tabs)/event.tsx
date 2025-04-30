'use client';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const events = [
  {
    id: 1,
    title: 'Some Day',
    location: 'Blue Carpet',
    time: '10:00 PM',
    lat: 37.7749,
    lon: -122.4194,
    image: require('@/assets/images/c.jpeg'),
    description: 'A lively evening with developers from Brana Software.',
    details: {
      guests: 'Developers from Brana Software Solutions',
      food: 'Bring your own. Drinks provided (water only)',
      bring: 'Your laptop',
      avoid: 'Low self-esteem or expectations of free food',
    },
  },
  {
    id: 2,
    title: 'Outdoor Movie',
    location: 'Auditorium',
    time: '8:00 PM',
    lat: 37.7749,
    lon: -122.4194,
    image: require('@/assets/images/b.jpeg'),
    description: 'Watch a classic film under the stars.',
    details: {
      guests: 'Local Bands & Choir',
      food: 'Snacks at entrance',
      bring: 'Your voice',
      avoid: 'Big bags',
    },
  },
  {
    id: 3,
    title: 'Pajama Night',
    location: 'Gallery',
    time: '2:00 PM',
    lat: 37.7749,
    lon: -122.4194,
    image: require('@/assets/images/a.jpeg'),
    description: 'A chill creative jam for night owls.',
    details: {
      guests: 'Visual artists & designers',
      food: 'Refreshments provided',
      bring: 'Sketchbook',
      avoid: 'Loud music',
    },
  },
];

export default function OngoingEvents() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const router = useRouter();

  const toggleDetails = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
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

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
      >
        <Ionicons name="arrow-back" size={22} color="orange" />
      </TouchableOpacity>

      {/* Toggle Tabs */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.toggleBtn} onPress={() => router.push('/events/upcoming')}>
          <Text style={styles.toggleText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toggleBtn, styles.activeBtn]}>
          <Text style={[styles.toggleText, styles.activeText]}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleBtn} onPress={() => router.push('/events/completed')}>
          <Text style={styles.toggleText}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Events */}
      <Text style={styles.header}>Ongoing Events</Text>
      {events.map((event) => (
        <View key={event.id} style={styles.card}>
          <TouchableOpacity
            style={styles.cardRow}
            onPress={() =>
              router.push({
                pathname: '/map',
                params: {
                  name: event.title,
                  lat: event.lat,
                  lon: event.lon,
                  image: event.image,
                  description: event.description,
                },
              })
            }
          >
            <Image source={event.image} style={styles.thumb} />
            <View style={styles.info}>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.meta}>
                <FontAwesome5 name="map-marker-alt" size={12} color="red" /> {event.location}
              </Text>
              <Text style={styles.meta}>{event.time}</Text>
            </View>
          </TouchableOpacity>

          {/* Expand Details */}
          <TouchableOpacity style={styles.dropdown} onPress={() => toggleDetails(event.id)}>
            <Text style={{ color: '#007aff' }}>
              {expandedId === event.id ? 'Hide Details ▲' : 'Show Details ▼'}
            </Text>
          </TouchableOpacity>

          {expandedId === event.id && (
            <View style={styles.details}>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Guests:</Text> {event.details.guests}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Food:</Text> {event.details.food}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Bring:</Text> {event.details.bring}
              </Text>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Avoid:</Text> {event.details.avoid}
              </Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16 },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
  },
  logo: { width: 60, height: 60 },
  navIcons: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    gap: 12,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  toggleText: { fontSize: 14, color: '#666' },
  activeBtn: { backgroundColor: 'blue' },
  activeText: { color: '#fff', fontWeight: '600' },
  header: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  thumb: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 14,
    borderBottomLeftRadius: 14,
  },
  info: { flex: 1, paddingHorizontal: 10 },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  meta: { fontSize: 13, color: '#444' },
  dropdown: { padding: 10 },
  details: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  detailText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
  },
  bold: { fontWeight: 'bold' },
});
