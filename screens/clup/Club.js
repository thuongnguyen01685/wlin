//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Lottie from "lottie-react-native";
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
  Animated,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { getCLub } from "../../redux/actions/ClupAction";
import { URL } from "../../utils/fetchApi";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component

const codeData = [
  {
    _id: 1,
    name: "Quốc gia",
    code: "quocgia",
  },
  {
    _id: 2,
    name: "Khu vực",
    code: "khuvuc",
  },
  {
    _id: 3,
    name: "Vùng",
    code: "vung",
  },
];
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const { height } = Dimensions.get("screen");
const Club = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [code, setCode] = useState("quocgia");

  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(1);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setRefreshing(true);
    dispatch(getCLub(auth.token, page));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [dispatch, page, code]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCLub(auth.token, page));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch, page]);

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
            Danh sách CLUB
          </Text>

          {refreshing && (
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
          )}
        </View>

        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "100%" }}>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: refreshing ? "space-between" : "flex-start",
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: "#711775",
              fontWeight: "600",

              paddingTop: 15,
            }}>
            Danh sách CLUB
          </Text>
          {refreshing && <ActivityIndicator size="large" color="#711775" />}
        </View> */}

        {/* <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor="#711775"
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#711775", "green", "blue"]}
          />
        }> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: refreshing ? "space-between" : "flex-start",
            paddingHorizontal: 15,
            alignItems: "center",
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "40%",
              marginTop: 10,
            }}>
            {codeData.map((item) => (
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: item.code === code ? "#F3f3f3" : "#933198",
                  borderRadius: 20,
                  marginRight: 10,
                  borderColor: item.code === code ? "#933198" : "#933198",
                  borderWidth: 0.5,
                }}
                onPress={() => setCode(item.code)}
                key={item._id}>
                <Text
                  style={{
                    color: item.code === code ? "#933198" : "#ffffff",
                    fontSize: 12,
                    fontWeight: "500",
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 10, paddingBottom: "83%" }}>
          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            data={club.getClubs}
            onEndReachedThreshold={0.5}
            onEndReached={() => setPage(page + 1)}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1,
                0,
                (height * 0.1 + 15) * index,
                (height * 0.1 + 15) * (index + 3),
              ];
              const scale = 1;
              const opacity = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const Offset = scrollY.interpolate({
                inputRange,
                outputRange: [0, 0, 0, 500],
              });
              return (
                <Animated.View
                  style={{
                    transform: [{ scale: scale }, { translateX: Offset }],
                    opacity: opacity,
                    marginBottom: 2,
                  }}>
                  <TouchableOpacity
                    key={item._id}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      backgroundColor: "#Ffffff",
                      marginTop: 15,
                      borderRadius: 8,
                      paddingVertical: 20,
                      borderBottomWidth: 0.5,

                      borderColor: "#DADADA",
                      // shadowColor: "#000",
                      // shadowOffset: {
                      //   width: 0,
                      //   height: 2,
                      // },
                      // shadowOpacity: 0.25,
                      // shadowRadius: 7,
                      // elevation: 4,

                      marginHorizontal: 15,
                    }}
                    onPress={() =>
                      navigation.navigate("DetailClub", { _id: item._id })
                    }>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "70%",
                      }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                        <View
                          style={{
                            borderRadius: 8,
                            borderWidth: 0.4,
                            borderColor: "#DADADA",
                          }}>
                          {item.hinh_anh ? (
                            <Image
                              source={{
                                uri: `${URL}/`.concat(`${item.hinh_anh}`),
                              }}
                              style={{
                                width: 80,
                                height: 40,
                                borderRadius: 7,
                              }}
                            />
                          ) : (
                            <Image
                              source={require("../../assets/logo.png")}
                              style={{
                                width: 80,
                                height: 40,
                                resizeMode: "contain",
                              }}
                            />
                          )}
                        </View>

                        <View
                          style={{
                            flexDirection: "column",
                            marginLeft: 20,
                            justifyContent: "center",
                          }}>
                          <Text
                            style={{
                              color: "#826CCF",
                              fontSize: 15,
                              fontWeight: "600",
                            }}>
                            {item.ten_club}
                          </Text>
                          <Text>{item.ten_partner}</Text>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("DetailClub")}>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={25}
                        color="#9D85F2"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
        </View>
        {/* </ScrollView> */}
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
  codeHeader: {
    zIndex: 5,
    position: "absolute",
    marginTop: "37%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
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
    marginTop: "48%",
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
export default Club;
