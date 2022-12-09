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
const SkeletonDetailMember = (props) => {
  const translateX = props.circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 100],
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
      <View style={[{ marginBottom: 8 }, styles.card]}>
        <View
          style={{
            flexDirection: "column",
            width: width * 0.8,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            height: width * 0.3,
          }}>
          <View
            style={{
              width: width * 0.2,
              height: width * 0.2,
              borderRadius: 50,
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
              width: width * 0.29,
              height: width * 0.05,
              backgroundColor: "#ECEFF1",
              overflow: "hidden",
              marginTop: 10,
            }}>
            <Animated.View
              style={{
                width: "30%",
                opacity: 0.5,
                height: "100%",
                backgroundColor: "white",
                transform: [{ translateX: translateX3 }],
              }}></Animated.View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: width * 0.29,
          height: width * 0.05,
          backgroundColor: "#ECEFF1",
          overflow: "hidden",
          marginTop: 10,
          marginLeft: 20,
        }}>
        <Animated.View
          style={{
            width: "30%",
            opacity: 0.5,
            height: "100%",
            backgroundColor: "white",
            transform: [{ translateX: translateX3 }],
          }}></Animated.View>
      </View>
      <View
        style={[
          { marginBottom: 8, flexDirection: "column", alignItems: "center" },
        ]}>
        <View
          style={{
            width: width * 0.9,
            height: width * 0.1,
            backgroundColor: "#ECEFF1",
            overflow: "hidden",
            marginTop: 10,
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
      <View
        style={{
          width: width * 0.29,
          height: width * 0.05,
          backgroundColor: "#ECEFF1",
          overflow: "hidden",
          marginVertical: 10,
          marginLeft: 20,
        }}>
        <Animated.View
          style={{
            width: "30%",
            opacity: 0.5,
            height: "100%",
            backgroundColor: "white",
            transform: [{ translateX: translateX3 }],
          }}></Animated.View>
      </View>
      {Array(10)
        .fill("")
        .map((i, index) => (
          <View style={[{ marginBottom: 8 }, styles.card]} key={index}>
            <View
              style={{
                flexDirection: "column",
                width: width * 0.24,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                height: width * 0.2,
              }}>
              <View
                style={{
                  width: width * 0.23,
                  height: width * 0.2,
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
            <View
              style={{
                flex: 1,
                justifyContent: "space-evenly",
                overflow: "hidden",
              }}>
              <Animated.View style={{ backgroundColor: "#ECEFF1", height: 30 }}>
                <Animated.View
                  style={{
                    width: "20%",
                    height: "100%",
                    backgroundColor: "white",
                    opacity: 0.5,
                    transform: [{ translateX: translateX2 }],
                  }}></Animated.View>
              </Animated.View>
              <View
                style={{
                  flexDirection: "row",
                  width: width * 0.45,
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 5,
                }}>
                <View
                  style={{
                    width: width * 0.19,
                    height: width * 0.05,
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
                      transform: [{ translateX: translateX }],
                    }}></Animated.View>
                </View>
                <View
                  style={{
                    width: width * 0.2,
                    height: width * 0.055,
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
                      transform: [{ translateX: translateX }],
                    }}></Animated.View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: width * 0.45,
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 3,
                }}>
                <View
                  style={{
                    width: width * 0.19,
                    height: width * 0.05,
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
                      transform: [{ translateX: translateX }],
                    }}></Animated.View>
                </View>
                <View
                  style={{
                    width: width * 0.2,
                    height: width * 0.055,
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
                      transform: [{ translateX: translateX }],
                    }}></Animated.View>
                </View>
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
    paddingVertical: 5,
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
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
});

//make this component available to the app
export default SkeletonDetailMember;
