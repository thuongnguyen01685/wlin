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
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import Loading from "../../components/loading/Loading";
import ModalNotPermission from "../../components/modal/ModalNotPermission";

import ModalSuccessRefer from "../../components/modal/ModalSuccessRefer";
import { AUTH, getCustomerWlinAction } from "../../redux/actions/authAction";
import callApis from "../../utils/callApis";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const UpgradeMember = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = React.useState(false);
  const [searchPart, setSearchPart] = useState(false);
  const [content, setContent] = useState("");
  const { auth } = useSelector((state) => state);

  //modal state
  const [modalSuccess, setModalSuccess] = useState(false);
  const [showAlertPermission, setShowAlertPermission] = useState(false);

  const dispatch = useDispatch();
  const ma_goi = () => {
    if (auth.ma_goi) {
      let number = Number(auth.ma_goi) + 1;
      let stringGoi = "0" + number.toString();
      return stringGoi;
    } else {
      return "00";
    }
  };

  const upgradeMember = async () => {
    const res = await callApis(
      `update_htv?access_token=${auth.token}&ma_kh=${
        auth.profile.email
      }&ma_goi_ht=${auth.ma_goi}&ma_goi_yc=${ma_goi()}`
    );
    if (res.data) {
      setContent(res.data);
      setModalSuccess(true);
    } else {
      setContent(res.error);
      setShowAlertPermission(true);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function it() {
      const goi = await dispatch(
        getCustomerWlinAction(auth.token, auth.profile.email)
      );
      await dispatch({ type: AUTH.GOI, payload: goi.goi_thanh_vien });
    }
    it();
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
            N??ng c???p g??i th??nh vi??n
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
            <Text style={styles.headerName}>G??i mu???n n??ng c???p</Text>
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
                      : ma_goi() === "05"
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
                        : ma_goi() === "04" && "#000",
                    fontSize: 13,
                    fontFamily: "LexendDeca_500Medium",
                    marginHorizontal: 10,
                  }}>
                  {ma_goi() === "01"
                    ? "G??i b???c"
                    : ma_goi() === "02"
                    ? "G??i v??ng"
                    : ma_goi() === "03"
                    ? "G??i kim c????ng"
                    : ma_goi() === "04"
                    ? "G??i partner"
                    : ma_goi() === "05"
                    ? "B???n ???? ?????t g??i cao nh???t"
                    : "G??i b???c"}
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
              onPress={upgradeMember}>
              <LinearGradient
                start={{ x: 0.3, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={["#9D85F2", "#FBC7D4"]}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 15,
                }}>
                <Text style={styles.textBtn}>N??ng c???p</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            <Text style={styles.headerName}>G??i c???a b???n</Text>
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
                        : auth.ma_goi === "04" && "#000",
                    fontSize: 13,
                    fontFamily: "LexendDeca_500Medium",
                    marginHorizontal: 10,
                  }}>
                  {auth.ma_goi === "01"
                    ? "G??i b???c"
                    : auth.ma_goi === "02"
                    ? "G??i v??ng"
                    : auth.ma_goi === "03"
                    ? "G??i kim c????ng"
                    : auth.ma_goi === "04" && "G??i partner"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
                <Text style={styles.textBtn}>Gia h???n</Text>
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
                <Text style={styles.textBtn}>H???y gia h???n</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </View>

      {modalSuccess && (
        <ModalSuccessRefer
          modalSuccess={modalSuccess}
          setModalSuccess={setModalSuccess}
          content={content}
        />
      )}

      {showAlertPermission && (
        <ModalNotPermission
          showAlertPermission={showAlertPermission}
          setShowAlertPermission={setShowAlertPermission}
          content={content}
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
