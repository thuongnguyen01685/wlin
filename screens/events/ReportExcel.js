//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
} from "react-native";

import HeaderPart from "../../components/HeaderPart/HeaderPart";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const ReportExcel = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart />
      <View
        style={{
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          zIndex: 3,
          marginTop: -40,
          marginHorizontal: 15,
          paddingVertical: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
          Báo cáo chi tiết sự kiện
        </Text>
        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: "20%",
              marginTop: 20,
              paddingHorizontal: 30,
            }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Image
                source={require("../../assets/excel.png")}
                style={{ width: "100%", height: 300, resizeMode: "contain" }}
              />
            </View>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 20,
              }}>
              <Ionicons name="arrow-redo" size={20} color="#826CCF" />
              <Text
                style={{
                  color: "#826CCF",
                  fontSize: 12,
                  fontWeight: "600",
                  marginLeft: 5,
                }}>
                Chia sẻ file Excel (.xlsx)
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

//make this component available to the app
export default ReportExcel;
