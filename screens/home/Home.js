//import liraries
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
  TouchableOpacity,
  ScrollView,
  Animated,
  BackHandler,
  RefreshControl,
  Platform,
  TextInput,
  FlatList,
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

import { getNotify } from "../../redux/actions/notifyAction";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-root-toast";

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

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

let backHandlerClickCount = 0;
// create a component
const Home = () => {
  const navigation = useNavigation();
  const [backHome, setBackHome] = useState(false);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  //search
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const animatedValue = useRef(new Animated.Value(0)).current;
  const { auth, notify, event, club, benefit } = useSelector((state) => state);

  const backButtonHandler = () => {
    const shortToast = (message) => {
      Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
    };
    // let backHandlerClickCount;
    backHandlerClickCount += 1;
    if (backHandlerClickCount < 2) {
      shortToast("Nhấn lần nữa sẽ thoát ứng dụng!");
    } else {
      BackHandler.exitApp();
    }
    // timeout for fade and exit
    setTimeout(() => {
      backHandlerClickCount = 0;
    }, 1000);

    return true;
  };
  useEffect(() => {
    if (auth.token) {
      setRefreshing(true);
    }
    async function it() {
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
      const arrayClub = res?.map((item) => item.ma_club);
      dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));

      const arrMember = res
        ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
        .filter((item, index, arr) => {
          const itemIndex = arr.findIndex((it) => it === item);
          return itemIndex === index;
        });

      const reBe = await dispatch(getBenefitManagemant(auth.token, arrMember));
      setFilteredDataSource(reBe);
      setMasterDataSource(reBe);
      setRefreshing(false);
    }
    it();
  }, [dispatch, auth.profile.email, auth.permission.group_id]);

  useEffect(() => {
    if (backHome === false) {
      BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
    }
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
  }, [backHome]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.ten_quyen_loi
          ? item.ten_quyen_loi.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getProfileAction(auth.token));
    dispatch(getPermissionAction(auth.token, auth.profile.email));
    dispatch(getCustomerWlinAction(auth.token, auth.profile.email));
    dispatch(getBenefitAction(auth.token, auth.profile.email));
    async function it() {
      const goi = await dispatch(getRankAction(auth.token, auth.profile.email));
      dispatch({ type: AUTH.GOI, payload: goi });
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));

      const arrayClub = res.map((item) => item.ma_club);
      dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
      const arrMember = res
        ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
        .filter((item, index, arr) => {
          const itemIndex = arr.findIndex((it) => it === item);
          return itemIndex === index;
        });
      const reBe = await dispatch(getBenefitManagemant(auth.token, arrMember));

      setFilteredDataSource(reBe);
      setMasterDataSource(reBe);
    }
    it();
    setRefreshing(false);
  }, [dispatch, auth.profile.email]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <HeaderPart backHome={backHome} setBackHome={setBackHome} />
      {auth.permission?.group_id === Admin && (
        <View style={styles.search}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "80%",
              borderRadius: 7,
            }}>
            <TouchableOpacity>
              <Ionicons name="search-outline" size={30} color="#ffffff" />
            </TouchableOpacity>
            <TextInput
              placeholderTextColor={"#ffffff"}
              theme={{
                roundness: 50,
                colors: {
                  primary: "green",
                  underlineColor: "transparent",
                },
              }}
              underlineColorAndroid="transparent"
              style={styles.input}
              onChangeText={(text) => searchFilterFunction(text)}
              value={search}
              placeholder="Tìm kiếm"
            />
          </View>
          <TouchableOpacity>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Ionicons
                name="options-outline"
                size={25}
                color="#ffffff"
                style={{ transform: [{ rotate: "-90deg" }] }}
              />
            </View>
          </TouchableOpacity>
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
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
              Thống kê
            </Text>

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
            <Text style={{ fontSize: 15, fontWeight: "600", color: "#826CCF" }}>
              Thông tin thành viên
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Text
                style={{ fontSize: 12, fontWeight: "400", color: "#909090" }}>
                Xem chi tiết
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
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#826CCF",
                  }}>
                  Sự kiện sắp diễn ra
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("EventsScreen");
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#909090",
                    }}>
                    Xem chi tiết
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
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#826CCF",
                  }}>
                  Danh sách chỉ số quyền lợi
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PayBenefit");
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#909090",
                    }}>
                    Xem thêm
                  </Text>
                </TouchableOpacity>
              </View>
              {refreshing ? (
                <Loading size="small" />
              ) : filteredDataSource?.length > 0 ? (
                filteredDataSource.map((item, index) => (
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
                    Hiện không có chỉ số quyền lợi nào
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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 15,
  },
  input: {
    height: 40,
    width: "79%",
    marginLeft: 10,
    color: "#ffffff",
  },
});

//make this component available to the app
export default Home;
