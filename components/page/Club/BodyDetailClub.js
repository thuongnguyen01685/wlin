//import liraries
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useRef, useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Animated,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";
import { getDetailClub } from "../../../redux/actions/ClupAction";
import { URL } from "../../../utils/fetchApi";
import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
const HEADER_HEIGHT = 150;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const BodyDeTailClub = (props) => {
  const [cat, setCat] = useState("thanhvien");
  const [nk, setNk] = useState("nk1");
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [select, setSelect] = useState("nk1");
  const [refreshing, setRefreshing] = React.useState(false);
  const insets = useSafeAreaInsets();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 30],
    extrapolate: "clamp",
  });
  useEffect(() => {
    setRefreshing(true);
    dispatch(getDetailClub(props._id, auth.token));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [dispatch, props._id]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getDetailClub(props._id, auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch, props._id]);

  // const height = useRef(new Animated.Value(210)).current;

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Text
          style={{
            fontSize: 20,
            color: "#711775",
            fontWeight: "600",
            paddingLeft: 20,
            paddingTop: 18,
          }}>
          Chi tiết CLUB
        </Text>

        {cat === "banquantri" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginHorizontal: 15,
              zIndex: 10,
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
                onValueChange={(itemValue, itemIndex) => setSelect(itemValue)}>
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
          </View>
        )}
      </View>

      <Animated.View
        style={{
          position: "absolute",
          marginTop: 47,
          left: 0,
          right: 0,
          zIndex: 10,
          height: headerHeight,
          backgroundColor: "#ffffff",
        }}>
        <Animated.View
          style={{
            marginTop: 10,
            opacity: animatedValue.interpolate({
              inputRange: [0, 25],
              outputRange: [1, 0],
              extrapolate: "clamp",
            }),
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 20,
              width: w,
            }}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-end",
                width: "40%",
              }}>
              {club.detailClub.hinh_anh ? (
                <Image
                  source={{
                    uri: `${URL}/`.concat(`${club.detailClub.hinh_anh}`),
                  }}
                  style={{ width: "80%", height: 90, borderRadius: 7 }}
                />
              ) : (
                <Image
                  source={require("../../../assets/logo.png")}
                  style={{ width: "80%", height: 50, borderRadius: 7 }}
                />
              )}
            </View>

            <View style={{ width: "60%", paddingRight: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#711775",
                  textAlign: "center",
                }}>
                {club.detailClub.ten_club}
              </Text>
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
                    <Text>Partner: {club.detailClub.ten_partner}</Text>
                    <TouchableOpacity style={{ marginLeft: 10 }}>
                      <Ionicons name="call-outline" color="#711775" size={20} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <Text>Thư ký: Mai Thu Huyền</Text>
                    <TouchableOpacity>
                      <Ionicons name="call-outline" color="#711775" size={20} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <Text>BD: Ms A</Text>
                    <TouchableOpacity>
                      <Ionicons name="call-outline" color="#711775" size={20} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          style={{
            backgroundColor: "#f3f3f3",
            marginHorizontal: 10,
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 20,
            flexDirection: "row",
            justifyContent: "space-between",
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
          {dataHeader.map((item) => (
            <TouchableOpacity
              style={{
                backgroundColor: item.value === cat ? "#711775" : "#f3f3f3",
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
          ))}
        </Animated.View>
      </Animated.View>

      <ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
          { useNativeDriver: false }
        )}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor="#711775"
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#711775", "green", "blue"]}
          />
        }>
        <View style={{ marginBottom: "20%", marginTop: "45%" }}>
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
                      backgroundColor: "#F3F3F3",
                      marginVertical: 10,
                      borderRadius: 8,
                      paddingVertical: 5,
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

                        width: "70%",
                      }}>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={require("../../../assets/truong.png")}
                          style={{ width: 70, height: 70 }}
                        />
                        <Image
                          source={require("../../../assets/vmvang.png")}
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
                            color: "#711775",
                            fontSize: 15,
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
                          color="#711775"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Ionicons
                          name="call-outline"
                          size={20}
                          color="#711775"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Ionicons
                          name="logo-facebook"
                          size={20}
                          color="#711775"
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
                          source={require("../../../assets/logo.png")}
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
                          source={require("../../../assets/logo.png")}
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
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
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
});

//make this component available to the app
export default BodyDeTailClub;
