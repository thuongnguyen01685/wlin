//import liraries
import { Ionicons } from "@expo/vector-icons";
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
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

import { RadioButton } from "react-native-paper";
import ModalSms from "../../components/ModalSms";
import Header from "../../components/Header";
import BodyHome from "../../components/page/BodyHome";
import { useDispatch } from "react-redux";
import { AUTH } from "../../redux/actions/authAction";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const Profile = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const handleCloseProfile = () => {
    dispatch({ type: AUTH.SHOWPROFILE, payload: false });
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View>
        <View>
          <View
            style={{
              zIndex: 4,
              position: "absolute",
              marginTop: "11%",
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
                  borderRadius: 5,
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
            </View>
          </View>
          <View>
            <ImageBackground
              source={require("../../assets/EllipseLogin.png")}
              style={{
                height: 455,
                width: 325,
                zIndex: 1,
                position: "absolute",
              }}
            />
            <ImageBackground
              source={require("../../assets/VctLogin.png")}
              style={{
                height: ratio * 1000,
                width: w,
                position: "absolute",
                zIndex: 2,
              }}
            />
          </View>
        </View>
        <View style={styles.search}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignContent: "center",
              width: "75%",
              borderRadius: 10,
            }}>
            <Text style={{ color: "#711775", fontSize: 25, fontWeight: "800" }}>
              Hồ sơ cá nhân
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}>
              <Image
                source={require("../../assets/vinh.png")}
                style={{
                  borderColor: "#ffffff",
                  borderWidth: 1.2,
                  borderRadius: 80,
                }}
              />
            </View>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{
                  color: "#711775",
                  fontSize: 18,
                  fontWeight: "600",
                  textAlign: "center",
                }}>
                Thành Vinh
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginLeft: 12,
                }}>
                <Text style={styles.contentHeader}>Gói thành viên</Text>
                <Image source={require("../../assets/Vm.png")} />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginBottom: "20%" }}>
                <View
                  style={{
                    marginHorizontal: 15,
                    paddingTop: 30,
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
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      paddingHorizontal: 15,
                      alignItems: "flex-start",
                      paddingLeft: 30,
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: "#ffffff",
                        width: "70%",
                        paddingHorizontal: 10,
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
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingVertical: 3,
                        }}>
                        <Text>Quyền lợi vàng</Text>
                        <Ionicons name="chevron-forward-outline" size={20} />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        borderRadius: 7,
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                        width: "35%",
                        justifyContent: "flex-end",
                        marginBottom: 10,
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
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      paddingHorizontal: 15,
                    }}>
                    <TouchableOpacity
                      style={{
                        borderRadius: 7,
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                        width: "35%",
                        justifyContent: "flex-end",
                        marginBottom: 10,
                        marginLeft: "10%",
                      }}
                      onPress={() => navigation.navigate("UpgradeMember")}>
                      <LinearGradient
                        start={{ x: 0.3, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        colors={["#751979", "#AE40B2"]}
                        style={{
                          paddingHorizontal: 15,
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
                          Xem chi tiết
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
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
                        paddingVertical: 20,
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
                              backgroundColor: "rgba(127, 32, 131, 0.2)",
                              padding: 10,
                              borderRadius: 50,
                            }}>
                            <Ionicons
                              name="call-outline"
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
                              Số điện thoại
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
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "#F3F3F3",
                        marginVertical: 10,
                        borderRadius: 8,
                        paddingVertical: 20,
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
                              backgroundColor: "rgba(127, 32, 131, 0.2)",
                              padding: 10,
                              borderRadius: 50,
                            }}>
                            <Ionicons
                              name="location-outline"
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
                              Địa chỉ
                            </Text>
                            <Text
                              style={{
                                color: "#7C1E80",
                                fontSize: 12,
                                fontWeight: "400",
                              }}>
                              Quận 7, TPHCM
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
    marginTop: "26%",
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
    backgroundColor: "#ffffff",
    width: "100%",
    zIndex: 5,
    // position: "absolute",
    marginTop: "85%",
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
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
    marginVertical: 7,
  },
});

//make this component available to the app
export default Profile;
