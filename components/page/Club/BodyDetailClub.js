//import liraries
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

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

const dataTotal = [
  {
    _id: 1,
    avatar: require("../../../assets/truong.png"),
    name: "Xuân Trường",
    position: "Thành viên",
    vm: require("../../../assets/vmbac.png"),
    code: "thanhvien",
  },
  {
    _id: 2,
    avatar: require("../../../assets/vinh.png"),
    name: "Thành Vinh",
    position: "Thành viên",
    vm: require("../../../assets/vmxanh.png"),
    code: "thanhvien",
  },
  {
    _id: 3,
    avatar: require("../../../assets/truong.png"),
    name: "Anh Tây",
    position: "Quản lí",
    vm: require("../../../assets/vmvang.png"),
    code: "thanhvien",
  },
  {
    _id: 1,
    picture: require("../../../assets/logo.png"),
    name: "Nhiệm kỳ 1",
    time: "11/08 - 12/08/2022",
    code: "nhiemky",
  },
  {
    _id: 2,
    picture: require("../../../assets/logo.png"),
    name: "Nhiệm kỳ 2",
    time: "11/08 - 12/08/2022",
    code: "nhiemky",
  },
  {
    _id: 1,
    picture: require("../../../assets/logo.png"),
    name: "Nhiệm kỳ 1",
    value: "nk1",
    hoivien: "Đinh Thị Thu Hiền",
    chucvu: "Trưởng Ban",
    mota: "",
    code: "banquantri",
  },
  {
    _id: 2,
    picture: require("../../../assets/logo.png"),
    name: "Nhiệm kỳ 2",
    value: "nk2",
    hoivien: "Đinh Thị Thu Hà",
    chucvu: "Trưởng Ban",
    mota: "",
    code: "banquantri",
  },
];
// create a component
const BodyDeTailClub = () => {
  const [cat, setCat] = useState("thanhvien");
  const [nk, setNk] = useState("nk1");
  return (
    <View>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: "57%", marginTop: 15 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Image
                source={require("../../../assets/logo.png")}
                style={{ width: 120, height: 50 }}
              />
              <View>
                <Text
                  style={{ fontSize: 20, fontWeight: "600", color: "#711775" }}>
                  WLIN PIONEER EU+
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingRight: 40,
              }}>
              <View
                style={{
                  marginTop: 10,
                  width: "60%",
                  height: 80,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <Text>Partner: Mai Thu Huyền</Text>
                  <TouchableOpacity>
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
          <View
            style={{
              backgroundColor: "#f3f3f3",
              marginHorizontal: 10,
              marginTop: 30,
              marginBottom: 10,
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "space-between",
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
          </View>
          {cat === "banquantri" && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginHorizontal: 15,
                zIndex: 6,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  backgroundColor: "#f3f3f3",
                  borderRadius: 5,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  width: "30%",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                <Text
                  style={{ color: "#711775", fontSize: 13, fontWeight: "500" }}>
                  Nhiệm kì 1
                </Text>
                <Ionicons
                  name="chevron-down-outline"
                  size={20}
                  color="#711775"
                />
              </TouchableOpacity>
            </View>
          )}

          <ScrollView>
            {dataTotal
              .filter((items) => items.code === cat)
              .map((item) =>
                cat === "thanhvien" ? (
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
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={item.avatar}
                          style={{ width: 70, height: 70 }}
                        />
                        <Image
                          source={item.vm}
                          style={{ width: 20, height: 20 }}
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
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: "#E0ABDF",
                            fontSize: 12,
                            fontWeight: "600",
                          }}>
                          {item.position}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "20%",
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
                ) : cat === "nhiemky" ? (
                  <View
                    key={item._id}
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
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={item.picture}
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
                          {item.name}
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
                            {item.time}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : (
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
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      <View style={{ flexDirection: "row" }}>
                        <Image
                          source={item.picture}
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
                          {item.name}
                        </Text>
                        <Text
                          style={{
                            color: "#E0ABDF",
                            fontSize: 12,
                            fontWeight: "600",
                          }}>
                          Hội viên: {item.hoivien}
                        </Text>
                        <Text
                          style={{
                            color: "#E0ABDF",
                            fontSize: 12,
                            fontWeight: "600",
                          }}>
                          Chức vụ: {item.chucvu}
                        </Text>
                        <Text
                          style={{
                            color: "#E0ABDF",
                            fontSize: 12,
                            fontWeight: "600",
                          }}>
                          Mô tả: {item.mota}
                        </Text>
                      </View>
                    </View>
                  </View>
                )
              )}
          </ScrollView>
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
});

//make this component available to the app
export default BodyDeTailClub;
