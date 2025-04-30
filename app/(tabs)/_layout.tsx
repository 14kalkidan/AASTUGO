import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native'; 
export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
     <Tabs.Screen
  name="map"
  options={{
    title: '',
    tabBarLabel: '',
    tabBarIcon: ({ focused }) => (
      <View
        style={{
          backgroundColor: 'rgb(0, 111, 223)',
          padding: 14,
          borderRadius: 50,
          top: -10, 
          elevation: 1,
          shadowColor: '#000',
          shadowOpacity: 0.8,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 2},
        }}
      >
        <Ionicons
          name="navigate-circle-outline"
          size={26}
          color="rgb(255, 255, 255)"
        />
      </View>
    ),
  }}
/>

      <Tabs.Screen
        name="event"
        options={{
          title: 'Event',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="gallery"
        options={{
          title: 'Gallery',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="image-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
