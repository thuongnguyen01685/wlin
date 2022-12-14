//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { getDetailEventsAction } from "../../redux/actions/eventsAction";
import { formatCash } from "../../utils/datetime";

// create a component
const ModalSuccessCheckGuest = (props) => {
  const { auth, event } = useSelector((state) => state);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDetailEvent = () => {
    dispatch(
      getDetailEventsAction(event.socketCheckin._id_su_kien, auth.token)
    );

    props.setModalCheckGuestSuccess(!props.modalCheckGuestSuccess);

    setTimeout(() => {
      navigation.navigate("DetailEvents", {
        _id: event.socketCheckin._id_su_kien,
      });
    }, 500);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      isVisible={props.modalCheckGuestSuccess}
      backdropColor="#C4C4C4"
      backdropOpacity={0.5}
      onBackdropPress={handleDetailEvent}>
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
            marginTop: 10,
          }}>
          <View>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "LexendDeca_600SemiBold",
                textAlign: "center",
              }}>
              Chúc mừng
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "LexendDeca_300Light",
                textAlign: "center",
                marginTop: 15,
              }}>
              Bạn đã checkin sự kiện thành công
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 15,
            }}>
            <TouchableOpacity
              onPress={handleDetailEvent}
              style={{
                backgroundColor: "#9D85F2",
                paddingVertical: 10,
                borderRadius: 25,
                width: "100%",
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: "#ffffff",
                  textAlign: "center",
                  fontFamily: "LexendDeca_400Regular",
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
    backgroundColor: "#2c3e50",
  },
  borderBacRounded: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

//make this component available to the app
export default ModalSuccessCheckGuest;
