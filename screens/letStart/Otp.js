//import liraries
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
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
  TextInput,
  Animated,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH,
  getCustomerWlinAction,
  getPermissionAction,
  getProfileAction,
  getRankAction,
  getTokenAction,
} from "../../redux/actions/authAction";
import { getNotify } from "../../redux/actions/notifyAction";
import ModalSms from "../../components/ModalSms";
import { Admin } from "../../utils/AccessPermission";
import ModalALertPermission from "../../components/modal/ModalALertPermission";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const CELL_COUNT = 6;
const Otp = ({ route }) => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const navigation = useNavigation();

  const [modalSms, setModalSms] = useState(false);
  const [showAlertPermission, setShowAlertPermission] = useState(false);
  const [loading, setLoading] = useState(false);

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

  //textinput
  const { auth } = useSelector((state) => state);

  let number = route.params.value;
  if (!number.startsWith("0")) number = "0" + route.params.value;
  const handleCheckOtp = async () => {
    setLoading(true);

    if (auth.otp.otp === value.toString()) {
      const res = await dispatch(getTokenAction(auth.otp._id, auth.otp.otp));

      if (res) {
        dispatch(getNotify(res.token));
        setStatus("success");
        popIn();

        const resPhone = await dispatch(getProfileAction(res.token));
        const access = await dispatch(getPermissionAction(res.token, resPhone));
        if (resPhone) {
          if (access !== Admin) {
            ///const goi = await dispatch(getRankAction(res.token, resPhone));
            //console.log(goi);
            //await dispatch({ type: AUTH.GOI, payload: goi });
            const goi = await dispatch(
              getCustomerWlinAction(res.token, resPhone)
            );

            if (goi) {
              await dispatch({ type: AUTH.GOI, payload: goi.goi_thanh_vien });
              await navigation.navigate("TabBar");
            } else {
              await dispatch({ type: AUTH.GOI, payload: [] });
              setShowAlertPermission(true);
            }
          } else {
            const goi = await dispatch(
              getCustomerWlinAction(res.token, resPhone)
            );
            if (goi) {
              await dispatch({ type: AUTH.GOI, payload: goi.goi_thanh_vien });
            }

            await navigation.navigate("TabBar");
          }
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
      setStatus("fail");
      popIn();
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {modalSms && <ModalSms modalSms={modalSms} setModalSms={setModalSms} />}
      {showAlertPermission && (
        <ModalALertPermission
          showAlertPermission={showAlertPermission}
          setShowAlertPermission={setShowAlertPermission}
          content={"Vui lòng nâng cấp lên gói thành viên."}
        />
      )}
      {loading && (
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            opacity: 0.5,
            width: w,
            height: h,
            position: "absolute",
            zIndex: 20,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
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
            color: "#ffffff",
            fontSize: 25,
            fontFamily: "LexendDeca_600SemiBold",
            marginLeft: 15,
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
                name={status === "success" ? "checkcircleo" : "closecircleo"}
                size={24}
                color={status === "success" ? successColor : failColor}
              />
              <View style={styles.toastText}>
                <Text
                  style={{ fontSize: 15, fontFamily: "LexendDeca_500Medium" }}>
                  {status === "success" ? successHeader : failHeader}
                </Text>
                <Text
                  style={{ fontSize: 12, fontFamily: "LexendDeca_400Regular" }}>
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
        <ScrollView>
          <Text
            style={{
              fontSize: 25,
              color: "#9D85F2",
              fontFamily: "LexendDeca_600SemiBold",
              textAlign: "center",
              paddingLeft: 25,
              paddingTop: 18,
              textAlign: "center",
            }}>
            Xác nhận đăng nhập
          </Text>
          <View style={{ marginTop: 10, paddingHorizontal: 45 }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "LexendDeca_400Regular",
                textAlign: "center",
              }}>
              Xin chào,
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "400",
                  left: 10,
                }}>
                {number}
              </Text>
            </Text>
            <Text style={styles.contentText}>
              Vui lòng nhập mã OTP để xác nhận đăng nhập.
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFiledRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
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
            <Text style={{ fontSize: 14, fontFamily: "LexendDeca_400Regular" }}>
              Bạn quên mã OTP?
            </Text>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() =>
                navigation.navigate("ForgetOtp", {
                  numberPhone: route.params.numberPhone,
                  value: route.params.value,
                })
              }>
              <Text
                style={{
                  color: "#9D85F2",
                  fontSize: 14,
                  fontFamily: "LexendDeca_400Regular",
                }}>
                Xem tại đây.
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={handleCheckOtp}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
              marginHorizontal: 15,
              paddingVertical: 15,
              borderRadius: 30,
              backgroundColor: "#9796f0",
            }}>
            <Text
              style={{
                fontSize: 22,
                color: "#ffffff",
                fontFamily: "LexendDeca_400Regular",
              }}>
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingHorizontal: 15,
    top: 18,
  },
  contentText: {
    lineHeight: 23,
    fontSize: 13,
    textAlign: "center",
    fontFamily: "LexendDeca_400Regular",
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
    fontFamily: "LexendDeca_500Medium",
  },

  //input
  codeFiledRoot: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cellRoot: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginHorizontal: 5,
  },
  cellText: {
    color: "#000",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "LexendDeca_400Regular",
    opacity: 0.8,
  },
  focusCell: {
    borderBottomColor: "#007AFF",
    borderBottomWidth: 2,
  },
});

//make this component available to the app
export default Otp;
