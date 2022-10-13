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
import Lottie from "lottie-react-native";
import { useDispatch } from "react-redux";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const data = [
  {
    picture: require("../../assets/logo.png"),
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
  },
  {
    picture: require("../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
  },
  {
    picture: require("../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
  },
];
// create a component
const TYFCB = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
            Danh sách TYFCB
          </Text>

          {refreshing && (
            <View
              style={{
                left: 10,
                padding: 30,
                position: "absolute",
                left: "100%",
              }}>
              <Lottie
                source={require("../../assets/loading.json")}
                autoPlay
                loop
              />
            </View>
          )}
        </View>

        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
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
                        source={require("../../assets/like.png")}
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
            top: "55%",
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
export default TYFCB;
