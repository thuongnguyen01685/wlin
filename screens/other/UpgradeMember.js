//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useRef, useState } from "react";
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
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

import Header from "../../components/Header";

import ModalSuccessRefer from "../../components/modal/ModalSuccessRefer";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const UpgradeMember = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Header />
          <View>
            <ImageBackground
              source={require("../../assets/EllipseLogin.png")}
              style={{
                height: 455,
                width: 325,
                zIndex: 1,
                position: "absolute",
              }}
            />
            <ImageBackground
              source={require("../../assets/VctLogin.png")}
              style={{
                height: ratio * 1000,
                width: w,
                position: "absolute",
                zIndex: 2,
              }}
            />
          </View>
        </View>
        <View style={styles.search}>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "#ffffff",
              alignItems: "center",
              alignContent: "center",
              width: "75%",
              borderRadius: 10,
              justifyContent: "space-between",
            }}>
            <TextInput
              style={styles.input}
              onChangeText={(keySearch) => setSearch(keySearch)}
              value={search}
              placeholder="Tìm kiếm"
            />
            <TouchableOpacity
              style={{
                marginHorizontal: 10,
                padding: 7,

                borderTopRightRadius: 7,
                borderBottomRightRadius: 7,
              }}>
              <Ionicons name="search-outline" size={20} color="#711775" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <LinearGradient
              start={{ x: 0, y: 0.3 }}
              end={{ x: 1, y: 1 }}
              colors={["#751979", "#AE40B2"]}
              style={{
                borderRadius: 30,
                flexDirection: "row",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
                paddingLeft: 1,
                paddingRight: 10,
              }}>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 30,
                  marginVertical: 2,
                  marginRight: 5,
                  padding: 2,
                }}>
                <Ionicons name="filter" size={18} color="#751979" />
              </View>

              <Text style={{ fontSize: 10, color: "#ffffff" }}>Lọc</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <View style={{ height: "100%" }}>
            <Text
              style={{
                fontSize: 20,
                color: "#711775",
                fontWeight: "600",
                paddingLeft: 20,
                paddingTop: 18,
              }}>
              Nâng cấp gói thành viên
            </Text>
            {modalSuccess && (
              <ModalSuccessRefer
                modalSuccess={modalSuccess}
                setModalSuccess={setModalSuccess}
                content={"Gửi yêu cầu thành công"}
              />
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  marginBottom: "20%",
                  paddingHorizontal: 15,
                  marginTop: 10,
                }}>
                <View style={styles.cardContainer}>
                  <Text style={styles.headerName}>Gói thành viên</Text>
                  <TouchableOpacity style={styles.card}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}>
                      <LinearGradient
                        start={{ x: 1, y: 0.7 }}
                        end={{ x: 0.3, y: 0.8 }}
                        colors={["#F9C271", "#F4EFB8", "#F4EFB8", "#F9C271"]}
                        style={{ width: 20, height: 20, borderRadius: 5 }}>
                        <View
                          style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}>
                          <Image
                            source={require("../../assets/logo.png")}
                            style={{ width: 10, height: 10 }}
                          />
                          <Text style={{ fontSize: 3, color: "#969696" }}>
                            Gói vàng
                          </Text>
                        </View>
                      </LinearGradient>
                      <Text
                        style={{
                          color: "#711775",
                          fontSize: 11,
                          fontWeight: "500",
                          marginHorizontal: 10,
                        }}>
                        Gói vàng
                      </Text>
                    </View>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={20}
                      color="#781C7C"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: 7,
                      flexDirection: "row",
                      alignContent: "center",
                      alignItems: "center",
                      width: "35%",
                      justifyContent: "center",
                      marginBottom: 10,
                    }}
                    onPress={() => setModalSuccess(true)}>
                    <LinearGradient
                      start={{ x: 0.3, y: 1 }}
                      end={{ x: 1, y: 1 }}
                      colors={["#751979", "#AE40B2"]}
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 5,
                        borderRadius: 7,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#ffffff",
                          textAlign: "center",
                          width: "100%",
                          fontWeight: "500",
                        }}>
                        Xác nhận
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
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
    height: "200%",
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
  headerName: {
    color: "#781C7C",
    fontSize: 12,
    fontWeight: "600",
  },
  cardContainer: {
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: "#FDFDFD",
    paddingVertical: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
});

//make this component available to the app
export default UpgradeMember;
