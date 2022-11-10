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
import Carousel from "react-native-banner-carousel-updated";
import {
  getDetailEventsAction,
  getEventsAction,
} from "../../redux/actions/eventsAction";
import { URL } from "../../utils/fetchApi";
import { formatDate, formatDateDisplays } from "../../utils/datetime";
import CardInfo from "../../components/CardInfo";
import StatisticsHome from "./statistics/statistics.home";
import { getCLub } from "../../redux/actions/ClupAction";
import { getBenefitAction } from "../../redux/actions/benefitAction";

import Loading from "../../components/loading/Loading";
import BenefitHome from "./Benefit.home";
import Chart from "./Chart.home";

import { Admin, Partner } from "../../utils/AccessPermission";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const HEADER_HEIGHT = 140;
let backHandlerClickCount = 0;
// create a component
const Home = () => {
  const navigation = useNavigation();
  const [backHome, setBackHome] = useState(false);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { auth, notify, event, club, benefit } = useSelector((state) => state);

  const insets = useSafeAreaInsets();

  let dateNow = new Date();
  let year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  let day =
    dateNow.getDate() >= 10 ? dateNow.getDate() : `0${dateNow.getDate()}`;
  let dayofweek = dateNow.getDay();
  const dayNow = year + "-" + month + "-" + day;

  //eventing

  const eventing = event?.getEvents?.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() >
      new Date(dayNow).getTime()
  );

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 30],

    extrapolate: "clamp",
  });
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
      dispatch(getProfileAction(auth.token));
      dispatch(getNotify(auth.token));
      dispatch(getRankAction(auth.token, auth.profile.email));
      dispatch(getBenefitAction(auth.token, auth.profile.email));
    }
    async function it() {
      const goi = await dispatch(getRankAction(auth.token, auth.profile.email));
      dispatch({ type: AUTH.GOI, payload: goi });
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
      const arrayClub = res?.map((item) => item.ma_club);
      dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getPermissionAction(auth.token, auth.profile.email));
    dispatch(getEventsAction(auth.token));
    dispatch(getCustomerWlinAction(auth.token, auth.profile.email));
    dispatch(getBenefitAction(auth.token, auth.profile.email));
    async function it() {
      const goi = await dispatch(getRankAction(auth.token, auth.profile.email));
      dispatch({ type: AUTH.GOI, payload: goi });
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
      const arrayClub = res.map((item) => item.ma_club);
      dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
    }
    it();
    wait(1000).then(() => setRefreshing(false));
  }, [dispatch, auth.profile.email, auth.permission.group_id]);

  const handleDetail = (_id) => {
    dispatch(getDetailEventsAction(_id, auth.token));
    navigation.navigate("DetailEvents");
  };

  const images = eventing?.map((item) => item);

  const renderPage = (item, index) => {
    return (
      <TouchableOpacity
        key={item._id}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 5,
        }}
        onPress={() => handleDetail(item._id)}>
        <Image
          style={{
            width: "93%",
            height: 150,
            borderRadius: 10,
            opacity: 0.5,
            backgroundColor: "#474747",
          }}
          source={{
            uri: `${URL}`.concat(`${item.hinh_anh}`),
          }}
        />
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 150,
            flexDirection: "column",
            justifyContent: "space-between",
            paddingVertical: 5,
            alignItems: "flex-start",
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              width: "15%",
              marginLeft: 10,
              backgroundColor: "#FCFCFC",
              borderRadius: 8,
              padding: 5,
              opacity: 0.7,
            }}>
            <Text
              style={{
                color: "#503F8A",
                fontSize: 8,
                fontWeight: "600",
                textAlign: "center",
              }}>
              Tháng {formatDate(item.ngay_su_kien, "thang")}
            </Text>
            <View
              style={{
                padding: 5,
                backgroundColor: "#BEB0EF",
                borderRadius: 8,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 2,
              }}>
              <Text
                style={{ color: "#503F8A", fontSize: 12, fontWeight: "600" }}>
                {formatDate(item.ngay_su_kien, "ngay")}
              </Text>
              <Text
                style={{ color: "#503F8A", fontSize: 10, fontWeight: "600" }}>
                {formatDate(item.ngay_su_kien, "thu")}
              </Text>
            </View>
          </View>
          <Text style={styles.titleNews}>{item.ten_su_kien}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <HeaderPart backHome={backHome} setBackHome={setBackHome} />

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
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
            Trang Chủ
          </Text>
          <TouchableOpacity>
            <Ionicons name="alert-circle-outline" size={20} color="#9D85F2" />
          </TouchableOpacity>
        </View>
      ) : (
        <Animated.View
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
            borderRadius: 10,
            height: headerHeight,
          }}>
          <Animated.View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              marginTop: 10,
              zIndex: 4,
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
              Thông tin thành viên
            </Text>
            <TouchableOpacity>
              <Text
                style={{ fontSize: 12, fontWeight: "400", color: "#909090" }}>
                Xem chi tiết
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              paddingHorizontal: 20,
              // height: headerHeight,
              opacity: animatedValue.interpolate({
                inputRange: [0, 4, 8, 25],
                outputRange: [1, 0.5, 0.9, 0],
                extrapolate: "clamp",
              }),
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, -55],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}>
            <CardInfo />
          </Animated.View>
        </Animated.View>
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
        <Animated.View
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

              <Carousel
                autoplay
                autoplayTimeout={7000}
                loop
                index={0}
                pageSize={w}>
                {images?.map((image, index) => renderPage(image, index))}
              </Carousel>
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
              {benefit.loading ? (
                <Loading />
              ) : (
                benefit.getPayBenefit
                  .slice(0, 3)
                  .map((item, index) => <BenefitHome item={item} key={index} />)
              )}
            </View>
          )}
        </Animated.View>
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
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
    marginVertical: 1,
  },
  textContent: {
    fontSize: 12,
    fontWeight: "400",
    color: "#ffffff",
  },
  titleNews: {
    color: "#Ffffff",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
    paddingHorizontal: 15,
    flexWrap: "wrap",
  },
});

//make this component available to the app
export default Home;
