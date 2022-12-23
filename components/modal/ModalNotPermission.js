//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  BackHandler,
} from "react-native";

import Modal from "react-native-modal";

// create a component
const ModalNotPermission = (props) => {
  const navigation = useNavigation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      isVisible={props.showAlertPermission}
      backdropColor="#C4C4C4"
      backdropOpacity={0.5}
      onBackdropPress={() =>
        props.setShowAlertPermission(!props.showAlertPermission)
      }
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
            style={{
              fontSize: 22,
              fontFamily: "LexendDeca_600SemiBold",
              textAlign: "center",
            }}>
            Rất tiếc
          </Text>
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              marginVertical: 20,
              fontFamily: "LexendDeca_400Regular",
              lineHeight: 20,
              paddingHorizontal: 20,
            }}>
            {props.content}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.setShowAlertPermission(!props.showAlertPermission);
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
                borderRadius: 20,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}>
              <View style={styles.borderBacRounded}>
                <Text
                  style={{
                    color: "#ffffff",
                    fontFamily: "LexendDeca_400Regular",
                    fontSize: 15,
                  }}>
                  Quay lại
                </Text>
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
    paddingVertical: 8,
    borderRadius: 15,
  },
});

//make this component available to the app
export default ModalNotPermission;
