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
import * as Notifications from "expo-notifications";
import io from "socket.io-client";
import { listNameApi } from "./listNameApi";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const initSocket = async (token, email) => {
  const server_url = "https://api.wlin.com.vn";
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
      token
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
      token: token,
      email: email,
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
    token: token,
    email: email,
    // token: "2b0350de2b7100a6562ecb87b40ae520",
    // email: "thuong.nguyen@fostech.vn",
  });

  socket.on("notify:update", function (data) {
    DeviceEventEmitter.emit("notificationUpdated", data);
  });

  for (let i = 0; i < listNameApi.length; i++) {
    socket.on(`${listNameApi[i]}:new`, function (data) {
      DeviceEventEmitter.emit(`${listNameApi[i]}New`, data);
    });

    socket.on(`${listNameApi[i]}:update`, function (data) {
      console.log(`${listNameApi[i]}Update`, data, "1");
      DeviceEventEmitter.emit(`${listNameApi[i]}Update`, data);
    });

    socket.on(`${listNameApi[i]}:delete`, function (data) {
      DeviceEventEmitter.emit(`${listNameApi[i]}Delete`, data);
    });
  }

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
    Toast.show({
      text: data.title || getLabel("Bạn có thông báo mới"),
      buttonText: "Okay",
      duration: 3000,
      type: "danger",
      position: "top",
    });
  }
};
