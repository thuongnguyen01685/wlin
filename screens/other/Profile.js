//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useRef, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import Toast from "react-native-root-toast";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  AUTH,
  getImageUserAction,
  getProfileAction,
} from "../../redux/actions/authAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import callApi from "../../utils/callApi";
import { URL } from "../../utils/fetchApi";
import CardInfo from "../../components/CardInfo";
import { formatDateDisplays } from "../../utils/datetime";
import { Admin, Member, Partner } from "../../utils/AccessPermission";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const HEADER_HEIGHT = 200;
// create a component
const Profile = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const { auth, notify } = useSelector((state) => state);
  const [image, setImage] = useState(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const amin = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const data = [
    {
      name: "Số điện thoại",
      icon: "call",
      value: auth.customer.dien_thoai,
      color: "rgba(136, 38, 140, 0.75)",
      permission: [Member, Partner, Admin],
    },
    {
      name: "Chức vụ",
      icon: "briefcase",
      value: auth.customer.chuc_vu,
      color: "#DC5696",
      permission: [Member, Partner],
    },
    {
      name: "Công ty",
      icon: "business",
      value: auth.customer.ten_cong_ty,
      color: "#F8AA4F",
      permission: [Member, Partner],
    },
    {
      name: "Địa chỉ công ty",
      icon: "location",
      value: auth.customer.address_cong_ty,
      color: "#FA846F",
      permission: [Member, Partner],
    },
    {
      name: "Địa chỉ cá nhân",
      icon: "location",
      value: auth.customer.address,
      color: "rgba(5, 60, 255, 0.4)",
      permission: [Member, Partner, Admin],
    },
    {
      name: "Email",
      icon: "mail",
      value: auth.customer.email,
      color: "rgba(255, 0, 0, 0.7)",
      permission: [Member, Partner, Admin],
    },
    {
      name: "Ngày sinh",
      icon: "calendar",
      value: formatDateDisplays(auth.customer.ngay_sinh),
      color: "#93DBE4",
      permission: [Member, Partner, Admin],
    },
    {
      name: "Ngành hàng",
      icon: "cube",
      value: auth.customer.ten_nganh_hang,
      color: "rgba(255, 10, 157, 0.4)",
      permission: [Member, Partner],
    },
    {
      name: "Ngành hàng chi tiết",
      icon: "cube",
      value: auth.customer.nganh_hang_con,
      color: "#6CADF6",
      permission: [Member, Partner],
    },
    {
      name: "Người giới thiệu",
      icon: "person",
      value: auth.customer.nguoi_gioi_thieu,
      color: "rgba(17, 141, 59, 0.5)",
      permission: [Member, Partner],
    },
  ];

  let dataHas = [];

  data.map((item) => {
    if (item.permission.includes(auth.permission.group_id) === true) {
      dataHas.push(item);
    }
  });

  const handleCloseProfile = () => {
    navigation.goBack();
  };
  useEffect(() => {
    if (auth.token === null || auth.token === "") {
      navigation.navigate("Splash");
    }
    Animated.loop(
      Animated.sequence([
        Animated.timing(amin, {
          toValue: -1, // so i add the delay here
          duration: 100,
          delay: 2 * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(amin, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(amin, {
          toValue: -1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(amin, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(amin, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [auth.token, dispatch]);

  const rotation = amin.interpolate({
    inputRange: [-1, 1], // left side to right side
    outputRange: ["-10deg", "10deg"], // before that we have to check now it's perfect
  });

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@token_key");

      // console.log("Token removed");
      await dispatch({ type: AUTH.TOKEN, payload: null });
      await dispatch({ type: AUTH.PROFILE, payload: [] });

      Toast.show("Bạn đã đăng xuất !", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
      // BackHandler.exitApp();
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      await setImage(result.uri);
    }

    const temp = await dispatch(getImageUserAction(result.uri, auth.token));

    await callApi(`api/updateprofile?access_token=${auth.token}`, "POST", {
      picture: JSON.parse(temp).image,
    });
    await dispatch(getProfileAction(auth.token));
  };

  const initStyle = Platform.OS === "ios" ? 20 : insets.top + 50;

  const headerHeight = animatedValue.interpolate({
    inputRange: [0, HEADER_HEIGHT + insets.top],
    outputRange: [HEADER_HEIGHT + initStyle, insets.top + 30],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View
            style={{
              paddingTop: StatusBar.currentHeight || 40,
              zIndex: 2,
              position: "absolute",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "93%",
              marginHorizontal: 15,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: "#ffffff",
                  width: 40,
                  height: 40,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 50,
                  //transform: [{ rotate: "-45deg" }],
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}
                onPress={handleCloseProfile}>
                <Ionicons
                  name="chevron-back-outline"
                  size={25}
                  color="#826CCF"
                  // style={{ transform: [{ rotate: "45deg" }] }}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  alignContent: "center",

                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{ color: "#ffffff", fontSize: 20, fontWeight: "800" }}>
                  Hồ sơ cá nhân
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ffffff",
                width: 38,
                height: 38,
                borderRadius: 20,
              }}>
              {notify.getNotify.length > 0 ? (
                <Animated.View
                  style={{
                    alignSelf: "center",
                    transform: [{ rotate: rotation }],
                  }}>
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name="notifications" size={25} color="#F2AF4A" />
                    <View
                      style={{
                        position: "absolute",
                        left: 14,
                        top: 2,
                        backgroundColor: "#f00",
                        borderRadius: 50,
                      }}>
                      <Text
                        style={{
                          fontSize: 8,
                          paddingHorizontal:
                            notify.getNotify.length > 9 ? 2 : 4,
                          color: "#ffffff",
                          fontWeight: "600",
                        }}>
                        {notify.getNotify.length > 9
                          ? "9+"
                          : notify.getNotify.length}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </Animated.View>
              ) : (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Ionicons name="notifications" size={25} color="#F2AF4A" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View>
            <ImageBackground
              source={require("../../assets/bg.png")}
              style={{
                height: ratio * 410,
                width: w,
              }}
            />
          </View>
        </View>
        {/* <View
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
            marginTop: -40,
            marginHorizontal: 15,
            paddingVertical: 20,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
          }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
            Thông tin quản trị viên
          </Text>
          <TouchableOpacity>
            <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
          </TouchableOpacity>
        </View> */}
        {auth.permission && auth.permission.group_id === Admin ? (
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
              marginTop: -40,
              marginHorizontal: 15,
              paddingVertical: 20,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
              Thông tin quản trị viên
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
              zIndex: 15,
              marginTop: -40,
              marginHorizontal: 15,
              borderRadius: 15,
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
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
                Thông tin thành viên
              </Text>
              <Animated.View
                style={{
                  opacity: animatedValue.interpolate({
                    inputRange: [0, 4, 8, 25],
                    outputRange: [0, 0.5, 0.9, 1],
                    extrapolate: "clamp",
                  }),
                }}>
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() => navigation.navigate("UpgradeMember")}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#cecece",
                    }}>
                    Nâng cấp
                  </Text>
                  <Ionicons name="arrow-up" color="#cecece" size={20} />
                </TouchableOpacity>
              </Animated.View>
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  top: 10,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#9D85F2",
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 8,
                  }}
                  onPress={() => navigation.navigate("UpgradeMember")}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#fff",
                    }}>
                    Nâng cấp
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </Animated.View>
        )}
        <View style={styles.search}>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "100%",
              }}>
              <View
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  backgroundColor: "#ffffff",
                  borderRadius: 60,
                }}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{
                      borderColor: "#ffffff",
                      borderWidth: 2,
                      borderRadius: 80,
                      width: 90,
                      height: 90,
                    }}
                  />
                ) : (
                  <Image
                    source={{ uri: `${URL}/${auth.profile.picture}` }}
                    style={{
                      borderColor: "#ffffff",
                      borderWidth: 2,
                      borderRadius: 80,
                      width: 90,
                      height: 90,
                    }}
                  />
                )}
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(150, 150, 150, 0.7)",
                  position: "absolute",
                  width: 20,
                  height: 20,
                  borderRadius: 50,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  top: "75%",
                  left: "55%",
                }}
                onPress={pickImage}>
                <Ionicons name="camera-outline" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: "600",
                  textAlign: "center",
                }}>
                {auth.profile.name}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={{ height: "100%" }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: animatedValue } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}>
              <View style={{ marginBottom: "5%" }}>
                <View
                  style={{
                    marginHorizontal: 15,
                    paddingTop: 20,
                  }}>
                  <View style={{ paddingHorizontal: 10 }}>
                    {auth.permission.group_id !== Admin && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#Ffffff",
                          marginVertical: 10,
                          borderRadius: 15,
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                          borderColor: "#dadada",
                          borderWidth: 0.5,
                        }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#ffffff",
                                paddingVertical: 9.7,
                                paddingHorizontal: 17.8,
                                borderRadius: 50,
                              }}>
                              <Text
                                style={{
                                  fontSize: 20,
                                  fontWeight: "600",
                                  color: "#9D85F2",
                                }}>
                                #
                              </Text>
                            </View>

                            <View
                              style={{
                                flexDirection: "column",
                                marginLeft: 10,
                                justifyContent: "center",
                                width: "70%",
                              }}>
                              <Text
                                style={{
                                  color: "#474747",
                                  fontSize: 15,
                                  fontWeight: "600",
                                }}>
                                Mã hội viên
                              </Text>
                              <Text
                                style={{
                                  color: "#434343",
                                  fontSize: 12,
                                  fontWeight: "400",
                                }}>
                                {auth.customer.ma_kh}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity>
                          <Ionicons
                            name="create-outline"
                            size={25}
                            color="#9D85F2"
                          />
                        </TouchableOpacity>
                      </View>
                    )}

                    {dataHas.map((item, index) => (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#Ffffff",
                          marginVertical: 10,
                          borderRadius: 15,
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                          borderColor: "#dadada",
                          borderWidth: 0.5,
                        }}
                        key={index}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                backgroundColor: "#ffffff",
                                paddingVertical: 10,
                                paddingHorizontal: 11,
                                borderRadius: 50,
                              }}>
                              <Ionicons
                                name={item.icon}
                                size={25}
                                color={item.color}
                              />
                            </View>

                            <View
                              style={{
                                flexDirection: "column",
                                marginLeft: 10,
                                justifyContent: "center",
                                width: "70%",
                              }}>
                              <Text
                                style={{
                                  color: "#474747",
                                  fontSize: 15,
                                  fontWeight: "600",
                                }}>
                                {item.name}
                              </Text>
                              <Text
                                style={{
                                  color: "#434343",
                                  fontSize: 12,
                                  fontWeight: "400",
                                }}>
                                {item.value}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity>
                          <Ionicons
                            name="create-outline"
                            size={25}
                            color="#9D85F2"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#Ffffff",
                        marginVertical: 10,
                        borderRadius: 15,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderColor: "#dadada",
                        borderWidth: 0.5,
                      }}
                      onPress={handleLogout}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                              backgroundColor: "#ffffff",
                              padding: 10,
                              paddingHorizontal: 11,
                              borderRadius: 50,
                            }}>
                            <Ionicons
                              name="log-out"
                              size={25}
                              color="#711775"
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              marginLeft: 10,
                              justifyContent: "center",
                              width: "70%",
                            }}>
                            <Text
                              style={{
                                color: "#474747",
                                fontSize: 15,
                                fontWeight: "600",
                              }}>
                              Đăng xuất
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
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
  search: {
    zIndex: 5,
    position: "absolute",
    marginTop: "18%",
    width: "100%",
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    padding: 10,
    width: "82%",
    marginLeft: 10,
  },
  body: {
    width: "100%",
    zIndex: 5,
    // position: "absolute",

    marginBottom: "125%",
  },
  contentText: {
    lineHeight: 20,
  },
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
    marginVertical: 7,
  },
});

//make this component available to the app
export default Profile;
