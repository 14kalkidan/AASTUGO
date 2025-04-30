import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const filters = ['All', 'Places', 'Events', 'Dorms'];

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [recentSearches, setRecentSearches] = useState([
    'Library',
    'Café',
    'Auditorium',
    'Innovation Hall',
  ]);

  const handleSearch = () => {
    if (query.trim() !== '') {
      setRecentSearches([
        query,
        ...recentSearches.filter((item) => item !== query),
      ].slice(0, 5));
      setQuery('');
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query) {
        console.log('Search sent to backend:', query, selectedFilter);
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [query, selectedFilter]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a place or event..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>

      {/* Filter Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterBtn,
              selectedFilter === filter && styles.activeFilterBtn,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recent Searches */}
      <Text style={styles.recentTitle}>Recent Searches</Text>
      <ScrollView contentContainerStyle={styles.recentList}>
        {recentSearches.map((item, index) => (
          <TouchableOpacity key={index} style={styles.searchItem}>
            <Text style={styles.searchText}>• {item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  searchContainer: {
    backgroundColor: '#eee',
    borderRadius: 30,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  searchInput: {
    fontSize: 14,
    color: '#000',
  },
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  filterBtn: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  activeFilterBtn: {
    backgroundColor: '#d0e7ff',
  },
  filterText: {
    fontSize: 14,
    color: '#555',
  },
  activeFilterText: {
    color: 'blue',
    fontWeight: '600',
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recentList: {},
  searchItem: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 8,
  },
  searchText: {
    fontSize: 16,
    color: '#444',
  },
});
