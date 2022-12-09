//import liraries
import React, { Component, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  Dimensions,
} from "react-native";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});
const { width, height } = Dimensions.get("window");
// create a component
const SkeletonDetailEvents = (props) => {
  const translateX = props.circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 300],
  });

  const translateX2 = props.circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 200],
  });
  const translateX3 = props.circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 90],
  });

  return (
    <View>
      <View style={[{ marginBottom: 8, marginTop: 10 }, styles.card]}>
        <View
          style={{
            flexDirection: "column",
            width: width * 0.9,
            justifyContent: "center",
            alignItems: "center",
            height: width * 0.45,
          }}>
          <View
            style={{
              width: width * 0.9,
              height: width * 0.48,
              borderRadius: 10,
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
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 15,
        }}>
        <View
          style={{
            width: width * 0.25,
            height: width * 0.08,
            backgroundColor: "#ECEFF1",
            overflow: "hidden",
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
            width: width * 0.25,
            height: width * 0.05,
            backgroundColor: "#ECEFF1",
            overflow: "hidden",
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
      </View>

      {Array(10)
        .fill("")
        .map((i, index) => (
          <View
            style={[
              {
                marginBottom: 8,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              },
              styles.card,
            ]}
            key={index}>
            <View
              style={{
                width: width * 0.12,
                height: width * 0.12,
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
              <Animated.View
                style={{
                  backgroundColor: "#ECEFF1",
                  height: 28,
                }}>
                <Animated.View
                  style={{
                    width: "20%",
                    height: "100%",
                    backgroundColor: "white",
                    opacity: 0.5,
                    transform: [{ translateX: translateX2 }],
                  }}></Animated.View>
              </Animated.View>
              <View style={{ backgroundColor: "#ECEFF1", height: 28 }}>
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
        ))}
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
    backgroundColor: "#FAFAFA",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 15,
    justifyContent: "space-between",
  },
});

//make this component available to the app
export default SkeletonDetailEvents;
