import { View, Text } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function SearchBar() {
  // Predefined places data for testing without API
  const predefinedPlaces = [
    {
      description: "New York, NY, USA",
      geometry: { location: { lat: 40.7128, lng: -74.006 } },
      place_id: "ChIJOwg_06VPwokRYv534QaPC8g",
    },
    {
      description: "Los Angeles, CA, USA",
      geometry: { location: { lat: 34.0522, lng: -118.2437 } },
      place_id: "ChIJE9on3F3HwoAR9AhGJW_fL-I",
    },
    {
      description: "Chicago, IL, USA",
      geometry: { location: { lat: 41.8781, lng: -87.6298 } },
      place_id: "ChIJ7cv00DwsDogRAMDACa2m4K8",
    },
    {
      description: "Houston, TX, USA",
      geometry: { location: { lat: 29.7604, lng: -95.3698 } },
      place_id: "ChIJAYWNSLS4QIYROwVl894CDco",
    },
    {
      description: "Phoenix, AZ, USA",
      geometry: { location: { lat: 33.4484, lng: -112.074 } },
      place_id: "ChIJkdp2lcNQwoAR-Rp2MO6v2CI",
    },
  ];

  return (
    <View style={{ marginTop: 15, flexDirection: "row" }}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        predefinedPlaces={predefinedPlaces}
        predefinedPlacesAlwaysVisible={true}
        enablePoweredByContainer={false}
        styles={{
          textInput: {
            backgroundColor: "#eee",
            borderRadius: 20,
            fontWeight: "700",
            marginTop: 7,
            paddingLeft: 15,
            height: 40,
          },
        }}
        onPress={(data, details = null) => {
          console.log("Selected place:", data, details);
        }}
        // Disable web requests to Google API
        disableScroll={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}
