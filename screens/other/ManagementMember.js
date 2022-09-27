//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

import { RadioButton } from "react-native-paper";
import ModalSms from "../../components/ModalSms";
import Header from "../../components/Header";
import BodyEvent from "../../components/page/events/BodyEvent";
import BodyListPaticipant from "../../components/page/events/BodyListPaticipant";
import BodyUpdateEvent from "../../components/page/events/BodyUpdateEvent";
import BodyManagementMember from "../../components/page/Other/BodyManagementMember";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const ManagementMember = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Header />
          <View>
            <ImageBackground
              source={require("../../assets/EllipseLogin.png")}
              style={{
                height: 455,
                width: 325,
                zIndex: 1,
                position: "absolute",
              }}
            />
            <ImageBackground
              source={require("../../assets/VctLogin.png")}
              style={{
                height: ratio * 1000,
                width: w,
                position: "absolute",
                zIndex: 2,
              }}
            />
          </View>
        </View>
        <View style={styles.search}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ffffff",
              alignItems: "center",
              alignContent: "center",
              width: "75%",
              borderRadius: 10,
              justifyContent: "space-between",
            }}>
            <TextInput
              style={styles.input}
              onChangeText={(keySearch) => setSearch(keySearch)}
              value={search}
              placeholder="Tìm kiếm"
            />
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                padding: 7,

                borderTopRightRadius: 7,
                borderBottomRightRadius: 7,
              }}>
              <Ionicons name="search-outline" size={20} color="#711775" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <LinearGradient
              start={{ x: 0, y: 0.3 }}
              end={{ x: 1, y: 1 }}
              colors={["#751979", "#AE40B2"]}
              style={{
                borderRadius: 30,
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
                paddingLeft: 1,
                paddingRight: 10,
              }}>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 30,
                  marginVertical: 2,
                  marginRight: 5,
                  padding: 2,
                }}>
                <Ionicons name="filter" size={18} color="#751979" />
              </View>

              <Text style={{ fontSize: 10, color: "#ffffff" }}>Lọc</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <BodyManagementMember />
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  search: {
    zIndex: 5,
    position: "absolute",
    marginTop: "26%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    padding: 10,
    width: "82%",
    marginLeft: 10,
  },
  body: {
    backgroundColor: "#ffffff",
    width: "100%",
    zIndex: 5,
    // position: "absolute",
    marginTop: "40%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  contentText: {
    lineHeight: 25,
  },
});

//make this component available to the app
export default ManagementMember;
