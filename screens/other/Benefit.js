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
import { getBenefitMember } from "../../redux/actions/benefitAction";
import {
  getDetailBenefit,
  getListBenefit,
} from "../../redux/actions/ClupAction";
import { Admin } from "../../utils/AccessPermission";
import { formatCash } from "../../utils/datetime";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const Benefit = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, club, benefit } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    setRefreshing(true);
    dispatch(getListBenefit(auth.token));
    dispatch(getBenefitMember(auth.token, auth.customer.of_user));
    wait(100).then(() => setRefreshing(false));
  }, [dispatch]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getListBenefit(auth.token));
    dispatch(getBenefitMember(auth.token, auth.customer.of_user));
    wait(1000).then(() => setRefreshing(false));
  }, [dispatch]);

  const handleDetailBenefit = (_id) => {
    dispatch(getDetailBenefit(_id, auth.token));
    navigation.navigate("DetailBenefit");
  };

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
          <Text
            style={{
              fontSize: 16,
              color: "#826CCF",
              fontFamily: "LexendDeca_600SemiBold",
            }}>
            Danh sách nhóm quyền lợi
          </Text>

          {refreshing && <Loading size="large" />}
        </View>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor="#9D85F2"
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["red", "yellow", "green"]}
            />
          }>
          <View
            style={{
              marginBottom: "70%",
              paddingHorizontal: 15,
              marginTop: 10,
            }}>
            {auth.permission.group_id !== Admin ? (
              <View>
                <View>
                  {club.getBenefit
                    .filter(
                      (items) =>
                        items.ma_nhquyenloi !== auth.customer.nhom_quyen_loi
                    )
                    .map((item, index) => (
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#Ffffff",
                          borderRadius: 8,
                          paddingVertical: 20,
                          paddingHorizontal: 15,
                          borderBottomWidth: 0.5,
                          borderColor: "#dadada",
                        }}
                        key={index}
                        onPress={() => handleDetailBenefit(item._id)}>
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
                                  fontFamily: "LexendDeca_600SemiBold",
                                }}>
                                {item.ten_nhquyenloi}
                              </Text>
                              <View
                                style={{
                                  backgroundColor:
                                    item.goi_thanh_vien === "03"
                                      ? "#EEF4FF"
                                      : item.goi_thanh_vien === "01"
                                      ? "#EDEDED"
                                      : item.goi_thanh_vien === "04"
                                      ? "#F0ECFF"
                                      : "#FEF8E3",
                                  borderRadius: 10,
                                  width: "60%",
                                }}>
                                <Text
                                  style={{
                                    color: "#000000",
                                    fontSize: 12,
                                    fontFamily: "LexendDeca_500Medium",
                                    textAlign: "center",
                                  }}>
                                  Gói: {item.ten_goi_thanh_vien}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleDetailBenefit(item._id)}>
                          <Ionicons
                            name="chevron-forward-outline"
                            size={25}
                            color="#9D85F2"
                          />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.myBenefit}>
                  <Text style={styles.title}>Nhóm quyền lợi của tôi</Text>
                  <View>
                    {club.getBenefit
                      .filter(
                        (items) =>
                          items.ma_nhquyenloi === auth.customer.nhom_quyen_loi
                      )
                      .map((item, index) => (
                        <TouchableOpacity
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            backgroundColor: "#Ffffff",
                            borderRadius: 8,
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            borderWidth: 0.5,
                            borderColor: "#dadada",
                            marginTop: 10,
                          }}
                          key={index}
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
                                    fontFamily: "LexendDeca_600SemiBold",
                                  }}>
                                  {item.ten_nhquyenloi}
                                </Text>
                                <View
                                  style={{
                                    backgroundColor:
                                      item.goi_thanh_vien === "03"
                                        ? "#EEF4FF"
                                        : item.goi_thanh_vien === "01"
                                        ? "#EDEDED"
                                        : item.goi_thanh_vien === "04"
                                        ? "#F0ECFF"
                                        : "#FEF8E3",
                                    borderRadius: 10,
                                    width: "60%",
                                  }}>
                                  <Text
                                    style={{
                                      color: "#000000",
                                      fontSize: 12,
                                      fontFamily: "LexendDeca_500Medium",
                                      textAlign: "center",
                                    }}>
                                    Gói: {item.ten_goi_thanh_vien}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>

                          <TouchableOpacity
                            onPress={() => setShowDetail(!showDetail)}>
                            {!showDetail ? (
                              <Ionicons
                                name="chevron-up-outline"
                                size={25}
                                color="#9D85F2"
                              />
                            ) : (
                              <Ionicons
                                name="chevron-down-outline"
                                size={25}
                                color="#9D85F2"
                              />
                            )}
                          </TouchableOpacity>
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>
                {showDetail &&
                  benefit.benefitMember.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "column",
                        borderRadius: 15,
                        borderWidth: 0.5,
                        borderColor: "#dadada",
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        marginVertical: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}>
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
                          <Text
                            style={{
                              fontFamily: "LexendDeca_500Medium",
                              color: "#fff",
                            }}>
                            {index + 1}
                          </Text>
                        </LinearGradient>
                        <View
                          style={{
                            flexDirection: "column",
                            marginHorizontal: 10,
                            marginLeft: 10,
                            width: "80%",
                          }}>
                          <Text
                            style={{
                              fontSize: 10,
                              fontFamily: "LexendDeca_600SemiBold",
                            }}>
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
                                fontFamily: "LexendDeca_500Medium",
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
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-end",
                          alignItems: "center",
                        }}>
                        <View
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            backgroundColor:
                              item.trang_thai === "2"
                                ? "#64DF5A"
                                : item.trang_thai === "1"
                                ? "#FBD237"
                                : "#FA846F",
                            borderRadius: 15,
                          }}>
                          <Text
                            style={{
                              color: "#fff",
                              fontSize: 12,
                              fontFamily: "LexendDeca_400Regular",
                            }}>
                            {item.trang_thai === "2"
                              ? "Đã trả QL"
                              : item.trang_thai === "1"
                              ? "Đang trả QL"
                              : "Chưa trả QL"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
            ) : (
              <View>
                {club.getBenefit.map((item, index) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      backgroundColor: "#Ffffff",
                      borderRadius: 8,
                      paddingVertical: 20,
                      paddingHorizontal: 15,
                      borderBottomWidth: 0.5,
                      borderColor: "#dadada",
                    }}
                    key={index}
                    onPress={() => handleDetailBenefit(item._id)}>
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
                              fontFamily: "LexendDeca_600SemiBold",
                            }}>
                            {item.ten_nhquyenloi}
                          </Text>
                          <View
                            style={{
                              backgroundColor:
                                item.goi_thanh_vien === "03"
                                  ? "#EEF4FF"
                                  : item.goi_thanh_vien === "01"
                                  ? "#EDEDED"
                                  : item.goi_thanh_vien === "04"
                                  ? "#F0ECFF"
                                  : "#FEF8E3",
                              borderRadius: 10,
                              width: "60%",
                            }}>
                            <Text
                              style={{
                                color: "#000000",
                                fontSize: 12,
                                fontFamily: "LexendDeca_500Medium",
                                textAlign: "center",
                              }}>
                              Gói: {item.ten_goi_thanh_vien}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDetailBenefit(item._id)}>
                      <Ionicons
                        name="chevron-forward-outline"
                        size={25}
                        color="#9D85F2"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}
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
  title: {
    fontSize: 16,
    fontFamily: "LexendDeca_600SemiBold",
    color: "#826CCF",
    marginHorizontal: 8,
  },
  myBenefit: {
    marginTop: 10,
  },
});

//make this component available to the app
export default Benefit;
