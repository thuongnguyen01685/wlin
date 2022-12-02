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

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const Nation = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setRefreshing(true);
    dispatch(getCLub(auth, 1, auth.permission.group_id));
    setRefreshing(false);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCLub(auth, 1, auth.permission.group_id));
    dispatch(getCustomerWlinAction(auth.token, auth.profile.email));
    wait(500).then(() => setRefreshing(false));
  }, []);

  const handleDetail = (_id) => {
    dispatch(getDetailClub(_id, auth.token));
    navigation.navigate("DetailClub");
  };

  const clubNation = club.getClubs
    .filter((item) => item.quoc_gia !== "")
    .map((i) => i);

  return (
    <View style={styles.container}>
      {auth.customer.goi_thanh_vien === "03" ||
      auth.customer.goi_thanh_vien === "04" ||
      auth.permission.group_id === Admin ? (
        <View style={{ marginTop: 10, paddingBottom: "70%", height: "100%" }}>
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
                                fontSize: 16,
                                fontWeight: "600",
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
                                    fontWeight: "600",
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
                                    fontWeight: "600",
                                    color: "#1D19D4",
                                  }}>
                                  20 sự kiện
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
                                    fontWeight: "600",
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
                                    fontWeight: "600",
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
            fontWeight: "500",
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

  useEffect(() => {
    setRefreshing(true);
    dispatch(getCLub(auth, 1, auth.permission.group_id));
    dispatch(getRankAction(auth.token, auth.profile.email));
    dispatch(getCustomerWlinAction(auth.token, auth.profile.email));

    setRefreshing(false);
  }, [auth.permission.group_id]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCustomerWlinAction(auth.token, auth.profile.email));
    dispatch(getCLub(auth, 1, auth.permission.group_id));
    wait(500).then(() => setRefreshing(false));
  }, [auth.permission.group_id]);

  const handleDetail = (_id) => {
    dispatch(getDetailClub(_id, auth.token));
    navigation.navigate("DetailClub");
  };
  const clubArea = club.getClubs
    .filter((item) => item.khu_vuc !== "")
    .map((i) => i);

  return (
    <View style={styles.container}>
      {auth.customer.goi_thanh_vien === "02" ||
      auth.customer.goi_thanh_vien === "03" ||
      auth.customer.goi_thanh_vien === "04" ||
      auth.permission.group_id === Admin ? (
        <View style={{ marginTop: 10, paddingBottom: "70%", height: "100%" }}>
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
                                fontSize: 16,
                                fontWeight: "600",
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
                                    fontWeight: "600",
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
                                    fontWeight: "600",
                                    color: "#1D19D4",
                                  }}>
                                  20 sự kiện
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
                                    fontWeight: "600",
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
                                    fontWeight: "600",
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
            fontWeight: "500",
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

  useEffect(() => {
    setRefreshing(true);
    // console.log(auth.token, page);
    dispatch(getCLub(auth, page, auth.permission.group_id));

    setRefreshing(false);
  }, [page]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCLub(auth, page, auth.permission.group_id));
    wait(500).then(() => setRefreshing(false));
  }, [page]);

  const handleDetail = (_id) => {
    dispatch(getDetailClub(_id, auth.token));
    navigation.navigate("DetailClub");
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10, paddingBottom: "70%", height: "100%" }}>
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
                              fontSize: 16,
                              fontWeight: "600",
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
                                  fontWeight: "600",
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
                                  fontWeight: "600",
                                  color: "#1D19D4",
                                }}>
                                20 sự kiện
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
                                  fontWeight: "600",
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
                              <Ionicons name="leaf" color="#058602" size={20} />
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: "600",
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
  const [page, setPage] = useState(1);

  // const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setRefreshing(true);
    // console.log(auth.token, page);
    dispatch(getCLub(auth, page, auth.permission.group_id));
    dispatch(getRankAction(auth.token, auth.profile.email));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [dispatch, page]);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   dispatch(getCLub(auth.token, page));
  //   wait(2000).then(() => setRefreshing(false));
  // }, [dispatch, page]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart />
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
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
            Danh sách CLUB
          </Text>

          {refreshing && (
            <View
              style={{
                left: 10,
                padding: 30,
                position: "absolute",
                left: "100%",
              }}>
              {/* <Lottie
                source={require("../../assets/loading.json")}
                autoPlay
                loop
              /> */}
            </View>
          )}
        </View>

        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
        </TouchableOpacity>
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
                    fontSize: 12,
                    fontWeight: "600",
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
  surface: {
    height: height * 0.12,
    marginTop: 10,
    paddingHorizontal: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 0.5,
    borderColor: "#DADADA",
    paddingTop: 10,
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
});

//make this component available to the app
export default Club;
