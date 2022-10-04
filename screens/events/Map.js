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

import MapView from "react-native-maps";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const Map = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <View
        style={{
          marginHorizontal: 15,
          zIndex: 4,
          position: "absolute",
          top: "6%",
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#ffffff",
            width: 40,
            height: 40,
            paddingVertical: 5,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            marginBottom: 7,
            //transform: [{ rotate: "-45deg" }],
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-outline" size={25} color="#711775" />
        </TouchableOpacity>
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

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

//make this component available to the app
export default Map;
