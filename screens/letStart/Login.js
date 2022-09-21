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
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { RadioButton } from "react-native-paper";
import ModalSms from "../../components/ModalSms";
import { useDispatch } from "react-redux";
import { AUTH, getOTP } from "../../redux/actions/authAction";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const Login = () => {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [valid, setValid] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef();
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [modalSms, setModalSms] = useState(false);
  const dispatch = useDispatch();

  const handleGetOtp = () => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    setShowMessage(true);
    setValid(checkValid ? checkValid : false);
    checkValid && checked && setModalSms(true);
    // dispatch(getOTP(value));
    // setTimeout(() => {
    //   dispatch({ type: AUTH.OTP, payload: [] });
    // }, [3000]);
  };
  return (
    <KeyboardAwareScrollView style={styles.container}>
      {modalSms && (
        <ModalSms
          modalSms={modalSms}
          setModalSms={setModalSms}
          numberphone={formattedValue}
        />
      )}
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
              <Ionicons
                name="chevron-back-outline"
                size={25}
                color="#711775"
                // style={{ transform: [{ rotate: "45deg" }] }}
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
            <Text style={{ fontSize: 20, color: "#711775", fontWeight: "600" }}>
              Đăng nhập
            </Text>
            {/* {showMessage && (
              <View style={styles.message}>
                <Text>Value : {value}</Text>
                <Text>Formatted Value : {formattedValue}</Text>
                <Text>Valid : {valid ? "true" : "false"}</Text>
              </View>
            )} */}
            {/* <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
            <View style={{ marginTop: "13%" }}>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue={value}
                  defaultCode="VN"
                  layout="first"
                  onChangeText={(text) => {
                    setValue(text);
                  }}
                  onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                  }}
                  withDarkTheme
                  withShadow
                  autoFocus={false}
                />
              </View>

              {showMessage ? (
                valid ? (
                  <></>
                ) : value === "" ? (
                  <Text style={{ fontSize: 10, color: "#FF0000" }}>
                    Vui lòng nhập đầy đủ số điện thoại
                  </Text>
                ) : (
                  <Text style={{ fontSize: 10, color: "#FF0000" }}>
                    Định dạng số chưa đúng.
                  </Text>
                )
              ) : (
                <Text></Text>
              )}
              <View
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                }}>
                <RadioButton
                  value={false}
                  status={checked === true ? "checked" : "unchecked"}
                  onPress={() => setChecked(!checked)}
                />

                <Text>
                  Đồng ý với{" "}
                  <Text style={{ color: "#711775", fontSize: 11 }}>
                    điều khoản & điều kiện
                  </Text>
                </Text>
              </View>
            </View>
            {/* </TouchableWithoutFeedback>
            </KeyboardAvoidingView> */}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingHorizontal: 10,
              }}>
              <TouchableOpacity onPress={handleGetOtp} disabled={false}>
                <LinearGradient
                  start={{ x: 0, y: 0.3 }}
                  end={{ x: 1, y: 1 }}
                  colors={
                    checked
                      ? [
                          "rgba(241, 108, 246, 0.8) 120.28%)",
                          "rgba(113, 23, 117, 0.8) -6.93%",
                        ]
                      : ["#b2b2b2", "#d8d8d8"]
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
    padding: 40,
  },
});

//make this component available to the app
export default Login;
