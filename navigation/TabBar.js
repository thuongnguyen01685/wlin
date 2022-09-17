//import liraries
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../screens/home/Home";
import Profile from "../screens/account/Profile";
import Octicons from "react-native-vector-icons/Octicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Club from "../screens/clup/Club";
import DetailClub from "../screens/clup/DetailClub";
import BenefitClub from "../screens/clup/BenefitClub";
import Events from "../screens/events/Events";
import DetailEvents from "../screens/events/DetailEvents";
import CheckQR from "../screens/events/CheckQR";
import CheckImage from "../screens/events/CheckImage";
import Slips from "../screens/slips/Slips";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ClubScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Club"
        component={Club}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailClub"
        component={DetailClub}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BenefitClub"
        component={BenefitClub}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function EventsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        component={Events}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailEvents"
        component={DetailEvents}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckQR"
        component={CheckQR}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckImage"
        component={CheckImage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// create a component
const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Octicons
                name="home"
                size={25}
                color={focused ? "#ffffff" : "#909090"}
              />
            );
          }
          if (route.name === "Slips") {
            return (
              <Ionicons
                name="reader-outline"
                size={30}
                color={focused ? "#ffffff" : "#909090"}
              />
            );
          }
          if (route.name === "Profile") {
            return (
              <Ionicons
                name="menu"
                size={35}
                color={focused ? "#ffffff" : "#909090"}
              />
            );
          }
          if (route.name === "ClubScreen") {
            return (
              <Ionicons
                name="shield-checkmark-outline"
                size={30}
                color={focused ? "#ffffff" : "#909090"}
              />
            );
          }
          if (route.name === "EventsScreen") {
            return (
              <Ionicons
                name="calendar-outline"
                size={30}
                color={focused ? "#ffffff" : "#909090"}
              />
            );
          }
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#909090",
        headerShown: false,
        tabBarStyle: {
          height: 70,
          position: "absolute",
          bottom: 5,
          right: 5,
          left: 5,
          borderRadius: 10,
          paddingBottom: 5,
          backgroundColor: "#711775",
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ title: "Trang chủ" }}
      />
      <Tab.Screen name="Slips" component={Slips} options={{ title: "Slips" }} />
      <Tab.Screen
        name="ClubScreen"
        component={ClubScreen}
        options={{ headerShown: false, title: "CLUB" }}
      />
      <Tab.Screen
        name="EventsScreen"
        component={EventsScreen}
        options={{ headerShown: false, title: "Sự kiện" }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: "Khác" }}
      />
    </Tab.Navigator>
  );
};

//make this component available to the app
export default TabBar;
