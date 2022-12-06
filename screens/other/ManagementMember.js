//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import React, { Component, useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Animated,
  FlatList,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Lottie from "lottie-react-native";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import {
  getCLub,
  getDetailClub,
  getDetailMember,
} from "../../redux/actions/ClupAction";
import { Avatar, Surface } from "react-native-paper";
import { URL } from "../../utils/fetchApi";
import Loading from "../../components/loading/Loading";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const { height } = Dimensions.get("screen");
// create a component
const ManagementMember = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  const { auth, club } = useSelector((state) => state);
  const [page, setPage] = useState(1);
  const [searchPart, setSearchPart] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleDetail = (_id) => {
    dispatch(getDetailClub(_id, auth.token));
    navigation.navigate("DetailClub", { _id: _id });
  };

  useEffect(() => {
    setRefreshing(true);
    wait(500).then(() => setRefreshing(false));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(1000).then(() => setRefreshing(false));
  }, [dispatch]);

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
            Chi tiết hội viên
          </Text>
          {refreshing && <Loading size="large" />}
        </View>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              marginBottom: "70%",
              paddingHorizontal: 25,
              marginTop: 15,
            }}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                alignItems: "center",
              }}>
              <Image
                source={
                  club.detailMember?.hinh_anh
                    ? {
                        uri: `${URL}/`.concat(`${club.detailMember.hinh_anh}`),
                      }
                    : require("../../assets/avtUser.png")
                }
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 50,
                  resizeMode: "contain",
                }}
              />

              <Text
                style={{ fontSize: 13, fontWeight: "600", marginVertical: 10 }}>
                {club.detailMember?.ten_kh}
              </Text>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.header}>Gói thành viên</Text>
              <TouchableOpacity style={styles.card}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}>
                  <LinearGradient
                    start={{ x: 1, y: 0.7 }}
                    end={{ x: 0.3, y: 0.8 }}
                    colors={
                      club.detailMember?.goi_thanh_vien === "01"
                        ? ["#ABABAB", "#DFDFDF", "#C5C5C5", "#B9B9B9"]
                        : club.detailMember?.goi_thanh_vien === "02"
                        ? ["#DEC1A1", "#FBECD7", "#F5DFC7", "#D5B59C"]
                        : club.detailMember?.goi_thanh_vien === "03"
                        ? ["#7289DD", "#D0DAFF", "#ABBCF8", "#7E96E9"]
                        : club.detailMember?.goi_thanh_vien === "04"
                        ? ["#1F1F1f", "#646464", "#484848", "#373737"]
                        : ["#000", "#000"]
                    }
                    style={{ width: 20, height: 20, borderRadius: 5 }}>
                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}>
                      <Image
                        source={require("../../assets/logo.png")}
                        style={{ width: 10, height: 10 }}
                      />
                      <Text style={{ fontSize: 3, color: "#969696" }}>
                        Gói vàng
                      </Text>
                    </View>
                  </LinearGradient>
                  <Text
                    style={{
                      color:
                        club.detailMember.goi_thanh_vien === "01"
                          ? "#6A6A6A"
                          : club.detailMember.goi_thanh_vien === "02"
                          ? "#8D6B48"
                          : club.detailMember.goi_thanh_vien === "03"
                          ? "#5A54A5"
                          : club.detailMember.goi_thanh_vien === "04" &&
                            "#1f1f1f",
                      fontSize: 11,
                      fontWeight: "500",
                      marginHorizontal: 10,
                    }}>
                    {club.detailMember.goi_thanh_vien === "01"
                      ? "Gói bạc"
                      : club.detailMember.goi_thanh_vien === "02"
                      ? "Gói vàng"
                      : club.detailMember.goi_thanh_vien === "03"
                      ? "Gói kim cương"
                      : club.detailMember.goi_thanh_vien === "04"
                      ? "Gói partner"
                      : "Chưa có gói thành viên"}
                  </Text>
                </View>
                <Ionicons name="caret-down-outline" size={20} color="#474747" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.header}>Danh sách CLUB</Text>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#9796F0", "green", "blue"]}
                  />
                }>
                <View>
                  {club.detailMember?.ds_club?.map((item) => (
                    <TouchableOpacity
                      key={item._id}
                      onPress={() => handleDetail(item._id)}>
                      <Surface style={styles.surface}>
                        <View
                          style={{
                            borderRadius: 8,
                            borderWidth: 0.4,
                            borderColor: "#DADADA",
                            paddingVertical: 15,
                            paddingHorizontal: 5,
                            top: -10,
                          }}>
                          <Image
                            source={
                              item.hinh_anh
                                ? {
                                    uri: `${URL}/`.concat(`${item.hinh_anh}`),
                                  }
                                : require("../../assets/logo.png")
                            }
                            style={{
                              width: 80,
                              height: 40,
                              borderRadius: 7,
                            }}
                          />
                        </View>

                        <View
                          style={{
                            width: "55%",
                            top: -10,
                          }}>
                          <Text
                            style={{
                              color: "#474747",
                              fontSize: 14,
                              fontWeight: "600",
                            }}>
                            {item.ten_club}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                            }}>
                            <View
                              style={{
                                backgroundColor: "#EDF8FC",
                                flexDirection: "row",
                                paddingHorizontal: 2,
                                borderRadius: 10,
                                alignItems: "center",
                                marginTop: 5,
                              }}>
                              <Ionicons
                                name="people"
                                color="#139ECA"
                                size={20}
                              />
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: "600",
                                  color: "#139ECA",
                                }}>
                                {item.ds_thanh_vien.length} thành viên
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: "#ECECF9",
                                flexDirection: "row",
                                paddingHorizontal: 2,
                                borderRadius: 10,
                                alignItems: "center",
                                marginTop: 5,
                              }}>
                              <Ionicons
                                name="calendar"
                                color="#1D19D4"
                                size={20}
                              />
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: "600",
                                  color: "#1D19D4",
                                }}>
                                {item.count_sukien} sự kiện
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: "#FAEEF0",
                                flexDirection: "row",
                                paddingHorizontal: 2,
                                borderRadius: 10,
                                alignItems: "center",
                                marginTop: 5,
                              }}>
                              <Ionicons
                                name="reader"
                                color="#F12247"
                                size={20}
                              />
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: "600",
                                  color: "#F12247",
                                }}>
                                20 referrals
                              </Text>
                            </View>
                            <View
                              style={{
                                backgroundColor: "#EEFBEE",
                                flexDirection: "row",
                                paddingHorizontal: 2,
                                borderRadius: 10,
                                alignItems: "center",
                                marginTop: 5,
                              }}>
                              <Ionicons name="leaf" color="#058602" size={20} />
                              <Text
                                style={{
                                  fontSize: 10,
                                  fontWeight: "600",
                                  color: "#058602",
                                }}>
                                20 TYFCBs
                              </Text>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleDetail(item._id)}
                          style={{ top: -10 }}>
                          <Ionicons
                            name="chevron-forward-outline"
                            size={25}
                            color="#9D85F2"
                          />
                        </TouchableOpacity>
                      </Surface>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
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
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: "#F9F9F9",
    paddingVertical: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  textArea: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 7,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bgInput: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 7,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 14,
    color: "#474747",
    fontWeight: "600",
    marginBottom: 7,
  },
  surface: {
    height: height * 0.12,
    marginTop: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#Fff",
    borderBottomWidth: 0.5,
    borderColor: "#DADADA",
    paddingTop: 22,
  },

  containerView: {
    marginBottom: 8,
  },
});

//make this component available to the app
export default ManagementMember;
