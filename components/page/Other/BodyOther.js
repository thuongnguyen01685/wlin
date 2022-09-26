//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

// create a component
const data = [
  {
    picture: require("../../../assets/Chart.png"),
    name: "Quản trị hội viên",
    navigation: "SlipsScreen",
  },
  {
    picture: require("../../../assets/uit_shield-check.png"),
    name: "Quản trị CLUB",
    navigation: "ClubScreen",
  },
  {
    picture: require("../../../assets/Calendar.png"),
    name: "Quản trị sự kiện",
    navigation: "EventsScreen",
  },
  {
    picture: require("../../../assets/Chart.png"),
    name: "Tạo CLUB",
    navigation: "CreateClub",
  },
  {
    picture: require("../../../assets/Chart.png"),
    name: "Quản trị Referrals",
    navigation: "SlipsScreen",
  },
  {
    picture: require("../../../assets/Chart.png"),
    name: "Quản trị TYFCB",
    navigation: "TYFCB",
  },
  {
    picture: require("../../../assets/Paper.png"),
    name: "Danh sách nhóm quyền lợi",
    navigation: "Benefit",
  },
  {
    picture: require("../../../assets/Profile.png"),
    name: "Hồ sơ cá nhân",
    navigation: "Profile",
  },
];
const BodyOther = () => {
  const navigation = useNavigation();
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
        Khác
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: "20%",
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
                        backgroundColor: "rgba(127, 32, 131, 0.2)",
                      }}>
                      <Image
                        source={item.picture}
                        style={{ width: 20, height: 22 }}
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
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default BodyOther;
