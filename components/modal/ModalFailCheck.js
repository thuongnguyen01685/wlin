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
      onBackdropPress={() => props.setModalFail(!props.modalFail)}
      style={{ paddingHorizontal: 10 }}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 10,
          elevation: 5,
          width: "100%",
          height: "auto",
          bottom: 20,
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}>
          <TouchableOpacity
            onPress={() => props.setModalFail(!props.modalFail)}>
            <Ionicons name="close-outline" size={20} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../../assets/notconfetti.png")}
            style={{
              resizeMode: "contain",
              width: 150,
              height: 100,
              marginVertical: 10,
            }}
          />
        </View>
        <View>
          <Text
            style={{ fontSize: 18, fontWeight: "800", textAlign: "center" }}>
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
            onPress={() => props.setModalFail(!props.modalFail)}>
            <LinearGradient
              start={{ x: 0, y: 0.3 }}
              end={{ x: 1, y: 1 }}
              colors={["#9D85F2", "rgba(157, 133, 242, 0.4)"]}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
                borderRadius: 10,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <View style={styles.borderBacRounded}>
                <Text style={{ color: "#ffffff" }}>Thử lại</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
