import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Popular food places and restaurants
  const foodPlaces = [
    { id: "1", name: "McDonald's", type: "Fast Food", rating: "4.2" },
    { id: "2", name: "Starbucks", type: "Coffee", rating: "4.4" },
    { id: "3", name: "Pizza Hut", type: "Pizza", rating: "4.1" },
    { id: "4", name: "Subway", type: "Sandwiches", rating: "4.0" },
    { id: "5", name: "KFC", type: "Chicken", rating: "4.2" },
    { id: "6", name: "Burger King", type: "Fast Food", rating: "4.1" },
    { id: "7", name: "Domino's Pizza", type: "Pizza", rating: "4.3" },
    { id: "8", name: "Taco Bell", type: "Mexican", rating: "4.0" },
    { id: "9", name: "Chipotle", type: "Mexican", rating: "4.2" },
    { id: "10", name: "Dunkin'", type: "Coffee & Donuts", rating: "4.1" },
    { id: "11", name: "Wendy's", type: "Fast Food", rating: "4.2" },
    { id: "12", name: "Chick-fil-A", type: "Chicken", rating: "4.5" },
    { id: "13", name: "Papa John's", type: "Pizza", rating: "4.0" },
    { id: "14", name: "Five Guys", type: "Burgers", rating: "4.4" },
    { id: "15", name: "Panda Express", type: "Chinese", rating: "4.1" },
  ];

  const filteredPlaces = foodPlaces.filter(
    (place) =>
      place.name.toLowerCase().includes(searchText.toLowerCase()) ||
      place.type.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePlaceSelect = (place) => {
    setSearchText(place.name);
    setShowSuggestions(false);
    Alert.alert(
      "Restaurant Selected",
      `You selected ${place.name} - ${place.type}\nRating: ${place.rating}/5.0`,
      [{ text: "OK", onPress: () => console.log("Selected:", place) }]
    );
  };

  const renderSuggestion = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestionItem}
      onPress={() => handlePlaceSelect(item)}
    >
      <View style={styles.suggestionContent}>
        <Text style={styles.suggestionName}>{item.name}</Text>
        <Text style={styles.suggestionType}>{item.type}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search for restaurants, food..."
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          setShowSuggestions(text.length > 0);
        }}
        onFocus={() => setShowSuggestions(searchText.length > 0)}
        onBlur={() => {
          // Delay hiding suggestions to allow for selection
          setTimeout(() => setShowSuggestions(false), 150);
        }}
      />

      {showSuggestions && filteredPlaces.length > 0 && (
        <View style={styles.suggestionsContainer}>
          <FlatList
            data={filteredPlaces.slice(0, 8)} // Show max 8 suggestions
            renderItem={renderSuggestion}
            keyExtractor={(item) => item.id}
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
  textInput: {
    backgroundColor: "#eee",
    borderRadius: 20,
    fontWeight: "700",
    paddingLeft: 15,
    paddingRight: 15,
    height: 40,
    fontSize: 16,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  suggestionType: {
    fontSize: 13,
    color: "#666",
  },
  ratingContainer: {
    alignItems: "flex-end",
  },
  rating: {
    fontSize: 14,
    color: "#ff6347",
    fontWeight: "500",
  },
});
