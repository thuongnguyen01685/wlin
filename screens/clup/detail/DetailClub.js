//import liraries
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";

import HeaderPart from "../../../components/HeaderPart/HeaderPart";
import { URL } from "../../../utils/fetchApi";
import { useSelector, useDispatch } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Board from "./TabDetailClub/Board";
import Term from "./TabDetailClub/Term";
import Member from "./TabDetailClub/Member";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const renderScene = SceneMap({
  first: Member,
  second: Term,
  third: Board,
});
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const DetailClub = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);

  const [refreshing, setRefreshing] = React.useState(false);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Thành viên" },
    { key: "second", title: "Nhiệm kì" },
    { key: "third", title: "Ban quản trị" },
  ]);

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
            marginLeft: 10,
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
            Chi tiết CLUB
          </Text>
          {refreshing && (
            <View style={{ marginLeft: 10 }}>
              <ActivityIndicator size="small" color="#826CCF" />
            </View>
          )}
        </View>

        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: "100%",
          paddingHorizontal: 15,
        }}>
        <Animated.View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 15,
            }}>
            <View
              style={{
                flexDirection: "column",
                width: "40%",
                justifyContent: "center",
                alignItems: "center",
              }}>
              {club.detailClub.hinh_anh ? (
                <Image
                  source={{
                    uri: `${URL}/`.concat(`${club.detailClub.hinh_anh}`),
                  }}
                  style={{ width: 120, height: 70, borderRadius: 7 }}
                />
              ) : (
                <Image
                  source={require("../../../assets/logo.png")}
                  style={{ width: 120, height: 50, borderRadius: 7 }}
                />
              )}
            </View>

            <View style={{ width: "55%" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                }}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "800",
                        color: "#826CCF",
                      }}>
                      {club.detailClub.ten_club}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <Text style={styles.textContent}>
                      Partner: {club.detailClub.ten_partner}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <Text style={styles.textContent}>
                      Thư ký: {club.detailClub.ten_thu_ky}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <Text style={styles.textContent}>
                      BD:{club.detailClub.ten_giam_doc_kinh_doanh}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              renderLabel={({ route, focused }) => (
                <Text
                  style={{
                    color: focused ? "#826CCF" : "#dadada",
                    fontSize: 12,
                    fontWeight: "600",
                  }}>
                  {route.title}
                </Text>
              )}
              indicatorStyle={styles.indicatorStyle}
              style={{ backgroundColor: "#ffffff" }}
            />
          )}
        />
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
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
  textContent: {
    fontSize: 13,
    fontWeight: "400",
    marginVertical: 3,
  },
  indicatorStyle: {
    backgroundColor: "#826CCF",
    padding: 1.5,
    marginBottom: -2,
  },
});

export default DetailClub;
