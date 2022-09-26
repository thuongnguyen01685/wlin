//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
// create a component
const BodyReportExcel = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{ height: "100%" }}>
      <Text
        style={{
          fontSize: 20,
          color: "#711775",
          fontWeight: "600",
          paddingLeft: 20,
          paddingTop: 18,
        }}>
        Báo cáo chi tiết sự kiện
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{ marginBottom: "20%", marginTop: 20, paddingHorizontal: 30 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Image
              source={require("../../../assets/excel.png")}
              style={{ width: "100%", height: 300, resizeMode: "contain" }}
            />
          </View>

          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}>
            <Ionicons name="arrow-down-outline" size={20} color="#711775" />
            <Text
              style={{
                color: "#711775",
                fontSize: 12,
                fontWeight: "600",
                marginLeft: 5,
              }}>
              Tải file Excel (.xlsx)
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
});

//make this component available to the app
export default BodyReportExcel;
