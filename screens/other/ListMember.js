//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import React, { Component, useRef, useState, useEffect } from "react";
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
  RefreshControl,
  Animated,
} from "react-native";

import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { URL } from "../../utils/fetchApi";
import {
  getDetailMember,
  getMemberAction,
} from "../../redux/actions/ClupAction";
import Loading from "../../components/loading/Loading";
import Skeleton from "../../components/loading/Skeleton";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});
// create a component
const ListMember = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const { auth, club } = useSelector((state) => state);

  const circleAnimatedValue = useRef(new Animated.Value(0)).current;

  const getUniqueListBy = (arr, key) => {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  };

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    circleAnimated();
    dispatch(getMemberAction(auth.token, auth.profile.email));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    setRefreshing(true);
    circleAnimated();
    dispatch(getMemberAction(auth.token, auth.profile.email));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  const handleDetailMember = (ma_kh) => {
    dispatch(getDetailMember(ma_kh, auth.token));
    navigation.navigate("ManagementMember");
  };

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
            Danh sách hội viên
          </Text>

          {refreshing && (
            <View
              style={{
                left: 10,
                padding: 30,
                position: "absolute",
                left: "100%",
              }}>
              {/* <Lottie
                source={require("../../assets/loading.json")}
                autoPlay
                loop
              /> */}
            </View>
          )}
        </View>

        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#711775", "green", "blue"]}
            />
          }>
          {refreshing ? (
            Array(10)
              .fill("")
              .map((i, index) => (
                <View
                  style={[
                    {
                      marginBottom: 8,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    styles.card,
                  ]}
                  key={index}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 60,
                      backgroundColor: "#ECEFF1",
                      overflow: "hidden",
                      marginRight: 16,
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
                    }}>
                    <Animated.View
                      style={{ backgroundColor: "#ECEFF1", height: 32 }}>
                      <Animated.View
                        style={{
                          width: "20%",
                          height: "100%",
                          backgroundColor: "white",
                          opacity: 0.5,
                          transform: [{ translateX: translateX2 }],
                        }}></Animated.View>
                    </Animated.View>
                    <View style={{ backgroundColor: "#ECEFF1", height: 32 }}>
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
          ) : (
            <View style={{ marginBottom: "70%" }}>
              {getUniqueListBy(club.getMember, "ma_kh").map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#Ffffff",
                    marginVertical: 10,
                    borderRadius: 15,
                    paddingVertical: 5,
                    marginHorizontal: 15,
                    borderColor: "#dadada",
                    borderWidth: 0.5,
                  }}
                  onPress={() => handleDetailMember(item.ma_kh)}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "70%",
                    }}>
                    <View
                      style={{ flexDirection: "row", marginHorizontal: 10 }}>
                      {item.hinh_anh ? (
                        <Image
                          source={{
                            uri: `${URL}/`.concat(`${item.hinh_anh}`),
                          }}
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 50,
                            resizeMode: "contain",
                          }}
                        />
                      ) : (
                        <Image
                          source={require("../../assets/logo.png")}
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 50,
                            resizeMode: "contain",
                          }}
                        />
                      )}
                    </View>

                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "80%",
                      }}>
                      <Text
                        style={{
                          color: "#474747",
                          fontSize: 15,
                          fontWeight: "600",
                          textAlign: "center",
                        }}>
                        {item.ten_kh}
                      </Text>
                      <View
                        style={{
                          backgroundColor: "#f1f1f1",
                          borderRadius: 15,
                          width: "60%",
                        }}>
                        <Text
                          style={{
                            color: "#434343",
                            fontSize: 12,
                            fontWeight: "500",
                            textAlign: "center",
                          }}>
                          {item.ten_trang_thai}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: "20%",
                    }}>
                    <TouchableOpacity>
                      <Ionicons
                        name="alert-circle-outline"
                        size={20}
                        color="#826CCF"
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
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
  search: {
    zIndex: 5,
    position: "absolute",
    marginTop: "26%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    padding: 10,
    width: "82%",
    marginLeft: 10,
  },
  body: {
    backgroundColor: "#ffffff",
    width: "100%",
    zIndex: 5,
    // position: "absolute",
    marginTop: "40%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  contentText: {
    lineHeight: 25,
  },
  card: {
    padding: 14,
    shadowColor: "black",
    borderRadius: 15,
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
export default ListMember;
