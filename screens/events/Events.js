//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import HeaderPart from "../../components/HeaderPart/HeaderPart";

import EventRoute from "./TabEvent/EventRoute";
import EventingRoute from "./TabEvent/EventingRoute";
import EventedRoute from "./TabEvent/EventedRoute";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const renderScene = SceneMap({
  first: EventRoute,
  second: EventingRoute,
  third: EventedRoute,
});

// create a component
const Events = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Đang diễn ra" },
    { key: "second", title: "Sắp diễn ra" },
    { key: "third", title: "Đã diễn ra" },
  ]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart />
      <View
        style={{
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          zIndex: 3,
          marginTop: -50,
          marginHorizontal: 15,
          paddingVertical: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
            Danh sách sự kiện
          </Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: "100%",
          paddingHorizontal: 15,
        }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              renderLabel={({ route, color }) => (
                <Text
                  style={{ color: "#826CCF", fontSize: 12, fontWeight: "600" }}>
                  {route.title}
                </Text>
              )}
              indicatorStyle={styles.indicatorStyle}
              style={{ backgroundColor: "#ffffff" }}
            />
          )}
        />
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
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
  indicatorStyle: {
    backgroundColor: "#826CCF",
    padding: 1.5,
    marginBottom: -2,
  },
});

//make this component available to the app
export default Events;
