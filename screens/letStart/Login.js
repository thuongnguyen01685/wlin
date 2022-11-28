//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-root-toast";
import ModalSms from "../../components/ModalSms";
import { useDispatch, useSelector } from "react-redux";
import { AUTH, getOTP } from "../../redux/actions/authAction";
import { CheckBox } from "@rneui/themed";

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
  //const [modalSms, setModalSms] = useState(false);
  const dispatch = useDispatch();

  const handleGetOtp = async () => {
    const checkValid = phoneInput.current?.isValidNumber(value);
    setShowMessage(true);
    setValid(checkValid ? checkValid : false);

    if (checkValid && checked) {
      // const res = await dispatch(getOTP(value));
      // if (res) {
      //   //setModalSms(true);
      //   navigation.navigate("Otp", {
      //     numberPhone: formattedValue,
      //     value: value,
      //   });
      //   setTimeout(() => {
      //     dispatch({ type: AUTH.OTP, payload: "" });
      //   }, 300 * 1000);
      // } else {
      //   Toast.show("Tài khoản này không tồn tại !", {
      //     duration: Toast.durations.LONG,
      //     position: Toast.positions.BOTTOM,
      //   });
      // }
      navigation.navigate("Otp", {
        numberPhone: formattedValue,
        value: value,
      });
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {/* {modalSms && (
        <ModalSms
          modalSms={modalSms}
          setModalSms={setModalSms}
          numberphone={formattedValue}
          value={value}
        />
      )} */}
      <ScrollView>
        <View
          style={{
            marginHorizontal: 20,
            zIndex: 4,
            position: "absolute",
            top: "8%",
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
              color="#9D85F2"
              // style={{ transform: [{ rotate: "45deg" }] }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: "#ffffff",
              fontSize: 25,
              fontWeight: "600",
              marginLeft: 15,
            }}>
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
          <Image
            source={require("../../assets/start2.png")}
            style={{
              height: ratio * 530,
              width: w,
              position: "absolute",
              top: "40%",
              zIndex: 3,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={styles.body}>
          <Text
            style={{
              fontSize: 25,
              color: "#9D85F2",
              fontWeight: "800",
              textAlign: "center",
            }}>
            Đăng nhập
          </Text>
          <View style={{ marginTop: 10 }}>
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
                <Text
                  style={{ fontSize: 10, color: "#FF0000", left: 15, top: 5 }}>
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
                justifyContent: "center",
                alignItems: "center",
              }}>
              <CheckBox
                center
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checkedColor="#9D85F2"
                checked={checked}
                onPress={() => setChecked(!checked)}
              />

              <Text style={{ fontSize: 12, left: -15 }}>
                Đồng ý với{" "}
                <Text style={{ color: "#9D85F2" }}>điều khoản & điều kiện</Text>
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleGetOtp}
            disabled={false}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
              backgroundColor: checked ? "#9796f0" : "#b2b2b2",
              paddingVertical: 17,
              borderRadius: 30,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#ffffff",
              }}>
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 30,
    top: 18,
  },
});

//make this component available to the app
export default Login;
