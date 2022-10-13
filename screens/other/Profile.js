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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

import { RadioButton } from "react-native-paper";
import ModalSms from "../../components/ModalSms";
import Header from "../../components/Header";

import { useDispatch, useSelector } from "react-redux";
import {
  AUTH,
  getImageUserAction,
  getProfileAction,
} from "../../redux/actions/authAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import callApi from "../../utils/callApi";
import { URL } from "../../utils/fetchApi";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const Profile = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const handleCloseProfile = () => {
    navigation.goBack();
  };
  const { auth } = useSelector((state) => state);
  const [image, setImage] = useState(null);

  const data = [
    {
      name: "Số điện thoại",
      icon: "call-outline",
      value: "+84 378759723",
      color: "rgba(136, 38, 140, 0.75)",
    },
    {
      name: "Chức vụ",
      icon: "briefcase-outline",
      value: "Trưởng ban",
      color: "#DC5696",
    },
    {
      name: "Công ty",
      icon: "business-outline",
      value: "TNHH MTV Công Nghệ FOS",
      color: "#F8AA4F",
    },
    {
      name: "Địa chỉ công ty",
      icon: "location-outline",
      value: "Quận 1, TPHCM",
      color: "#FA846F",
    },
    {
      name: "Địa chỉ cá nhân",
      icon: "location-outline",
      value: "Quận 7, TPHCM",
      color: "rgba(5, 60, 255, 0.4)",
    },
    {
      name: "Email",
      icon: "mail-outline",
      value: "vinh.nguyen@fostech.vn",
      color: "rgba(255, 0, 0, 0.7)",
    },
    {
      name: "Nhóm hội viên",
      icon: "people-outline",
      value: "Nhóm A",
      color: "rgba(136, 38, 140, 0.75)",
    },
    {
      name: "Ngày sinh",
      icon: "calendar-outline",
      value: "24/05/1985",
      color: "#93DBE4",
    },
    {
      name: "Ngành hàng",
      icon: "cube-outline",
      value: "Ban Công nghệ - Phần mềm",
      color: "rgba(255, 10, 157, 0.4)",
    },
    {
      name: "Ngành hàng chi tiết",
      icon: "cube-outline",
      value: "Spa - Hair - Nail",
      color: "#6CADF6",
    },
    {
      name: "Người giới thiệu",
      icon: "person-outline",
      value: "Mr. Nguyễn Xuân Trường",
      color: "rgba(17, 141, 59, 0.5)",
    },
  ];

  useEffect(() => {
    if (auth.token === null || auth.token === "") {
      navigation.navigate("Splash");
    }
  }, [auth.token, dispatch]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("@token_key");

      // console.log("Token removed");
      await dispatch({ type: AUTH.TOKEN, payload: null });
      await dispatch({ type: AUTH.PROFILE, payload: [] });

      ToastAndroid.showWithGravityAndOffset(
        "Bạn đã đăng xuất !",
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50
      );
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
      setImage(result.uri);
    }

    const temp = await dispatch(getImageUserAction(result.uri, auth.token));

    await callApi(`api/updateprofile?access_token=${auth.token}`, "POST", {
      picture: JSON.parse(temp).image,
    });
    await dispatch(getProfileAction(auth.token));
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View
            style={{
              paddingTop: StatusBar.currentHeight || 30,
              zIndex: 2,
              position: "absolute",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "4%",
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
                  color="#711775"
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
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#711775" }}>
            Thông tin quản trị viên
          </Text>
          <TouchableOpacity>
            <Ionicons name="alert-circle-outline" size={20} color="#711775" />
          </TouchableOpacity>
        </View>
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
              {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginLeft: 12,
                }}>
                <Text style={styles.contentHeader}>Gói thành viên</Text>
                <Image source={require("../../assets/Vm.png")} />
              </View> */}
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={{ height: "100%" }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginBottom: "5%" }}>
                <View
                  style={{
                    marginHorizontal: 15,
                    paddingTop: 20,
                  }}>
                  <View
                    style={{
                      paddingHorizontal: 15,
                      paddingBottom: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}>
                    <View>
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 15,
                          fontWeight: "400",
                          marginBottom: 10,
                        }}>
                        WLIN Member
                      </Text>

                      <Text style={styles.contentHeader}>
                        Ngày Bắt đầu: 1/2/2021
                      </Text>
                      <Text style={styles.contentHeader}>
                        Ngày hết hạn: 1/2/2022
                      </Text>
                      <Text style={styles.contentHeader}>
                        Thời gian hoạt động còn lại: 20 ngày
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        height: "89%",
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        borderRadius: 5,
                        elevation: 5,
                      }}>
                      <LinearGradient
                        start={{ x: 1, y: 0.7 }}
                        end={{ x: 0.3, y: 0.8 }}
                        colors={["#F9C271", "#F4EFB8", "#F4EFB8", "#F9C271"]}
                        style={{ width: 100, height: 130, borderRadius: 5 }}>
                        <View
                          style={{
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                          }}>
                          <Image
                            source={require("../../assets/logo.png")}
                            style={{ width: 70, height: 30 }}
                          />
                          <Text style={{ fontSize: 10, color: "#969696" }}>
                            Gói vàng
                          </Text>
                        </View>
                      </LinearGradient>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginHorizontal: 15,
                    }}>
                    <View style={{ width: "60%" }}>
                      <TouchableOpacity style={{ width: "90%" }}>
                        <LinearGradient
                          start={{ x: 1, y: 0.3 }}
                          end={{ x: 1, y: 1 }}
                          colors={["#751979", "#AE40B2"]}
                          style={{
                            paddingHorizontal: 22,
                            paddingVertical: 5,
                            borderRadius: 7,
                            flexDirection: "row",
                            justifyContent: "center",
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#ffffff",
                              textAlign: "center",
                              width: "100%",
                            }}>
                            Xem thông tin quyền lợi
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>

                    <View>
                      <TouchableOpacity
                        style={{
                          borderRadius: 7,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={() => navigation.navigate("UpgradeMember")}>
                        <LinearGradient
                          start={{ x: 1, y: 0.3 }}
                          end={{ x: 1, y: 1 }}
                          colors={["#751979", "#AE40B2"]}
                          style={{
                            paddingHorizontal: 22,
                            paddingVertical: 5,
                            borderRadius: 7,
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: "#ffffff",
                              textAlign: "center",
                              width: "100%",
                            }}>
                            Nâng cấp
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ paddingHorizontal: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#F3F3F3",
                        marginVertical: 10,
                        borderRadius: 8,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
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
                              backgroundColor: "#90DA8A",
                              paddingVertical: 9.7,
                              paddingHorizontal: 17.8,
                              borderRadius: 50,
                            }}>
                            <Text
                              style={{
                                fontSize: 20,
                                fontWeight: "600",
                                color: "#ffffff",
                              }}>
                              #
                            </Text>
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              marginLeft: 10,
                              justifyContent: "center",
                            }}>
                            <Text
                              style={{
                                color: "#711775",
                                fontSize: 15,
                                fontWeight: "600",
                              }}>
                              Mã hội viên
                            </Text>
                            <Text
                              style={{
                                color: "#7C1E80",
                                fontSize: 12,
                                fontWeight: "400",
                              }}>
                              +84 378759723
                            </Text>
                          </View>
                        </View>
                      </View>
                      <TouchableOpacity>
                        <Ionicons
                          name="create-outline"
                          size={25}
                          color="#711775"
                        />
                      </TouchableOpacity>
                    </View>
                    {data.map((item, index) => (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#F3F3F3",
                          marginVertical: 10,
                          borderRadius: 8,
                          paddingVertical: 10,
                          paddingHorizontal: 20,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.25,
                          shadowRadius: 3.84,
                          elevation: 5,
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
                                backgroundColor: item.color,
                                paddingVertical: 10,
                                paddingHorizontal: 11,
                                borderRadius: 50,
                              }}>
                              <Ionicons
                                name={item.icon}
                                size={25}
                                color="#ffffff"
                              />
                            </View>

                            <View
                              style={{
                                flexDirection: "column",
                                marginLeft: 10,
                                justifyContent: "center",
                              }}>
                              <Text
                                style={{
                                  color: "#711775",
                                  fontSize: 15,
                                  fontWeight: "600",
                                }}>
                                {item.name}
                              </Text>
                              <Text
                                style={{
                                  color: "#7C1E80",
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
                            color="#711775"
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#F3F3F3",
                        marginVertical: 10,
                        borderRadius: 8,
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
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
                              backgroundColor: "rgba(127, 32, 131, 0.2)",
                              padding: 10,
                              paddingHorizontal: 11,
                              borderRadius: 50,
                            }}>
                            <Ionicons
                              name="log-out-outline"
                              size={25}
                              color="#711775"
                            />
                          </View>

                          <View
                            style={{
                              flexDirection: "column",
                              marginLeft: 10,
                              justifyContent: "center",
                            }}>
                            <Text
                              style={{
                                color: "#711775",
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
