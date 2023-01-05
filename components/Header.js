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
  StatusBar,
  DeviceEventEmitter,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AUTH, getProfileAction } from "../redux/actions/authAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../utils/fetchApi";
import ModalNotify from "./modal/ModalNotify";
import { getNotify } from "../redux/actions/notifyAction";

// create a component
const Header = (props) => {
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
      DeviceEventEmitter.addListener("onwlinupdatehtv", async (data) => {
        if (data) {
          dispatch(getNotify(token));
        }
      });
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
        position: "absolute",
        paddingTop: StatusBar.currentHeight || 35,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 12,
        zIndex: 1,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        {props.backHome !== false && (
          <TouchableOpacity
            style={{
              backgroundColor: "#ffffff",
              width: 40,
              height: 40,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              // transform: [{ rotate: "-45deg" }],
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              zIndex: 1001,
              elevation: 5,
            }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={25} color="#9D85F2" />
          </TouchableOpacity>
        )}

        <View style={{ left: 3, flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: 52,
              height: 52,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              borderColor: "#ffffff",
              borderWidth: 1.5,
            }}
            onPress={handleShowProfile}>
            <View
              style={{
                width: 50,
                height: 50,
                resizeMode: "contain",
                borderRadius: 50,
              }}>
              <Image
                source={
                  auth?.profile?.picture
                    ? { uri: `${URL}${auth.profile.picture}` }
                    : require("../assets/avtUser.png")
                }
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                }}
              />
            </View>
          </TouchableOpacity>
          <View style={{ marginLeft: 5 }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: props.color ? props.color : "#FFFFFF",
                  fontSize: 14,
                  fontFamily: "LexendDeca_400Regular",
                }}>
                Chào buổi sáng
              </Text>
            </View>
            <Text
              style={{
                color: props.color ? props.color : "#FFFFFF",
                fontSize: 20,
                fontFamily: "LexendDeca_500Medium",
              }}>
              {auth.profile.name}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            width: 38,
            height: 38,
            borderRadius: 20,
          }}>
          {notify.getNotify.filter((item) => item.read === false).length > 0 ? (
            <Animated.View
              style={{
                alignSelf: "center",
                transform: [{ rotate: rotation }],
              }}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons name="notifications" size={25} color="#F2AF4A" />
                <View
                  style={{
                    position: "absolute",
                    left: 14,
                    top: 2,
                    backgroundColor: "#f00",
                    borderRadius: 50,
                  }}>
                  <Text
                    style={{
                      fontSize: 8,
                      paddingHorizontal: notify.getNotify.length > 9 ? 2 : 4,
                      color: "#ffffff",
                      fontFamily: "LexendDeca_600SemiBold",
                    }}>
                    {notify.getNotify.filter((item) => item.read === false)
                      .length > 9
                      ? "9+"
                      : notify.getNotify.filter((item) => item.read === false)
                          .length}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ) : (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="notifications" size={25} color="#F2AF4A" />
            </TouchableOpacity>
          )}
        </View>
        {modalVisible && (
          <ModalNotify
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}
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
  },
});

//make this component available to the app
export default Header;
