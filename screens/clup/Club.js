//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Lottie from "lottie-react-native";
import React, { Component, useEffect, useRef, useState } from "react";
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
  Animated,
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Avatar, Surface } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { getCLub, getDetailClub } from "../../redux/actions/ClupAction";
import { URL } from "../../utils/fetchApi";
import {
  AUTH,
  getCustomerWlinAction,
  getRankAction,
} from "../../redux/actions/authAction";
import { Admin } from "../../utils/AccessPermission";
import Loading from "../../components/loading/Loading";
import ReactNativeAnimatedSearchbox from "../../components/ReactNativeAnimatedSearchbox";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const Nation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

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
  const translateX3 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 90],
  });

  useEffect(() => {
    setRefreshing(true);
    circleAnimated();
    dispatch(getCLub(auth, 1, auth.permission.group_id));
    setRefreshing(false);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    circleAnimated();
    dispatch(getCLub(auth, 1, auth.permission.group_id));
    setRefreshing(false);
  }, []);

  const handleDetail = (_id) => {
    dispatch(getDetailClub(_id, auth.token));
    navigation.navigate("DetailClub", { _id });
  };

  const clubNation = club.getClubs
    .filter((item) => item.quoc_gia !== "")
    .map((i) => i);

  return (
    <View style={styles.container}>
      {refreshing ? (
        Array(10)
          .fill("")
          .map((i, index) => (
            <View style={[{ marginBottom: 8 }, styles.card]} key={index}>
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
                    width: w * 0.23,
                    height: w * 0.2,
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
                  style={{ backgroundColor: "#ECEFF1", height: 30 }}>
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
                    justifyContent: "space-between",
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
                  <View
                    style={{
                      width: w * 0.2,
                      height: w * 0.055,
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
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 3,
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
                  <View
                    style={{
                      width: w * 0.2,
                      height: w * 0.055,
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
      ) : auth?.customer?.goi_thanh_vien === "03" ||
        auth?.customer?.goi_thanh_vien === "04" ||
        auth.permission.group_id === Admin ? (
        <View style={{ marginTop: 10, paddingBottom: "82%", height: "100%" }}>
          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#9796F0", "green", "blue"]}
              />
            }
            data={clubNation}
            onEndReachedThreshold={0.5}
            // onEndReached={() => setPage(page + 1)}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1,
                0,
                (height * 0.1 + 15) * index,
                (height * 0.1 + 15) * (index + 3),
              ];
              const scale = 1;
              const opacity = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const Offset = scrollY.interpolate({
                inputRange,
                outputRange: [0, 0, 0, 500],
              });
              return (
                <Animated.View
                  style={{
                    transform: [{ scale: scale }, { translateX: Offset }],
                    opacity: opacity,
                  }}>
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => handleDetail(item._id)}>
                    <Surface style={styles.surface}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          flex: 0.9,
                          top: -10,
                        }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}>
                          <View
                            style={{
                              borderRadius: 8,
                              borderWidth: 0.4,
                              borderColor: "#DADADA",
                              paddingHorizontal: 5,
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}>
                            {item.hinh_anh ? (
                              <Image
                                source={{
                                  uri: `${URL}/`.concat(`${item.hinh_anh}`),
                                }}
                                style={styles.imgLogo}
                              />
                            ) : (
                              <Image
                                source={require("../../assets/logo.png")}
                                style={styles.imgLogo}
                              />
                            )}
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              marginLeft: 20,
                            }}>
                            <Text
                              style={{
                                color: "#474747",
                                fontSize: 15,
                                fontFamily: "LexendDeca_600SemiBold",
                              }}>
                              {item.ten_club}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                width: "70%",
                              }}>
                              <View
                                style={{
                                  backgroundColor: "#EDF8FC",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="people"
                                  color="#139ECA"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#139ECA",
                                  }}>
                                  {item.ds_thanh_vien.length} thành viên
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#ECECF9",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="calendar"
                                  color="#1D19D4"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#1D19D4",
                                  }}>
                                  {item.count_sukien} sự kiện
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#FAEEF0",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="reader"
                                  color="#F12247"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#F12247",
                                  }}>
                                  20 referrals
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#EEFBEE",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="leaf"
                                  color="#058602"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#058602",
                                  }}>
                                  20 TYFCBs
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleDetail(item._id)}
                        style={{ top: -10 }}>
                        <Ionicons
                          name="chevron-forward-outline"
                          size={25}
                          color="#9D85F2"
                        />
                      </TouchableOpacity>
                    </Surface>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
        </View>
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 15,
            fontFamily: "LexendDeca_500Medium",
          }}>
          Bạn không có quyền xem tab này.
        </Text>
      )}
    </View>
  );
};

