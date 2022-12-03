//import liraries
import { Ionicons } from "@expo/vector-icons";
import React, { Component, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StatusBar,
  Animated,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import Loading from "../../components/loading/Loading";

import { getBenefitAction } from "../../redux/actions/benefitAction";
import BenefitHome from "../home/Benefit.home";

// create a component
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const PayBenefit = () => {
  const { auth, benefit } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const circleAnimatedValue = useRef(new Animated.Value(0)).current;

  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated();
      }, 1000);
    });
  };

  const translateX = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 100],
  });

  const translateX2 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 200],
  });
  const translateX3 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 90],
  });
  useEffect(() => {
    setRefreshing(true);
    circleAnimated();
    dispatch(getBenefitAction(auth.token, auth.profile.email));
    wait(1000).then(() => setRefreshing(false));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    circleAnimated();
    dispatch(getBenefitAction(auth.token, auth.profile.email));
    wait(1000).then(() => setRefreshing(false));
  }, [dispatch]);
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
          marginTop: -55,
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
            Danh sách chỉ số quyền lợi chưa trả
          </Text>
        </View>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#9D85F2", "red", "green"]}
            />
          }>
          <View style={{ marginBottom: "60%" }}>
            {benefit.loading
              ? Array(10)
                  .fill("")
                  .map((i, index) => (
                    <View
                      style={[
                        {
                          marginBottom: 8,
                          flexDirection: "row",
                          justifyContent: "center",
                        },
                        styles.card,
                      ]}
                      key={index}>
                      <View
                        style={{
                          width: w * 0.05,
                          height: w * 0.05,
                          borderRadius: 5,
                          backgroundColor: "#ECEFF1",
                          overflow: "hidden",
                          marginRight: 10,
                        }}>
                        <Animated.View
                          style={{
                            width: "30%",
                            opacity: 0.5,
                            height: "100%",
                            backgroundColor: "white",
                            transform: [{ translateX: translateX }],
                          }}></Animated.View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "space-evenly",
                          overflow: "hidden",
                          borderRadius: 10,
                        }}>
                        <Animated.View
                          style={{
                            backgroundColor: "#ECEFF1",
                            height: 28,
                          }}>
                          <Animated.View
                            style={{
                              width: "20%",
                              height: "100%",
                              backgroundColor: "white",
                              opacity: 0.5,
                              transform: [{ translateX: translateX2 }],
                            }}></Animated.View>
                        </Animated.View>
                        <View
                          style={{ backgroundColor: "#ECEFF1", height: 28 }}>
                          <Animated.View
                            style={{
                              width: "20%",
                              height: "100%",
                              backgroundColor: "white",
                              opacity: 0.5,
                              transform: [{ translateX: translateX2 }],
                            }}></Animated.View>
                        </View>
                      </View>
                    </View>
                  ))
              : benefit.benefitMana.map((item, index) => (
                  <BenefitHome item={item} key={index} />
                ))}
          </View>
        </ScrollView>
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
  card: {
    padding: 10,
    shadowColor: "black",
    borderRadius: 20,
    backgroundColor: "#FAFAFA",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 15,
  },
});

//make this component available to the app
export default PayBenefit;
