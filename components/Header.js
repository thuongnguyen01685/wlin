//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import { AUTH } from "../redux/actions/authAction";

// create a component
const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleShowProfile = () => {
    //dispatch({ type: AUTH.SHOWPROFILE, payload: true });
    navigation.navigate("OtherScreen");
  };
  return (
    <View
      style={{
        zIndex: 4,
        position: "absolute",
        marginTop: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "4%",
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#ffffff",
            width: 40,
            height: 40,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            // transform: [{ rotate: "-45deg" }],
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={25} color="#711775" />
        </TouchableOpacity>
        <View style={{ marginLeft: 15 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#711775",
                fontSize: 20,
                fontWeight: "600",
              }}>
              Xin chào, Thương
            </Text>
            <View
              style={{
                top: -1,
                height: 20,
                left: -4,
                width: 10,
                //transform: [{ rotate: "45deg" }],
                flexDirection: "column",
                justifyContent: "flex-start",
              }}>
              <Image
                source={require("../assets/Vm.png")}
                style={{ width: 12, height: 12 }}
              />
            </View>
          </View>

          <Text
            style={{
              color: "#711775",
              fontSize: 13,
              fontWeight: "600",
            }}>
            WLIN Global
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}>
        <TouchableOpacity>
          <Ionicons name="qr-code-outline" size={35} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#711775",
            width: 50,
            height: 50,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            //transform: [{ rotate: "-45deg" }],
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginRight: "7%",
          }}
          onPress={handleShowProfile}>
          {/* <Ionicons
                  name="chevron-back-outline"
                  size={25}
                  color="#711775"
                  style={{ transform: [{ rotate: "45deg" }] }}
                /> */}
          <Image
            source={require("../assets/logo.png")}
            style={{
              width: 50,
              height: 50,
              //transform: [{ rotate: "45deg" }],
              resizeMode: "contain",
              borderRadius: 50,
              position: "absolute",
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default Header;
