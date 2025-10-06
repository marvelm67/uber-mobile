import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function RestaurantItem() {
  return (
    <View>
      <RestaurantImage />
      <RestaurantInfo />
    </View>
  );
}

const RestaurantImage = () => (
  <View style={{ position: "relative" }}>
    <Image
      source={require("../assets/images/restaurantimage.png")}
      style={{ width: "100%", height: 180 }}
    />
    <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </View>
);

const RestaurantInfo = () => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
      paddingHorizontal: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
        Farmhouse Thai Restaurant
      </Text>
      <Text style={{ fontSize: 13, color: "gray" }}>30-45 • min</Text>
    </View>
    <View
      style={{
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
      }}
    >
      <Text>4.5</Text>
    </View>
  </View>
);
