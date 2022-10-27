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
} from "react-native";

import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { URL } from "../../utils/fetchApi";
import {
  getDetailMember,
  getMemberAction,
} from "../../redux/actions/ClupAction";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const ListMember = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const { auth, club } = useSelector((state) => state);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getMemberAction(auth.token));
    wait(4000).then(() => setRefreshing(false));
  }, [dispatch]);

  useEffect(() => {
    setRefreshing(true);
    dispatch(getMemberAction(auth.token));
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  }, [dispatch]);

  const handleDetailMember = (_id) => {
    dispatch(getDetailMember(_id, auth.token));
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
          <View style={{ marginBottom: "70%" }}>
            {club.getMember.map((item) => (
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
                onPress={() => handleDetailMember(item._id)}>
                <View
                  style={{
                    flexDirection: "row",

                    alignItems: "center",
                    width: "70%",
                  }}>
                  <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
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
});

//make this component available to the app
export default ListMember;
