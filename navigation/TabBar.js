//import liraries
import React, { useRef } from "react";
import { Animated, Dimensions, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home/Home";
import Club from "../screens/clup/Club";
import Events from "../screens/events/Events";
import DetailEvents from "../screens/events/DetailEvents";
import CheckQR from "../screens/events/CheckQR";
import Other from "../screens/other/Other";
import Benefit from "../screens/other/Benefit";
import TYFCB from "../screens/other/TYFCB";
import CreateTYFCB from "../screens/other/CreateTYFCB";
import UpgradeMember from "../screens/other/UpgradeMember";
import { useSelector } from "react-redux";
import ListPaticipant from "../screens/events/ListParticipant";
import ConfirmPayment from "../screens/events/ConfirmPayment";
import ReportExcel from "../screens/events/ReportExcel";
import ListMember from "../screens/other/ListMember";
import ManagementMember from "../screens/other/ManagementMember";
import Map from "../screens/events/Map";
import DetailBenefit from "../screens/other/DetailBenefit";
import DetailClub from "../screens/clup/detail/DetailClub";
import EditBoard from "../screens/clup/detail/TabDetailClub/EditBoard";
import HomeSvg from "../assets/svg/HomeSvg";
import OtherSvg from "../assets/svg/OtherSvg";
import QRSvg from "../assets/svg/QRSvg";
import ClubSvg from "../assets/svg/ClubSvg";
import ClubFocusSvg from "../assets/svg/ClubFocusSvg";
import EventSvg from "../assets/svg/EventSvg";
import EventFocusSvg from "../assets/svg/EventFocusSvg";

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
        name="EditBoard"
        component={EditBoard}
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
        name="ReportExcel"
        component={ReportExcel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
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

      <Stack.Screen
        name="Benefit"
        component={Benefit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailBenefit"
        component={DetailBenefit}
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

function getWidth() {
  let width = Dimensions.get("window").width;
  width = width - 40;
  return width / 5;
}

const TabBar = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const { auth } = useSelector((state) => state);
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Home") {
              return <HomeSvg focused={focused} />;
            }

            if (route.name === "OtherScreen") {
              return <OtherSvg focused={focused} />;
            }
            if (route.name === "ClubScreen") {
              return focused ? <ClubFocusSvg /> : <ClubSvg />;
            }
            if (route.name === "QRScreen") {
              return <QRSvg />;
            }
            if (route.name === "EventsScreen") {
              return focused ? <EventFocusSvg /> : <EventSvg />;
            }
          },
          tabBarActiveTintColor: "#9D85F2",
          tabBarInactiveTintColor: "#909090",
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "LexendDeca_600SemiBold",
          },

          tabBarBackground: () => (
            <View style={{ flex: 1 }}>
              <LinearGradient
                start={{ x: 1, y: 0.1 }}
                end={{ x: 1, y: 1 }}
                colors={["#474747", "#f8f8f8"]}
                style={{ height: 0.2 }}
              />
            </View>
          ),
          headerShown: false,
          tabBarStyle: {
            height: 75,
            position: "absolute",
            paddingHorizontal: 5,
            paddingTop: 5,
            paddingBottom: 15,
            backgroundColor: "#ffffff",
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ title: "Trang chủ" }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="ClubScreen"
          component={ClubScreen}
          options={{ headerShown: false, title: "CLUB" }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1.08,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="QRScreen"
          component={CheckQR}
          options={{ headerShown: false, title: "" }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: -100,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="EventsScreen"
          component={EventsScreen}
          options={{ headerShown: false, title: "Sự kiện" }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3.24,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="OtherScreen"
          component={OtherScreen}
          options={{ title: "Khác" }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4.33,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 30,
          height: 2,
          backgroundColor: "#9796F0",
          position: "absolute",
          bottom: 10,
          borderRadius: 50,
          opacity: 0.9,
          left: 23,
          transform: [{ translateX: tabOffsetValue }],
        }}></Animated.View>
    </>
  );
};

export default TabBar;
