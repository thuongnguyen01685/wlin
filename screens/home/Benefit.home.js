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
        borderRadius: 15,
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
        {item?.user?.goi_thanh_vien === "01" ? (
          <Image
            source={require("../../assets/cupbac.png")}
            style={styles.imgCup}
          />
        ) : item?.user?.goi_thanh_vien === "02" ? (
          <Image
            source={require("../../assets/cupvang.png")}
            style={styles.imgCup}
          />
        ) : item?.user?.goi_thanh_vien === "03" ? (
          <Image
            source={require("../../assets/cupxanh.png")}
            style={styles.imgCup}
          />
        ) : item?.user?.goi_thanh_vien === "04" ? (
          <Image
            source={require("../../assets/cupden.png")}
            style={styles.imgCup}
          />
        ) : (
          <Image
            source={require("../../assets/cup0.png")}
            style={{
              width: 23,
              height: 23,
              resizeMode: "contain",
              marginRight: 5,
            }}
          />
        )}

        <Text style={{ fontSize: 14, fontWeight: "600", marginLeft: 5 }}>
          Tên hội viên: {item?.user?.ten_kh}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 25,
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
          {item?.ten_quyen_loi}
        </Text>
        {/* <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 5,
            backgroundColor: "#9D85F2",
            paddingHorizontal: 5,
            borderRadius: 15,
            paddingVertical: 5,
            paddingHorizontal: 10,
          }}>
          <Text style={{ fontSize: 11, color: "#ffffff" }}>Trả QL</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  imgCup: { width: 30, height: 30, top: 3 },
});

//make this component available to the app
export default BenefitHome;
