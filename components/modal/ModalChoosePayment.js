//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import Modal from "react-native-modal";

const radioButtonsData = [
  {
    id: "1", // acts as primary key, should be unique and non-empty string
    label: "Tiền mặt",
    value: "tienmat",
  },
  {
    id: "2",
    label: "Chuyển khoản",
    value: "chuyenkhoan",
  },
];
// create a component
const ModalChoosePayment = (props) => {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const navigation = useNavigation();
  const handleClose = () => {
    props.setShowModalPayment(!props.showModalPayment);
    // navigation.goBack();

    setTimeout(() => {
      navigation.navigate("AccuracyImage");
    }, 1500);
  };
  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }
  return (
    <Modal
      animationType="fade"
      transparent={true}
      isVisible={props.showModalPayment}
      backdropColor="#C4C4C4"
      backdropOpacity={0.5}
      onBackdropPress={handleClose}
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
          <TouchableOpacity onPress={handleClose}>
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
              source={require("../../assets/coin3.png")}
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
              Phương thức thanh toán
            </Text>
          </View>
          <View>
            <RadioGroup
              radioButtons={radioButtons}
              onPress={onPressRadioButton}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}>
            <TouchableOpacity onPress={handleClose}>
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
                  <Text style={{ color: "#ffffff" }}>Thanh toán</Text>
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
export default ModalChoosePayment;
