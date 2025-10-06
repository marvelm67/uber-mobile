import { View, Text, SafeAreaView, StatusBar, ScrollView } from "react-native";
import React from "react";
import HeaderTabs from "../components/HeaderTabs";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import RestaurantItem from "../components/RestaurantItem";

export default function Home() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#eee" />
      <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
        <View style={{ marginTop: 50, backgroundColor: "white", padding: 15 }}>
          <HeaderTabs />
          <SearchBar />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Categories />
          <RestaurantItem />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
