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
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { RadioButton } from "react-native-paper";
import ModalSms from "../../components/ModalSms";
import { useDispatch, useSelector } from "react-redux";

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

  const handleCheckOtp = () => {
    const maOtp =
      one.toString() +
      two.toString() +
      three.toString() +
      four.toString() +
      five.toString() +
      six.toString();

    // if (auth.otp.otp === maOtp.toString()) {
    //   navigation.navigate("TabBar");
    // } else {
    //   Alert.alert("Sai mật mã. Vui lòng nhập lại mã OTP !");
    // }
    navigation.navigate("TabBar");
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
                borderRadius: 5,
                marginBottom: 7,
                transform: [{ rotate: "-45deg" }],
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
              <Ionicons
                name="chevron-back-outline"
                size={25}
                color="#711775"
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            </TouchableOpacity>
            <Text style={{ color: "#711775", fontSize: 25, fontWeight: "600" }}>
              WLIN xin chào
            </Text>
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
                fontSize: 20,
                color: "#711775",
                fontWeight: "600",
                paddingLeft: 25,
                paddingTop: 18,
              }}>
              Xác nhận đăng nhập
            </Text>
            <View style={{}}>
              <View style={{ marginTop: 10, paddingHorizontal: 45 }}>
                <Text style={styles.contentText}>
                  Xin chào, {route.params.numberPhone}
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
                }}>
                <Text>Bạn quên mã OTP?</Text>
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => navigation.navigate("ForgetOtp")}>
                  <Text
                    style={{
                      color: "#711775",
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
                justifyContent: "flex-end",
                paddingHorizontal: 30,
              }}>
              <TouchableOpacity onPress={handleCheckOtp}>
                <LinearGradient
                  start={{ x: 0, y: 0.3 }}
                  end={{ x: 1, y: 1 }}
                  colors={
                    [
                      "rgba(241, 108, 246, 0.8) 120.28%)",
                      "rgba(113, 23, 117, 0.8) -6.93%",
                    ]
                    //   : ["#b2b2b2", "#d8d8d8"]
                  }
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 19,
                    borderRadius: 30,
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}>
                  <Ionicons name="arrow-forward" size={25} color="#ffffff" />
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
});

//make this component available to the app
export default Otp;
