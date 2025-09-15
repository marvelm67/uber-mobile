import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function HeaderTabs() {
  const [activeTabs, setActiveTabs] = useState("Delivery");
  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <HeaderButton
        text="Delivery"
        activeTabs={activeTabs}
        setActiveTabs={setActiveTabs}
      />
      <HeaderButton
        text="Pickup"
        activeTabs={activeTabs}
        setActiveTabs={setActiveTabs}
      />
    </View>
  );
}

const HeaderButton = (props) => {
  console.log("HeaderButton props:", {
    text: props.text,
    activeTabs: props.activeTabs,
    isActive: props.activeTabs === props.text,
  });

  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: props.activeTabs === props.text ? "black" : "white",
          paddingVertical: 6,
          paddingHorizontal: 16,
          borderRadius: 30,
          marginHorizontal: 3,
          borderWidth: 2,
          borderColor: props.activeTabs === props.text ? "black" : "#ccc",
        }}
        onPress={() => {
          console.log("Button pressed:", props.text);
          props.setActiveTabs(props.text);
        }}
      >
        <Text
          style={{
            color: props.activeTabs === props.text ? "white" : "black",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {props.text}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
