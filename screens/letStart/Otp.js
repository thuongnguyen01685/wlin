//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useRef, useState } from "react";
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
  Alert,
  Animated,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { RadioButton } from "react-native-paper";
import ModalSms from "../../components/ModalSms";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerWlinAction,
  getPermissionAction,
  getProfileAction,
  getRankAction,
  getTokenAction,
} from "../../redux/actions/authAction";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { getNotify } from "../../redux/actions/notifyAction";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const Otp = ({ route }) => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef();
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [modalSms, setModalSms] = useState(false);

  //animated
  const [status, setStatus] = useState(null);
  const popAnim = useRef(new Animated.Value(h * -1)).current;
  const successColor = "#6dcf81";
  const successHeader = "Success!";
  const successMessage = "Đăng nhập thành công";
  const failColor = "#bf6060";
  const failHeader = "Đăng nhập thất bại";
  const failMessage = "Kiểm tra lại mã OTP";

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: h * 0.1 * -1,
      duration: 300,
      useNativeDriver: true,
    }).start(popOut());
  };

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: h * -1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 10000);
  };

  const instantPopOut = () => {
    Animated.timing(popAnim, {
      toValue: h * -1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const dispatch = useDispatch();

  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourInput = useRef();
  const fiveInput = useRef();
  const sixInput = useRef();

  const [one, setOne] = useState(0);
  const [two, setTwo] = useState(0);
  const [three, setThree] = useState(0);
  const [four, setFour] = useState(0);
  const [five, setFive] = useState(0);
  const [six, setSix] = useState(0);

  const { auth } = useSelector((state) => state);

  // useEffect(() => {
  //   console.log(
  //     firstInput + secondInput + thirdInput + fourInput + fiveInput + sixInput
  //   );
  // }, [firstInput, secondInput, thirdInput, fourInput, fiveInput, sixInput]);

  const handleCheckOtp = async () => {
    const maOtp =
      one.toString() +
      two.toString() +
      three.toString() +
      four.toString() +
      five.toString() +
      six.toString();

    if (auth.otp.otp === maOtp.toString()) {
      const res = await dispatch(getTokenAction(auth.otp._id, auth.otp.otp));

      if (res) {
        dispatch(getProfileAction(res.token));
        dispatch(getNotify(res.token));
        //route.params.numberPhone
        dispatch(getCustomerWlinAction(res.token, route.params.value));
        dispatch(getPermissionAction(res.token, route.params.value));
        dispatch(getRankAction(res.token, route.params.value));
        setStatus("success");
        popIn();
        setTimeout(() => {
          navigation.navigate("TabBar");
        }, 1000);
      }
    } else {
      //Alert.alert("Sai mật mã. Vui lòng nhập lại mã OTP !");
      setStatus("fail");
      popIn();
    }
    // navigation.navigate("TabBar");
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      {modalSms && <ModalSms modalSms={modalSms} setModalSms={setModalSms} />}

      <View>
        <View>
          <View
            style={{
              marginHorizontal: 20,
              zIndex: 4,
              position: "absolute",
              top: "10%",
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#ffffff",
                width: 40,
                height: 40,
                paddingVertical: 5,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                marginBottom: 7,
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
              onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={25} color="#9D85F2" />
            </TouchableOpacity>
            <Text
              style={{
                color: "#826CCF",
                fontSize: 25,
                fontWeight: "600",
              }}>
              WLIN xin chào
            </Text>
            <View>
              <Animated.View
                style={[
                  styles.toastContainer,
                  {
                    transform: [{ translateY: popAnim }],
                  },
                ]}>
                <View style={styles.toastRow}>
                  <AntDesign
                    name={
                      status === "success" ? "checkcircleo" : "closecircleo"
                    }
                    size={24}
                    color={status === "success" ? successColor : failColor}
                  />
                  <View style={styles.toastText}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                      {status === "success" ? successHeader : failHeader}
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                      {status === "success" ? successMessage : failMessage}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={instantPopOut}>
                    <Entypo name="cross" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
          </View>
          <View>
            <ImageBackground
              source={require("../../assets/EllipseLogin.png")}
              style={{ height: 455, width: 325, zIndex: 1 }}
            />
            <ImageBackground
              source={require("../../assets/VctLogin.png")}
              style={{
                height: ratio * 1000,
                width: w,
                position: "absolute",
                zIndex: 2,
              }}
            />
            <ImageBackground
              source={require("../../assets/start2.png")}
              style={{
                height: ratio * 500,
                width: w,
                position: "absolute",
                top: "45%",
                zIndex: 3,
              }}
            />
          </View>
        </View>
        <View style={styles.body}>
          <ScrollView>
            <Text
              style={{
                fontSize: 25,
                color: "#9D85F2",
                fontWeight: "800",
                paddingLeft: 25,
                paddingTop: 18,
                textAlign: "center",
              }}>
              Xác nhận đăng nhập
            </Text>
            <View style={{}}>
              <View style={{ marginTop: 10, paddingHorizontal: 45 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    textAlign: "center",
                  }}>
                  Xin chào,
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "400",
                      left: 10,
                    }}>
                    {route.params.numberPhone}
                  </Text>
                </Text>
                <Text style={styles.contentText}>
                  Vui lòng nhập mã OTP để xác nhận đăng nhập.
                </Text>
              </View>

              <View style={styles.inputPart}>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={firstInput}
                  onChangeText={(text) => {
                    text && secondInput.current.focus();
                    setOne(text);
                  }}
                />
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={secondInput}
                  onChangeText={(text) => {
                    text
                      ? thirdInput.current.focus()
                      : firstInput.current.focus();
                    setTwo(text);
                  }}
                />
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={thirdInput}
                  onChangeText={(text) => {
                    text
                      ? fourInput.current.focus()
                      : secondInput.current.focus();
                    setThree(text);
                  }}
                />
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={fourInput}
                  onChangeText={(text) => {
                    text
                      ? fiveInput.current.focus()
                      : thirdInput.current.focus();
                    setFour(text);
                  }}
                />
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={fiveInput}
                  onChangeText={(text) => {
                    text ? sixInput.current.focus() : fourInput.current.focus();
                    setFive(text);
                  }}
                />
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={1}
                  ref={sixInput}
                  onChangeText={(text) => {
                    !text && fiveInput.current.focus();
                    setSix(text);
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  paddingHorizontal: 45,
                  justifyContent: "center",
                  marginVertical: 35,
                  top: 10,
                }}>
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  Bạn quên mã OTP?
                </Text>
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() =>
                    navigation.navigate("ForgetOtp", {
                      numberPhone: route.params.numberPhone,
                    })
                  }>
                  <Text
                    style={{
                      color: "#9D85F2",
                      fontSize: 15,
                      fontWeight: "600",
                    }}>
                    Xem tại đây.
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 30,
              }}>
              <TouchableOpacity onPress={handleCheckOtp}>
                <LinearGradient
                  start={{ x: 0, y: 0.3 }}
                  end={{ x: 1, y: 1 }}
                  colors={
                    ["#9796F0", "#FBC7D4"]
                    //   : ["#b2b2b2", "#d8d8d8"]
                  }
                  style={{
                    width: "100%",
                    paddingHorizontal: 30,
                    paddingVertical: 15,
                    borderRadius: 30,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}>
                  {/* <Ionicons name="arrow-forward" size={25} color="#ffffff" /> */}
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#ffffff",
                    }}>
                    Tiếp tục
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  body: {
    backgroundColor: "#ffffff",
    height: "100%",
    zIndex: 4,
    marginTop: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  contentText: {
    lineHeight: 23,
    fontSize: 13,
    textAlign: "center",
  },
  inputPart: {
    flexDirection: "row",
    marginTop: 15,
    height: 50,
    justifyContent: "space-around",
    marginLeft: 10,
  },
  input: {
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    width: 50,
    textAlign: "center",
  },
  //animated
  toastContainer: {
    height: 60,
    width: 350,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastRow: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  toastText: {
    width: "70%",
    padding: 2,
  },
});

//make this component available to the app
export default Otp;
