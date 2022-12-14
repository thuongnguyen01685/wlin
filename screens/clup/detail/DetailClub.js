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
  ScrollView,
  RefreshControl,
} from "react-native";

import HeaderPart from "../../../components/HeaderPart/HeaderPart";
import { URL } from "../../../utils/fetchApi";
import { useSelector, useDispatch } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import Board from "./TabDetailClub/Board";
import Term from "./TabDetailClub/Term";
import Member from "./TabDetailClub/Member";
import Lottie from "lottie-react-native";

import { getDetailClub } from "../../../redux/actions/ClupAction";
import SkeletonDetailClub from "../../../components/loading/skeleton/SkeletonDetailClub";
import Loading from "../../../components/loading/Loading";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const DetailClub = ({ route }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

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
      }, 200);
    });
  };

  useEffect(() => {
    setRefreshing(true);
    circleAnimated();
    wait(100).then(() => setRefreshing(false));
  }, [dispatch]);

  const [routes] = useState([
    { key: "first", title: "Th??nh vi??n" },
    { key: "second", title: "Nhi???m k??" },
    { key: "third", title: "Ban qu???n tr???" },
  ]);

  const id_event = route.params._id;
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <Member id_event={id_event} />;
      case "second":
        return <Term id_event={id_event} />;
      case "third":
        return <Board id_event={id_event} />;
    }
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
            marginLeft: 10,
            alignItems: "center",
          }}>
          <Text style={styles.headerTitle}>Chi ti???t CLUB</Text>

          {refreshing && <Loading size="large" />}
        </View>
      </View>
      {refreshing ? (
        <SkeletonDetailClub circleAnimatedValue={circleAnimatedValue} />
      ) : (
        <View
          style={{
            height: "100%",
            paddingHorizontal: 15,
          }}>
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
                width: w * 0.3,
                justifyContent: "center",
                alignItems: "center",
                marginHorizontal: 10,
                height: w * 0.3,
              }}>
              <Image
                source={
                  club.detailClub.hinh_anh
                    ? {
                        uri: `${URL}${club.detailClub.hinh_anh}`,
                      }
                    : require("../../../assets/logo.png")
                }
                style={{
                  width: w * 0.29,
                  height: w * 0.24,
                  borderRadius: 15,
                  resizeMode: "contain",
                }}
              />
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
                    <Text style={styles.headerTitle}>
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
                      Th?? k??: {club.detailClub.ten_thu_ky}
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
                      fontSize: 14,
                      fontFamily: "LexendDeca_500Medium",
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
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerTitle: {
    fontSize: 16,
    color: "#826CCF",
    fontFamily: "LexendDeca_600SemiBold",
  },

  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
  textContent: {
    fontSize: 12,
    fontFamily: "LexendDeca_400Regular",
    marginVertical: 3,
  },
  indicatorStyle: {
    backgroundColor: "#826CCF",
    padding: 1.5,
    marginBottom: -2,
  },
});

export default DetailClub;
