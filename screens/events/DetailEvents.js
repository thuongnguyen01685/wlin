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
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

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
                  source={require("../../assets/bannerevent.png")}
                  style={{
                    width: "100%",
                    height: 180,
                    borderRadius: 8,
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
                    Sự kiện 1
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
                    300 người tham gia
                  </Text>

                  {/* <Ionicons
                    name="arrow-forward-outline"
                    color="#711775"
                    size={20}
                  /> */}
                </TouchableOpacity>
              </View>
            </View>
            {/* <View style={{ paddingHorizontal: 15 }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  Sự kiện 1
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("UpdateEvent")}>
                  <Image
                    source={require("../../assets/Edit.png")}
                    style={{
                      width: 25,
                      height: 12,
                      resizeMode: "contain",
                      marginLeft: 2,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ paddingLeft: 5 }}>
                <View style={styles.containerBox}>
                  <View>
                    <Ionicons name="calendar" size={30} color="#0F49C3" />
                  </View>
                  <View style={styles.conText}>
                    <Text style={styles.headerContent}>17 tháng 8, 2022</Text>
                    <Text style={styles.bodyContent}>Thứ 4, 9:00 - 11:00</Text>
                  </View>
                </View>
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
                    }}>
                    <Text style={styles.headerContent}>
                      Trung tâm sự kiện Diamond Place
                    </Text>
                    <Text style={styles.bodyContent}>
                      15A Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TP.HCM
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
                          colors={["#9D85F2", "#FBC7D4"]}
                          style={{
                            borderRadius: 7,
                            paddingVertical: 3,
                            paddingHorizontal: 6,
                            flexDirection: "row",
                            justifyContent: "center",
                          }}>
                          <Ionicons name="location" size={15} color="#ffffff" />
                          <Text
                            style={{
                              fontSize: 10,
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
                <View style={styles.containerBox}>
                  <View>
                    <Ionicons name="document-text" size={30} color="#7F04E0" />
                  </View>
                  <View style={styles.conText}>
                    <Text style={styles.headerContent}>
                      Nội dung chương trình
                    </Text>
                    <Text style={styles.bodyContent}>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book
                    </Text>
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
                  <View style={styles.conText}>
                    <Text style={styles.headerContent}>Giá vé</Text>
                    <Text style={styles.bodyContent}>
                      Thành viên: 500.000 VND
                    </Text>
                    <Text style={styles.bodyContent}>
                      Khách mời: 450.000 VND
                    </Text>
                  </View>
                </View>
              </View>
            </View> */}
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
                    17
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
                      Thứ 4
                    </Text>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: "600",
                        color: "#ffffff",
                      }}>
                      Tháng 8, 2022
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
                      left: 10,
                    }}>
                    9:00 - 11:00
                  </Text>
                </View>
              </LinearGradient>
            </View>
            <View style={{ paddingHorizontal: 15 }}>
              <View style={styles.containerCheckin}>
                <Text style={{ fontWeight: "600", fontSize: 14 }}>
                  Checkin bằng
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginLeft: 10,
                    width: "50%",
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CheckQR")}>
                    <LinearGradient
                      start={{ x: 0, y: 0.3 }}
                      end={{ x: 1, y: 1 }}
                      colors={["#9D85F2", "#FBC7D4"]}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: 30,
                      }}>
                      <View style={styles.borderBacRounded}>
                        <Ionicons
                          name="qr-code-outline"
                          size={20}
                          color="#ffffff"
                        />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("PayBenefits")}>
                    <LinearGradient
                      start={{ x: 0, y: 0.3 }}
                      end={{ x: 1, y: 1 }}
                      colors={["#9D85F2", "#FBC7D4"]}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: 30,
                      }}>
                      <View style={styles.borderBacRounded}>
                        <Ionicons
                          name="image-outline"
                          size={20}
                          color="#ffffff"
                        />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalSuccess(true);
                    }}>
                    <LinearGradient
                      start={{ x: 0, y: 0.3 }}
                      end={{ x: 1, y: 1 }}
                      colors={["#9D85F2", "#FBC7D4"]}
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                        borderRadius: 30,
                      }}>
                      <View style={styles.borderBacRounded}>
                        <Image
                          source={require("../../assets/coin.png")}
                          style={styles.imageCheckin}
                        />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {modalSuccess && (
              <ModalPayment
                modalSuccess={modalSuccess}
                setModalSuccess={setModalSuccess}
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
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
  containerBox: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
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
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 20,
  },
  bodyContent: {
    fontSize: 10,
    fontWeight: "400",
    textAlign: "justify",
    marginVertical: 3,
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
});

//make this component available to the app
export default DetailEvents;
