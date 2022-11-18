//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Modal from "react-native-modal";
import { useSelector } from "react-redux";
import { formatCash } from "../../utils/datetime";

// create a component
const ModalSuccessCheck = (props) => {
  const { auth } = useSelector((state) => state);

  const navigation = useNavigation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      isVisible={props.modalCheckSuccess}
      backdropColor="#C4C4C4"
      backdropOpacity={0.5}
      onBackdropPress={() =>
        props.setModalCheckSuccess(!props.modalCheckSuccess)
      }>
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
          <Text
            style={{ fontSize: 18, fontWeight: "800", textAlign: "center" }}>
            Chúc mừng
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{ fontSize: 14, fontWeight: "600", textAlign: "center" }}>
              Bạn đã check-in thành công sự kiện
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                textAlign: "center",
                color: "#000000",
                marginTop: 5,
              }}>
              Tên hội viên:{" "}
              {props.dataCheck === props.detailData[0].ma_kh
                ? props.detailData[0].ten_kh
                : ""}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                textAlign: "center",
                color: "#000000",
                marginVertical: 5,
              }}>
              Vai trò: {props.detailData[0].vai_tro}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                textAlign: "center",
                color: "#000000",
              }}>
              Giá vé: {formatCash(props.detailData[0].gia_ve.toString(10))} VND
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
              onPress={() => {
                props.setModalCheckSuccess(!props.modalCheckSuccess);
                props.setShowModalPayment(true);
                // navigation.goBack();
              }}
              style={{
                backgroundColor: "#9D85F2",
                paddingVertical: 10,
                borderRadius: 25,
                width: "100%",
              }}>
              <View style={styles.borderBacRounded}>
                <Text style={{ color: "#ffffff", textAlign: "center" }}>
                  Thanh toán
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
    backgroundColor: "#2c3e50",
  },
  borderBacRounded: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

//make this component available to the app
export default ModalSuccessCheck;
