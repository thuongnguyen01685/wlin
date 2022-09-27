//import liraries
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import Home from "../screens/home/Home";

import Octicons from "react-native-vector-icons/Octicons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Club from "../screens/clup/Club";
import DetailClub from "../screens/clup/DetailClub";

import Events from "../screens/events/Events";
import DetailEvents from "../screens/events/DetailEvents";
import CheckQR from "../screens/events/CheckQR";
import CheckImage from "../screens/events/CheckImage";
import Slips from "../screens/slips/Slips";
import CreateRefer from "../screens/slips/CreateRefer";
import Other from "../screens/other/Other";
import Profile from "../screens/other/Profile";
import Benefit from "../screens/other/Benefit";
import TYFCB from "../screens/other/TYFCB";
import CreateTYFCB from "../screens/other/CreateTYFCB";
import UpgradeMember from "../screens/other/UpgradeMember";
import { useSelector } from "react-redux";
import ListPaticipant from "../screens/events/ListParticipant";
import ConfirmPayment from "../screens/events/ConfirmPayment";
import UpdateEvent from "../screens/events/UpdateEvent";
import ReportExcel from "../screens/events/ReportExcel";
import ListMember from "../screens/other/ListMember";
import ManagementMember from "../screens/other/ManagementMember";
import PayBenefits from "../screens/events/PayBenefits";

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
      <Stack.Screen
        name="ListParticipant"
        component={ListPaticipant}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmPayment"
        component={ConfirmPayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateEvent"
        component={UpdateEvent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReportExcel"
        component={ReportExcel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PayBenefits"
        component={PayBenefits}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SlipsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Slips"
        component={Slips}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRefer"
        component={CreateRefer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function OtherScreen() {
  const { auth } = useSelector((state) => state);

  return (
    <Stack.Navigator
      initialRouteName={auth.showNaProfile ? "Profile" : "Other"}>
      <Stack.Screen
        name="Other"
        component={Other}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Benefit"
        component={Benefit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TYFCB"
        component={TYFCB}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateTYFCB"
        component={CreateTYFCB}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpgradeMember"
        component={UpgradeMember}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListMember"
        component={ListMember}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManagementMember"
        component={ManagementMember}
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
          if (route.name === "SlipsScreen") {
            return (
              <Ionicons
                name="reader-outline"
                size={30}
                color={focused ? "#ffffff" : "#909090"}
              />
            );
          }
          if (route.name === "OtherScreen") {
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
      <Tab.Screen
        name="SlipsScreen"
        component={SlipsScreen}
        options={{ title: "Slips" }}
      />
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
        name="OtherScreen"
        component={OtherScreen}
        options={{ title: "Khác" }}
      />
    </Tab.Navigator>
  );
};

//make this component available to the app
export default TabBar;
