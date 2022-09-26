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
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
  },
  {
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
  },
  {
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
  },
];
const BodyTYFCB = () => {
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
        Danh sách TYFCB
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
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  backgroundColor: "#F3F3F3",
                  marginVertical: 10,
                  borderRadius: 8,
                  paddingVertical: 20,
                }}
                // onPress={() => navigation.navigate("DetailClub")}
              >
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
                    {/* <Ionicons name="reader-outline" size={30} color="#711775" /> */}
                    <Image
                      source={require("../../../assets/like.png")}
                      style={{ width: 30, height: 20 }}
                    />
                    <Image
                      source={item.picture}
                      style={{ width: 90, height: 40, marginLeft: 10 }}
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
                        {item.nameAreas}
                      </Text>
                      <Text>{item.person}</Text>
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
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          position: "absolute",
          top: "75%",
          zIndex: 10,
          left: "80%",
        }}
        onPress={() => {
          navigation.navigate("CreateTYFCB");
        }}>
        <LinearGradient
          start={{ x: 0.8, y: 1 }}
          end={{ x: 0.3, y: 0.3 }}
          colors={[
            "rgba(241, 108, 246, 0.8) 120.28%)",
            "rgba(113, 23, 117, 0.8) -6.93%",
          ]}
          style={{
            width: 70,
            paddingVertical: 18,
            flexDirection: "row",
            justifyContent: "center",
            borderRadius: 50,
          }}>
          <Ionicons name="add-outline" size={30} color="#ffffff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default BodyTYFCB;
