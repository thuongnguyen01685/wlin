//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";

import {
  getDetailBenefit,
  getListBenefit,
} from "../../redux/actions/ClupAction";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const Benefit = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setRefreshing(true);
    dispatch(getListBenefit(auth.token));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [dispatch]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getListBenefit(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  const handleDetailBenefit = (_id) => {
    dispatch(getDetailBenefit(_id, auth.token));
    navigation.navigate("DetailBenefit");
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
          marginTop: -50,
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
            Danh sách nhóm quyền lợi
          </Text>

          {/* {refreshing && (
            <View
              style={{
                left: 10,
                padding: 30,
                position: "absolute",
                left: "100%",
              }}>
              <Lottie
                source={require("../../assets/loading.json")}
                autoPlay
                loop
              />
            </View>
          )} */}
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
              tintColor="#9D85F2"
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#9D85F2", "green", "blue"]}
            />
          }>
          <View
            style={{
              marginBottom: "20%",
              paddingHorizontal: 15,
              marginTop: 10,
            }}>
            <View>
              {club.getBenefit.map((item, index) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#Ffffff",
                    borderRadius: 8,
                    paddingVertical: 20,
                    paddingHorizontal: 15,
                    borderBottomWidth: 0.5,
                    borderColor: "#dadada",
                  }}
                  key={index}
                  onPress={() => handleDetailBenefit(item._id)}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <View
                        style={{
                          borderRadius: 15,
                          borderColor: "#dadada",
                          borderWidth: 0.4,
                          paddingVertical: 15,
                          paddingHorizontal: 5,
                        }}>
                        <Image
                          source={require("../../assets/logo.png")}
                          style={{ width: 60, height: 30 }}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "column",
                          marginLeft: 10,
                          justifyContent: "center",
                          width: "65%",
                        }}>
                        <Text
                          style={{
                            color: "#474747",
                            fontSize: 15,
                            fontWeight: "600",
                          }}>
                          {item.ten_nhquyenloi}
                        </Text>
                        <View
                          style={{
                            backgroundColor:
                              item.goi_thanh_vien === "03"
                                ? "#EEF4FF"
                                : item.goi_thanh_vien === "01"
                                ? "#EDEDED"
                                : item.goi_thanh_vien === "04"
                                ? "#F0ECFF"
                                : "#FEF8E3",
                            borderRadius: 10,
                            width: "60%",
                          }}>
                          <Text
                            style={{
                              color: "#000000",
                              fontSize: 12,
                              fontWeight: "500",
                              textAlign: "center",
                            }}>
                            Gói: {item.ten_goi_thanh_vien}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                  // onPress={() => navigation.navigate("DetailClub")}
                  >
                    <Ionicons
                      name="chevron-forward-outline"
                      size={25}
                      color="#9D85F2"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
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
});

//make this component available to the app
export default Benefit;
