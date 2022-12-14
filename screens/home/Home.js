//import liraries
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
  BackHandler,
  RefreshControl,
  Platform,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AUTH,
  getCustomerWlinAction,
  getPermissionAction,
  getProfileAction,
  getRankAction,
} from "../../redux/actions/authAction";
import HeaderPart from "../../components/HeaderPart/HeaderPart";

import { getEventsAction } from "../../redux/actions/eventsAction";

import CardInfo from "../../components/CardInfo";
import StatisticsHome from "./statistics/statistics.home";
import { getCLub } from "../../redux/actions/ClupAction";
import {
  getBenefitAction,
  getBenefitManagemant,
} from "../../redux/actions/benefitAction";

import Loading from "../../components/loading/Loading";
import BenefitHome from "./Benefit.home";
import Chart from "./Chart.home";

import { Admin, Partner } from "../../utils/AccessPermission";
import CasouselEventing from "./CasouselEventing";
import ReactNativeAnimatedSearchbox from "../../components/ReactNativeAnimatedSearchbox";
import { Alert } from "react-native";
import BackFail from "./BackFail";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const Home = () => {
  const navigation = useNavigation();
  const [backHome, setBackHome] = useState(false);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [backFail, setBackFail] = useState(true);

  //search
  const [search, setSearch] = useState("");

  const animatedValue = useRef(new Animated.Value(0)).current;
  const { auth, notify, event, club, benefit } = useSelector((state) => state);

  //search animated
  const [searchIconColor, setSearchIconColor] = useState("#909090");
  const refSearchBox = useRef();

  useFocusEffect(() => {
    setBackFail(true);
    return () => setBackFail(false);
  });

  useEffect(() => {
    if (auth.token) {
      setRefreshing(true);
    }
    async function it() {
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));

      const arrayClub = res?.map((item) => item.ma_club);
      await dispatch(
        getEventsAction(auth, arrayClub, auth.permission.group_id)
      );

      const arrMember = res
        ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
        .filter((item, index, arr) => {
          const itemIndex = arr.findIndex((it) => it === item);
          return itemIndex === index;
        });
      const reBe = await dispatch(
        getBenefitManagemant(auth.token, arrMember, 1, search)
      );
      setRefreshing(false);
    }
    it();
  }, [dispatch, auth.profile.email, auth.permission.group_id, search]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getProfileAction(auth.token));
    dispatch(getPermissionAction(auth.token, auth.profile.email));

    dispatch(getBenefitAction(auth.token, auth.profile.email));
    async function it() {
      const goi = await dispatch(
        getCustomerWlinAction(auth.token, auth.profile.email)
      );
      await dispatch({ type: AUTH.GOI, payload: goi.goi_thanh_vien });
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));

      const arrayClub = res.map((item) => item.ma_club);
      dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
      const arrMember = res
        ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
        .filter((item, index, arr) => {
          const itemIndex = arr.findIndex((it) => it === item);
          return itemIndex === index;
        });
      const reBe = await dispatch(
        getBenefitManagemant(auth.token, arrMember, 1, search)
      );
    }
    it();
    setRefreshing(false);
  }, [dispatch, auth.profile.email]);

  return (
    <View style={styles.container}>
      {backFail && <BackFail />}
      {refreshing && (
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            opacity: 0.5,
            width: w,
            height: h,
            position: "absolute",
            zIndex: 20,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      )}
      <StatusBar barStyle="light-content" />

      <HeaderPart backHome={backHome} setBackHome={setBackHome} />
      {auth.permission?.group_id === Admin && (
        <View style={styles.search}>
          <ReactNativeAnimatedSearchbox
            onChangeText={(text) => setSearch(text)}
            value={search}
            placeholder={"T??m ki???m..."}
            ref={refSearchBox}
            searchIconColor={searchIconColor}
            onClosed={() => {
              setSearchIconColor("#555");
            }}
            onOpening={() => {
              setSearchIconColor("#555");
            }}
          />
        </View>
      )}

      {auth.permission?.group_id === Admin ? (
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
            marginTop: -50,
            marginHorizontal: 15,
            paddingVertical: 20,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Text style={styles.headerTitle}>Th???ng k??</Text>

            {refreshing && <Loading size="large" />}
          </View>
        </View>
      ) : (
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
            marginTop: -90,
            marginHorizontal: 15,
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingBottom: 15,
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              marginTop: 10,
              zIndex: 4,
            }}>
            <Text style={styles.headerTitle}>Th??ng tin th??nh vi??n</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: "LexendDeca_400Regular",
                  color: "#909090",
                }}>
                Xem chi ti???t
              </Text>
            </TouchableOpacity>
          </View>
          <CardInfo />
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9796F0", "green", "blue"]}
          />
        }>
        <View
          style={{
            marginBottom: "20%",
            marginTop: 5,
          }}>
          {auth.permission && auth.permission.group_id !== Admin && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 15,
                }}>
                <Text style={styles.headerTitle}>S??? ki???n s???p di???n ra</Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EventsScreen");
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "LexendDeca_400Regular",
                      color: "#909090",
                    }}>
                    Xem chi ti???t
                  </Text>
                </TouchableOpacity>
              </View>
              {refreshing ? <Loading size="small" /> : <CasouselEventing />}
            </View>
          )}

          <StatisticsHome />
          {(auth.permission.group_id === Admin ||
            auth.permission.group_id === Partner) && <Chart />}

          {auth.permission.group_id === Admin && (
            <View style={{ marginTop: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 15,
                }}>
                <Text style={styles.headerTitle}>
                  Danh s??ch ch??? s??? quy???n l???i
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PayBenefit");
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "LexendDeca_400Regular",
                      color: "#909090",
                    }}>
                    Xem th??m
                  </Text>
                </TouchableOpacity>
              </View>
              {refreshing ? (
                <Loading size="small" />
              ) : benefit.benefitMana?.length > 0 ? (
                benefit.benefitMana.map((item, index) => (
                  <BenefitHome item={item} key={index} />
                ))
              ) : (
                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      textAlign: "center",
                      marginTop: 10,
                    }}>
                    Hi???n kh??ng c?? ch??? s??? quy???n l???i n??o
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
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
    zIndex: 1,
    position: "absolute",
    marginTop: "23%",
    width: "95%",
    paddingLeft: 15,
  },
  input: {
    height: 40,
    width: "79%",
    marginLeft: 10,
    color: "#ffffff",
  },
  headerTitle: {
    fontSize: 16,
    color: "#826CCF",
    fontFamily: "LexendDeca_600SemiBold",
  },
});

//make this component available to the app
export default Home;
