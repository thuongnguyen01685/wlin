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
import {
  getDetailMember,
  getMemberAction,
} from "../../../redux/actions/ClupAction";
import { URL } from "../../../utils/fetchApi";

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
const BodyListMember = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const { auth, club } = useSelector((state) => state);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getMemberAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setRefreshing(true);
    dispatch(getMemberAction(auth.token));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleDetailMember = (_id) => {
    dispatch(getDetailMember(_id, auth.token));

    navigation.navigate("ManagementMember");
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
        Danh sách hội viên
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#711775", "green", "blue"]}
          />
        }>
        <View style={{ marginBottom: "20%" }}>
          {club.getMember.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#F3F3F3",
                marginVertical: 10,
                borderRadius: 8,
                paddingVertical: 5,
                marginHorizontal: 15,
              }}
              onPress={() => handleDetailMember(item._id)}>
              <View
                style={{
                  flexDirection: "row",

                  alignItems: "center",
                  width: "70%",
                }}>
                <View style={{ flexDirection: "row", marginHorizontal: 10 }}>
                  {item.hinh_anh ? (
                    <Image
                      source={{
                        uri: `${URL}/`.concat(`${item.hinh_anh}`),
                      }}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        resizeMode: "contain",
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/logo.png")}
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        resizeMode: "contain",
                      }}
                    />
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}>
                  <Text
                    style={{
                      color: "#711775",
                      fontSize: 15,
                      fontWeight: "600",
                    }}>
                    {item.ten_kh}
                  </Text>
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 12,
                      fontWeight: "500",
                    }}>
                    {item.ten_trang_thai}
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
                    name="alert-circle-outline"
                    size={20}
                    color="#711775"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
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
export default BodyListMember;
