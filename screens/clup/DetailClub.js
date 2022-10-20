//import liraries
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  Animated,
  RefreshControl,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";

import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { URL } from "../../utils/fetchApi";
import { useSelector, useDispatch } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getDetailClub } from "../../redux/actions/ClupAction";
import { formatDateDisplay } from "../../utils/datetime";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const HEADER_HEIGHT = 130;

const Member = () => {
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);

  const [refreshing, setRefreshing] = React.useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: "80%",
            marginTop: 10,
          }}>
          {club.detailClub.ds_thanh_vien &&
            club.detailClub.ds_thanh_vien.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 10,
                  borderRadius: 15,
                  paddingVertical: 10,
                  marginHorizontal: 5,
                  paddingHorizontal: 10,
                  borderColor: "#dadada",
                  borderWidth: 0.7,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "55%",
                  }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={require("../../assets/truong.png")}
                      style={{ width: 70, height: 70 }}
                    />
                    <Image
                      source={require("../../assets/vmvang.png")}
                      style={{ width: 20, height: 20 }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      marginLeft: 4,
                    }}>
                    <Text
                      style={{
                        color: "#474747",
                        fontSize: 14,
                        fontWeight: "600",
                      }}>
                      {item.ten_kh}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#FEEAEA",
                        padding: 5,
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          color: "#F96F6D",
                          fontSize: 12,
                          fontWeight: "600",
                          textAlign: "center",
                        }}>
                        {item.ten_chuc_vu}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20%",
                    height: "50%",
                  }}>
                  <TouchableOpacity>
                    <Ionicons
                      name="alert-circle-outline"
                      size={20}
                      color="#5457A6"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
const Term = () => {
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);

  const [refreshing, setRefreshing] = React.useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: "80%",
            marginTop: 10,
          }}>
          {club.detailClub.nhiem_ky &&
            club.detailClub.nhiem_ky.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#Ffffff",
                  marginVertical: 10,
                  borderRadius: 15,
                  paddingVertical: 15,
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  // shadowColor: "#000",
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 1,
                  // },
                  // shadowOpacity: 0.25,
                  // shadowRadius: 3.84,

                  // elevation: 5,
                  borderColor: "#dadada",
                  borderWidth: 0.7,
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
                      borderColor: "#dadada",
                      borderWidth: 0.7,
                      borderRadius: 15,
                      paddingHorizontal: 2,
                      paddingVertical: 15,
                    }}>
                    <Image
                      source={require("../../assets/logo.png")}
                      style={{
                        width: 60,
                        height: 30,
                        resizeMode: "contain",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: 20,
                      justifyContent: "center",
                    }}>
                    <Text
                      style={{
                        color: "#474747",
                        fontSize: 18,
                        fontWeight: "600",
                        marginBottom: 5,
                      }}>
                      {item.ten_nhiem_ky}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#F0ECFF",
                        borderRadius: 15,
                        paddingHorizontal: 10,
                      }}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="rgba(157, 133, 242, 0.6)"
                      />
                      <Text
                        style={{
                          color: "rgba(157, 133, 242, 0.6)",
                          fontSize: 12,
                          fontWeight: "600",
                          marginLeft: 5,
                        }}>
                        {formatDateDisplay(item.tu_ngay)} -{" "}
                        {formatDateDisplay(item.den_ngay)}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                    backgroundColor: "#ffffff",
                    borderColor: "#9D85F2",
                    borderWidth: 1,
                    borderRadius: 7,
                  }}>
                  <MaterialIcons name="add" size={15} color="#9D85F2" />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
