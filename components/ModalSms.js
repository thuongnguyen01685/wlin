//import liraries
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
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
          borderRadius: 7,
          padding: 10,
          elevation: 5,
          width: "100%",
          height: "auto",
          bottom: 20,
        }}>
        <View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={require("../assets/Chat.png")}
              style={{ resizeMode: "contain", width: 50, height: 50 }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              paddingHorizontal: 20,
              marginVertical: 5,
            }}>
            <Text style={{ textAlign: "center" }}>
              Mã OTP đã được gửi về sms của bạn.
            </Text>
            <Text style={{ textAlign: "center" }}>
              Vui lòng kiểm tra, sau đó nhập mã OTP để đăng nhập
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Otp", { numberPhone: props.numberphone });
                props.setModalSms(!props.modalSms);
              }}>
              <LinearGradient
                start={{ x: 1, y: 0.1 }}
                // end={{ x: 0.3, y: 0.3 }}
                colors={["#711775", "#F16CF6"]}
                style={{
                  paddingHorizontal: 40,
                  paddingVertical: 5,
                  borderRadius: 7,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}>
                <Text style={{ fontSize: 15, color: "#ffffff" }}>OK</Text>
              </LinearGradient>
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
