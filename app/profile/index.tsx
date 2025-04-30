import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
  Alert,  // Import Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  // Function to handle sign out with confirmation
  const handleSignOut = () => {
    Alert.alert(
      "Confirm Sign Out",  // Title of the alert
      "Are you sure you want to sign out?",  // Message
      [
        {
          text: "Cancel", // Cancel button
          style: "cancel",
        },
        {
          text: "Yes", // Yes button to sign out
          onPress: () => {
            // Navigate to the start/last screen after confirmation
            router.push('/Authentication/signin');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Logo/Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name="arrow-back" size={20} color="orange" />
        <Text style={{ marginLeft: 6, fontSize: 16 }}></Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Profile</Text>

      {/* Profile Info & Edit */}
      <View style={styles.profileRow}>
        <Image
          source={require('../../assets/images/404.jpg')}
          style={styles.avatar}
        />
        <View style={styles.infoColumn}>
          <Text style={styles.name}>Totally Spies</Text>
          <Text style={styles.joined}>Joined: Jan 2024</Text>

          {/*Edit icon  */}
          <TouchableOpacity style={styles.editButton}>
          <Feather name="edit" size={15} color="rgb(0, 111, 223)" />
        </TouchableOpacity>
      </View>
        </View>
       

      {/* Language Selector */}
      <View style={styles.settingRow}>
        <Ionicons name="language-outline" size={24} color="rgb(0, 111, 223)" />
        <Text style={styles.settingText}>Language</Text>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={(itemValue) => setLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="አማርኛ" value="am" />
        </Picker>
      </View>

      {/* Theme Toggle */}
      <View style={styles.settingRow}>
        <Ionicons name="contrast-outline" size={24} color="rgb(0, 111, 223)" />
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={setIsDarkMode}
          thumbColor={isDarkMode ? 'rgb(0, 111, 223)' : '#ccc'}
        />
      </View>

      {/* Accessibility Options */}
      <TouchableOpacity
        style={styles.linkRow}
        onPress={() => router.push('/profile/accessibility')}
      >
        <Feather name="eye" size={22} color="rgb(0, 111, 223)" />
        <Text style={styles.linkText}>Accessibility</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkRow}
        onPress={() => router.push('/profile/feedback')}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={22} color="rgb(0, 111, 223)" />
        <Text style={styles.linkText}>Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkRow}
        onPress={() => router.push('/profile/upload')}
      >
        <Feather name="upload" size={22} color="rgb(0, 111, 223)" />
        <Text style={styles.linkText}>Upload Image</Text>
      </TouchableOpacity>

      {/* Sign Out Button with Confirmation */}
      <TouchableOpacity
        style={styles.linkRow}
        onPress={handleSignOut}  
      >
        <MaterialIcons name="logout" size={22} color="#e53935" />
        <Text style={[styles.linkText, { color: '#e53935' }]}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6200ee',
    marginBottom: 20,
    alignSelf: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 6,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  infoColumn: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  joined: {
    fontSize: 14,
    color: '#888',
  },
  editButton: {
    padding: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
  },
  picker: {
    height: 25,
    width: 130,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 12,
  },
  linkText: {
    fontSize: 16,
  },
});
