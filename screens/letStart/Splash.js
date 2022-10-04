//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch } from "react-redux";
import { AUTH, getProfileAction } from "../../redux/actions/authAction";
import { getNotify } from "../../redux/actions/notifyAction";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
// create a component
const Splash = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    const it = async () => {
      const token = await AsyncStorage.getItem("@token_key");
      if (token) {
        await dispatch({ type: AUTH.TOKEN, payload: token });
      }
    };
    it();
  }, [dispatch]);
  const handleGo = async () => {
    const token = await AsyncStorage.getItem("@token_key");

    if (token) {
      dispatch(getProfileAction(token));
      dispatch(getNotify(token));
      
      navigation.navigate("TabBar");
    } else {
      navigation.navigate("Wellcome");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 1, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        colors={[
          "rgba(113, 23, 117, 0.8) -6.93%",
          "rgba(241, 108, 246, 0.8) 120.28%",
        ]}
        style={{
          flex: 1,
          //   justifyContent: "center",
          //   alignContent: "center",
          //   alignItems: "center",
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 10,
            height: "85%",
            flexDirection: "column",
            justifyContent: "center",
          }}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}>
            <Image
              source={require("../../assets/logo.png")}
              style={{ width: 330, height: 150 }}
            />
            <Text
              style={{
                color: "#F3E6A4",
                fontSize: 15,
                fontWeight: "600",
                textAlign: "center",
                marginTop: 10,
              }}>
              Kiến tạo mạng lưới Nữ lãnh đạo thịnh vượng
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity onPress={handleGo}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 19,
                borderRadius: 30,
                flexDirection: "row",
                justifyContent: "space-around",
                backgroundColor: "#ffffff",
              }}>
              <Ionicons name="arrow-forward" size={25} color="#711775" />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default Splash;
