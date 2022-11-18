//import liraries
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Modal from "react-native-modal";

// create a component
const ModalFailCheck = (props) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      isVisible={props.modalFail}
      backdropColor="#C4C4C4"
      backdropOpacity={0.5}
      onBackdropPress={() => props.setModalFail(!props.modalFail)}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 30,
          padding: 10,
          elevation: 5,
          marginHorizontal: 15,
          height: "50%",
          bottom: 20,
        }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../../assets/notconfetti.png")}
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
              style={{ fontSize: 20, fontWeight: "800", textAlign: "center" }}>
              Rất tiếc
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                textAlign: "center",
                marginVertical: 20,
              }}>
              Check-in thất bại. Vui lòng thử lại lần nữa
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => props.setModalFail(!props.modalFail)}
              style={{
                backgroundColor: "#9D85F2",
                paddingVertical: 10,
                borderRadius: 25,
                width: "100%",
              }}>
              <View style={styles.borderBacRounded}>
                <Text style={{ color: "#ffffff", textAlign: "center" }}>
                  Thử lại
                </Text>
              </View>
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
  },
  borderBacRounded: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

//make this component available to the app
export default ModalFailCheck;
