//import liraries
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// create a component
const CardInfo = () => {
  return (
    <View>
      <LinearGradient
        start={{ x: 0.9, y: 1 }}
        end={{ x: 0.2, y: 0.6 }}
        colors={["#DEC1A1", "#FBECD7", "#F5DFC7", "#D5B59C"]}
        style={{ borderRadius: 7 }}>
        <Image
          source={require("../assets/cchuong.png")}
          style={{
            width: 60,
            height: 60,
            resizeMode: "contain",
            position: "absolute",
            left: 30,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginHorizontal: 10,
          }}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-horizontal"
              color="#FFFFFF"
              size={20}
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", padding: 20 }}>
          <Text
            style={{
              color: "#8D6B48",
              fontSize: 25,
              fontWeight: "600",
              textAlign: "center",
            }}>
            {/* {auth.permission.name} */}
            Thương
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10, bottom: 5 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Text style={styles.textContent}>Start date: 1/2/2021</Text>
            <Text style={styles.textContent}>Due date: 1/2/2022</Text>
          </View>
          <Text style={styles.textContent}>
            Thời gian hoạt động còn lại: 20 ngày
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
    marginVertical: 1,
  },
  textContent: {
    fontSize: 12,
    fontWeight: "400",
    color: "#ffffff",
  },
});

//make this component available to the app
export default CardInfo;
