//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Modal from "react-native-modal";

// create a component
const ModalSuccessRefer = (props) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      isVisible={props.modalSuccess}
      backdropColor="#C4C4C4"
      backdropOpacity={0.5}
      onBackdropPress={() => {
        props.setModalSuccess(!props.modalSuccess);
        navigation.goBack();
      }}
      style={{ paddingHorizontal: 10 }}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 10,
          elevation: 5,
          marginHorizontal: 20,
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
            onPress={() => {
              props.setModalSuccess(!props.modalSuccess);
              navigation.goBack();
            }}>
            <Ionicons name="close-outline" size={20} />
          </TouchableOpacity>
        </View>
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
                width: 150,
                height: 100,
                marginVertical: 10,
              }}
            />
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "800", textAlign: "center" }}>
              Chúc mừng
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "600", textAlign: "center" }}>
              {props.content}
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
              onPress={() => {
                props.setModalSuccess(!props.modalSuccess);
                navigation.goBack();
              }}>
              <LinearGradient
                start={{ x: 0, y: 0.3 }}
                end={{ x: 1, y: 1 }}
                colors={["#9D85F2", "rgba(157, 133, 242, 0.4)"]}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  borderRadius: 7,
                }}>
                <View style={styles.borderBacRounded}>
                  <Text style={{ color: "#ffffff" }}>Tiếp tục</Text>
                </View>
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
    backgroundColor: "#2c3e50",
  },
  borderBacRounded: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

//make this component available to the app
export default ModalSuccessRefer;
