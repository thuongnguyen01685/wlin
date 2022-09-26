//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getEventsAction } from "../../../redux/actions/eventsAction";
import CheckBox from "expo-checkbox";

import ModalRequest from "../../modal/ModalRequest";

const dataHeader = [
  {
    name: "Chưa thanh toán",
    code: "chuathanhtoan",
  },
  {
    name: "Đã thanh toán",
    code: "dathanhtoan",
  },
];
const dataEvents = [
  {
    namePaticipant: "Jenny Wilson",
    picture: require("../../../assets/truong.png"),
    check: true,
    position: "Hội viên",
    code: "dathanhtoan",
  },
  {
    namePaticipant: "Jenny Wilson",
    picture: require("../../../assets/truong.png"),
    check: true,
    position: "Hội viên",
    code: "chuathanhtoan",
  },
  {
    namePaticipant: "Courtney Henry",
    picture: require("../../../assets/truong.png"),
    check: true,
    position: "Hội viên",
    code: "dathanhtoan",
  },
  {
    namePaticipant: "Wade Warren",
    picture: require("../../../assets/truong.png"),
    check: true,
    position: "Hội viên",
    code: "dathanhtoan",
  },
  {
    namePaticipant: "Marvin McKinney",
    picture: require("../../../assets/truong.png"),
    check: true,
    position: "Hội viên",
    code: "dathanhtoan",
  },
  {
    namePaticipant: "Esther Howard",
    picture: require("../../../assets/truong.png"),
    check: false,
    position: "Hội viên",
    code: "chuathanhtoan",
  },
  {
    namePaticipant: "Jerome Bell",
    picture: require("../../../assets/truong.png"),
    check: true,
    position: "Hội viên",
    code: "chuathanhtoan",
  },
  {
    namePaticipant: "Jane Cooper",
    picture: require("../../../assets/truong.png"),
    check: false,
    position: "Hội viên",
    code: "chuathanhtoan",
  },
  {
    namePaticipant: "Lexend Deca",
    picture: require("../../../assets/truong.png"),
    check: false,
    position: "Hội viên",
    code: "chuathanhtoan",
  },
];
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const BodyConfirmPayment = () => {
  const [cat, setCat] = useState("chuathanhtoan");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

  const [modalSuccess, setModalSuccess] = useState(false);
  const [checkPayment, setCheckPayment] = useState(false);

  const { event } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getEventsAction());
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEventsAction());
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  const handleGoUpdateEvent = () => {
    navigation.navigate("UpdateEvent");
  };

  return (
    <View style={{ height: "100%" }}>
      <Text
        style={{
          fontSize: 20,
          color: "#711775",
          fontWeight: "600",
          paddingLeft: 20,
          paddingTop: 18,
        }}>
        Xác nhận thanh toán
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ marginBottom: "20%" }}>
          {dataEvents.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#F3F3F3",
                marginVertical: 10,
                borderRadius: 8,
                paddingVertical: 5,
                marginHorizontal: 10,
                paddingHorizontal: 10,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                  <Image
                    source={item.picture}
                    style={{ width: 70, height: 70 }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}>
                  <Text
                    style={{
                      color: "#711775",
                      fontSize: 18,
                      fontWeight: "600",
                    }}>
                    {item.namePaticipant}
                  </Text>
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 10,
                      fontWeight: "600",
                    }}>
                    {item.position}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "20%",
                }}>
                <TouchableOpacity>
                  <Ionicons
                    name="close-circle-outline"
                    size={20}
                    color="#711775"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="alert-circle-outline"
                    size={20}
                    color="#711775"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 7,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                width: "35%",
                justifyContent: "center",
                marginBottom: 10,
              }}
              onPress={handleGoUpdateEvent}>
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
                    fontWeight: "500",
                  }}>
                  Cập nhật sự kiện
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
});

//make this component available to the app
export default BodyConfirmPayment;
