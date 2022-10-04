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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const server_url = "https://api.wlin.com.vn";

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

  const initSocket = async () => {
    //get func
    let lang,
      cachedData = {};
    function get(url, headers, callback, options = { cache: false }) {
      if (cachedData[url] && options.cache) {
        //console.log("get from cached",url);
        return callback(null, cachedData[url]);
      }
      var request = new XMLHttpRequest();
      request.onreadystatechange = (e) => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          let data = request.responseText;
          if (options.onProccess) {
            data = options.onProccess(data);
          }
          if (options.cache) cachedData[url] = data;
          callback(null, request.responseText);
        } else {
          let error = request.responseText || "";
          if (!error || error.indexOf("flexbiz") >= 0)
            error = "Can't connect to server";
          callback(error);
        }
      };
      request.open("GET", url);
      request.setRequestHeader("Accept-Encoding", "gzip");
      if (headers) {
        headers.forEach((header) => {
          request.setRequestHeader(header.name, header.value);
        });
      }
      request.send();
    }

    //asyncGet func
    async function asyncGet(url, headers, options = {}) {
      let p = new Promise((resovle, reject) => {
        get(
          url,
          headers,
          (e, rs) => {
            if (e) return reject(new Error(e));
            resovle(rs);
          },
          options
        );
      });
      return p;
    }

    // registerForPushNotificationsAsync func

    async function registerForPushNotificationsAsync(access_token) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        //Alert.alert(getLabel("Chương trình này cần được cấp quyền hiển thị thông báo"))
        return false;
      }
      // Get the token that uniquely identifies this device
      let token = (await Notifications.getExpoPushTokenAsync()).data;
      // POST the token to your backend server from where you can retrieve it to send push notifications.
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("chat-messages", {
          name: "chat-messages",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });

        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
      try {
        let rs = await asyncGet(
          `${server_url}/api/register-endpoint?access_token=${access_token}&ep=${token}`
        );
        await AsyncStorage.setItem("endpoint", token);
      } catch (e) {
        return false;
      }
      return true;
    }

    let notificationPermission;
    try {
      notificationPermission = await registerForPushNotificationsAsync(
        // JSON.parse(value).token,
        auth.token
      );

      //receiver notification
      if (notificationPermission == false) {
        Notifications.addNotificationReceivedListener((res) =>
          _handleNotification(res)
        );

        Notifications.addNotificationResponseReceivedListener((res) =>
          _handleNotificationResponse(res)
        );
      }
    } catch (e) {
      console.log(e.message);
    }

    //connect socket

    const socket = io(server_url);
    socket.on("connect", () => {
      socket.emit("login", {
        // token: "2b0350de2b7100a6562ecb87b40ae520",
        // email: "thuong.nguyen@fostech.vn",
        token: auth.token,
        email: auth.profile && auth.profile.email,
      });
    });

    socket.on("disconnect", function () {
      // console.error("socket disconnectedf");
    });

    socket.on("reconnect_error", function () {
      console.error("socket reconnect error");
    });
    socket.on("connect_error", function () {
      console.error("socket connect error");
    });
    socket.on("connect_timeout", (timeout) => {
      console.error("socket connect timeout", timeout);
    });

    socket.emit("login", {
      token: auth.token,
      email: auth.profile && auth.profile.email,
      // token: "2b0350de2b7100a6562ecb87b40ae520",
      // email: "thuong.nguyen@fostech.vn",
    });

    socket.on("notify:update", function (data) {
      DeviceEventEmitter.emit("notificationUpdated", data);
    });

    function _handleNotification(notification) {
      let data = notification.request.content.data;
      DeviceEventEmitter.emit(data.__event, data);
    }
    async function _handleNotificationResponse(response) {
      let data = response.notification.request.content.data;
      //news
      if (data.__event && data.__event.indexOf("news:") >= 0) {
        if (data._id) {
          try {
            let news = await asyncGetOrderDetail(
              this.state.userInfo.token,
              data._id,
              "news",
              data.id_app
            );
            this.navigate("NewsDetail", { news: news });
          } catch (e) {
            console.error(e.message);
          }
        }
        return;
      }

      // if (data.__event && data.__event.indexOf("message2:") >= 0) {
      //   if (data.id_link) {
      //     try {
      //       let group = await asyncGetData(
      //         this.state.userInfo.token,
      //         "message2",
      //         { id_link: data.id_link }
      //       );
      //       this.navigate("ChatRoom", { group: group });
      //     } catch (e) {
      //       console.error(e.message);
      //     }
      //     return;
      //   }
      // }

      if (data.__event && data.__event.indexOf("notify:new") >= 0 && data._id) {
        DeviceEventEmitter.emit("notificationAdded", { _id: data._id });
        try {
          let url = `${server_url}/api/notification/${data._id}?access_token=${this.state.userInfo.token}`;
          let n = await asyncGet(url, null);
          this.navigate("NotificationDetail", {
            userInfo: this.state.userInfo,
            notification: n,
          });
        } catch (e) {
          console.error(e.message);
        }
        return;
      }
      Toast.show({
        text: data.title || getLabel("Bạn có thông báo mới"),
        buttonText: "Okay",
        duration: 3000,
        type: "danger",
        position: "top",
      });
    }
  };

  initSocket();

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
          name="ReportExcel"
          component={ReportExcel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpgradeMember"
          component={UpgradeMember}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//make this component available to the app
export default Navigator;
