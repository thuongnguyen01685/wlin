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
} from "react-native";

import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { WebView } from "react-native-webview";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
import { useSelector } from "react-redux";

// create a component
const ReportExcel = () => {
  const { event } = useSelector((state) => state);
  const navigation = useNavigation();
  const [searchPart, setSearchPart] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart searchPart={searchPart} />
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
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 450,
              }}>
              <WebView
                source={{
                  html: `<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <style>body{padding:0px;margin:0px, height: "40%"} p{font-size: 20px;}</style>
                  </head><body>${
                    event.detailEvent.exfields.table
                      ? event.detailEvent.exfields.table
                      : `<h5>Vui lòng xác nhận tất toán trên hệ thống...</h5>`
                  }</body></html>`,
                }}
                nestedScrollEnabled={true}
              />
            </View>

            {event.detailEvent.exfields.table && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}>
                <Ionicons name="arrow-redo" size={40} color="#826CCF" />
                <Text
                  style={{
                    color: "#826CCF",
                    fontSize: 15,
                    fontWeight: "700",
                    marginLeft: 5,
                  }}>
                  Chia sẻ file Excel (.xlsx)
                </Text>
              </TouchableOpacity>
            )}
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
