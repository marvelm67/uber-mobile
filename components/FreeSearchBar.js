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

export default function FreeSearchBar() {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounce function to avoid too many API calls
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

  // Search using Nominatim (OpenStreetMap) - Completely FREE
  const searchPlaces = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: query,
            format: "json",
            limit: 5,
            addressdetails: 1,
            countrycodes: "us", // You can change this or remove for worldwide search
          },
          headers: {
            "User-Agent": "UberFoodApp/1.0", // Required by Nominatim
          },
        }
      );

      const formattedResults = response.data.map((item) => ({
        id: item.place_id,
        name: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        address: item.display_name,
      }));

      setSuggestions(formattedResults);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce(searchPlaces, 500);

  const handleTextChange = (text) => {
    setSearchText(text);
    if (text.length >= 3) {
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
    // You can handle the selected place here
    // For example, pass it to parent component or navigate to map
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handlePlaceSelect(item)}
    >
      <Text style={styles.suggestionText} numberOfLines={2}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search for places..."
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
    paddingRight: 15,
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
    maxHeight: 200,
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
  },
});
