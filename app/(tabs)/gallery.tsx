import { View, Text, Image, ScrollView, TouchableOpacity, Modal, StyleSheet, Dimensions, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import EventCard from '@/components/EventCard';
import { globalStyles } from '@/app/styles/globalStyles';

const { width } = Dimensions.get('window');

const images = [
  {
    id: 1,
    source: require('@/assets/images/a.jpeg'),
    place: 'Main Library',
    comment: 'Best reading vibes',
  },
  {
    id: 2,
    source: require('@/assets/images/d.jpeg'),
    place: 'Sunset Spot',
    comment: 'Peaceful and refreshing',
  },
  {
    id: 3,
    source: require('@/assets/images/k.jpeg'),
    place: 'Student Café',
    comment: 'Coffee & study combo',
  },
  {
    id: 4,
    source: require('@/assets/images/event1.jpeg'),
    place: 'Innovation Hall',
    comment: 'Where ideas meet.',
  },
  {
    id: 5,
    source: require('@/assets/images/event2.jpeg'),
    place: 'Auditorium',
    comment: 'Big shows, big vibes.',
  },
  {
    id: 6,
    source: require('@/assets/images/event3.jpeg'),
    place: 'Creative Corner',
    comment: 'Art speaks here.',
  },
  {
    id: 7,
    source: require('@/assets/images/c.jpeg'),
    place: 'Main Gate',
    comment: 'Where journeys start.',
  },
  {
    id: 8,
    source: require('@/assets/images/b.jpeg'),
    place: 'Logo Spot',
    comment: 'Good',
  },
  {
    id: 9,
    source: require('@/assets/images/event1.jpeg'),
    place: 'Walkway',
    comment: 'Breeze and good convo',
  },
];

export default function GalleryScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  const downloadImage = async (imageUri) => {
    try {
      // Define the location to save the file
      const fileUri = FileSystem.documentDirectory + 'downloadedImage.jpg';

      // Download the image to the document directory
      await FileSystem.downloadAsync(imageUri, fileUri);

      // Request media library permission (only needed for saving to the gallery)
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need permission to save images to your gallery');
        return;
      }

      // Save the downloaded file to the gallery
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync('MyAppGallery');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('MyAppGallery', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
      }
      Alert.alert('Download Successful', 'The image has been downloaded to your gallery');
    } catch (error) {
      console.error('Error downloading image:', error);
      Alert.alert('Download Failed', 'Failed to download the image');
    }
  };

  return (
    <View style={styles.container}>
  
      {/* Title */}
      <Text style={styles.title}>Gallery</Text>

      {/* Image Grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {images.map((img) => (
          <TouchableOpacity key={img.id} onPress={() => setSelectedImage(img)} style={styles.imageWrap}>
            <Image source={img.source} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal */}
      {selectedImage && (
        <Modal visible={true} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Image source={selectedImage.source} style={styles.fullImage} resizeMode="contain" />
              <Text style={styles.place}>{selectedImage.place}</Text>
              <Text style={styles.comment}>{selectedImage.comment}</Text>
              <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.closeBtn}>
                <Ionicons name="close" size={28} color="black" />
              </TouchableOpacity>

              {/* Download Button */}
              <TouchableOpacity
                onPress={() => downloadImage(selectedImage.source.uri)}
                style={styles.downloadBtn}
              >
              <Ionicons name="download" size={24} color="black" /> 
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  navIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  imageWrap: {
    width: (width - 48) / 2,
    aspectRatio: 0.8,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: width * 0.85,
  },
  fullImage: {
    width: '100%',
    height: width * 0.85,
    borderRadius: 12,
    marginBottom: 10,
  },
  place: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    textAlign: 'center',
  },
  comment: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  downloadBtn: {
    marginTop: 0,
    paddingVertical: 2,
    paddingHorizontal: 2,
  },

});
