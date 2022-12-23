//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useRef, useState } from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Platform,
  TextInput,
  RefreshControl,
} from "react-native";
import { useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import Loading from "../../components/loading/Loading";

import ModalSuccessRefer from "../../components/modal/ModalSuccessRefer";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const UpgradeMember = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [searchPart, setSearchPart] = useState(false);
  const { auth } = useSelector((state) => state);

  useEffect(() => {}, []);

  const ma_goi = () => {
    if (auth.ma_goi) {
      let number = Number(auth.ma_goi) + 1;
      let stringGoi = "0" + number.toString();
      return stringGoi;
    } else {
      return "05";
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false));
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart searchPart={searchPart} />
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
          <Text
            style={{
              fontSize: 18,
              color: "#826CCF",
              fontFamily: "LexendDeca_600SemiBold",
            }}>
            Nâng cấp gói thành viên
          </Text>

          {refreshing && <Loading size="large" />}
        </View>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#9D85F2", "red", "green"]}
            />
          }>
          <View style={styles.cardContainer}>
            <Text style={styles.headerName}>Gói muốn nâng cấp</Text>
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
                  colors={
                    ma_goi() === "01"
                      ? ["#ABABAB", "#DFDFDF", "#C5C5C5", "#B9B9B9"]
                      : ma_goi() === "02"
                      ? ["#DEC1A1", "#FBECD7", "#F5DFC7", "#D5B59C"]
                      : ma_goi() === "03"
                      ? ["#7289DD", "#D0DAFF", "#ABBCF8", "#7E96E9"]
                      : ma_goi() === "04"
                      ? ["#1F1F1f", "#646464", "#484848", "#373737"]
                      : ["#9D85F2", "rgba(157, 133, 242, 0.4)"]
                  }
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
                      style={{ width: 15, height: 15, resizeMode: "contain" }}
                    />
                  </View>
                </LinearGradient>
                <Text
                  style={{
                    color:
                      ma_goi() === "01"
                        ? "rgba(103, 103, 103, 0.5)"
                        : ma_goi() === "02"
                        ? "#CAAD8B"
                        : ma_goi() === "03"
                        ? "rgba(90, 84, 165, 0.5)"
                        : ma_goi() === "04" && "rgba(255, 255, 255, 0.6)",
                    fontSize: 13,
                    fontFamily: "LexendDeca_500Medium",
                    marginHorizontal: 10,
                  }}>
                  {ma_goi() === "01"
                    ? "Gói bạc"
                    : ma_goi() === "02"
                    ? "Gói vàng"
                    : ma_goi() === "03"
                    ? "Gói kim cương"
                    : ma_goi() === "04" && "Gói partner"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
                colors={["#9D85F2", "#FBC7D4"]}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 15,
                }}>
                <Text style={styles.textBtn}>Nâng cấp</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.headerName}>Gói của bạn</Text>
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
                  colors={
                    auth.ma_goi === "01"
                      ? ["#ABABAB", "#DFDFDF", "#C5C5C5", "#B9B9B9"]
                      : auth.ma_goi === "02"
                      ? ["#DEC1A1", "#FBECD7", "#F5DFC7", "#D5B59C"]
                      : auth.ma_goi === "03"
                      ? ["#7289DD", "#D0DAFF", "#ABBCF8", "#7E96E9"]
                      : auth.ma_goi === "04"
                      ? ["#1F1F1f", "#646464", "#484848", "#373737"]
                      : ["#9D85F2", "rgba(157, 133, 242, 0.4)"]
                  }
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
                      style={{ width: 15, height: 15, resizeMode: "contain" }}
                    />
                  </View>
                </LinearGradient>
                <Text
                  style={{
                    color:
                      auth.ma_goi === "01"
                        ? "rgba(103, 103, 103, 0.5)"
                        : auth.ma_goi === "02"
                        ? "#CAAD8B"
                        : auth.ma_goi === "03"
                        ? "rgba(90, 84, 165, 0.5)"
                        : auth.ma_goi === "04" && "rgba(255, 255, 255, 0.6)",
                    fontSize: 13,
                    fontFamily: "LexendDeca_500Medium",
                    marginHorizontal: 10,
                  }}>
                  {auth.ma_goi === "01"
                    ? "Gói bạc"
                    : auth.ma_goi === "02"
                    ? "Gói vàng"
                    : auth.ma_goi === "03"
                    ? "Gói kim cương"
                    : auth.ma_goi === "04" && "Gói partner"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                borderRadius: 7,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                marginHorizontal: 5,
              }}
              onPress={() => setModalSuccess(true)}>
              <LinearGradient
                start={{ x: 0.3, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={["#9D85F2", "#FBC7D4"]}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 15,
                }}>
                <Text style={styles.textBtn}>Gia hạn</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 7,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
                marginHorizontal: 5,
              }}>
              <LinearGradient
                start={{ x: 0.3, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={["#9D85F2", "#FBC7D4"]}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 15,
                }}>
                <Text style={styles.textBtn}>Hủy gia hạn</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {modalSuccess && (
        <ModalSuccessRefer
          modalSuccess={modalSuccess}
          setModalSuccess={setModalSuccess}
          content={"Gửi yêu cầu thành công"}
        />
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

  headerName: {
    color: "#474747",
    fontSize: 14,
    fontFamily: "LexendDeca_600SemiBold",
  },
  cardContainer: {
    marginBottom: 5,
    paddingHorizontal: 20,
    marginTop: 10,
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
  textBtn: {
    fontSize: 12,
    color: "#ffffff",
    textAlign: "center",
    width: "100%",
    fontFamily: "LexendDeca_500Medium",
  },
});

//make this component available to the app
export default UpgradeMember;
