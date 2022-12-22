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
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
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
import { useRef } from "react";
import { Admin, Partner } from "../../../utils/AccessPermission";

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
  const [loadingFa, setLoadingFa] = useState(false);

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
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() >
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
                {`Không có sự kiện tham gia nào \n đã diễn ra.`}
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
                    Không có sự kiện tham gia nào đã diễn ra.
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
                    Không có sự kiện gợi ý nào đã diễn ra.
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
export default EventedRoute;
