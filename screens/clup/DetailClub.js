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
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  Animated,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { URL } from "../../utils/fetchApi";
import { useSelector, useDispatch } from "react-redux";

import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getDetailClub } from "../../redux/actions/ClupAction";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
const dataHeader = [
  {
    _id: 1,
    cat: "Thành viên",
    value: "thanhvien",
  },
  {
    _id: 2,
    cat: "Nhiệm kỳ",
    value: "nhiemky",
  },
  {
    _id: 3,
    cat: "Ban quản trị",
    value: "banquantri",
  },
];
const HEADER_HEIGHT = 130;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const DetailClub = ({ route }) => {
  const navigation = useNavigation();

  const [cat, setCat] = useState("thanhvien");
  const [nk, setNk] = useState("nk1");
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [select, setSelect] = useState("nk1");
  const [refreshing, setRefreshing] = React.useState(false);
  const insets = useSafeAreaInsets();
  const animatedValue = useRef(new Animated.Value(0)).current;

  // const headerHeight = animatedValue.interpolate({
  //   inputRange: [0, HEADER_HEIGHT + insets.top],
  //   outputRange: [HEADER_HEIGHT + insets.top - 100, insets.top + 24],
  //   extrapolate: "clamp",
  // });
  useEffect(() => {
    setRefreshing(true);
    dispatch(getDetailClub(route.params._id, auth.token));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [dispatch, route.params._id]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getDetailClub(route.params._id, auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch, route.params._id]);

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
        }}>
        <Animated.View
          style={{
            marginTop: 2,
            left: 0,
            right: 0,
            zIndex: 10,
            height: 130,
            borderRadius: 7,
            marginHorizontal: 15,
          }}>
          <Animated.View
          // style={{
          //   opacity: animatedValue.interpolate({
          //     inputRange: [0, 25],
          //     outputRange: [1, 0],
          //     extrapolate: "clamp",
          //   }),
          // }}
          >
            <View style={{ marginTop: 5 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#826CCF",
                  textAlign: "center",
                }}>
                {club.detailClub.ten_club}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: "column",
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
                    source={require("../../assets/logo.png")}
                    style={{ width: 120, height: 50, borderRadius: 7 }}
                  />
                )}
              </View>

              <View style={{ width: "55%", paddingRight: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}>
                  <View
                    style={{
                      marginTop: 10,
                      height: 80,
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <Text style={styles.textContent}>
                        Partner: {club.detailClub.ten_partner}
                      </Text>
                      <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Ionicons
                          name="call-outline"
                          color="#FBC7D4"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <Text style={styles.textContent}>
                        Thư ký: Mai Thu Huyền
                      </Text>
                      <TouchableOpacity>
                        <Ionicons
                          name="call-outline"
                          color="#FBC7D4"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <Text style={styles.textContent}>BD: Ms A</Text>
                      <TouchableOpacity>
                        <Ionicons
                          name="call-outline"
                          color="#FBC7D4"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>

          <View>
            <Animated.View
              style={{
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                // transform: [
                //   {
                //     translateY: animatedValue.interpolate({
                //       inputRange: [0, 50],
                //       outputRange: [0, -120],
                //       extrapolate: "clamp",
                //     }),
                //   },
                // ],
              }}>
              {/* {dataHeader.map((item) => (
                <TouchableOpacity
                  style={{
                    backgroundColor: item.value === cat ? "#826CCF" : "#f3f3f3",
                    borderRadius: 20,
                    paddingHorizontal: "7%",
                  }}
                  key={item._id}
                  onPress={() => setCat(item.value)}>
                  <Text
                    style={{
                      color: item.value === cat ? "#ffffff" : "#A0A0A0",
                      marginVertical: 5,
                    }}>
                    {item.cat}
                  </Text>
                </TouchableOpacity>
              ))} */}
            </Animated.View>
            {/* {cat === "banquantri" && (
              <Animated.View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginHorizontal: 15,
                  zIndex: 13,
                  transform: [
                    {
                      translateY: animatedValue.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, -120],
                        extrapolate: "clamp",
                      }),
                    },
                  ],
                }}>
                <View
                  style={{
                    borderRadius: 7,
                    width: 150,
                    height: 40,
                    backgroundColor: "#fdfdfd",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  }}>
                  <Picker
                    selectedValue={select}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelect(itemValue)
                    }>
                    <Picker.Item
                      label="Nhiệm kì 1"
                      value="nk1"
                      style={styles.itemSelect}
                    />
                    <Picker.Item
                      label="Nhiệm kì 2"
                      value="nk2"
                      style={styles.itemSelect}
                    />
                  </Picker>
                </View>
              </Animated.View>
            )} */}
          </View>
        </Animated.View>

        <ScrollView
          // onScroll={Animated.event(
          //   [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
          //   { useNativeDriver: false }
          // )}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor="#711775"
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#711775", "green", "blue"]}
            />
          }>
          <Animated.View
            style={{
              marginBottom: "80%",

              // marginTop: cat === "banquantri" ? "55%" : "45%",
              // transform: [
              //   {
              //     translateY: animatedValue.interpolate({
              //       inputRange: [0, 50],
              //       outputRange: [0, -50],
              //       extrapolate: "clamp",
              //     }),
              //   },
              // ],
            }}>
            {club.detailClub.ds_thanh_vien &&
              club.detailClub.ds_thanh_vien.map(
                (item) =>
                  cat === "thanhvien" && (
                    <View
                      key={item._id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",

                        marginVertical: 10,
                        borderRadius: 10,
                        paddingVertical: 5,
                        marginHorizontal: 15,
                        paddingHorizontal: 10,
                        borderWidth: 0.2,
                      }}>
                      <View
                        style={{
                          flexDirection: "row",

                          width: "70%",
                        }}>
                        <View style={{ flexDirection: "row" }}>
                          <Image
                            source={require("../../assets/truong.png")}
                            style={{ width: 70, height: 70 }}
                          />
                          <Image
                            source={require("../../assets/vmvang.png")}
                            style={{ width: 20, height: 20 }}
                          />
                        </View>

                        <View
                          style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            marginLeft: 4,
                          }}>
                          <Text
                            style={{
                              color: "#474747",
                              fontSize: 13,
                              fontWeight: "600",
                            }}>
                            {item.ten_kh}
                          </Text>
                          <Text
                            style={{
                              color: "#E0ABDF",
                              fontSize: 12,
                              fontWeight: "600",
                            }}>
                            {item.ten_chuc_vu}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          width: "20%",
                          height: "50%",
                        }}>
                        <TouchableOpacity>
                          <Ionicons
                            name="mail-outline"
                            size={20}
                            color="#EBAF81"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Ionicons
                            name="call-outline"
                            size={20}
                            color="#FBC7D4"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Ionicons
                            name="logo-facebook"
                            size={20}
                            color="#5457A6"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )
              )}
            {club.detailClub.nhiem_ky &&
              club.detailClub.nhiem_ky.map(
                (item, index) =>
                  cat === "nhiemky" && (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#F3F3F3",
                        marginVertical: 10,
                        borderRadius: 8,
                        paddingVertical: 15,
                        marginHorizontal: 10,
                        paddingHorizontal: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                        <View style={{ flexDirection: "row" }}>
                          <Image
                            source={require("../../assets/logo.png")}
                            style={{
                              width: 100,
                              height: 40,
                              resizeMode: "contain",
                            }}
                          />
                        </View>

                        <View
                          style={{
                            flexDirection: "column",
                            marginLeft: 20,
                            justifyContent: "center",
                          }}>
                          <Text
                            style={{
                              color: "#711775",
                              fontSize: 18,
                              fontWeight: "600",
                            }}>
                            {item.ten_nhiem_ky}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}>
                            <Ionicons
                              name="calendar-outline"
                              size={20}
                              color="#E0ABDF"
                            />
                            <Text
                              style={{
                                color: "#E0ABDF",
                                fontSize: 12,
                                fontWeight: "600",
                              }}>
                              {item.tu_ngay.slice(0, 10)} -{" "}
                              {item.den_ngay.slice(0, 10)}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={{
                          marginRight: 15,
                          backgroundColor: "#ffffff",
                          borderColor: "#A3A3A3",
                          borderWidth: 1,
                          borderRadius: 7,
                        }}>
                        <MaterialIcons name="add" size={18} color="#A3A3A3" />
                      </TouchableOpacity>
                    </View>
                  )
              )}
            {club.detailClub.quan_tri &&
              club.detailClub.quan_tri.map(
                (item) =>
                  cat === "banquantri" && (
                    <View
                      key={item._id}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#F3F3F3",
                        marginVertical: 10,
                        borderRadius: 8,
                        paddingVertical: 10,
                        marginHorizontal: 10,
                        paddingHorizontal: 10,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                        <View style={{ flexDirection: "row" }}>
                          <Image
                            source={require("../../assets/logo.png")}
                            style={{ width: 100, height: 40 }}
                          />
                        </View>

                        <View
                          style={{
                            flexDirection: "column",
                            marginLeft: 20,
                            justifyContent: "center",
                          }}>
                          <Text
                            style={{
                              color: "#711775",
                              fontSize: 18,
                              fontWeight: "600",
                            }}>
                            {item.ten_kh}
                          </Text>
                          <Text
                            style={{
                              color: "#E0ABDF",
                              fontSize: 12,
                              fontWeight: "600",
                              marginVertical: 5,
                            }}>
                            Chức danh: {item.chuc_vu2}
                          </Text>
                          <Text
                            style={{
                              color: "#E0ABDF",
                              fontSize: 12,
                              fontWeight: "600",
                            }}>
                            Đầy đủ: {item.ten_chuc_vu}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )
              )}
          </Animated.View>
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
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
  itemSelect: {
    fontSize: 13,
    fontWeight: "500",
    color: "#711775",
    textAlign: "center",
  },
  textContent: {
    fontSize: 12,
    fontWeight: "400",
  },
});

//make this component available to the app
export default DetailClub;