const Area = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(1);

  const scrollY = useRef(new Animated.Value(0)).current;

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
  const translateX3 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 90],
  });

  useEffect(() => {
    setRefreshing(true);
    circleAnimated();
    setRefreshing(false);
  }, [auth.permission.group_id]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    circleAnimated();
    dispatch(getCLub(auth, 1, auth.permission.group_id));
    setRefreshing(false);
  }, [auth.permission.group_id]);

  const handleDetail = (_id) => {
    dispatch(getDetailClub(_id, auth.token));
    navigation.navigate("DetailClub", { _id });
  };
  const clubArea = club.getClubs
    .filter((item) => item.khu_vuc !== "")
    .map((i) => i);

  return (
    <View style={styles.container}>
      {refreshing ? (
        Array(10)
          .fill("")
          .map((i, index) => (
            <View style={[{ marginBottom: 8 }, styles.card]} key={index}>
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
                    width: w * 0.23,
                    height: w * 0.2,
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
                  style={{ backgroundColor: "#ECEFF1", height: 30 }}>
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
                    justifyContent: "space-between",
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
                  <View
                    style={{
                      width: w * 0.2,
                      height: w * 0.055,
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
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 3,
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
                  <View
                    style={{
                      width: w * 0.2,
                      height: w * 0.055,
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
      ) : auth?.customer?.goi_thanh_vien === "02" ||
        auth?.customer?.goi_thanh_vien === "03" ||
        auth?.customer?.goi_thanh_vien === "04" ||
        auth.permission.group_id === Admin ? (
        <View style={{ marginTop: 10, paddingBottom: "82%", height: "100%" }}>
          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#9796F0", "green", "blue"]}
              />
            }
            data={clubArea}
            onEndReachedThreshold={0.5}
            // onEndReached={() => setPage(page + 1)}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1,
                0,
                (height * 0.1 + 15) * index,
                (height * 0.1 + 15) * (index + 3),
              ];
              const scale = 1;
              const opacity = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const Offset = scrollY.interpolate({
                inputRange,
                outputRange: [0, 0, 0, 500],
              });
              return (
                <Animated.View
                  style={{
                    transform: [{ scale: scale }, { translateX: Offset }],
                    opacity: opacity,
                  }}>
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => handleDetail(item._id)}>
                    <Surface style={styles.surface}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          flex: 0.9,
                          top: -10,
                        }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}>
                          <View
                            style={{
                              borderRadius: 8,
                              borderWidth: 0.4,
                              borderColor: "#DADADA",
                              paddingHorizontal: 5,
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}>
                            {item.hinh_anh ? (
                              <Image
                                source={{
                                  uri: `${URL}/`.concat(`${item.hinh_anh}`),
                                }}
                                style={styles.imgLogo}
                              />
                            ) : (
                              <Image
                                source={require("../../assets/logo.png")}
                                style={styles.imgLogo}
                              />
                            )}
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              marginLeft: 20,
                            }}>
                            <Text
                              style={{
                                color: "#474747",
                                fontSize: 15,
                                fontFamily: "LexendDeca_600SemiBold",
                              }}>
                              {item.ten_club}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                width: "70%",
                              }}>
                              <View
                                style={{
                                  backgroundColor: "#EDF8FC",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="people"
                                  color="#139ECA"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#139ECA",
                                  }}>
                                  {item.ds_thanh_vien.length} thành viên
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#ECECF9",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="calendar"
                                  color="#1D19D4"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#1D19D4",
                                  }}>
                                  {item.count_sukien} sự kiện
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#FAEEF0",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="reader"
                                  color="#F12247"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#F12247",
                                  }}>
                                  20 referrals
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#EEFBEE",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="leaf"
                                  color="#058602"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#058602",
                                  }}>
                                  20 TYFCBs
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleDetail(item._id)}
                        style={{ top: -10 }}>
                        <Ionicons
                          name="chevron-forward-outline"
                          size={25}
                          color="#9D85F2"
                        />
                      </TouchableOpacity>
                    </Surface>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
        </View>
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 15,
            fontFamily: "LexendDeca_500Medium",
          }}>
          Bạn không có quyền xem tab này.
        </Text>
      )}
    </View>
  );
};

