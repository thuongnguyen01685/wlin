//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Lottie from "lottie-react-native";
// create a component
const Loading = (props) => {
  return (
    <View
      style={{
        left: 10,
        padding: 30,
        position: "absolute",
        left: "100%",
      }}>
      {Platform.OS === "ios" ? (
        <ActivityIndicator size={props.size} color="#826CCF" />
      ) : (
        <Lottie source={require("../../assets/loading.json")} autoPlay loop />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

//make this component available to the app
export default Loading;
