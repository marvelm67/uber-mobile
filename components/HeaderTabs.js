import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function HeaderTabs() {
  const [activeTabs, setActiveTabs] = useState("Delivery");
  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <HeaderButton
        text="Delivery"
        btnColor="black"
        textColor="white"
        activeTabs={activeTabs}
        setActiveTabs={setActiveTabs}
      />
      <HeaderButton
        text="Pickup"
        btnColor="white"
        textColor="black"
        activeTabs={activeTabs}
        setActiveTabs={setActiveTabs}
      />
    </View>
  );
}

const HeaderButton = (props) => (
  <View>
    <TouchableOpacity
      style={{
        backgroundColor: props.btnColor,
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 30,
      }}
      onPress={() => props.setActiveTabs(props.text)}
    >
      <Text
        style={{ color: props.textColor, fontSize: 16, fontWeight: "bold" }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  </View>
);
