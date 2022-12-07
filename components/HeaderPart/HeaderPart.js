//import liraries
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import SearchBar from "./SearchBar";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const HeaderPart = (props) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { auth, notify } = useSelector((state) => state);
  return (
    <View>
      <View>
        <Header backHome={props.backHome} setBackHome={props.setBackHome} />
        <View>
          <ImageBackground
            source={require("../../assets/bg.png")}
            style={{
              height: 200,
              width: w,
            }}
          />
        </View>
      </View>
    </View>
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
  search: {
    zIndex: 1,
    position: "absolute",
    marginTop: h * 0.13,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 15,
  },
  input: {
    height: 40,
    // padding: 10,
    width: "79%",
    marginLeft: 10,
    color: "#ffffff",
    left: -5,
  },
  body: {
    backgroundColor: "#ffffff",
    width: "100%",
    // position: "absolute",
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
});

//make this component available to the app
export default HeaderPart;
