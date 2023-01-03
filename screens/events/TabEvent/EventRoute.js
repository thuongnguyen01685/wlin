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
const EventRoute = () => {
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

  const dayNow = year + "-" + month + "-" + day;
  const events = event?.getEvents?.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() ===
      new Date(dayNow).getTime()
  );
  const eventsPartner = event?.eventPartner?.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() ===
      new Date(dayNow).getTime()
  );
  const eventsRecommend = event.eventRecommend.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() ===
      new Date(dayNow).getTime()
  );

  const eventsSupport = event?.eventSupport?.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() ===
      new Date(dayNow).getTime()
  );
  useEffect(() => {
    circleAnimated();
    // async function it() {
    //   await setRefreshing(true);
    //   const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
    //   const arrayClub = res.map((item) => item.ma_club);
    //   dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
    //   await setRefreshing(false);
    // }
    // it();
  }, [auth.profile.email, auth.permission.group_id]);

  const onRefresh = React.useCallback(() => {
    circleAnimated();
    async function it() {
      await setRefreshing(true);
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
      const arrayClub = res.map((item) => item.ma_club);
      dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
      await setRefreshing(false);
    }
    it();
  }, [auth.profile.email, auth.permission.group_id]);

  const onChangeStatusLove = async (_id, trang_thai, _idDelete) => {
    await dispatch(
      ChangeStatusLoveAction(_id, trang_thai, auth.token, _idDelete)
    );
    const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
    const arrayClub = res.map((item) => item.ma_club);
    await dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
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
            marginBottom: "40%",
            marginTop: 10,
            height: h,
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
          ) : events?.length > 0 ? (
            events.map((item) => (
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
                {`Không có sự kiện tham gia nào \n đang diễn ra.`}
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
                Sự kiện tham gia của partner.
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
              ) : eventsPartner?.length > 0 ? (
                eventsPartner.map((item) => (
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
                    Không có sự kiện tham gia nào đang diễn ra.
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
                Sự kiện gợi ý.
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
              ) : eventsRecommend?.length > 0 ? (
                eventsRecommend.map((item) => (
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
                    Không có sự kiện gợi ý nào đang diễn ra.
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
                Hỗ trợ sự kiện.
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
              ) : eventsSupport?.length > 0 ? (
                eventsSupport.map((item) => (
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
                    {`Không có sự kiện cần hỗ trợ nào\nđang diễn ra.`}
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
    backgroundColor: "#ffffff",
  },
});

export default EventRoute;
