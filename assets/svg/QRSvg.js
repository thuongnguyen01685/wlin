//import liraries
import { Ionicons } from "@expo/vector-icons";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

// create a component
const QRSvg = () => {
  return (
    <View
      style={{
        backgroundColor: "#9D85F2",
        paddingHorizontal: 4,
        paddingVertical: 3,
        top: 2,
        zIndex: 3,
        position: "absolute",
        borderRadius: 50,
      }}>
      <Ionicons
        name="qr-code"
        size={30}
        color="#ffffff"
        style={{ margin: 10 }}
      />
    </View>
  );
};

//make this component available to the app
export default QRSvg;
