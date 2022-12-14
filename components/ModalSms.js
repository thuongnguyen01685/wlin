//import liraries
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";

// create a component
const ModalSms = (props) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      isVisible={props.modalSms}
      backdropColor="#C4C4C4"
      backdropOpacity={0.5}
      onBackdropPress={() => props.setModalSms(!props.modalSms)}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 30,

          elevation: 5,
          marginHorizontal: 15,
          bottom: 20,
          height: "auto",
          paddingVertical: 15,
        }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../assets/Chat.png")}
            style={{
              resizeMode: "contain",
              width: 200,
              height: 150,
              marginVertical: 15,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            paddingHorizontal: 20,
            marginTop: 5,
          }}>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 22,
                color: "#000000",
                fontFamily: "LexendDeca_400Regular",
              }}>
              Chúc mừng
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "LexendDeca_300Light",
                fontSize: 15,
                marginTop: 15,
              }}>
              Mã OTP đã được gửi về SMS của bạn.
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "LexendDeca_300Light",
                fontSize: 15,
              }}>
              Vui lòng kiểm tra, sau đó nhập mã OTP để đăng nhập
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 15,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Otp", {
                  numberPhone: props.numberphone,
                  value: props.value,
                });
                props.setModalSms(!props.modalSms);
              }}
              style={{
                backgroundColor: "#9D85F2",
                paddingVertical: 10,
                borderRadius: 25,
                width: "100%",
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#ffffff",
                  textAlign: "center",
                  fontFamily: "LexendDeca_500Medium",
                }}>
                Tiếp tục
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

//make this component available to the app
export default ModalSms;
