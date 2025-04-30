import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>Log In</Text>
      <Text style={styles.subtext}>Welcome back</Text>

      {/* Image */}
      <Image
        source={require('@/assets/images/login.png')} 
        style={styles.image}
      />
      {/* Input Fields */}
      <TextInput
        placeholder="Username or email"
        placeholderTextColor="#aaa"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordRow}>
        <TextInput
          placeholder="Password"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setSecureText(!secureText)}
        >
          <Ionicons name={secureText ? 'eye-off' : 'eye'} size={20} color="#555" />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => router.push('/Authentication/forgotpass')}>
        <Text style={styles.forgotText}>Forgot your password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>LogIn</Text>
      </TouchableOpacity>

      {/* Create Account */}
      <Text style={styles.footerText}  onPress={() => router.push('/app/(tabs)')}>
        Don’t have an account?{' '}
        <Text
          style={{ color: '#2979FF' }}
          onPress={() => router.push('/Authentication/signup')}
        >
          Create an account
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 150,
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
 
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  subtext: {
    fontSize: 22,
    color: '#333',
    marginTop: 6,
    marginLeft: 16,
    marginBottom: 10,
  },
  image: {
    position: 'absolute',
    right: 100,
    top: 120,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  input: {
    height: 48,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  passwordRow: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 14,
  },
  forgotText: {
    color: '#2979FF',
    textAlign: 'right',
    marginVertical: 6,
    fontSize: 14,
  },
  loginBtn: {
    backgroundColor: '#2979FF',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});