const Board = () => {
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [select, setSelect] = useState("nk1");
  const [refreshing, setRefreshing] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <View
          style={{
            borderRadius: 7,
            width: 120,
            height: 40,
            backgroundColor: "#ffffff",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}>
          <Picker
            selectedValue={select}
            onValueChange={(itemValue, itemIndex) => setSelect(itemValue)}>
            <Picker.Item
              label="Nhiệm kì 1"
              value="nk1"
              style={styles.itemSelect}
            />
            <Picker.Item
              label="Nhiệm kì 2"
              value="nk2"
              style={styles.itemSelect}
            />
          </Picker>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: "80%",
          }}>
          {club.detailClub.quan_tri &&
            club.detailClub.quan_tri.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#Ffffff",
                  marginVertical: 10,
                  borderRadius: 15,
                  paddingVertical: 10,
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  // shadowColor: "#000",
                  // shadowOffset: {
                  //   width: 0,
                  //   height: 1,
                  // },
                  // shadowOpacity: 0.25,
                  // shadowRadius: 3.84,

                  // elevation: 5,
                  borderColor: "#dadada",
                  borderWidth: 0.7,
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
                      borderColor: "#dadada",
                      borderWidth: 0.7,
                      borderRadius: 15,
                      paddingHorizontal: 2,
                      paddingVertical: 15,
                    }}>
                    <Image
                      source={require("../../assets/logo.png")}
                      style={{ width: 60, height: 30 }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: 20,
                      justifyContent: "center",
                      width: "50%",
                    }}>
                    <Text
                      style={{
                        color: "#474747",
                        fontSize: 16,
                        fontWeight: "600",
                      }}>
                      {item.ten_kh}
                    </Text>
                    <Text
                      style={{
                        color: "rgba(67, 67, 67, 0.4)",
                        fontSize: 12,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}>
                      {item.chuc_vu2}
                    </Text>
                    <View
                      style={{
                        padding: 5,
                        backgroundColor: "#EEF4FF",
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          color: "#769CEC",
                          fontSize: 12,
                          fontWeight: "600",
                          textAlign: "center",
                        }}>
                        {item.ten_chuc_vu}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      width: "25%",
                      marginHorizontal: 5,
                    }}>
                    <TouchableOpacity>
                      <Ionicons
                        name="create-outline"
                        size={20}
                        color="#9D85F2"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#E55656"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
const renderScene = SceneMap({
  first: Member,
  second: Term,
  third: Board,
});
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const DetailClub = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);

  const [refreshing, setRefreshing] = React.useState(false);

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Thành viên" },
    { key: "second", title: "Nhiệm kì" },
    { key: "third", title: "Ban quản trị" },
  ]);

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
            marginLeft: 10,
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
            Chi tiết CLUB
          </Text>
          {refreshing && (
            <View style={{ marginLeft: 10 }}>
              <ActivityIndicator size="small" color="#826CCF" />
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
        <Animated.View
          style={{
            marginTop: 2,
            left: 0,
            right: 0,
            zIndex: 10,
            height: 130,
            borderRadius: 7,
          }}>
          <Animated.View>
            <View style={{ marginTop: 5 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "600",
                  color: "#826CCF",
                  textAlign: "center",
                }}>
                {club.detailClub.ten_club}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: "column",
                  width: "40%",
                }}>
                {club.detailClub.hinh_anh ? (
                  <Image
                    source={{
                      uri: `${URL}/`.concat(`${club.detailClub.hinh_anh}`),
                    }}
                    style={{ width: 120, height: 70, borderRadius: 7 }}
                  />
                ) : (
                  <Image
                    source={require("../../assets/logo.png")}
                    style={{ width: 120, height: 50, borderRadius: 7 }}
                  />
                )}
              </View>

              <View style={{ width: "55%" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}>
                  <View
                    style={{
                      marginTop: 10,
                      height: 80,
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <Text style={styles.textContent}>
                        Partner: {club.detailClub.ten_partner}
                      </Text>
                      <TouchableOpacity style={{ marginLeft: 10 }}>
                        <Ionicons
                          name="call-outline"
                          color="#FBC7D4"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <Text style={styles.textContent}>
                        Thư ký: Mai Thu Huyền
                      </Text>
                      <TouchableOpacity>
                        <Ionicons
                          name="call-outline"
                          color="#FBC7D4"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <Text style={styles.textContent}>BD: Ms A</Text>
                      <TouchableOpacity>
                        <Ionicons
                          name="call-outline"
                          color="#FBC7D4"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
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
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
  itemSelect: {
    fontSize: 10,
    fontWeight: "800",
    color: "#474747",
    textAlign: "center",
  },
  textContent: {
    fontSize: 12,
    fontWeight: "400",
  },
  indicatorStyle: {
    backgroundColor: "#826CCF",
    padding: 1.5,
    marginBottom: -2,
  },
});

//make this component available to the app
export default DetailClub;
