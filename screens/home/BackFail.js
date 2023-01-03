//import liraries
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, BackHandler } from "react-native";
import Toast from "react-native-root-toast";

// create a component
const BackFail = () => {
  let backHandlerClickCount = 0;
  const [backHome, setBackHome] = useState(false);
  const backButtonHandler = () => {
    const shortToast = (message) => {
      Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    };
    // let backHandlerClickCount;
    backHandlerClickCount += 1;
    if (backHandlerClickCount < 2) {
      shortToast("Nhấn lần nữa sẽ thoát ứng dụng!");
    } else {
      BackHandler.exitApp();
    }
    // timeout for fade and exit
    setTimeout(() => {
      backHandlerClickCount = 0;
    }, 1000);

    return true;
  };
  useEffect(() => {
    Platform.OS;
    if (backHome === false) {
      BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
    }
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
  }, [backHome]);
  return <View></View>;
};

// define your styles

//make this component available to the app
export default BackFail;
