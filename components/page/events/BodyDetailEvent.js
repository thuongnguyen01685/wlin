//import liraries
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
// create a component
const BodyDetailEvent = () => {
  const navigation = useNavigation();
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
        Chi tiết sự kiện
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: "57%" }}>
          <View
            style={{
              marginTop: 10,
              marginBottom: 10,
              borderRadius: 20,
              flexDirection: "column",
            }}>
            <Image
              source={require("../../../assets/bannerevent.png")}
              style={{
                width: w,
                height: 180,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderColor: "#711775",
                  borderRadius: 20,
                  borderWidth: 0.8,
                }}>
                <Text
                  style={{ color: "#711775", fontSize: 10, fontWeight: "600" }}>
                  Hội thảo
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Image source={require("../../../assets/a4.png")} />
                <Text style={{ fontSize: 10, color: "#b0b0b0", marginLeft: 2 }}>
                  Bạn chưa tham gia
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Image
                    source={require("../../../assets/a1.png")}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      left: 14,
                      zIndex: 3,
                      resizeMode: "contain",
                    }}
                  />
                  <Image
                    source={require("../../../assets/a2.png")}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      left: 6,
                      zIndex: 2,
                      resizeMode: "contain",
                    }}
                  />
                  <Image
                    source={require("../../../assets/a3.png")}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 20,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <Text style={{ fontSize: 10, marginLeft: 2 }}>
                  300 người tham gia
                </Text>
                <TouchableOpacity>
                  <Ionicons
                    name="arrow-forward-outline"
                    color="#711775"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>Sự kiện 1</Text>
            <View style={styles.containerBox}>
              <View style={styles.backBorder}>
                <Ionicons name="calendar-outline" size={15} color="#711775" />
              </View>
              <View style={styles.conText}>
                <Text style={styles.headerContent}>17 tháng 8, 2022</Text>
                <Text style={styles.bodyContent}>Thứ 4, 9:00 - 11:00</Text>
              </View>
            </View>
            <View style={styles.containerBox}>
              <View style={styles.backBorder}>
                <Ionicons name="location-outline" size={15} color="#711775" />
              </View>
              <View style={styles.conText}>
                <Text style={styles.headerContent}>
                  Trung tâm sự kiện Diamond Place
                </Text>
                <Text style={styles.bodyContent}>
                  15A Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TP.HCM
                </Text>
              </View>
            </View>
            <View style={styles.containerBox}>
              <View style={styles.backBorder}>
                <Ionicons
                  name="document-text-outline"
                  size={15}
                  color="#711775"
                />
              </View>
              <View style={styles.conText}>
                <Text style={styles.headerContent}>Mô tả</Text>
                <Text style={styles.bodyContent}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book
                </Text>
              </View>
            </View>
            <View style={styles.containerBox}>
              <View style={styles.backBorder}>
                <MaterialCommunityIcons
                  name="ticket-confirmation-outline"
                  size={15}
                  color="#711775"
                />
              </View>
              <View style={styles.conText}>
                <Text style={styles.headerContent}>Giá vé</Text>
                <Text style={styles.bodyContent}>Thành viên: 500.000 VND</Text>
                <Text style={styles.bodyContent}>Khách mời: 450.000 VND</Text>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={styles.containerCheckin}>
              <Text style={{ fontWeight: "600", fontSize: 14 }}>
                Checkin bằng
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: 10,
                  width: "35%",
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CheckQR")}>
                  <LinearGradient
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#751979", "#AE40B2"]}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      borderRadius: 30,
                    }}>
                    <View style={styles.borderBacRounded}>
                      <Ionicons
                        name="qr-code-outline"
                        size={20}
                        color="#ffffff"
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CheckImage")}>
                  <LinearGradient
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#751979", "#AE40B2"]}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      borderRadius: 30,
                    }}>
                    <View style={styles.borderBacRounded}>
                      <Ionicons
                        name="image-outline"
                        size={20}
                        color="#ffffff"
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                {/* <TouchableOpacity>
                  <LinearGradient
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#751979", "#AE40B2"]}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      borderRadius: 30,
                    }}>
                    <View style={styles.borderBacRounded}>
                      <Image
                        source={require("../../../assets/fbf.png")}
                        style={styles.imageCheckin}
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity> */}
              </View>
            </View>
          </View>
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
  containerBox: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  backBorder: {
    padding: 15,
    backgroundColor: "#EDD5ED",
    borderRadius: 40,
    borderColor: "#711775",
    borderWidth: 0.8,
  },
  conText: {
    marginHorizontal: 10,
    marginRight: "10%",
  },
  headerContent: {
    fontSize: 14,
    fontWeight: "600",
  },
  bodyContent: {
    fontSize: 10,
    fontWeight: "400",
    textAlign: "justify",
  },
  containerCheckin: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  borderBacRounded: {
    padding: 20,
  },
  imageCheckin: {
    width: 20,
    height: 20,
  },
});

//make this component available to the app
export default BodyDetailEvent;
