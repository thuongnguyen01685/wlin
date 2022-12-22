//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
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
import { formatDateDisplay, formatDateDisplays } from "../../../utils/datetime";
import { URL } from "../../../utils/fetchApi";
import Svg, { Path } from "react-native-svg";
import ItemEvent from "./ItemEvent";
import { Admin } from "../../../utils/AccessPermission";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// create a component
const EventingRoute = () => {
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
  let month = dateNow.getMonth() + 1;
  let day =
    dateNow.getDate() >= 10 ? dateNow.getDate() : `0${dateNow.getDate()}`;
  let dayofweek = dateNow.getDay();

  const dayNow = year + "-" + month + "-" + day;

  const dayname = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const eventing = event?.getEvents?.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() >
      new Date(dayNow).getTime()
  );
  const eventingRecommend = event.eventRecommend.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() >
      new Date(dayNow).getTime()
  );

  useEffect(() => {
    setRefreshing(true);
    circleAnimated();
    setRefreshing(false);
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
                <View style={[{ marginBottom: 5 }, styles.card]} key={index}>
                  <View
                    style={{
                      flexDirection: "column",
                      width: w * 0.24,
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 10,
                      height: w * 0.2,
                    }}>
                    <View
                      style={{
                        width: w * 0.2,
                        height: w * 0.18,
                        borderRadius: 10,
                        backgroundColor: "#ECEFF1",
                        overflow: "hidden",
                        marginRight: 16,
                      }}>
                      <Animated.View
                        style={{
                          width: "30%",
                          opacity: 0.5,
                          height: "100%",
                          backgroundColor: "white",
                          transform: [{ translateX: translateX }],
                        }}></Animated.View>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "space-evenly",
                      overflow: "hidden",
                    }}>
                    <Animated.View
                      style={{ backgroundColor: "#ECEFF1", height: 25 }}>
                      <Animated.View
                        style={{
                          width: "20%",
                          height: "100%",
                          backgroundColor: "white",
                          opacity: 0.5,
                          transform: [{ translateX: translateX2 }],
                        }}></Animated.View>
                    </Animated.View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: w * 0.45,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: 5,
                      }}>
                      <View
                        style={{
                          width: w * 0.19,
                          height: w * 0.05,
                          borderRadius: 5,
                          backgroundColor: "#ECEFF1",
                          overflow: "hidden",
                        }}>
                        <Animated.View
                          style={{
                            width: "30%",
                            opacity: 0.5,
                            height: "100%",
                            backgroundColor: "white",
                            transform: [{ translateX: translateX }],
                          }}></Animated.View>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: w * 0.45,
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: 3,
                      }}>
                      <View
                        style={{
                          width: w * 0.4,
                          height: w * 0.05,
                          borderRadius: 5,
                          backgroundColor: "#ECEFF1",
                          overflow: "hidden",
                        }}>
                        <Animated.View
                          style={{
                            width: "30%",
                            opacity: 0.5,
                            height: "100%",
                            backgroundColor: "white",
                            transform: [{ translateX: translateX }],
                          }}></Animated.View>
                      </View>
                    </View>
                  </View>
                </View>
              ))
          ) : eventing?.length > 0 ? (
            eventing.map((item) => (
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
                {`Không có sự kiện tham gia nào \n sắp diễn ra.`}
              </Text>
            </View>
          )}
          {auth.permission.group_id !== Admin && (
            <View>
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
                    <View
                      style={[{ marginBottom: 5 }, styles.card]}
                      key={index}>
                      <View
                        style={{
                          flexDirection: "column",
                          width: w * 0.24,
                          justifyContent: "center",
                          alignItems: "center",
                          marginHorizontal: 10,
                          height: w * 0.2,
                        }}>
                        <View
                          style={{
                            width: w * 0.2,
                            height: w * 0.18,
                            borderRadius: 10,
                            backgroundColor: "#ECEFF1",
                            overflow: "hidden",
                            marginRight: 16,
                          }}>
                          <Animated.View
                            style={{
                              width: "30%",
                              opacity: 0.5,
                              height: "100%",
                              backgroundColor: "white",
                              transform: [{ translateX: translateX }],
                            }}></Animated.View>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "space-evenly",
                          overflow: "hidden",
                        }}>
                        <Animated.View
                          style={{ backgroundColor: "#ECEFF1", height: 25 }}>
                          <Animated.View
                            style={{
                              width: "20%",
                              height: "100%",
                              backgroundColor: "white",
                              opacity: 0.5,
                              transform: [{ translateX: translateX2 }],
                            }}></Animated.View>
                        </Animated.View>
                        <View
                          style={{
                            flexDirection: "row",
                            width: w * 0.45,
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginTop: 5,
                          }}>
                          <View
                            style={{
                              width: w * 0.19,
                              height: w * 0.05,
                              borderRadius: 5,
                              backgroundColor: "#ECEFF1",
                              overflow: "hidden",
                            }}>
                            <Animated.View
                              style={{
                                width: "30%",
                                opacity: 0.5,
                                height: "100%",
                                backgroundColor: "white",
                                transform: [{ translateX: translateX }],
                              }}></Animated.View>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            width: w * 0.45,
                            justifyContent: "flex-start",
                            alignItems: "center",
                            marginTop: 3,
                          }}>
                          <View
                            style={{
                              width: w * 0.4,
                              height: w * 0.05,
                              borderRadius: 5,
                              backgroundColor: "#ECEFF1",
                              overflow: "hidden",
                            }}>
                            <Animated.View
                              style={{
                                width: "30%",
                                opacity: 0.5,
                                height: "100%",
                                backgroundColor: "white",
                                transform: [{ translateX: translateX }],
                              }}></Animated.View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))
              ) : eventingRecommend?.length > 0 ? (
                eventingRecommend.map((item) => (
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
                    Không có sự kiện gợi ý nào sắp diễn ra.
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
  },
  card: {
    shadowColor: "black",
    backgroundColor: "#FAFAFA",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
});

//make this component available to the app
export default EventingRoute;
