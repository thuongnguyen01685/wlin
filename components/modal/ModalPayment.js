//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Modal from "react-native-modal";

// create a component
const ModalPayment = (props) => {
  const navigation = useNavigation();
  const handleClose = () => {
    props.setModalSuccess(!props.modalSuccess);
    props.setShowTakePicture(false);
    navigation.navigate("QRScreen");
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      isVisible={props.modalSuccess}
      backdropColor="#C4C4C4"
      backdropOpacity={0.5}
      onBackdropPress={handleClose}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 30,
          padding: 10,
          elevation: 5,
          marginHorizontal: 15,
          height: "auto",
          bottom: 20,
        }}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
          }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={require("../../assets/Chat.png")}
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
                  fontSize: 20,
                  fontWeight: "800",
                  textAlign: "center",
                }}>
                Chúc mừng
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  textAlign: "center",
                  color: "#474747",
                  marginTop: 15,
                }}>
                {props.content}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 15,
              }}>
              <TouchableOpacity
                onPress={handleClose}
                style={{
                  backgroundColor: "#9D85F2",
                  paddingVertical: 10,
                  borderRadius: 25,
                  width: "100%",
                }}>
                <View style={styles.borderBacRounded}>
                  <Text style={{ color: "#ffffff", textAlign: "center" }}>
                    {props.textButton}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#2c3e50",
  },
  borderBacRounded: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

//make this component available to the app
export default ModalPayment;
