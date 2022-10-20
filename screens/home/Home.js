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
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  FlatList,
  Animated,
  BackHandler,
  Alert,
  ToastAndroid,
  RefreshControl,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

import { RadioButton } from "react-native-paper";
import ModalSms from "../../components/ModalSms";
import Header from "../../components/Header";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getPermissionAction,
  getProfileAction,
  getRankAction,
} from "../../redux/actions/authAction";
import { getNotify } from "../../redux/actions/notifyAction";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-root-toast";
import Carousel from "react-native-banner-carousel-updated";
import {
  getDetailEventsAction,
  getEventsAction,
  newsEventsAction,
} from "../../redux/actions/eventsAction";
import { URL } from "../../utils/fetchApi";
import { formatDateDisplays } from "../../utils/datetime";
import CardInfo from "../../components/CardInfo";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 0) => `rgba(113, 23, 117, 0.8)`,
  labelColor: (opacity = 0) => `rgba(113, 23, 117, 0.8)`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#f8f8f8",
  },
};
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  // legend: ["Rainy Days"], // optional
};

const ListQL = [
  {
    nameHV: "Lisa",
    des: "Trở thành thành viên chính thức của WLIN Global và được tham gia các group Members để quảng bá, truyền thông và kết nối.",
  },
  {
    nameHV: "Sen oi",
    des: "Được 1 bằng chứng nhận & hoa kết nạp thành viên Vàng của WLIN Global ",
  },
  {
    nameHV: "Jenni Wilson",
    des: "Được 2 bài viết truyền thông về thương hiệu cá nhân trên trang wlin.com.vn/ năm",
  },
];
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const HEADER_HEIGHT = 145;
let backHandlerClickCount = 0;
// create a component
const Home = () => {
  const navigation = useNavigation();
  const [backHome, setBackHome] = useState(false);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { auth, notify, event } = useSelector((state) => state);
  const insets = useSafeAreaInsets();

  let dateNow = new Date();
  let year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  let day = dateNow.getDate();
  let dayofweek = dateNow.getDay();
  const dayNow = year + "-" + month + "-" + day;
  //eventing
  function formatDate(time, string) {
    let dateNow = new Date(formatDateDisplays(time));
    let year = dateNow.getFullYear();
    let month = dateNow.getMonth() + 1;
    let day = dateNow.getDate();
    let dayofweek = dateNow.getDay();

    const dayNow = year + "-" + month + "-" + day;

    const dayname = [
      "Chủ nhật",
      "Thứ 2",
      "Thứ 3",
      "Thứ 4",
      "Thứ 5",
      "Thứ 6",
      "Thứ 7",
    ];

    if (string === "thang") return month;
    if (string === "ngay") return day;
    if (string === "thu") return dayname[dayofweek];
  }

  //console.log(dayname[dayofweek] + " ngày " + day + "/" + month + "/" + year);

  const eventing = event.getEvents.filter(
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
      // dispatch(getProfileAction(auth.token));
      // dispatch(getNotify(auth.token));

      dispatch(getPermissionAction(auth.token, auth.profile.email));
      dispatch(getRankAction(auth.token, auth.profile.email));
      dispatch(getEventsAction(auth.token));
    }
  }, [auth.token, dispatch, auth.profile.email]);

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
    dispatch(getRankAction(auth.token, auth.profile.email));
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [auth.token, dispatch, auth.profile.email]);

  const handleDetail = (_id) => {
    dispatch(getDetailEventsAction(_id, auth.token));
    navigation.navigate("DetailEvents");
  };
  const images = eventing.map((item) => item);
  const renderPage = (item, index) => {
    return (
      <TouchableOpacity
        key={item._id}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 10,
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

        {/* <Text style={styles.body}>{item.body}</Text> */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart backHome={backHome} setBackHome={setBackHome} />
      {auth.permission && auth.permission.admin ? (
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
              paddingHorizontal: 10,
              // height: headerHeight,
              opacity: animatedValue.interpolate({
                inputRange: [0, 25],
                outputRange: [1, 0],
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
            marginTop: 10,
          }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 15,
              }}>
              <Text
                style={{ fontSize: 15, fontWeight: "600", color: "#826CCF" }}>
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
            {/* <ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-evenly",
                }}>
                {dataEvents.map((item) => (
                  <TouchableOpacity
                    style={{
                      width: "45%",
                      height: 150,
                      marginVertical: 15,
                    }}
                    key={item._id}>
                    <Image
                      source={item.image}
                      style={{
                        width: "100%",
                        height: 130,
                        borderRadius: 10,
                      }}
                    />
                    <View style={{ marginTop: 5 }}>
                      <Text style={{ fontSize: 12, fontWeight: "600" }}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: "400",
                          color: "#909090",
                        }}>
                        {item.time}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView> */}
            <Carousel
              autoplay
              autoplayTimeout={7000}
              loop
              index={0}
              pageSize={w}>
              {images.map((image, index) => renderPage(image, index))}
            </Carousel>
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 15,
              }}>
              <Text
                style={{ fontSize: 15, fontWeight: "600", color: "#826CCF" }}>
                Tổng thống kê
              </Text>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}>
              <TouchableOpacity
                style={{
                  //   paddingHorizontal: 10,
                  // marginHorizontal: 15,
                  borderRadius: 8,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  backgroundColor: "#E7F2FF",
                  marginTop: 10,
                  marginBottom: 10,
                  width: "45%",
                }}
                onPress={() => navigation.navigate("Slips")}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingHorizontal: 10,
                    paddingTop: 10,
                  }}>
                  <View
                    style={{
                      borderRadius: 7,
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}>
                    <Image
                      source={require("../../assets/notepad.png")}
                      style={{ width: 20, height: 20, resizeMode: "contain" }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#6CADF6",
                        marginLeft: 5,
                      }}>
                      Referrals
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        textAlign: "center",
                      }}>
                      1/2/2022
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingBottom: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <View
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 12,
                        backgroundColor: "#6CADF6",
                        borderRadius: 50,
                      }}>
                      <Text
                        style={{
                          fontSize: 30,
                          color: "#ffffff",
                          textAlign: "center",
                          fontWeight: "700",
                        }}>
                        10
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  //   paddingHorizontal: 10,
                  // marginHorizontal: 15,
                  borderRadius: 8,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  backgroundColor: "#FBF3F1",
                  marginTop: 10,
                  marginBottom: 10,
                  width: "45%",
                }}
                onPress={() => navigation.navigate("TYFCB")}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingHorizontal: 10,
                    paddingTop: 10,
                  }}>
                  <View
                    style={{
                      borderRadius: 7,
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    }}>
                    <Image
                      source={require("../../assets/people.png")}
                      style={{ width: 20, height: 20, resizeMode: "contain" }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#FA846F",
                        marginLeft: 5,
                      }}>
                      TYFCBs
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        textAlign: "center",
                      }}>
                      1/2/2022
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <View
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 12,
                        backgroundColor: "#FA846F",
                        borderRadius: 50,
                      }}>
                      <Text
                        style={{
                          fontSize: 30,
                          color: "#ffffff",
                          textAlign: "center",
                          fontWeight: "700",
                        }}>
                        20
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 8,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  backgroundColor: "#EBD2F6",

                  width: "45%",
                }}
                onPress={() => navigation.navigate("ClubScreen")}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingHorizontal: 10,
                    paddingTop: 10,
                  }}>
                  <View
                    style={{
                      borderRadius: 7,
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                      width: "40%",
                    }}>
                    <Image
                      source={require("../../assets/connect.png")}
                      style={{ width: 20, height: 20, resizeMode: "contain" }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#A245B0",
                        marginLeft: 5,
                      }}>
                      Club tham gia
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        textAlign: "center",
                      }}>
                      1/2/2022
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingBottom: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <View
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 12,
                        backgroundColor: "#A245B0",
                        borderRadius: 50,
                      }}>
                      <Text
                        style={{
                          fontSize: 30,
                          color: "#ffffff",
                          textAlign: "center",
                          fontWeight: "700",
                        }}>
                        10
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderRadius: 8,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  backgroundColor: "#F2FCED",

                  width: "45%",
                }}
                onPress={() => navigation.navigate("EventsScreen")}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    paddingHorizontal: 10,
                    paddingTop: 10,
                  }}>
                  <View
                    style={{
                      borderRadius: 7,
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                      width: "40%",
                    }}>
                    <Image
                      source={require("../../assets/events.png")}
                      style={{ width: 20, height: 20, resizeMode: "contain" }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#689A4F",
                        marginLeft: 5,
                      }}>
                      Sự kiện tham gia
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        textAlign: "center",
                      }}>
                      1/2/2022
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    paddingHorizontal: 15,
                    paddingBottom: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <View
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 12,
                        backgroundColor: "#689A4F",
                        borderRadius: 50,
                      }}>
                      <Text
                        style={{
                          fontSize: 30,
                          color: "#ffffff",
                          textAlign: "center",
                          fontWeight: "700",
                        }}>
                        15
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderRadius: 15,
            }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 15,
                marginVertical: 10,
              }}>
              <Text
                style={{ fontSize: 15, fontWeight: "600", color: "#826CCF" }}>
                Số liệu chi tiết
              </Text>
              <TouchableOpacity>
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

            <View
              style={{
                paddingHorizontal: 10,
                paddingBottom: 10,
                marginTop: 10,
              }}>
              <LineChart
                data={data}
                width={screenWidth / 1.13}
                height={200}
                chartConfig={chartConfig}
              />
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 15,
              }}>
              <Text
                style={{ fontSize: 15, fontWeight: "600", color: "#826CCF" }}>
                Danh sách chỉ số quyền lợi
              </Text>
              <TouchableOpacity>
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
            {ListQL.map((item, index) => (
              <View
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 7,
                  marginHorizontal: 15,
                  paddingVertical: 5,
                  marginVertical: 10,
                  borderWidth: 0.8,
                  borderColor: "#E8E8E8",
                  // shadowColor: "#000",
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 2,
                  // },
                  // shadowOpacity: 0.25,
                  // shadowRadius: 3.84,
                  // elevation: 5,
                }}
                key={index}>
                <View
                  style={{
                    flexDirection: "row",
                    paddingHorizontal: 5,
                    alignItems: "center",
                  }}>
                  {/* <MaterialCommunityIcons
                    name="crown-outline"
                    color="rgba(238, 221, 176, 0.93)"
                    size={25}
                  /> */}
                  <Image
                    source={require("../../assets/cup.png")}
                    style={{ width: 30, height: 30, top: 3 }}
                  />
                  <Text style={{ fontSize: 14, fontWeight: "600" }}>
                    Tên hội viên: {item.nameHV}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    paddingLeft: 18,
                    paddingRight: 5,
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "500",
                      width: "70%",
                      textAlign: "justify",

                      marginHorizontal: 15,
                    }}>
                    {item.des}
                  </Text>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 5,
                      backgroundColor: "#826CCF",
                      paddingHorizontal: 5,
                      borderRadius: 10,
                    }}>
                    <MaterialCommunityIcons
                      name="hand-extended-outline"
                      size={20}
                      color="#ffffff"
                    />
                    <Text style={{ fontSize: 11, color: "#ffffff" }}>
                      Trả QL
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
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
