//import liraries
import React, { Component } from "react";
import { Dimensions } from "react-native";
import { View, Text, StyleSheet, Animated } from "react-native";

// create a component
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const SkeletonEvent = (props) => {
  return (
    <View style={[{ marginBottom: 5 }, styles.card]} key={props.index}>
      <View
        style={{
          flexDirection: "column",
          width: w * 0.24,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          height: w * 0.2,
        }}>
        <View
          style={{
            width: w * 0.2,
            height: w * 0.18,
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
              transform: [{ translateX: props.translateX }],
            }}></Animated.View>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          overflow: "hidden",
        }}>
        <Animated.View style={{ backgroundColor: "#ECEFF1", height: 25 }}>
          <Animated.View
            style={{
              width: "20%",
              height: "100%",
              backgroundColor: "white",
              opacity: 0.5,
              transform: [{ translateX: props.translateX2 }],
            }}></Animated.View>
        </Animated.View>
        <View
          style={{
            flexDirection: "row",
            width: w * 0.45,
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 5,
          }}>
          <View
            style={{
              width: w * 0.19,
              height: w * 0.05,
              borderRadius: 5,
              backgroundColor: "#ECEFF1",
              overflow: "hidden",
            }}>
            <Animated.View
              style={{
                width: "30%",
                opacity: 0.5,
                height: "100%",
                backgroundColor: "white",
                transform: [{ translateX: props.translateX }],
              }}></Animated.View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: w * 0.45,
            justifyContent: "flex-start",
            alignItems: "center",
            marginTop: 3,
          }}>
          <View
            style={{
              width: w * 0.4,
              height: w * 0.05,
              borderRadius: 5,
              backgroundColor: "#ECEFF1",
              overflow: "hidden",
            }}>
            <Animated.View
              style={{
                width: "30%",
                opacity: 0.5,
                height: "100%",
                backgroundColor: "white",
                transform: [{ translateX: props.translateX }],
              }}></Animated.View>
          </View>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  card: {
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
});

//make this component available to the app
export default SkeletonEvent;
