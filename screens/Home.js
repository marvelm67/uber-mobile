import { View, Text, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import HeaderTabs from "../components/HeaderTabs";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#eee" />
      <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
        <View style={{ marginTop: 50, backgroundColor: "white", padding: 15 }}>
          <HeaderTabs />
          <SearchBar />
        </View>
      </SafeAreaView>
    </>
  );
}
