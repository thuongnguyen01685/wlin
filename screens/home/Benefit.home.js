//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// create a component
const BenefitHome = ({ item }) => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        borderRadius: 7,
        marginHorizontal: 15,
        paddingVertical: 5,
        marginVertical: 10,
        borderWidth: 0.8,
        borderColor: "#E8E8E8",
      }}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 5,
          alignItems: "center",
        }}>
        <Image
          source={require("../../assets/cup.png")}
          style={{ width: 30, height: 30, top: 3 }}
        />
        <Text style={{ fontSize: 14, fontWeight: "600" }}>
          Tên hội viên: {item.ten_kh}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 18,
          paddingRight: 5,
          alignItems: "center",
        }}>
        <Text
          style={{
            fontSize: 11,
            fontWeight: "500",
            width: "70%",
            textAlign: "justify",

            marginHorizontal: 15,
          }}>
          {item.ten_quyen_loi}
        </Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
            backgroundColor: "#826CCF",
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <MaterialCommunityIcons
            name="hand-extended-outline"
            size={20}
            color="#ffffff"
          />
          <Text style={{ fontSize: 11, color: "#ffffff" }}>Trả QL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default BenefitHome;
