//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Dimensions,
  Animated,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCLub } from "../../../redux/actions/ClupAction";
import {
  ChangeStatusLoveAction,
  getDetailEventsAction,
  getEventsAction,
} from "../../../redux/actions/eventsAction";
import { formatDateDisplays } from "../../../utils/datetime";
import ItemEvent from "./ItemEvent";
import { useRef } from "react";
import { Admin, Partner } from "../../../utils/AccessPermission";
import SkeletonEvent from "../../../components/loading/skeleton/SkeletonEvent";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// create a component
const EventedRoute = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { auth, event } = useSelector((state) => state);

  //skeleton
  const circleAnimatedValue = useRef(new Animated.Value(0)).current;
  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated();
      }, 1000);
    });
  };

  const translateX = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 100],
  });

  const translateX2 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 200],
  });

  const handleDetail = (_id) => {
    dispatch(getDetailEventsAction(_id, auth.token));
    navigation.navigate("DetailEvents", { _id: _id });
  };

  let dateNow = new Date();
  let year = dateNow.getFullYear();
  let month =
    dateNow.getMonth() + 1 >= 10
      ? dateNow.getMonth() + 1
      : `0${dateNow.getMonth() + 1}`;

  let day =
    dateNow.getDate() >= 10 ? dateNow.getDate() : `0${dateNow.getDate()}`;
  let dayofweek = dateNow.getDay();

  const dayNow = year + "-" + month + "-" + day;

  const evented = event?.getEvents?.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() <
      new Date(dayNow).getTime()
  );
  const eventedPartner = event?.eventPartner?.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() <
      new Date(dayNow).getTime()
  );

  const eventedRecommend = event?.eventRecommend?.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() <
      new Date(dayNow).getTime()
  );

  const eventedSupport = event?.eventSupport?.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() <
      new Date(dayNow).getTime()
  );
  useEffect(() => {
    setRefreshing(true);
    circleAnimated();
    wait(100).then(() => setRefreshing(false));
  }, [dispatch, auth.profile.email, auth.permission.group_id]);

  const onRefresh = React.useCallback(() => {
    circleAnimated();
    // async function it() {
    //   await setRefreshing(true);
    //   const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
    //   const arrayClub = res.map((item) => item.ma_club);
    //   await dispatch(
    //     getEventsAction(auth, arrayClub, auth.permission.group_id)
    //   );
    //   await setRefreshing(false);
    // }
    // it();
  }, []);

  const onChangeStatusLove = async (_id, trang_thai, _idDelete) => {
    await dispatch(
      ChangeStatusLoveAction(_id, trang_thai, auth.token, _idDelete)
    );
    const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
    const arrayClub = res.map((item) => item.ma_club);
    dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9796F0", "green", "blue"]}
          />
        }>
        <View
          style={{
            marginTop: 10,
            height: "100%",
            marginBottom: "75%",
          }}>
          {refreshing ? (
            Array(10)
              .fill("")
              .map((i, index) => (
                <SkeletonEvent
                  translateX={translateX}
                  translateX2={translateX2}
                  index={index}
                  key={index}
                />
              ))
          ) : evented?.length > 0 ? (
            evented.map((item) => (
              <ItemEvent
                onChangeStatusLove={onChangeStatusLove}
                key={item._id}
                item={item}
                handleDetail={handleDetail}
                noLove={false}
              />
            ))
          ) : (
            <View
              style={{
                paddingVertical: 15,
                height: 200,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: "#474747",
                  fontFamily: "LexendDeca_600SemiBold",
                  textAlign: "center",
                }}>
                {`Kh??ng c?? s??? ki???n tham gia n??o \n ???? di???n ra.`}
              </Text>
            </View>
          )}
          {auth.permission.group_id === Partner && (
            <View>
              <Text
                style={{
                  fontFamily: "LexendDeca_600SemiBold",
                  marginBottom: 5,
                  fontSize: 16,
                  marginLeft: 10,
                  color: "#826CCF",
                }}>
                S??? ki???n tham gia c???a partner.
              </Text>
              {refreshing ? (
                Array(10)
                  .fill("")
                  .map((i, index) => (
                    <SkeletonEvent
                      translateX={translateX}
                      translateX2={translateX2}
                      index={index}
                      key={index}
                    />
                  ))
              ) : eventedPartner?.length > 0 ? (
                eventedPartner.map((item) => (
                  <ItemEvent
                    onChangeStatusLove={onChangeStatusLove}
                    key={item._id}
                    item={item}
                    handleDetail={handleDetail}
                    noLove={false}
                  />
                ))
              ) : (
                <View
                  style={{
                    paddingVertical: 15,
                    height: 200,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#474747",
                      fontFamily: "LexendDeca_600SemiBold",
                    }}>
                    Kh??ng c?? s??? ki???n tham gia n??o ???? di???n ra.
                  </Text>
                </View>
              )}
            </View>
          )}
          {auth.permission.group_id !== Admin && (
            <>
              <Text
                style={{
                  fontFamily: "LexendDeca_600SemiBold",
                  marginBottom: 5,
                  fontSize: 16,
                  marginLeft: 10,
                  color: "#826CCF",
                }}>
                S??? ki???n g???i ??.
              </Text>
              {refreshing ? (
                Array(10)
                  .fill("")
                  .map((i, index) => (
                    <SkeletonEvent
                      translateX={translateX}
                      translateX2={translateX2}
                      index={index}
                      key={index}
                    />
                  ))
              ) : eventedRecommend?.length > 0 ? (
                eventedRecommend.map((item) => (
                  <ItemEvent
                    onChangeStatusLove={onChangeStatusLove}
                    key={item._id}
                    item={item}
                    handleDetail={handleDetail}
                    noLove={true}
                  />
                ))
              ) : (
                <View
                  style={{
                    paddingVertical: 15,
                    height: 200,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#474747",
                      fontFamily: "LexendDeca_600SemiBold",
                    }}>
                    Kh??ng c?? s??? ki???n g???i ?? n??o ???? di???n ra.
                  </Text>
                </View>
              )}
            </>
          )}

          {auth.permission.group_id === Admin && (
            <>
              <Text
                style={{
                  fontFamily: "LexendDeca_600SemiBold",
                  marginBottom: 5,
                  fontSize: 16,
                  marginLeft: 10,
                  color: "#826CCF",
                }}>
                H??? tr??? s??? ki???n.
              </Text>
              {refreshing ? (
                Array(10)
                  .fill("")
                  .map((i, index) => (
                    <SkeletonEvent
                      translateX={translateX}
                      translateX2={translateX2}
                      index={index}
                      key={index}
                    />
                  ))
              ) : eventedSupport?.length > 0 ? (
                eventedSupport.map((item) => (
                  <ItemEvent
                    onChangeStatusLove={onChangeStatusLove}
                    key={item._id}
                    item={item}
                    handleDetail={handleDetail}
                    noLove={false}
                  />
                ))
              ) : (
                <View
                  style={{
                    paddingVertical: 15,
                    height: 200,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#474747",
                      fontFamily: "LexendDeca_600SemiBold",
                      textAlign: "center",
                    }}>
                    {`Kh??ng c?? s??? ki???n c???n h??? tr??? n??o\n???? di???n ra.`}
                  </Text>
                </View>
              )}
            </>
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
  },
});

//make this component available to the app
export default EventedRoute;
