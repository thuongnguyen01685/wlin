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
      <View>
        <View>
          <View
            style={{
              marginHorizontal: 20,
              zIndex: 4,
              position: "absolute",
              top: "10%",
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#ffffff",
                width: "21%",
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
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back-outline" size={25} color="#9D85F2" />
            </TouchableOpacity>
            <Text style={{ color: "#826CCF", fontSize: 25, fontWeight: "600" }}>
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
                fontSize: 25,
                color: "#9D85F2",
                fontWeight: "800",
                paddingLeft: 25,
                paddingTop: 18,
                textAlign: "center",
              }}
            >
              Quên mã OTP
            </Text>
            <View style={{ paddingHorizontal: 36 }}>
              <View style={{ marginTop: 10 }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Xin chào,
                  <Text style={{ fontSize: 14, fontWeight: "400" }}>
                    {route.params.numberPhone} !
                  </Text>
                </Text>
                <Text style={styles.contentText}>
                  Mã OTP của bạn đã được gửi vào SMS vào lúc{" "}
                  {formatDateTimeDisplay(auth.otp.date_created)}.
                </Text>
                <Text style={styles.contentText}>
                  Vui lòng kiểm tra hộp thoại tin nhắn với Brand name "WGH" để
                  lấy mã OTP.
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
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 30,
                marginTop: 30,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Otp", {
                    numberPhone: route.params.numberPhone,
                  })
                }
              >
                <LinearGradient
                  start={{ x: 0, y: 0.3 }}
                  end={{ x: 1, y: 1 }}
                  colors={
                    ["#9796F0", "#FBC7D4"]
                    //   : ["#b2b2b2", "#d8d8d8"]
                  }
                  style={{
                    width: "100%",
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    borderRadius: 30,
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  {/* <Ionicons name="arrow-forward" size={25} color="#ffffff" /> */}
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                      color: "#ffffff",
                    }}
                  >
                    Tiếp tục
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
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
    marginTop: 10,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  contentText: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 22,
  },
});

//make this component available to the app
export default ForgetOtp;
