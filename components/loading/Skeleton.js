//import liraries
import React, { Component, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated, Platform } from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});
// create a component
const Skeleton = () => {
  const circleAnimatedValue = useRef(new Animated.Value(0)).current;
  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated();
      }, 1000);
    });
  };

  useEffect(() => {
    circleAnimated();
  }, []);

  const translateX = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 100],
  });

  const translateX2 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 200],
  });
  const translateX3 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 90],
  });
  return (
    <View style={[{ marginBottom: 8 }, styles.card]}>
      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 60,
          backgroundColor: "#ECEFF1",
          overflow: "hidden",
          marginRight: 16,
        }}>
        <Animated.View
          style={{
            width: "30%",
            opacity: 0.5,
            height: "100%",
            backgroundColor: "white",
            transform: [{ translateX: translateX }],
          }}></Animated.View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          overflow: "hidden",
        }}>
        <Animated.View style={{ backgroundColor: "#ECEFF1", height: 32 }}>
          <Animated.View
            style={{
              width: "20%",
              height: "100%",
              backgroundColor: "white",
              opacity: 0.5,
              transform: [{ translateX: translateX2 }],
            }}></Animated.View>
        </Animated.View>
        <View style={{ backgroundColor: "#ECEFF1", height: 32 }}>
          <Animated.View
            style={{
              width: "20%",
              height: "100%",
              backgroundColor: "white",
              opacity: 0.5,
              transform: [{ translateX: translateX2 }],
            }}></Animated.View>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 14,
    shadowColor: "black",
    borderRadius: 15,
    backgroundColor: "#FAFAFA",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 15,
  },
});

//make this component available to the app
export default Skeleton;
