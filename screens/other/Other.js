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
import { useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { Admin, Member, Partner } from "../../utils/AccessPermission";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const data = [
  {
    icon: "account-multiple",
    name: "Quản trị hội viên",
    navigation: "ListMember",
    color: "#BF1FE7",
    permission: [Partner, Admin],
  },
  {
    icon: "shield-check",
    name: "Quản trị CLUB",
    navigation: "ClubScreen",
    color: "#32DBDB",
    permission: [Admin],
  },
  {
    icon: "calendar-month",
    name: "Quản trị sự kiện",
    navigation: "EventsScreen",
    color: "#1D19D4",
    permission: [Admin],
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
  {
    icon: "chart-box",
    name: "Referrals",
    navigation: "Slips",
    color: "#F12247",
    permission: [Member, Partner],
  },
  {
    icon: "chart-box",
    name: "TYFCBs",
    navigation: "TYFCB",
    color: "#058602",
    permission: [Member, Partner],
  },
  {
    icon: "note-text",
    name: "Danh sách nhóm quyền lợi",
    navigation: "Benefit",
    color: "#FEC90F",
    permission: [Member, Partner, Admin],
  },
  {
    icon: "account",
    name: "Hồ sơ cá nhân",
    navigation: "Profile",
    color: "#EDA6EA",
    permission: [Member, Partner, Admin],
  },
];
// create a component
const Other = () => {
  const navigation = useNavigation();

  const { auth } = useSelector((state) => state);

  let dataHas = [];

  data.map((item) => {
    if (item.permission.includes(auth.permission.group_id) === true) {
      dataHas.push(item);
    }
  });

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
          marginTop: -50,
          marginHorizontal: 15,
          paddingVertical: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
          Các mục khác
        </Text>
        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#9D85F2" />
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
              {dataHas.map((item, index) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#Ffffff",
                    marginVertical: 10,
                    borderRadius: 15,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderWidth: 0.8,
                    borderColor: "#E8E8E8",
                    // shadowColor: "#000",
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 1,
                    // },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 3.84,

                    // elevation: 5,
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
                          padding: 10,
                          borderRadius: 50,
                        }}>
                        {/* <Image
                          source={item.picture}
                          style={{ width: 20, height: 22 }}
                        /> */}
                        <MaterialCommunityIcons
                          name={item.icon}
                          size={30}
                          color={item.color}
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
                            color: "#474747",
                            fontSize: 15,
                            fontWeight: "800",
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
                      color="#9D85F2"
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
