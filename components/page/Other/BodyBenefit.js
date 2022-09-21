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
    picture: require("../../../assets/logo.png"),
    name: "Nhóm quyền lợi Partner",
    rank: "Partner",
  },
  {
    picture: require("../../../assets/logo.png"),
    name: "Nhóm quyền lợi Kim cương",
    rank: "Kim cương",
  },
  {
    picture: require("../../../assets/logo.png"),
    name: "Nhóm quyền lợi Vàng",
    rank: "Vàng",
  },
  {
    picture: require("../../../assets/logo.png"),
    name: "Nhóm quyền lợi Bạc",
    rank: "Bạc",
  },
];
const BodyBenefit = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          color: "#711775",
          fontWeight: "600",
          paddingLeft: 20,
          paddingTop: 18,
        }}>
        Danh sách nhóm quyền lợi
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: "57%",
            paddingHorizontal: 15,
            marginTop: 20,
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
                  paddingVertical: 20,
                  paddingHorizontal: 15,
                }}
                key={index}>
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
                    <Image
                      source={item.picture}
                      style={{ width: 90, height: 40 }}
                    />

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
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 12,
                          fontWeight: "500",
                        }}>
                        Gói: {item.rank}
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
export default BodyBenefit;
