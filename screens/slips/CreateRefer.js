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
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import CountryFlag from "react-native-country-flag";
import ModalSuccessRefer from "../../components/modal/ModalSuccessRefer";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const CreateRefer = () => {
  const navigation = useNavigation();
  const [tyfcb, setTyfcb] = useState("");
  const [nhlk, setNhlk] = useState("");
  const [gtRef, setGtRef] = useState("");
  const [mdRef, setMdRef] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);
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
            Tạo phiếu
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
        {modalSuccess && (
          <ModalSuccessRefer
            modalSuccess={modalSuccess}
            setModalSuccess={setModalSuccess}
            content={"Tạo Referrals thành công"}
          />
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: "70%",
              paddingHorizontal: 30,
              marginTop: 10,
            }}>
            <View style={styles.cardContainer}>
              <Text style={styles.headerName}>WLIN Global</Text>
              <TouchableOpacity style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "30%",
                  }}>
                  <CountryFlag
                    isoCode="vn"
                    size={15}
                    style={{ borderRadius: 3 }}
                  />

                  <Text
                    style={{
                      color: "#711775",
                      fontSize: 11,
                      fontWeight: "500",
                    }}>
                    Vietnam
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#781C7C"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              <Text style={styles.headerName}>WLIN CLUB</Text>
              <TouchableOpacity style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}>
                  <Text
                    style={{
                      color: "#711775",
                      fontSize: 11,
                      fontWeight: "500",
                      marginHorizontal: 10,
                    }}>
                    WLIN STARS ASIA
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#781C7C"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              <Text style={styles.headerName}>Thành viên</Text>
              <TouchableOpacity style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}>
                  <Text
                    style={{
                      color: "#711775",
                      fontSize: 11,
                      fontWeight: "500",
                      marginHorizontal: 10,
                    }}>
                    Thành Vinh
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#781C7C"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
              <Text style={styles.headerName}>Mô tả</Text>
              <View style={styles.card}>
                <TextInput
                  style={styles.input}
                  onChangeText={setTyfcb}
                  value={tyfcb}
                  placeholderTextColor="rgba(113, 23, 117, 0.3)"
                  placeholder="Tên mô tả TYFCB"
                />
              </View>
              <View style={styles.card}>
                <TextInput
                  style={styles.input}
                  onChangeText={setNhlk}
                  value={nhlk}
                  placeholderTextColor="rgba(113, 23, 117, 0.3)"
                  placeholder="Ngành hàng liên kết"
                />
              </View>
              <View style={styles.card}>
                <TextInput
                  style={styles.input}
                  onChangeText={setGtRef}
                  value={gtRef}
                  placeholderTextColor="rgba(113, 23, 117, 0.3)"
                  placeholder="Giá trị referrals"
                />
              </View>
              <View style={styles.card}>
                <TextInput
                  style={styles.input}
                  onChangeText={setMdRef}
                  value={mdRef}
                  placeholderTextColor="rgba(113, 23, 117, 0.3)"
                  placeholder="Mức độ ưu tiên referrals"
                />
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 15,
                  marginTop: 10,
                }}>
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
  headerName: {
    color: "#781C7C",
    fontSize: 14,
    fontWeight: "600",
  },
  cardContainer: {
    marginBottom: 5,
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
  input: {
    height: 25,
    width: "100%",
    color: "#781C7C",
    fontSize: 11,
  },
});

//make this component available to the app
export default CreateRefer;
