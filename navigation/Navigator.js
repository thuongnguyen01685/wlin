//import liraries
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
  Platform,
} from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";

import TabBar from "./TabBar";

import * as Notifications from "expo-notifications";
import io from "socket.io-client";
import Wellcome from "../screens/letStart/Wellcome";
import Login from "../screens/letStart/Login";
import Otp from "../screens/letStart/Otp";
import ForgetOtp from "../screens/letStart/ForgetOtp";
import Splash from "../screens/letStart/Splash";
import Profile from "../screens/other/Profile";
import CreateClub from "../screens/clup/CreateClub";
import CheckQR from "../screens/events/CheckQR";
import TYFCB from "../screens/other/TYFCB";
import CreateTYFCB from "../screens/other/CreateTYFCB";
import ReportExcel from "../screens/events/ReportExcel";
import UpgradeMember from "../screens/other/UpgradeMember";
import { AUTH, getProfileAction } from "../redux/actions/authAction";
import Slips from "../screens/slips/Slips";
import CreateRefer from "../screens/slips/CreateRefer";
import DetailEvents from "../screens/events/DetailEvents";

import Map from "../screens/events/Map";
import ListPaticipant from "../screens/events/ListParticipant";

import { initSocket } from "../utils/pushNotify";
import DetailClub from "../screens/clup/detail/DetailClub";
import PayBenefit from "../screens/other/PayBenefit";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Stack = createNativeStackNavigator();
function StartScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Wellcome"
        component={Wellcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Otp"
        component={Otp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetOtp"
        component={ForgetOtp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// create a component
const Navigator = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    async function it() {
      const token = await AsyncStorage.getItem("@token_key");
      if (token !== null) {
        dispatch({
          type: AUTH.TOKEN,
          payload: token,
        });
        await dispatch(getProfileAction(token));
        // await dispatch(getNotify(token));
      }
    }
    it();
  }, [dispatch]);

  initSocket(auth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Drawer"
          component={auth.token ? Drawer : Login}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabBar"
          component={TabBar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateClub"
          component={CreateClub}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CheckQR"
          component={CheckQR}
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
          name="Slips"
          component={Slips}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateRefer"
          component={CreateRefer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReportExcel"
          component={ReportExcel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpgradeMember"
          component={UpgradeMember}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailEvents"
          component={DetailEvents}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Map"
          component={Map}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListParticipant"
          component={ListPaticipant}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DetailClub"
          component={DetailClub}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PayBenefit"
          component={PayBenefit}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//make this component available to the app
export default Navigator;
