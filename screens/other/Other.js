//import liraries
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
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
  Keyboard,
  Platform,
  TextInput,
} from "react-native";
import Toast from "react-native-root-toast";
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { AUTH } from "../../redux/actions/authAction";
import { Admin, Member, Partner } from "../../utils/AccessPermission";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const data = [
  {
    icon: "account-multiple",
    name: "Quản trị hội viên",
    navigation: "ListMember",
    color: "#BF1FE7",
    permission: [Partner, Admin],
  },
  {
    icon: "shield-check",
    name: "Quản trị CLUB",
    navigation: "ClubScreen",
    color: "#32DBDB",
    permission: [Admin],
  },
  {
    icon: "calendar-month",
    name: "Quản trị sự kiện",
    navigation: "EventsScreen",
    color: "#1D19D4",
    permission: [Admin],
  },
  {
    icon: "chart-box",
    name: "Referrals",
    navigation: "Slips",
    color: "#F12247",
    permission: [Member, Partner],
  },
  {
    icon: "chart-box",
    name: "TYFCBs",
    navigation: "TYFCB",
    color: "#058602",
    permission: [Member, Partner],
  },
  {
    icon: "note-text",
    name: "Danh sách nhóm quyền lợi",
    navigation: "Benefit",
    color: "#FEC90F",
    permission: [Member, Partner, Admin],
  },
  {
    icon: "account",
    name: "Hồ sơ cá nhân",
    navigation: "Profile",
    color: "#9D85F2",
    permission: [Member, Partner, Admin],
  },
];
// create a component
const Other = () => {
  const navigation = useNavigation();
  const [searchPart, setSearchPart] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  let dataHas = [];

  data.map((item) => {
    if (item.permission.includes(auth.permission.group_id) === true) {
      dataHas.push(item);
    }
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart searchPart={searchPart} />
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
          Các mục khác
        </Text>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: "80%",
              paddingHorizontal: 15,
              marginTop: 10,
            }}>
            <View>
              {dataHas.map((item, index) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#Ffffff",
                    marginVertical: 5,
                    borderRadius: 15,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderWidth: 0.8,
                    borderColor: "#E8E8E8",
                  }}
                  key={index}
                  onPress={() => navigation.navigate(`${item.navigation}`)}>
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
                          padding: 10,
                          borderRadius: 50,
                        }}>
                        <MaterialCommunityIcons
                          name={item.icon}
                          size={30}
                          color={item.color}
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
                            color: "#474747",
                            fontSize: 15,
                            fontWeight: "800",
                          }}>
                          {item.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(`${item.navigation}`)}>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={25}
                      color="#9D85F2"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#Ffffff",
                  marginVertical: 5,
                  borderRadius: 15,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderWidth: 0.8,
                  borderColor: "#E8E8E8",
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
                        padding: 10,
                        borderRadius: 50,
                      }}>
                      <MaterialCommunityIcons
                        name="view-grid"
                        size={30}
                        color="#3060DB"
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
                          color: "#474747",
                          fontSize: 15,
                          fontWeight: "800",
                        }}>
                        Phiên bản hiện tại:{" "}
                        <Text style={{ fontWeight: "400", fontSize: 15 }}>
                          V1.01
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={25}
                    color="#9D85F2"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#Ffffff",
                  marginVertical: 5,
                  borderRadius: 15,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderWidth: 0.8,
                  borderColor: "#E8E8E8",
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
                        padding: 10,
                        borderRadius: 50,
                      }}>
                      <Ionicons name="log-out" size={30} color="#EB3BA4" />
                    </View>

                    <View
                      style={{
                        flexDirection: "column",
                        marginLeft: 10,
                        justifyContent: "center",
                      }}>
                      <Text
                        style={{
                          color: "#474747",
                          fontSize: 15,
                          fontWeight: "800",
                        }}>
                        Đăng xuất
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity onPress={handleLogout}>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={25}
                    color="#9D85F2"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
});

//make this component available to the app
export default Other;
