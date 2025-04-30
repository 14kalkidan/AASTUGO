import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
  TextInput,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { useRoute } from '@react-navigation/native';
import polyline from '@mapbox/polyline';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [vehicleType, setVehicleType] = useState('foot');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const route = useRoute();
  const destination = {
    latitude: parseFloat(route.params?.latitude),
    longitude: parseFloat(route.params?.longitude),
    name: route.params?.name || 'Innovation Hub',
    description:
      route.params?.description ||
      'This is an advanced innovation and research hub where tech and science meet.',
    image: route.params?.image || 'https://via.placeholder.com/100',
  };

  const mockPolyline = '_p~iF~ps|U_ulLnnqC_mqNvxq`@';

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission denied');
        setLoading(false);
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (location && destination) {
      const decoded = polyline.decode(mockPolyline);
      const coords = decoded.map(([lat, lon]) => ({ latitude: lat, longitude: lon }));
      setRouteCoords(coords);
      setDistance(1.2);
      setDuration(5);
    }
  }, [location]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    console.log(`Searching for: ${searchQuery}`);
    // Later: Integrate with geocoding API
  };

  const handleRoute = () => {
    console.log('Route to destination triggered');
  };

  const handleSave = () => {
    console.log('Save event triggered');
  };

  const handleShare = () => {
    console.log('Share event triggered');
  };

  const [panelHeight] = useState(new Animated.Value(height * 0.15));

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 20,
    onPanResponderMove: (_, gestureState) => {
      const newHeight = height * 0.45 - gestureState.dy;
      panelHeight.setValue(Math.max(height * 0.15, Math.min(newHeight, height * 0.45)));
    },
    onPanResponderRelease: (_, gestureState) => {
      Animated.timing(panelHeight, {
        toValue: gestureState.dy > 50 ? height * 0.15 : height * 0.45,
        duration: 200,
        useNativeDriver: false,
      }).start();
    },
  });

  if (loading || !location) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker coordinate={{ latitude: destination.latitude, longitude: destination.longitude }} title={destination.name} />
        {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeColor="#007aff" strokeWidth={4} />}
      </MapView>

      {/* Transparent Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search location..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Vehicle Selector */}
      <View style={styles.selector}>
        {['foot', 'bike', 'car'].map((type) => (
          <TouchableOpacity key={type} onPress={() => setVehicleType(type)}>
            <FontAwesome5
              name={type === 'foot' ? 'walking' : type === 'bike' ? 'bicycle' : 'car'}
              size={22}
              color={vehicleType === type ? '#007aff' : '#aaa'}
              style={{ marginHorizontal: 10 }}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Distance & Duration */}
      {distance && duration && (
        <View style={styles.routeInfo}>
          <Text>Distance: {distance} km</Text>
          <Text>Estimated: {duration} mins</Text>
        </View>
      )}

      {/* Bottom Panel */}
      <Animated.View style={[styles.bottomPanel, { height: panelHeight }]} {...panResponder.panHandlers}>
        <ScrollView>
          <View style={styles.imageTextRow}>
            <Image source={{ uri: destination.image }} style={styles.infoImage} />
            <View style={{ flex: 1, paddingLeft: 10 }}>
              <Text style={styles.title}>{destination.name}</Text>
              <Text style={styles.description}>{destination.description}</Text>
            </View>
          </View>

          {/* Icon Buttons */}
          <View style={styles.iconRow}>
            <TouchableOpacity style={styles.iconBtn} onPress={handleRoute}>
              <MaterialIcons name="directions" size={24} color="black" />
              <Text style={styles.iconText}>Route</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={handleSave}>
              <MaterialIcons name="bookmark-border" size={24} color="black" />
              <Text style={styles.iconText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={handleShare}>
              <MaterialIcons name="share" size={24} color="black" />
              <Text style={styles.iconText}>Share</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  searchInput: {
    height: 40,
    fontSize: 14,
    color: '#000',
  },
  selector: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    paddingVertical: 8,
    borderRadius: 12,
    elevation: 3,
  },
  routeInfo: {
    position: 'absolute',
    bottom: 160,
    left: 60,
    right: 60,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    zIndex: 10,
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    elevation: 8,
  },
  imageTextRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  iconBtn: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
    marginTop: 2,
  },
});
