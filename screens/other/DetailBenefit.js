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
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import Loading from "../../components/loading/Loading";
import { formatCash } from "../../utils/datetime";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const data = [
  {
    detail:
      "Trở thành thành viên chính thức của WLIN Global và được tham gia các group Members để quảng bá, truyền thông và kết nối.",
    gia_tri: 8000000,
  },
  {
    detail:
      "Trở thành thành viên chính thức của WLIN Global và được tham gia các group Members để quảng bá, truyền thông và kết nối.",
    gia_tri: 8000000,
  },
  {
    detail:
      "Trở thành thành viên chính thức của WLIN Global và được tham gia các group Members để quảng bá, truyền thông và kết nối.",
    gia_tri: 8000000,
  },
  {
    detail:
      "Được 1 bằng chứng nhận & hoa kết nạp thành viên Kim Cương của WLIN Global ",
    gia_tri: 8000000,
  },
  {
    detail: "Một pin logo WLIN mạ vàng 24K dành cho thành viên hạng Kim Cương",
    gia_tri: 8000000,
  },
  {
    detail:
      "Được 3 bài viết truyền thông về thương hiệu cá nhân trên trang wlin.com.vn/ năm",
    gia_tri: 8000000,
  },
  {
    detail:
      "Được 2 trang phỏng vấn trên tạp trí Phong Cách Doanh Nhân hoặc WL Magazine/ kỳ/ năm",
    gia_tri: 8000000,
  },
  {
    detail:
      "Được trở thành thành viên Kim Cương trên ứng dụng Wservice để nhận ưu đãi từ Mobile app VIP Card của WLIN Global/ năm",
    gia_tri: 8000000,
  },
  {
    detail: "Được quà tặng & thiệp chúc mừng sinh nhật",
    gia_tri: 8000000,
  },
];
// create a component
const DetailBenefit = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    //dispatch(getListBenefit(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //dispatch(getListBenefit(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

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
          marginTop: -50,
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
              Chi tiết nhóm quyền lợi
            </Text>

            {refreshing && <Loading size="large" />}
          </View>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#Ffffff",
            borderRadius: 15,
            paddingVertical: 20,
            paddingHorizontal: 15,
            borderWidth: 0.5,
            borderColor: "#dadada",
            marginTop: 10,
            marginHorizontal: 15,
          }}
          onPress={() => setShowDetail(!showDetail)}>
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
                  borderRadius: 15,
                  borderColor: "#dadada",
                  borderWidth: 0.4,
                  paddingVertical: 15,
                  paddingHorizontal: 5,
                }}>
                <Image
                  source={require("../../assets/logo.png")}
                  style={{ width: 60, height: 30 }}
                />
              </View>

              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 10,
                  justifyContent: "center",
                  width: "65%",
                }}>
                <Text
                  style={{
                    color: "#474747",
                    fontSize: 15,
                    fontWeight: "600",
                  }}>
                  {club.detailBenefit.ten_nhquyenloi}
                </Text>
                <View
                  style={{
                    backgroundColor:
                      club.detailBenefit.goi_thanh_vien === "03"
                        ? "#EEF4FF"
                        : club.detailBenefit.goi_thanh_vien === "01"
                        ? "#EDEDED"
                        : club.detailBenefit.goi_thanh_vien === "04"
                        ? "#F0ECFF"
                        : "#FEF8E3",
                    borderRadius: 10,
                    width: "60%",
                  }}>
                  <Text
                    style={{
                      color: "#000000",
                      fontSize: 12,
                      fontWeight: "500",
                      textAlign: "center",
                    }}>
                    Gói: {club.detailBenefit.ten_goi_thanh_vien}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#474747",
                    fontWeight: "600",
                  }}>
                  {club.detailBenefit.gia_tri &&
                    formatCash(club.detailBenefit.gia_tri.toString(10))}{" "}
                  VND
                </Text>
              </View>
            </View>
          </View>
          {!showDetail ? (
            <TouchableOpacity onPress={() => setShowDetail(!showDetail)}>
              <Ionicons name="chevron-up-outline" size={25} color="#9D85F2" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowDetail(!showDetail)}>
              <Ionicons name="chevron-down-outline" size={25} color="#9D85F2" />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ height: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor="#9D85F2"
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#9D85F2", "green", "blue"]}
            />
          }>
          <View
            style={{
              marginBottom: "100%",
              paddingHorizontal: 15,
              marginTop: 10,
            }}>
            {showDetail &&
              club.detailBenefit.details.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: 15,
                    borderWidth: 0.5,
                    borderColor: "#dadada",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    marginVertical: 5,
                  }}
                  key={index}>
                  <LinearGradient
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#9D85F2", "rgba(157, 133, 242, 0.4)"]}
                    style={{
                      borderRadius: 50,
                      width: 40,
                      height: 40,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Text>{index + 1}</Text>
                  </LinearGradient>
                  <View
                    style={{
                      flexDirection: "column",
                      marginHorizontal: 10,
                      marginLeft: 10,
                      width: "80%",
                    }}>
                    <Text style={{ fontSize: 10, fontWeight: "600" }}>
                      {item.ten_quyen_loi}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#EEF4FF",
                        borderRadius: 15,
                        paddingHorizontal: 5,
                        width: "60%",
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "600",
                          color: "#769CEC",
                        }}>
                        Giá trị:{" "}
                        {item.gia_tri
                          ? formatCash(item.gia_tri.toString(10))
                          : 0}{" "}
                        VND
                      </Text>
                    </View>
                  </View>
                </View>
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
});

//make this component available to the app
export default DetailBenefit;