const Region = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(1);

  const scrollY = useRef(new Animated.Value(0)).current;
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
  const translateX3 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 90],
  });

  useEffect(() => {
    setRefreshing(true);
    circleAnimated();
    dispatch(getCLub(auth, page, auth.permission.group_id));
    setRefreshing(false);
  }, [page]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    circleAnimated();
    dispatch(getCLub(auth, page, auth.permission.group_id));
    setRefreshing(false);
  }, [page]);

  const handleDetail = (_id) => {
    dispatch(getDetailClub(_id, auth.token));
    navigation.navigate("DetailClub", { _id });
  };

  return (
    <View style={styles.container}>
      {refreshing ? (
        Array(10)
          .fill("")
          .map((i, index) => (
            <View style={[{ marginBottom: 8 }, styles.card]} key={index}>
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
                    width: w * 0.23,
                    height: w * 0.2,
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
                  style={{ backgroundColor: "#ECEFF1", height: 30 }}>
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
                    justifyContent: "space-between",
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
                  <View
                    style={{
                      width: w * 0.2,
                      height: w * 0.055,
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
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 3,
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
                  <View
                    style={{
                      width: w * 0.2,
                      height: w * 0.055,
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
      ) : (
        <View style={{ marginTop: 10, paddingBottom: "82%", height: "100%" }}>
          <Animated.FlatList
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#9796F0", "green", "blue"]}
              />
            }
            data={club.getClubs}
            onEndReachedThreshold={0.5}
            // onEndReached={() => setPage(page + 1)}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              const inputRange = [
                -1,
                0,
                (height * 0.1 + 15) * index,
                (height * 0.1 + 15) * (index + 3),
              ];
              const scale = 1;
              const opacity = scrollY.interpolate({
                inputRange,
                outputRange: [1, 1, 1, 0],
              });
              const Offset = scrollY.interpolate({
                inputRange,
                outputRange: [0, 0, 0, 500],
              });
              return (
                <Animated.View
                  style={{
                    transform: [{ scale: scale }, { translateX: Offset }],
                    opacity: opacity,
                  }}>
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => handleDetail(item._id)}>
                    <Surface style={styles.surface}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          flex: 0.9,
                          top: -10,
                        }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}>
                          <View
                            style={{
                              borderRadius: 8,
                              borderWidth: 0.4,
                              borderColor: "#DADADA",
                              paddingHorizontal: 5,
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}>
                            {item.hinh_anh ? (
                              <Image
                                source={{
                                  uri: `${URL}/`.concat(`${item.hinh_anh}`),
                                }}
                                style={styles.imgLogo}
                              />
                            ) : (
                              <Image
                                source={require("../../assets/logo.png")}
                                style={styles.imgLogo}
                              />
                            )}
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              marginLeft: 20,
                            }}>
                            <Text
                              style={{
                                color: "#474747",
                                fontSize: 15,
                                fontFamily: "LexendDeca_600SemiBold",
                              }}>
                              {item.ten_club}
                            </Text>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                flexWrap: "wrap",
                                width: "70%",
                              }}>
                              <View
                                style={{
                                  backgroundColor: "#EDF8FC",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="people"
                                  color="#139ECA"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#139ECA",
                                  }}>
                                  {item.ds_thanh_vien.length} thành viên
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#ECECF9",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="calendar"
                                  color="#1D19D4"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#1D19D4",
                                  }}>
                                  {item.count_sukien} sự kiện
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#FAEEF0",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="reader"
                                  color="#F12247"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#F12247",
                                  }}>
                                  20 referrals
                                </Text>
                              </View>
                              <View
                                style={{
                                  backgroundColor: "#EEFBEE",
                                  flexDirection: "row",
                                  paddingHorizontal: 2,
                                  borderRadius: 10,
                                  alignItems: "center",
                                  marginTop: 5,
                                }}>
                                <Ionicons
                                  name="leaf"
                                  color="#058602"
                                  size={20}
                                />
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontFamily: "LexendDeca_300Light",
                                    color: "#058602",
                                  }}>
                                  20 TYFCBs
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity
                        onPress={() => handleDetail(item._id)}
                        style={{ top: -10 }}>
                        <Ionicons
                          name="chevron-forward-outline"
                          size={25}
                          color="#9D85F2"
                        />
                      </TouchableOpacity>
                    </Surface>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const renderScene = SceneMap({
  first: Nation,
  second: Area,
  third: Region,
});
// create a component

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const { height } = Dimensions.get("screen");
const Club = () => {
  const navigation = useNavigation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Quốc gia" },
    { key: "second", title: "Khu vực" },
    { key: "third", title: "Vùng" },
  ]);

  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);

  //search
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.ten_club
          ? item.ten_club.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  //search animated
  const [searchIconColor, setSearchIconColor] = useState("#909090");
  const refSearchBox = useRef();

  useEffect(() => {
    setRefreshing(true);
    setFilteredDataSource(club.getClubs);
    setMasterDataSource(club.getClubs);
    setRefreshing(false);
  }, []);

  const handleDetailClub = (_id) => {
    dispatch(getDetailClub(_id, auth.token));
    navigation.navigate("DetailClub", { _id });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart />
      <View style={styles.search}>
        <ReactNativeAnimatedSearchbox
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          placeholder={"Tìm kiếm..."}
          ref={refSearchBox}
          searchIconColor={searchIconColor}
          onClosed={() => {
            setSearch("");
            setSearchIconColor("#555");
          }}
          onOpening={() => {
            setSearchIconColor("#555");
          }}
        />
      </View>
      {search !== "" && (
        <View style={styles.resultSearch}>
          <View
            style={{
              borderBottomWidth: 0.3,
              borderColor: "#826CCF",
              width: w * 0.3,
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                color: "#826CCF",
                fontFamily: "LexendDeca_300Light",
              }}>
              Kết quả tìm kiếm.
            </Text>
          </View>
          <ScrollView>
            {filteredDataSource.length > 0 ? (
              filteredDataSource.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={{
                    paddingVertical: 5,
                    borderBottomWidth: 0.5,
                    flexDirection: "row",
                    alignItems: "center",
                    width: w * 0.65,
                  }}
                  onPress={() => handleDetailClub(item._id)}>
                  <Image
                    source={{ uri: `${URL}${item.hinh_anh}` }}
                    style={{
                      width: w * 0.1,
                      height: w * 0.1,
                      resizeMode: "contain",
                      borderRadius: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#474747",
                      marginLeft: 10,
                      fontFamily: "LexendDeca_500Medium",
                    }}>
                    {item.ten_club}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: h * 0.2,
                }}>
                <Image
                  source={require("../../assets/search.png")}
                  style={{ width: w * 0.2, height: w * 0.2, right: 5 }}
                />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#474747",
                    fontFamily: "LexendDeca_400Regular",
                  }}>
                  Chưa tìm thấy kết quả
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}

      <View style={styles.titlePart}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text style={styles.headerTitle}>Danh sách CLUB</Text>
          {refreshing && <Loading size="large" />}
        </View>
      </View>
      <View
        style={{
          height: "100%",
          paddingHorizontal: 15,
        }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              renderLabel={({ route, focused }) => (
                <Text
                  style={{
                    color: focused ? "#826CCF" : "#dadada",
                    fontSize: 13,
                    fontFamily: "LexendDeca_600SemiBold",
                  }}>
                  {route.title}
                </Text>
              )}
              indicatorStyle={styles.indicatorStyle}
              style={{ backgroundColor: "#ffffff" }}
            />
          )}
        />
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
  titlePart: {
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
  },
  headerTitle: {
    fontSize: 16,
    color: "#826CCF",
    fontFamily: "LexendDeca_600SemiBold",
  },
  surface: {
    height: height * 0.12,
    marginTop: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderColor: "#DADADA",
    paddingTop: 20,
    paddingHorizontal: 5,
  },
  indicatorStyle: {
    backgroundColor: "#826CCF",
    padding: 1.5,
    marginBottom: -2,
  },
  imgLogo: {
    resizeMode: "contain",
    width: w * 0.2,
    height: w * 0.2,
  },
  card: {
    padding: 14,
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
    marginHorizontal: 10,
  },
  search: {
    zIndex: 1,
    position: "absolute",
    marginTop: "23%",
    width: "95%",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignContent: "center",
    paddingLeft: 15,
  },
  input: {
    height: 40,
    width: "79%",
    marginLeft: 10,
    color: "#ffffff",
  },
  resultSearch: {
    zIndex: 5,
    position: "absolute",
    marginTop: "35%",
    width: "90%",
    marginHorizontal: 20,
    backgroundColor: "#E6E1F8",
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor: "#f8f8f8",
    paddingHorizontal: 15,
    paddingBottom: 10,
    height: height * 0.5,
  },
});

//make this component available to the app
export default Club;
