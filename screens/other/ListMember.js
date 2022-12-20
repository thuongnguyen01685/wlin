//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import React, { Component, useRef, useState, useEffect } from "react";
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
  RefreshControl,
  Animated,
  FlatList,
} from "react-native";

import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { URL } from "../../utils/fetchApi";
import {
  getCLub,
  getDetailMember,
  getMemberAction,
} from "../../redux/actions/ClupAction";
import Loading from "../../components/loading/Loading";

import Lottie from "lottie-react-native";
import ReactNativeAnimatedSearchbox from "../../components/ReactNativeAnimatedSearchbox";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
});
const dataColor = [
  {
    _id: 1,
    bgColor: "#F1F1F1",
    color: "#434343",
  },
  {
    _id: 2,
    bgColor: "#EEF4FF",
    color: "#769CEC",
  },
  {
    _id: 3,
    bgColor: "#E9FBEF",
    color: "#5BD3A1",
  },
  {
    _id: 4,
    bgColor: "#FEEAEA",
    color: "#F96F6D",
  },
  {
    _id: 5,
    bgColor: "#FEF8E3",
    color: "#FBD237",
  },
];
// create a component
const ListMember = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const { auth, club } = useSelector((state) => state);

  //pagination
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  //search
  const [search, setSearch] = useState("");

  //search animated
  const [searchIconColor, setSearchIconColor] = useState("#909090");
  const refSearchBox = useRef();

  const circleAnimatedValue = useRef(new Animated.Value(0)).current;

  let temp = -1;

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

  const onLoadMore = async () => {
    setPage((page) => page + 1);
    setViewMore(true);
    const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
    const arrMember = res
      ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
      .filter((item, index, arr) => {
        const itemIndex = arr.findIndex((it) => it === item);
        return itemIndex === index;
      });
    const reListMe = await dispatch(
      getMemberAction(auth.token, arrMember, page + 1, search)
    );

    setData([...data, ...reListMe]);
    setViewMore(false);
  };

  const onRefresh = React.useCallback(() => {
    circleAnimated();
    async function it() {
      await setRefreshing(true);
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
      const arrMember = res
        ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
        .filter((item, index, arr) => {
          const itemIndex = arr.findIndex((it) => it === item);
          return itemIndex === index;
        });
      const reListMe = await dispatch(
        getMemberAction(auth.token, arrMember, page, "")
      );
      setData([...data, ...reListMe]);
      await setRefreshing(false);
    }
    it();
  }, [dispatch]);

  useEffect(() => {
    circleAnimated();
    async function it() {
      await setRefreshing(true);
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
      const arrMember = res
        ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
        .filter((item, index, arr) => {
          const itemIndex = arr.findIndex((it) => it === item);
          return itemIndex === index;
        });
      const reListMe = await dispatch(
        getMemberAction(auth.token, arrMember, page, search)
      );
      setData([...data, ...reListMe]);
      await setRefreshing(false);
    }
    it();
  }, [dispatch, search]);

  const handleDetailMember = (ma_kh) => {
    dispatch(getDetailMember(ma_kh, auth.token));
    navigation.navigate("ManagementMember");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart />
      <View style={styles.search}>
        <ReactNativeAnimatedSearchbox
          onChangeText={(text) => {
            setSearch(text);
            setData([]);
            setPage(1);
          }}
          value={search}
          placeholder={"Tìm kiếm..."}
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
              fontSize: 16,
              color: "#826CCF",
              fontFamily: "LexendDeca_600SemiBold",
            }}>
            Danh sách hội viên
          </Text>
          {(refreshing || viewMore) && <Loading size="large" />}
        </View>
      </View>
      <View style={{ height: "100%" }}>
        {refreshing ? (
          Array(10)
            .fill("")
            .map((i, index) => (
              <View
                style={[
                  {
                    marginBottom: 8,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  styles.card,
                ]}
                key={index}>
                <View
                  style={{
                    width: w * 0.12,
                    height: w * 0.12,
                    borderRadius: 60,
                    backgroundColor: "#ECEFF1",
                    overflow: "hidden",
                    marginLeft: 20,
                    marginRight: 25,
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
                    flex: 1,
                    justifyContent: "space-evenly",
                    overflow: "hidden",
                    borderRadius: 20,
                  }}>
                  <Animated.View
                    style={{
                      backgroundColor: "#ECEFF1",
                      height: 28,
                    }}>
                    <Animated.View
                      style={{
                        width: "20%",
                        height: "100%",
                        backgroundColor: "white",
                        opacity: 0.5,
                        transform: [{ translateX: translateX2 }],
                      }}></Animated.View>
                  </Animated.View>
                  <View style={{ backgroundColor: "#ECEFF1", height: 28 }}>
                    <Animated.View
                      style={{
                        width: "20%",
                        height: "100%",
                        backgroundColor: "white",
                        opacity: 0.5,
                        transform: [{ translateX: translateX2 }],
                      }}></Animated.View>
                  </View>
                </View>
              </View>
            ))
        ) : (
          <View style={{ marginBottom: "70%" }}>
            <FlatList
              data={data}
              renderItem={({ item }) => {
                temp++;

                if (dataColor.length === temp) {
                  temp = 0;
                }
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#Ffffff",
                      marginVertical: 10,
                      borderRadius: 20,
                      paddingVertical: 10,
                      marginHorizontal: 15,
                      borderColor: "#dadada",
                      borderWidth: 0.5,
                    }}
                    onPress={() => handleDetailMember(item.ma_kh)}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: w * 0.7,
                      }}>
                      <View
                        style={{
                          flexDirection: "row",
                          marginHorizontal: 25,
                        }}>
                        <Image
                          source={
                            item.hinh_anh
                              ? {
                                  uri: `${URL}/`.concat(`${item.hinh_anh}`),
                                }
                              : require("../../assets/avtUser.png")
                          }
                          style={{
                            width: w * 0.12,
                            height: w * 0.12,
                            borderRadius: 50,
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "column",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          width: w * 0.55,
                        }}>
                        <Text
                          style={{
                            color: "#474747",
                            fontSize: 15,
                            fontFamily: "LexendDeca_600SemiBold",
                            textAlign: "center",
                          }}>
                          {item.ten_kh}
                        </Text>
                        <View
                          style={{
                            backgroundColor: dataColor[temp].bgColor,
                            borderRadius: 15,
                            marginTop: 5,
                          }}>
                          <Text
                            style={{
                              color: dataColor[temp].color,
                              fontSize: 12,
                              fontFamily: "LexendDeca_500Medium",
                              textAlign: "center",
                              marginHorizontal: 10,
                            }}>
                            {item.trang_thai === "1"
                              ? "Hội viên"
                              : item.trang_thai === "2"
                              ? "Partner"
                              : "Kh tiềm năng"}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: w * 0.2,
                      }}>
                      <TouchableOpacity
                        onPress={() => handleDetailMember(item.ma_kh)}>
                        <Ionicons
                          name="alert-circle-outline"
                          size={20}
                          color="#826CCF"
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              }}
              onEndReached={onLoadMore}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#9D85F2", "red", "green"]}
                />
              }
            />
          </View>
        )}
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
  input: {
    height: 40,
    padding: 10,
    width: "82%",
    marginLeft: 10,
  },
  body: {
    backgroundColor: "#ffffff",
    width: "100%",
    zIndex: 5,
    // position: "absolute",
    marginTop: "40%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  contentText: {
    lineHeight: 25,
  },
  card: {
    padding: 10,
    shadowColor: "black",
    borderRadius: 20,
    backgroundColor: "#FAFAFA",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 15,
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
});

//make this component available to the app
export default ListMember;
