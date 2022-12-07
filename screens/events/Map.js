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

import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import { URL } from "../../utils/fetchApi";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const Map = () => {
  const navigation = useNavigation();
  const { event } = useSelector((state) => state);
  const [search, setSearch] = useState("");
  const color = "#826CCF";

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.4435651676475,
          longitude: 144.775596791471,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: 13.4435651676475,
            longitude: 144.775596791471,
          }}
          image={require("../../assets/map.png")}
          style={{ width: 100, height: 100 }}
        />
      </MapView>

      <View
        style={{
          zIndex: 4,
          position: "absolute",
          backgroundColor: "#ff0",
          width: "100%",
        }}>
        <Header color={color} />
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
