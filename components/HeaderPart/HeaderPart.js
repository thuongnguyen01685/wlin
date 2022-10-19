//import liraries
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  TextInput,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const HeaderPart = (props) => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { auth, notify } = useSelector((state) => state);
  return (
    <View>
      <View>
        <Header backHome={props.backHome} setBackHome={props.setBackHome} />
        <View>
          <ImageBackground
            source={require("../../assets/bg.png")}
            style={{
              height: 180,
              width: w,
            }}
          />
          {/* <ImageBackground
              source={require("../../assets/VctLogin.png")}
              style={{
                height: ratio * 1000,
                width: w,
                position: "absolute",
                zIndex: 2,
              }}
            /> */}
        </View>
      </View>
      <View style={styles.search}>
        <View
          style={{
            flexDirection: "row",
            //backgroundColor: "#ffffff",
            alignItems: "center",
            width: "80%",
            borderRadius: 7,
          }}>
          <TouchableOpacity
          // style={{
          //   marginHorizontal: 10,
          //   paddingHorizontal: 4,
          //   paddingVertical: 3,
          // }}
          >
            <Ionicons name="search-outline" size={30} color="#ffffff" />
          </TouchableOpacity>
          <TextInput
            placeholderTextColor={"#ffffff"}
            theme={{
              roundness: 50,
              colors: {
                primary: "green",
                underlineColor: "transparent",
              },
            }}
            underlineColorAndroid="transparent"
            style={styles.input}
            onChangeText={(keySearch) => setSearch(keySearch)}
            value={search}
            placeholder="Tìm kiếm"
          />
        </View>
        <TouchableOpacity>
          <View
            style={{
              // backgroundColor: "#ffffff",
              width: 35,
              height: 35,
              borderRadius: 50,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Ionicons
              name="options-outline"
              size={25}
              color="#ffffff"
              style={{ transform: [{ rotate: "-90deg" }] }}
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* <View
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
          marginTop: -40,
          marginHorizontal: 15,
          paddingVertical: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#711775" }}>
          Trang Chủ
        </Text>
        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#711775" />
        </TouchableOpacity>
      </View> */}
      {/* <View
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
          marginTop: -40,
          marginHorizontal: 15,
          paddingVertical: 20,
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#711775" }}>
            Thông tin thành viên
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 12, fontWeight: "400", color: "#909090" }}>
              Xem chi tiết
            </Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            height: headerHeight,
            opacity: props.animatedValue.interpolate({
              inputRange: [0, 25],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
            transform: [
              {
                translateY: props.animatedValue.interpolate({
                  inputRange: [0, 50],
                  outputRange: [0, -100],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}>
          <LinearGradient
            start={{ x: 0.9, y: 1 }}
            end={{ x: 0.2, y: 0.6 }}
            colors={["#912C95", "#E19EF0", "#9634B9"]}
            style={{ borderRadius: 7 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <MaterialCommunityIcons
                  name="crown-outline"
                  color="rgba(238, 221, 176, 0.93)"
                  size={30}
                />
                <Text
                  style={{ color: "#ff0", fontWeight: "600", fontSize: 17 }}>
                  Thành viên vàng
                </Text>
              </View>
              <TouchableOpacity>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  color="#FFFFFF"
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: "100%", padding: 20 }}>
              <Text
                style={{
                  color: "#680E6C",
                  fontSize: 25,
                  fontWeight: "600",
                  textAlign: "center",
                }}>
                Thương Thị
              </Text>
              <Text
                style={{
                  color: "#680E6C",
                  fontSize: 15,
                  fontWeight: "500",
                  textAlign: "center",
                }}>
                UXUI Designer
              </Text>
            </View>
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Text style={styles.textContent}>Start date: 1/2/2021</Text>
                <Text style={styles.textContent}>Due date: 1/2/2022</Text>
              </View>
              <Text style={styles.textContent}>
                Thời gian hoạt động còn lại: 20 ngày
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
      </View> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  search: {
    zIndex: 5,
    position: "absolute",
    marginTop: "21%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 15,
  },
  input: {
    height: 40,
    // padding: 10,
    width: "79%",
    marginLeft: 10,
    color: "#ffffff",
    left: -5,
  },
  body: {
    backgroundColor: "#ffffff",
    width: "100%",
    // position: "absolute",
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
});

//make this component available to the app
export default HeaderPart;
