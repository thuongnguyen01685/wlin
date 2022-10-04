//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useRef, useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AUTH, getProfileAction } from "../redux/actions/authAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../utils/fetchApi";
import ModalNotify from "./modal/ModalNotify";

// create a component
const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const handleShowProfile = () => {
    //dispatch({ type: AUTH.SHOWPROFILE, payload: true });
    navigation.navigate("Profile");
  };
  const amin = useRef(new Animated.Value(0)).current;

  const { auth, notify } = useSelector((state) => state);

  useEffect(() => {
    const it = async () => {
      const token = await AsyncStorage.getItem("@token_key");
      dispatch(getProfileAction(token));
    };
    it();
    Animated.loop(
      Animated.sequence([
        Animated.timing(amin, {
          toValue: -1, // so i add the delay here
          duration: 100,
          delay: 2 * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(amin, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(amin, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(amin, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(amin, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const rotation = amin.interpolate({
    inputRange: [-1, 1], // left side to right side
    outputRange: ["-10deg", "10deg"], // before that we have to check now it's perfect
  });

  return (
    <View
      style={{
        zIndex: 4,
        position: "absolute",
        marginTop: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",

        paddingHorizontal: 10,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
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
        <View style={{ left: 3 }}>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#711775",
                fontSize: 17,
                fontWeight: "600",
              }}>
              Xin chào, {auth.profile.name}
            </Text>
            {/* <View
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
            </View> */}
          </View>

          <Text
            style={{
              color: "#711775",
              fontSize: 12,
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
          justifyContent: "space-between",
          width: "30%",
        }}>
        {notify.getNotify.length > 0 ? (
          <Animated.View
            style={{ alignSelf: "center", transform: [{ rotate: rotation }] }}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="notifications" size={28} color="#711775" />
              <View
                style={{
                  position: "absolute",
                  left: 14,
                  top: 2,
                }}>
                <Text
                  style={{
                    backgroundColor: "#ff0",
                    fontSize: 8,
                    paddingHorizontal: notify.getNotify.length > 9 ? 2 : 4,
                    borderRadius: 50,
                    color: "#711775",
                    borderColor: "#ffffff",
                    borderWidth: 0.1,
                    fontWeight: "600",
                  }}>
                  {notify.getNotify.length > 9 ? "9+" : notify.getNotify.length}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="notifications" size={28} color="#711775" />
            {/* <View
              style={{
                position: "absolute",
                left: 14,
                top: 2,
              }}>
              <Text
                style={{
                  backgroundColor: "#ff0",
                  fontSize: 10,
                  paddingHorizontal: 7.5,
                  borderRadius: 50,
                  color: "#711775",
                  borderColor: "#ffffff",
                  borderWidth: 0.1,
                }}></Text>
            </View> */}
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("CheckQR");
          }}>
          <Ionicons name="qr-code-outline" size={30} />
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
          }}
          onPress={handleShowProfile}>
          {/* <Ionicons
                  name="chevron-back-outline"
                  size={25}
                  color="#711775"
                  style={{ transform: [{ rotate: "45deg" }] }}
                /> */}
          <Image
            source={{ uri: `${URL}${auth.profile.picture}` }}
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
      {modalVisible && (
        <ModalNotify
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
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
