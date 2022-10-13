//import liraries
import { Ionicons } from "@expo/vector-icons";
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
  RefreshControl,
} from "react-native";
import Lottie from "lottie-react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { getEventsAction } from "../../redux/actions/eventsAction";
import { formatDateDisplay, formatDateTimeDisplay } from "../../utils/datetime";
import { URL } from "../../utils/fetchApi";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const dataHeader = [
  {
    name: "Đang diễn ra",
    code: "dangdienra",
  },
  {
    name: "Sắp diễn ra",
    code: "sapdienra",
  },
  {
    name: "Đã diễn ra",
    code: "dadienra",
  },
];
const dataEvents = [
  {
    nameEvent: "Sự kiện 1",
    picture: require("../../assets/e1.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: true,
    code: "dangdienra",
  },
  {
    nameEvent: "Sự kiện 2",
    picture: require("../../assets/e2.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: true,
    code: "dangdienra",
  },
  {
    nameEvent: "Sự kiện 3",
    picture: require("../../assets/e3.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: false,
    code: "dangdienra",
  },
  {
    nameEvent: "Sự kiện 4",
    picture: require("../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: false,
    code: "dangdienra",
  },
  {
    nameEvent: "Sự kiện 5",
    picture: require("../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: true,
    code: "dangdienra",
  },
  {
    nameEvent: "Sự kiện 6",
    picture: require("../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: false,
    code: "sapdienra",
  },
  {
    nameEvent: "Sự kiện 7",
    picture: require("../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: true,
    code: "sapdienra",
  },
  {
    nameEvent: "Sự kiện 8",
    picture: require("../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: false,
    code: "dadienra",
  },
  {
    nameEvent: "Sự kiện 9",
    picture: require("../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: true,
    code: "dadienra",
  },
];
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const Events = () => {
  const [cat, setCat] = useState("dangdienra");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const { auth, event } = useSelector((state) => state);

  // console.log(
  //   event.getEvents.map((item) => formatDateTimeDisplay(item.ngay_su_kien))
  // );

  useEffect(() => {
    setRefreshing(true);
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch, cat]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch, cat]);
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
            Danh sách sự kiện
          </Text>

          {refreshing && (
            <View
              style={{
                left: 10,
                padding: 30,
                position: "absolute",
                left: "100%",
              }}>
              <Lottie
                source={require("../../assets/loading.json")}
                autoPlay
                loop
              />
            </View>
          )}
        </View>

        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "100%" }}>
        <View
          style={{
            backgroundColor: "#f3f3f3",
            marginHorizontal: 15,
            marginTop: 15,
            marginBottom: 10,
            borderRadius: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          {dataHeader.map((item, index) => (
            <TouchableOpacity
              style={{
                backgroundColor: item.code === cat ? "#711775" : "#f3f3f3",
                borderRadius: 20,
                paddingHorizontal: 23,
              }}
              key={index}
              onPress={() => setCat(item.code)}>
              <Text
                style={{
                  color: item.code === cat ? "#ffffff" : "#A0A0A0",
                  marginVertical: 5,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ marginBottom: "80%" }}>
            {event.getEvents.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  // alignItems: "center",
                  marginBottom: 10,
                  borderRadius: 8,
                  paddingVertical: 5,
                  marginHorizontal: 15,
                  borderBottomColor: "#DADADA",
                  borderBottomWidth: 0.5,
                }}
                onPress={() => navigation.navigate("DetailEvents")}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      borderRadius: 7,
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Image
                      source={{ uri: `${URL}${item.hinh_anh}` }}
                      style={{ width: 80, height: 80, borderRadius: 7 }}
                    />
                  </View>
                  <View
                    style={{
                      width: "75%",
                      justifyContent: "space-evenly",
                      alignItems: "stretch",
                      marginLeft: 10,
                    }}>
                    <Text
                      style={{
                        color: "#474747",
                        fontSize: 14,
                        fontWeight: "600",
                      }}>
                      {item.ten_su_kien}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#EEF4FF",
                        width: "50%",
                        borderRadius: 13,
                        paddingHorizontal: 4,
                        paddingVertical: 2,
                      }}>
                      <Ionicons name="calendar" size={15} color="#769CEC" />
                      <Text
                        style={{
                          color: "#769CEC",
                          fontSize: 11,
                          fontWeight: "600",
                          left: 10,
                        }}>
                        {formatDateDisplay(item.ngay_su_kien)}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons name="location" size={14} />
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 10,
                          fontWeight: "600",
                          left: 5,
                        }}>
                        {item.dia_diem}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",

                    width: "15%",
                    marginLeft: 10,
                  }}>
                  <TouchableOpacity>
                    <Ionicons
                      name={item.save ? "bookmark" : "bookmark-outline"}
                      size={20}
                      color={item.save ? "#FFBE17" : "#711775"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons
                      name="alert-circle-outline"
                      size={20}
                      color="#9D85F2"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
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
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
});

//make this component available to the app
export default Events;
