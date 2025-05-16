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
    title: 'Tech Symposium',
    location: 'Main Auditorium',
    time: 'Today • 2:00 PM',
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
    title: 'Campus Tour',
    location: 'Admissions Office',
    time: 'Today • 10:00 AM',
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
];

export default function OngoingEvents() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const router = useRouter();

  const toggleDetails = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Minimal Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#364CB4" />
        </TouchableOpacity>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <FontAwesome5 name="bell" size={20} color="#364CB4" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Event Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => router.push('/events/upcoming')}
        >
          <Text style={styles.tabText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Ongoing</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabButton}
          onPress={() => router.push('/events/completed')}
        >
          <Text style={styles.tabText}>Completed</Text>
        </TouchableOpacity>
      </View>

      {/* Page Title */}
      <Text style={styles.pageTitle}>Ongoing Events</Text>

      {/* Events List */}
      {events.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          {/* Event Header */}
          <TouchableOpacity
            style={styles.eventHeader}
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
            <Image source={event.image} style={styles.eventImage} />
            <View style={styles.eventInfo}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventMeta}>
                <FontAwesome5 name="map-marker-alt" size={14} color="#95B8EE" />
                <Text style={styles.eventLocation}> {event.location}</Text>
              </View>
              <View style={styles.eventMeta}>
                <FontAwesome5 name="clock" size={14} color="#95B8EE" />
                <Text style={styles.eventTime}> {event.time}</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Expandable Details */}
          <TouchableOpacity 
            style={styles.detailsToggle} 
            onPress={() => toggleDetails(event.id)}
          >
            <Text style={styles.detailsToggleText}>
              {expandedId === event.id ? 'Hide Details ▲' : 'Show Details ▼'}
            </Text>
          </TouchableOpacity>

          {expandedId === event.id && (
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Guests:</Text>
                <Text style={styles.detailValue}>{event.details.guests}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Food:</Text>
                <Text style={styles.detailValue}>{event.details.food}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Bring:</Text>
                <Text style={styles.detailValue}>{event.details.bring}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Avoid:</Text>
                <Text style={styles.detailValue}>{event.details.avoid}</Text>
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 24,
  },
  logo: {
    width: 48,
    height: 48,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: '#F8FAFF',
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#E7F1AB',
  },
  tabText: {
    fontSize: 14,
    color: '#95B8EE',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#364CB4',
    fontWeight: '600',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#364CB4',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#F8FAFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  eventHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  eventInfo: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#364CB4',
    marginBottom: 8,
  },
  eventMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#95B8EE',
  },
  eventTime: {
    fontSize: 14,
    color: '#95B8EE',
  },
  detailsToggle: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E7F1AB',
    alignItems: 'center',
  },
  detailsToggleText: {
    color: '#364CB4',
    fontWeight: '500',
  },
  detailsContainer: {
    padding: 16,
    paddingTop: 0,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    color: '#364CB4',
    fontWeight: '600',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    color: '#95B8EE',
  },
});