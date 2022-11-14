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
      onBackdropPress={handleDetailEvent}
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
        <View>
          <Text
            style={{ fontSize: 18, fontWeight: "800", textAlign: "center" }}>
            Chúc mừng
          </Text>
          <Text
            style={{ fontSize: 14, fontWeight: "600", textAlign: "center" }}>
            Bạn đã checkin sự kiện thành công
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}>
          <TouchableOpacity onPress={handleDetailEvent}>
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
              }}>
              <View style={styles.borderBacRounded}>
                <Text style={{ color: "#ffffff" }}>Tiếp tục</Text>
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
    backgroundColor: "#2c3e50",
  },
  borderBacRounded: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
});

//make this component available to the app
export default ModalSuccessCheckGuest;
