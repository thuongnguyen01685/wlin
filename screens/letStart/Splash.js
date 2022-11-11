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
  BackHandler,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH,
  getCustomerWlinAction,
  getPermissionAction,
  getProfileAction,
  getRankAction,
} from "../../redux/actions/authAction";
import { getNotify } from "../../redux/actions/notifyAction";
import Lottie from "lottie-react-native";
import { Admin } from "../../utils/AccessPermission";
import ModalALertPermission from "../../components/modal/ModalALertPermission";
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

  const [showAlertPermission, setShowAlertPermission] = useState(false);

  useEffect(() => {
    const it = async () => {
      const token = await AsyncStorage.getItem("@token_key");
      setLoading(true);
      setTimeout(async () => {
        if (token) {
          await dispatch({ type: AUTH.TOKEN, payload: token });
          const res = await dispatch(getProfileAction(token));

          if (res) {
            const access = await dispatch(getPermissionAction(token, res));

            if (access !== Admin) {
              const goi = await dispatch(getRankAction(token, res));

              dispatch({ type: AUTH.GOI, payload: goi });
              dispatch(getCustomerWlinAction(token, res));
              if (goi) {
                navigation.navigate("TabBar");
              } else {
                setShowAlertPermission(true);
              }
            } else {
              const goi = await dispatch(getRankAction(token, res));
              dispatch({ type: AUTH.GOI, payload: goi });
              dispatch(getCustomerWlinAction(token, res));
              navigation.navigate("TabBar");
            }
          }
          dispatch(getNotify(token));
          setLoading(false);
        } else {
          setLoading(false);
          navigation.navigate("Wellcome");
        }
      }, 1 * 2000);
    };
    it();
  }, [dispatch, auth.token]);

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
            height: 100,
            zIndex: 1,
            width: 100,
            Top: 20,
          }}>
          {/* <Lottie
            source={require("../../assets/animationloader.json")}
            autoPlay
            loop
          /> */}
          {loading && <ActivityIndicator size="large" color="#00ff00" />}

          {showAlertPermission && (
            <ModalALertPermission
              showAlertPermission={showAlertPermission}
              setShowAlertPermission={setShowAlertPermission}
            />
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
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

//make this component available to the app
export default Splash;
