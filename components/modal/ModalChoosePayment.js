//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { CheckBox } from "@rneui/themed";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  checkEventAction,
  checkPayFeeAction,
} from "../../redux/actions/eventsAction";

// create a component
const ModalChoosePayment = (props) => {
  const { auth, event } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [checkValue, setCheckValue] = useState("tienmat");

  const navigation = useNavigation();

  const handlePayFee = () => {
    if (checkValue === "tienmat") {
      dispatch(
        checkPayFeeAction(
          event.detailEvent,
          auth.token,
          props.dataCheck,
          checkValue
        )
      );
      props.setModalSuccess(true);
      props.setShowModalPayment(!props.showModalPayment);
    } else {
      props.setShowModalPayment(!props.showModalPayment);
      props.setShowTakePicture(true);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      isVisible={props.showModalPayment}
      backdropColor="#C4C4C4"
      backdropOpacity={0.5}
      onBackdropPress={() =>
        props.setShowModalPayment(!props.showModalPayment)
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
                width: 200,
                height: 150,
                marginVertical: 10,
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  textAlign: "center",
                }}>
                Phương thức thanh toán
              </Text>
              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    backgroundColor: "#F7F8FB",
                    borderRadius: 10,
                    marginBottom: 10,
                  }}>
                  <CheckBox
                    title="Tiền mặt"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor="#FDA401"
                    checked={checkValue === "tienmat" ? true : false}
                    onPress={() => setCheckValue("tienmat")}
                    containerStyle={{
                      backgroundColor: "#F7F8FB",
                      borderRadius: 10,
                    }}
                  />
                </View>
                <View
                  style={{
                    backgroundColor: "#F7F8FB",
                    borderRadius: 10,
                  }}>
                  <CheckBox
                    title="Chuyển khoản"
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checked={checkValue === "chuyenkhoan" ? true : false}
                    onPress={() => setCheckValue("chuyenkhoan")}
                    checkedColor="#FDA401"
                    containerStyle={{
                      backgroundColor: "#F7F8FB",
                      borderRadius: 10,
                    }}
                  />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={handlePayFee}
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
