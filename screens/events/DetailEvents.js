//import liraries
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
  RefreshControl,
} from "react-native";
import Lottie from "lottie-react-native";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import ModalPayment from "../../components/modal/ModalPayment";
import { useDispatch, useSelector } from "react-redux";
import {
  formatCash,
  formatDateDisplays,
  formatTimeDisplay,
} from "../../utils/datetime";
import { URL } from "../../utils/fetchApi";
import ModalChoosePayment from "../../components/modal/ModalChoosePayment";
import { Admin, Partner } from "../../utils/AccessPermission";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// create a component
const DetailEvents = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [showTakePicture, setShowTakePicture] = useState(false);
  const dispatch = useDispatch();

  const { auth, event } = useSelector((state) => state);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  let dateEvent = new Date(formatDateDisplays(event.detailEvent.ngay_su_kien));
  let year = dateEvent.getFullYear();
  let month = dateEvent.getMonth() + 1;
  let day = dateEvent.getDate();
  let dayofweek = dateEvent.getDay();

  const dayname = [
    "Chủ nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];

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
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
            Chi tiết sự kiện
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
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#826CCF", "green", "blue"]}
            />
          }>
          <View style={{ marginBottom: "80%" }}>
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 20,
                flexDirection: "column",
              }}>
              <View style={{ marginHorizontal: 15 }}>
                <Image
                  source={{ uri: `${URL}${event.detailEvent.hinh_anh}` }}
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 8,
                    opacity: 0.5,
                    backgroundColor: "#474747",
                    resizeMode: "contain",
                  }}
                />
                <View
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: "#ffffff",
                    position: "absolute",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    height: 160,
                    marginVertical: 10,
                    marginHorizontal: 13,
                  }}>
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "600",
                      color: "#ffffff",
                    }}>
                    {event.detailEvent.ten_su_kien}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 5,
                    borderColor: "#826CCF",
                    borderRadius: 20,
                    borderWidth: 0.8,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Text
                    style={{
                      color: "#826CCF",
                      fontSize: 10,
                      fontWeight: "600",
                    }}>
                    Hội thảo
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <Image source={require("../../assets/a4.png")} />
                  <Text
                    style={{ fontSize: 10, color: "#b0b0b0", marginLeft: 2 }}>
                    Bạn chưa tham gia
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onPress={() => navigation.navigate("ListParticipant")}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <Image
                      source={require("../../assets/a1.png")}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        left: 14,
                        zIndex: 3,
                        resizeMode: "contain",
                      }}
                    />
                    <Image
                      source={require("../../assets/a2.png")}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        left: 6,
                        zIndex: 2,
                        resizeMode: "contain",
                      }}
                    />
                    <Image
                      source={require("../../assets/a3.png")}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        resizeMode: "contain",
                      }}
                    />
                  </View>

                  <Text style={{ fontSize: 10, marginLeft: 2 }}>
                    {event.detailEvent.ds_tham_gia
                      ? event.detailEvent.ds_tham_gia.length
                      : 0}{" "}
                    người tham gia
                  </Text>

                  <Ionicons
                    name="arrow-forward-outline"
                    color="#9D85F2"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
              <LinearGradient
                start={{ x: 0, y: 0.3 }}
                end={{ x: 1, y: 1 }}
                colors={[
                  "#9D85F2",
                  "rgba(157, 133, 242, 0.6)",
                  "rgba(157, 133, 242, 0.4)",
                ]}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderRadius: 10,
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "800",
                      color: "#ffffff",
                    }}>
                    {day}
                  </Text>
                  <View
                    style={{
                      left: 20,
                      borderBottomLeftRadius: 10,
                      borderTopLeftRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        color: "#ffffff",
                      }}>
                      {dayname[dayofweek]}
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "600",
                        color: "#ffffff",
                      }}>
                      Tháng {month}, {year}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="time-outline" size={15} color="#ffffff" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "400",
                      color: "#ffffff",
                      left: 5,
                    }}>
                    {formatTimeDisplay(event.detailEvent.ngay_su_kien)}
                  </Text>
                </View>
              </LinearGradient>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <View>
                  <Ionicons name="location" size={30} color="#E51104" />
                </View>
                <View
                  style={{
                    marginLeft: 10,
                    paddingHorizontal: 10,
                  }}>
                  <Text style={styles.headerContent}>
                    {event.detailEvent.dia_diem}
                  </Text>

                  <View>
                    <TouchableOpacity
                      style={{
                        borderRadius: 7,
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                      }}
                      onPress={() => navigation.navigate("Map")}>
                      <LinearGradient
                        start={{ x: 1, y: 0.3 }}
                        end={{ x: 1, y: 1 }}
                        colors={["#9D85F2", "#9D85F2"]}
                        style={{
                          borderRadius: 20,
                          paddingVertical: 3,
                          paddingHorizontal: 8,
                          flexDirection: "row",
                          justifyContent: "center",
                        }}>
                        <Ionicons name="location" size={15} color="#ffffff" />
                        <Text
                          style={{
                            fontSize: 12,
                            color: "#ffffff",
                            textAlign: "center",
                            fontWeight: "500",
                          }}>
                          Xem bản đồ
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.headerText}>Thời gian</Text>
                  <Text style={styles.headerText}>Nội dung chương trình</Text>
                </View>
                {event.detailEvent.noi_dung &&
                  event.detailEvent.noi_dung.map((item, index) => (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "flex-start",
                        paddingHorizontal: 5,
                        marginBottom: 5,
                      }}
                      key={index}>
                      <View
                        style={{
                          borderRightWidth: 1,
                          borderColor: "#B0B0B0",
                        }}>
                        <Text style={styles.timeEvent}>
                          {formatTimeDisplay(item.thoi_gian)}
                        </Text>
                      </View>

                      <View
                        style={{
                          paddingLeft: 10,

                          width: "75%",
                        }}>
                        <View
                          style={{
                            backgroundColor: "#F6F6F5",
                            borderRadius: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: "400",
                              marginVertical: 5,
                              marginHorizontal: 10,
                            }}>
                            {item.noi_dung}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
              </View>
            </View>
            <View style={styles.containerBox}>
              <View>
                <MaterialCommunityIcons
                  name="ticket-confirmation"
                  size={30}
                  color="#2BA600"
                />
              </View>
              <View style={{ marginHorizontal: 10 }}>
                <Text style={styles.headerContent}>Giá vé</Text>
              </View>

              <View style={styles.conText}>
                {event.detailEvent.cs_ve &&
                  event.detailEvent.cs_ve.map((item) => (
                    <Text style={styles.bodyContent} key={item.line}>
                      {item.loai_ve}:{" "}
                      {item.gia_ve && formatCash(item.gia_ve.toString(10))} VND
                    </Text>
                  ))}
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingHorizontal: 15,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CheckQR")}>
                  <LinearGradient
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#9D85F2", "rgba(157, 133, 242, 0.4)"]}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      borderRadius: 15,
                    }}>
                    <View
                      style={
                        auth.permission.admin
                          ? styles.buttonEx
                          : styles.buttonCheckin
                      }>
                      <Text style={styles.buttonText}>Check-in</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                {auth.permission.group_id === Admin && (
                  <TouchableOpacity
                    onPress={() => {
                      setModalSuccess(true);
                    }}>
                    <LinearGradient
                      start={{ x: 0, y: 0.3 }}
                      end={{ x: 1, y: 1 }}
                      colors={["#9D85F2", "rgba(157, 133, 242, 0.4)"]}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: 15,
                        marginHorizontal: 10,
                      }}>
                      <View style={styles.buttonEx}>
                        <Text style={styles.buttonText}>Thanh toán</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
                {(auth.permission.group_id === Admin ||
                  auth.permission.group_id === Partner) && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ReportExcel")}>
                    <LinearGradient
                      start={{ x: 0, y: 0.3 }}
                      end={{ x: 1, y: 1 }}
                      colors={["#9D85F2", "rgba(157, 133, 242, 0.4)"]}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: 15,
                      }}>
                      <View style={styles.buttonEx}>
                        <Text style={styles.buttonText}>Báo cáo</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {modalSuccess && (
              <ModalPayment
                modalSuccess={modalSuccess}
                setModalSuccess={setModalSuccess}
                showTakePicture={showTakePicture}
                setShowTakePicture={setShowTakePicture}
                content={"Xác nhận thanh toán thành công"}
                textButton={"Tiếp tục"}
              />
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

  containerBox: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backBorder: {
    padding: 15,
    backgroundColor: "#EDD5ED",
    borderRadius: 40,
    borderColor: "#711775",
    borderWidth: 0.8,
  },
  conText: {
    marginHorizontal: 10,
    marginRight: "10%",
  },
  headerContent: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
  bodyContent: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "justify",
    marginVertical: 3,
    color: "#474747",
  },
  containerCheckin: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  borderBacRounded: {
    padding: 20,
  },
  imageCheckin: {
    width: 20,
    height: 20,
  },
  headerText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#B0B0B0",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  timeEvent: {
    fontSize: 13,
    fontWeight: "400",
    color: "#000",
    paddingHorizontal: 13,
    paddingVertical: 5,
  },
  buttonCheckin: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonEx: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});

//make this component available to the app
export default DetailEvents;
