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
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const events = [
  {
    id: 1,
    title: 'some day',
    location: 'Blue Carpet',
    time: '10:00 PM',
    image: require('@/assets/images/c.jpeg'),
    details: {
      guests: 'Developers from Brana Software Solutions',
      food: 'Bring your own. Drinks provided (water only)',
      bring: 'Your laptop',
      avoid: 'Low self-esteem or expectations of free food',
    },
  },
  {
    id: 2,
    title: 'outdoor movie',
    location: 'Auditorium',
    time: '8:00 PM',
    image: require('@/assets/images/f.jpeg'),
    details: {
      guests: 'Local Bands & Choir',
      food: 'Snacks at entrance',
      bring: 'Your voice',
      avoid: 'Big bags',
    },
  },
  {
    id: 3,
    title: 'Pjama night',
    location: 'Gallery',
    time: '2:00 PM',
    image: require('@/assets/images/k.jpeg'),
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
      {/* Navbar */}
      <View style={styles.navbar}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <View style={styles.navIcons}>
          <Ionicons name="notifications-outline" size={24} color="#B0B005" />
          <TouchableOpacity onPress={() => router.push('/profile')}>
  <Ionicons name="person-circle-outline" size={30} color="black" />
</TouchableOpacity>
          <Link href="/menu">
            <Ionicons name="menu" size={28} color="black" />
          </Link>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
  <Ionicons name="arrow-back" size={22} color="orange" />
</TouchableOpacity>

      {/* Event Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={[styles.toggleBtn , styles.activeBtn]}>
          <Text style={[styles.toggleText, styles.activeText]}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.toggleBtn]} onPress={() => router.push('/(tabs)/event')}>
          <Text style={styles.toggleText}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleBtn } onPress={() => router.push('/events/completed')}>
          <Text style={styles.toggleText}>Completed</Text>
        </TouchableOpacity>
      </View>
      {/* Events */}
      <Text style={styles.header}>Upcoming Events</Text>
      {events.map((event) => (
        <View key={event.id} style={styles.card}>
          <View style={styles.cardRow}>
            <Image source={event.image} style={styles.thumb} />
            <View style={styles.info}>
              <Text style={styles.title}>{event.title}</Text>
              <TouchableOpacity onPress={() => router.push('/map')}>
                <Text style={styles.meta}>
                  <Ionicons name="location-outline" size={14} color="red" /> {event.location}
                </Text>
              </TouchableOpacity>
              <Text style={styles.meta}> {event.time}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleDetails(event.id)} style={styles.dropdown}>
              <Ionicons name={expandedId === event.id ? 'chevron-up' : 'chevron-down'} size={20} color="#555" />
            </TouchableOpacity>
          </View>
          {expandedId === event.id && (
            <View style={styles.details}>
              <Text style={styles.detailText}>
                <Text style={styles.bold}>Guests: </Text>{event.details.guests}{'\n\n'}
                <Text style={styles.bold}>Food: </Text>{event.details.food}{'\n\n'}
                <Text style={styles.bold}>Bring: </Text>{event.details.bring}{'\n\n'}
                <Text style={styles.bold}>Do not bring: </Text>{event.details.avoid}
              </Text>
            </View>
          )}
        </View>
      ))}
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
    paddingBottom: 10,
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
  toggleText: {
    fontSize: 14,
    color: '#666',
  },
  activeBtn: {
    backgroundColor: 'blue',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
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
  info: {
    flex: 1,
    paddingHorizontal: 10,
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
  dropdown: {
    padding: 10,
  },
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
  bold: {
    fontWeight: 'bold',
  },
});
