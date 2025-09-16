import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

export default function MultiSourceSearchBar() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Predefined popular restaurants and food places
  const popularPlaces = [
    { id: "p1", name: "McDonald's", type: "Fast Food" },
    { id: "p2", name: "Starbucks", type: "Coffee" },
    { id: "p3", name: "Pizza Hut", type: "Pizza" },
    { id: "p4", name: "Subway", type: "Sandwiches" },
    { id: "p5", name: "KFC", type: "Fast Food" },
    { id: "p6", name: "Burger King", type: "Fast Food" },
    { id: "p7", name: "Domino's Pizza", type: "Pizza" },
    { id: "p8", name: "Taco Bell", type: "Mexican" },
    { id: "p9", name: "Chipotle", type: "Mexican" },
    { id: "p10", name: "Dunkin'", type: "Coffee" },
  ];

  // Free geocoding with multiple fallback services
  const searchWithMultipleSources = async (query) => {
    if (query.length < 2) {
      // Show popular places for short queries
      const filtered = popularPlaces.filter(
        (place) =>
          place.name.toLowerCase().includes(query.toLowerCase()) ||
          place.type.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(
        filtered.map((place) => ({
          id: place.id,
          name: `${place.name} - ${place.type}`,
          source: "popular",
        }))
      );
      return;
    }

    setIsLoading(true);
    const results = [];

    try {
      // Method 1: Use Nominatim (OpenStreetMap) - Free
      const nominatimResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: query + " restaurant food",
            format: "json",
            limit: 3,
            addressdetails: 1,
          },
          headers: {
            "User-Agent": "UberFoodApp/1.0",
          },
          timeout: 5000,
        }
      );

      nominatimResponse.data.forEach((item) => {
        results.push({
          id: `nom_${item.place_id}`,
          name: item.display_name,
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
          source: "nominatim",
        });
      });
    } catch (error) {
      console.log("Nominatim search failed:", error.message);
    }

    try {
      // Method 2: Use LocationIQ (has free tier) - Alternative
      // You can sign up for free at locationiq.com for 5000 requests/day
      // Uncomment below if you want to use LocationIQ
      /*
      const locationIQResponse = await axios.get(
        `https://eu1.locationiq.com/v1/search.php`,
        {
          params: {
            key: 'YOUR_LOCATIONIQ_TOKEN', // Free tier available
            q: query,
            format: 'json',
            limit: 2,
          },
          timeout: 5000,
        }
      );

      locationIQResponse.data.forEach(item => {
        results.push({
          id: `liq_${item.place_id}`,
          name: item.display_name,
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
          source: 'locationiq'
        });
      });
      */
    } catch (error) {
      console.log("LocationIQ search failed:", error.message);
    }

    // Fallback: Filter popular places if no results from APIs
    if (results.length === 0) {
      const filtered = popularPlaces.filter(
        (place) =>
          place.name.toLowerCase().includes(query.toLowerCase()) ||
          place.type.toLowerCase().includes(query.toLowerCase())
      );

      filtered.forEach((place) => {
        results.push({
          id: place.id,
          name: `${place.name} - ${place.type}`,
          source: "popular",
        });
      });
    }

    setSuggestions(results.slice(0, 8)); // Limit to 8 results
    setShowSuggestions(true);
    setIsLoading(false);
  };

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedSearch = debounce(searchWithMultipleSources, 300);

  const handleTextChange = (text) => {
    setSearchText(text);
    if (text.length >= 1) {
      debouncedSearch(text);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handlePlaceSelect = (place) => {
    setSearchText(place.name);
    setShowSuggestions(false);
    setSuggestions([]);

    console.log("Selected place:", place);
    // Handle the selected place
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handlePlaceSelect(item)}
    >
      <Text style={styles.suggestionText} numberOfLines={2}>
        {item.name}
      </Text>
      <Text style={styles.sourceText}>
        {item.source === "popular" ? "⭐ Popular" : "📍 Location"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search restaurants & food..."
          value={searchText}
          onChangeText={handleTextChange}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
        />

        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#007bff" />
          </View>
        )}
      </View>

      {showSuggestions && suggestions.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={suggestions}
            renderItem={renderSuggestion}
            keyExtractor={(item) => item.id.toString()}
            style={styles.suggestionsList}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    zIndex: 1000,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 20,
    fontWeight: "700",
    paddingLeft: 15,
    paddingRight: 45,
    height: 40,
    fontSize: 16,
  },
  loadingContainer: {
    position: "absolute",
    right: 15,
  },
  suggestionsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: 250,
  },
  suggestionsList: {
    flexGrow: 0,
  },
  suggestionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  suggestionText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  sourceText: {
    fontSize: 12,
    color: "#666",
  },
});
