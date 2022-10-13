//import liraries
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
  Keyboard,
  Platform,
  TextInput,
} from "react-native";
import HeaderPart from "../../components/HeaderPart/HeaderPart";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const data = [
  {
    icon: "chart-box-outline",
    name: "Quản trị hội viên",
    navigation: "ListMember",
    color: "#F0C24D",
  },
  {
    icon: "shield-check-outline",
    name: "Quản trị CLUB",
    navigation: "ClubScreen",
    color: "rgba(125, 18, 130, 0.7)",
  },
  {
    icon: "calendar-month-outline",
    name: "Quản trị sự kiện",
    navigation: "EventsScreen",
    color: "#689A4F",
  },
  // {
  //   picture: require("../../assets/Chart.png"),
  //   name: "Tạo CLUB",
  //   navigation: "CreateClub",
  // },
  // {
  //   picture: require("../../assets/Chart.png"),
  //   name: "Quản trị Referrals",
  //   navigation: "SlipsScreen",
  // },
  // {
  //   picture: require("../../assets/Chart.png"),
  //   name: "Quản trị TYFCB",
  //   navigation: "TYFCB",
  // },
  {
    icon: "note-text-outline",
    name: "Danh sách nhóm quyền lợi",
    navigation: "Benefit",
    color: "#B88FED",
  },
  {
    icon: "account-outline",
    name: "Hồ sơ cá nhân",
    navigation: "Profile",
    color: "rgba(238, 37, 121, 0.7)",
  },
];
// create a component
const Other = () => {
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
          marginTop: -55,
          marginHorizontal: 15,
          paddingVertical: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#711775" }}>
          Các mục khác
        </Text>
        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#711775" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: "80%",
              paddingHorizontal: 15,
              marginTop: 10,
            }}>
            <View>
              {data.map((item, index) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#F3F3F3",
                    marginVertical: 10,
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}
                  key={index}
                  onPress={() => navigation.navigate(`${item.navigation}`)}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <View
                        style={{
                          padding: 20,
                          borderRadius: 50,
                          backgroundColor: item.color,
                        }}>
                        {/* <Image
                          source={item.picture}
                          style={{ width: 20, height: 22 }}
                        /> */}
                        <MaterialCommunityIcons
                          name={item.icon}
                          size={20}
                          color="#ffffff"
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "column",
                          marginLeft: 10,
                          justifyContent: "center",
                        }}>
                        <Text
                          style={{
                            color: "#711775",
                            fontSize: 15,
                            fontWeight: "600",
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                  // onPress={() => navigation.navigate("DetailClub")}
                  >
                    <Ionicons
                      name="chevron-forward-outline"
                      size={25}
                      color="#711775"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
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
export default Other;
