//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { formatDateTimeDisplay } from "../../utils/datetime";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const ForgetOtp = ({ route }) => {
  const navigation = useNavigation();
  const { auth } = useSelector((state) => state);

  return (
    <View style={styles.container}>
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
              fontFamily: "LexendDeca_600SemiBold",
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
          <Text
            style={{
              fontSize: 25,
              color: "#9D85F2",
              fontFamily: "LexendDeca_600SemiBold",
              textAlign: "center",
              paddingLeft: 25,
              paddingTop: 18,
            }}>
            Quên mã OTP
          </Text>
          <View style={{ paddingHorizontal: 36, marginTop: 10 }}>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  textAlign: "center",
                  fontFamily: "LexendDeca_500Medium",
                }}>
                Xin chào,
                <Text
                  style={{ fontSize: 13, fontFamily: "LexendDeca_400Regular" }}>
                  {route.params.numberPhone} !
                </Text>
              </Text>
              <Text style={styles.contentText}>
                Mã OTP của bạn đã được gửi vào SMS vào lúc{" "}
                {formatDateTimeDisplay(auth.otp.date_created)}.
              </Text>
              <Text style={styles.contentText}>
                Vui lòng kiểm tra hộp thoại tin nhắn với Brand name "WGH" để lấy
                mã OTP.
              </Text>
              <Text style={styles.contentText}>
                Nếu không tìm thấy, xin vui lòng liên hệ trực tiếp:
              </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/mess.png")}
                  style={{ width: 20, height: 20, marginHorizontal: 10 }}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  source={require("../../assets/gmail.png")}
                  style={{ width: 20, height: 20, marginHorizontal: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Otp", {
                  numberPhone: route.params.numberPhone,
                })
              }
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
          </View>
        </View>
      </ScrollView>
    </View>
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
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "LexendDeca_400Regular",
  },
});

//make this component available to the app
export default ForgetOtp;
