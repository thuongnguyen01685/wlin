//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AUTH, getProfileAction } from "../../redux/actions/authAction";
import { getNotify } from "../../redux/actions/notifyAction";
import Lottie from "lottie-react-native";
// import {
//   CirclesLoader,
//   PulseLoader,
//   TextLoader,
//   DotsLoader,
//   BubblesLoader,
// } from "react-native-indicator";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
// create a component
const Splash = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  useEffect(() => {
    const it = async () => {
      const token = await AsyncStorage.getItem("@token_key");
      setLoading(true);
      setTimeout(async () => {
        if (token) {
          await dispatch({ type: AUTH.TOKEN, payload: token });
          dispatch(getProfileAction(token));
          dispatch(getNotify(token));
          setLoading(false);
          navigation.navigate("TabBar");
        } else {
          setLoading(false);
          navigation.navigate("Wellcome");
        }
      }, 1 * 2000);
    };
    it();
  }, [dispatch, auth.token]);
  // const handleGo = async () => {
  //   const token = await AsyncStorage.getItem("@token_key");

  //   if (token) {
  //     dispatch(getProfileAction(token));
  //     dispatch(getNotify(token));

  //     navigation.navigate("TabBar");
  //   } else {
  //     navigation.navigate("Wellcome");
  //   }
  // };

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 1, y: 0.4 }}
        end={{ x: 1, y: 1 }}
        colors={["#9796F0", "#FBC7D4"]}
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}>
        <View
          style={{
            paddingHorizontal: 20,

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
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
            top: "10%",

            height: 150,
            zIndex: 1,
          }}>
          {/* <TouchableOpacity onPress={handleGo}>
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
          </TouchableOpacity> */}
          {/* <Lottie
            source={require("../../assets/animationloader.json")}
            autoPlay
            loop
          /> */}
          {/* <ActivityIndicator size="large" color="#00ff00" /> */}
          {loading && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          )}
        </View>
      </LinearGradient>
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
  lottie: {
    width: 100,
    height: 100,
  },
});

//make this component available to the app
export default Splash;
