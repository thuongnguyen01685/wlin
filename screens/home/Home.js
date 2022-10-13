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
import { newsEventsAction } from "../../redux/actions/eventsAction";

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

//data event
const dataEvents = [
  {
    _id: 1,
    image: require("../../assets/news.png"),
    name: "Tin tức sự kiện 1",
    time: "01/02/2022",
  },
  {
    _id: 2,
    image: require("../../assets/news.png"),
    name: "Tin tức sự kiện 2",
    time: "01/02/2022",
  },
  {
    _id: 3,
    image: require("../../assets/news.png"),
    name: "Tin tức sự kiện 3",
    time: "01/02/2022",
  },
  {
    _id: 4,
    image: require("../../assets/news.png"),
    name: "Tin tức sự kiện 4",
    time: "01/02/2022",
  },
];

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

const HEADER_HEIGHT = 225;
let backHandlerClickCount = 0;
// create a component
const Home = () => {
  const navigation = useNavigation();
  const [backHome, setBackHome] = useState(false);
  const dispatch = useDispatch();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { auth, notify, event } = useSelector((state) => state);
  const insets = useSafeAreaInsets();

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + insets.top, insets.top + 33],
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
      dispatch(newsEventsAction());
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
  const images = event.news.map((item) => item);
  const renderPage = (item, index) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 10,
        }}>
        <Image
          style={{
            width: "93%",
            height: 200,
            borderRadius: 10,
          }}
          source={{
            uri: `https://api.fostech.vn/`.concat(`${item.picture}`),
          }}
        />
        <Text style={styles.titleNews}>{item.title}</Text>
        {/* <Text style={styles.body}>{item.body}</Text> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart backHome={backHome} setBackHome={setBackHome} />
      {auth.permission.group_id === "631c254a7a3a837ce2c22995" ? (
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
            marginTop: -55,
            marginHorizontal: 15,
            paddingVertical: 10,
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
              paddingHorizontal: 15,
              paddingVertical: 10,
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
            <LinearGradient
              start={{ x: 0.9, y: 1 }}
              end={{ x: 0.2, y: 0.6 }}
              colors={["#DEC1A1", "#FBECD7", "#F5DFC7", "#D5B59C"]}
              style={{ borderRadius: 7 }}>
              <Image
                source={require("../../assets/cchuong.png")}
                style={{
                  width: 60,
                  height: 60,
                  resizeMode: "contain",
                  position: "absolute",
                  left: 30,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginHorizontal: 10,
                }}>
                {/* <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <MaterialCommunityIcons
                    name="crown-outline"
                    color="rgba(238, 221, 176, 0.93)"
                    size={30}
                  />
                  <Text
                    style={{ color: "#ff0", fontWeight: "600", fontSize: 17 }}>
                    Thành viên vàng
                  </Text>
                </View> */}
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="dots-horizontal"
                    color="#FFFFFF"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: "100%", padding: 20 }}>
                <Text
                  style={{
                    color: "#8D6B48",
                    fontSize: 25,
                    fontWeight: "600",
                    textAlign: "center",
                  }}>
                  {auth.permission.name}
                </Text>
                <Text
                  style={{
                    color: "#8D6B48",
                    fontSize: 15,
                    fontWeight: "500",
                    textAlign: "center",
                  }}>
                  UXUI Designer
                </Text>
              </View>
              <View style={{ padding: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Text style={styles.textContent}>Start date: 1/2/2021</Text>
                  <Text style={styles.textContent}>Due date: 1/2/2022</Text>
                </View>
                <Text style={styles.textContent}>
                  Thời gian hoạt động còn lại: 20 ngày
                </Text>
              </View>
            </LinearGradient>
          </Animated.View>
        </Animated.View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}>
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
              autoplayTimeout={3000}
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
                  marginTop: 10,
                  marginBottom: 10,
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
                  marginTop: 10,
                  marginBottom: 10,
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
                  backgroundColor: "#f3f3f3",
                  borderRadius: 7,
                  marginHorizontal: 15,
                  paddingVertical: 5,
                  marginVertical: 10,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
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
                    justifyContent: "space-between",
                    paddingLeft: 18,
                    marginLeft: 10,
                    paddingRight: 5,
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: "500",
                      width: "75%",
                      textAlign: "justify",
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
    color: "#F8f8f8",
    fontSize: 15,
    fontWeight: "600",
    position: "absolute",
    top: "70%",
    textAlign: "center",
    width: "90%",
    paddingHorizontal: 15,
    flexWrap: "wrap",
  },
});

//make this component available to the app
export default Home;
