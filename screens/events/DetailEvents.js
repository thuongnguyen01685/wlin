//import liraries
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
import { Admin, Member, Partner } from "../../utils/AccessPermission";
import { getDetailEventsAction } from "../../redux/actions/eventsAction";
import Svg, { Path } from "react-native-svg";
import Loading from "../../components/loading/Loading";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// create a component
const DetailEvents = ({ route }, props) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [showTakePicture, setShowTakePicture] = useState(false);
  const [searchPart, setSearchPart] = useState(false);
  const dispatch = useDispatch();

  const { auth, event } = useSelector((state) => state);

  useEffect(() => {
    setRefreshing(true);
    dispatch(getDetailEventsAction(route.params._id, auth.token));
    setRefreshing(false);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getDetailEventsAction(route.params._id, auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, []);

  let dateEvent = new Date(
    formatDateDisplays(event?.detailEvent?.ngay_su_kien)
  );
  let year = dateEvent.getFullYear();
  let month = dateEvent.getMonth() + 1;
  let day = dateEvent.getDate();
  let dayofweek = dateEvent.getDay();

  const countParticipant = event.detailEvent?.ds_tham_gia?.filter(
    (item) =>
      item.trang_thai_checkin === "1" && item.ma_kh === `${auth.profile.email}`
  );

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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
            Chi tiết sự kiện
          </Text>

          {refreshing && <Loading size="large" />}
        </View>
      </View>
      <View style={{ height: "100%" }}>
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
                  source={{ uri: `${URL}${event.detailEvent?.hinh_anh}` }}
                  style={{
                    width: "100%",
                    height: 215,
                    borderRadius: 10,
                    opacity: 1,
                    backgroundColor: "#474747",
                  }}
                />
                <View
                  style={{
                    color: "#ffffff",
                    position: "absolute",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    height: 215,
                    marginBottom: 30,
                    marginHorizontal: 13,
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      color: "#ffffff",
                      marginBottom: 5,
                    }}>
                    {event.detailEvent?.ten_su_kien}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent:
                    auth.permission.group_id == Admin
                      ? "space-between"
                      : "space-around",
                  marginTop: 10,
                  marginHorizontal: auth.permission.group_id == Admin ? 15 : 0,
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
                {auth.permission.group_id !== Admin && (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderRadius: 50,
                    }}>
                    <Image
                      source={{ uri: `${URL}${auth.profile.picture}` }}
                      style={{ width: 20, height: 20, borderRadius: 50 }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#b0b0b0",
                        marginLeft: 5,
                        fontWeight: "600",
                      }}>
                      {countParticipant?.length === 1
                        ? "Bạn đang tham gia"
                        : " Bạn chưa tham gia"}
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  onPress={
                    auth.permission.group_id === Admin
                      ? () => navigation.navigate("ListParticipant")
                      : () => {
                          return;
                        }
                  }>
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
                    {event.detailEvent?.ds_tham_gia
                      ? event.detailEvent.ds_tham_gia.length
                      : 0}{" "}
                    người tham gia
                  </Text>

                  {auth.permission.group_id === Admin && (
                    <Ionicons
                      name="arrow-forward-outline"
                      color="#9D85F2"
                      size={20}
                    />
                  )}
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
                    {formatTimeDisplay(event.detailEvent?.ngay_su_kien)}
                  </Text>
                </View>
              </LinearGradient>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}>
                <View>
                  <Svg
                    width={24}
                    height={25}
                    viewBox="0 0 21 22"
                    fill={"#E51104"}
                    xmlns="http://www.w3.org/2000/svg"
                    {...props}>
                    <Path
                      d={
                        "M0.9375 9.60748C0.9375 4.43263 5.26187 0.25 10.4926 0.25C15.7381 0.25 20.0625 4.43263 20.0625 9.60748C20.0625 12.2152 19.1141 14.6361 17.5532 16.688C15.8312 18.9515 13.7087 20.9235 11.3196 22.4715C10.7728 22.8292 10.2794 22.8562 9.67926 22.4715C7.27658 20.9235 5.1541 18.9515 3.44681 16.688C1.88473 14.6361 0.9375 12.2152 0.9375 9.60748ZM7.34351 9.89884C7.34351 11.6324 8.75811 12.9959 10.4926 12.9959C12.2283 12.9959 13.6565 11.6324 13.6565 9.89884C13.6565 8.17877 12.2283 6.74894 10.4926 6.74894C8.75811 6.74894 7.34351 8.17877 7.34351 9.89884Z"
                      }
                      stroke={"#ffffff"}
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View
                  style={{
                    marginLeft: 5,
                    paddingHorizontal: 10,
                  }}>
                  <Text style={styles.headerContent}>
                    {event.detailEvent?.dia_diem}
                  </Text>

                  <View style={{ marginTop: 5 }}>
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
                          paddingVertical: 5,
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
              <View style={styles.containerBox}>
                <View>
                  <Svg
                    width={23}
                    height={22}
                    viewBox="0 0 23 21"
                    fill={"#2BA600"}
                    xmlns="http://www.w3.org/2000/svg"
                    {...props}>
                    <Path
                      d={
                        "M22.5106 8.30617C22.3583 8.45866 22.1516 8.5458 21.934 8.5458C21.1289 8.5458 20.4761 9.19936 20.4761 9.99451C20.4761 10.7951 21.1213 11.4454 21.9188 11.4541C22.3681 11.4585 22.75 11.7722 22.75 12.222V15.016C22.75 17.3677 20.846 19.2749 18.4959 19.2749H14.949C14.5823 19.2749 14.2853 18.9776 14.2853 18.6105V16.2577C14.2853 15.8002 13.9263 15.4408 13.4693 15.4408C13.0232 15.4408 12.6533 15.8002 12.6533 16.2577V18.6105C12.6533 18.9776 12.3563 19.2749 11.9907 19.2749H4.50411C2.16489 19.2749 0.25 17.3687 0.25 15.016V12.222C0.25 11.7722 0.631891 11.4585 1.08124 11.4541C1.87984 11.4454 2.52394 10.7951 2.52394 9.99451C2.52394 9.22114 1.89289 8.63294 1.06601 8.63294C0.848404 8.63294 0.641683 8.5458 0.489362 8.39331C0.337041 8.24081 0.25 8.03386 0.25 7.81601V4.99484C0.25 2.64642 2.16925 0.724976 4.51499 0.724976H11.9907C12.3563 0.724976 12.6533 1.02234 12.6533 1.38942V4.1779C12.6533 4.6245 13.0232 4.99484 13.4693 4.99484C13.9263 4.99484 14.2853 4.6245 14.2853 4.1779V1.38942C14.2853 1.02234 14.5823 0.724976 14.949 0.724976H18.4959C20.846 0.724976 22.75 2.63117 22.75 4.98395V7.72887C22.75 7.94672 22.663 8.15367 22.5106 8.30617ZM13.4693 13.3276C13.9263 13.3276 14.2853 12.9573 14.2853 12.5107V8.15367C14.2853 7.70708 13.9263 7.33673 13.4693 7.33673C13.0232 7.33673 12.6533 7.70708 12.6533 8.15367V12.5107C12.6533 12.9573 13.0232 13.3276 13.4693 13.3276Z"
                      }
                      stroke={"#ffffff"}
                      strokeWidth={1.7}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </Svg>
                </View>
                <View style={{ marginHorizontal: 15 }}>
                  <Text style={styles.headerContent}>Giá vé</Text>
                </View>

                <View style={styles.conText}>
                  {event.detailEvent?.cs_ve &&
                    event.detailEvent.cs_ve.map((item) => (
                      <Text style={styles.bodyContent} key={item.line}>
                        {item.loai_ve === "free"
                          ? "Miễn phí"
                          : item.loai_ve === "member"
                          ? "Hội viên"
                          : item.loai_ve === "guest" && "Khách mời"}
                        : {item.gia_ve && formatCash(item.gia_ve.toString(10))}{" "}
                        VND
                      </Text>
                    ))}
                </View>
              </View>
            </View>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.headerText}>Thời gian</Text>
                <Text style={styles.headerText}>Nội dung chương trình</Text>
              </View>
              {event.detailEvent?.noi_dung &&
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
                            color: "#474747",
                          }}>
                          {item.noi_dung}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
            </View>

            {auth.permission.group_id === Member ? (
              <View
                style={{
                  flexDirection: "row",
                  width: w,
                  paddingHorizontal: 15,
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  onPress={
                    countParticipant?.length === 1
                      ? () => {
                          return;
                        }
                      : () => navigation.navigate("CheckQR")
                  }>
                  <LinearGradient
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#9D85F2", "rgba(157, 133, 242, 0.4)"]}
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      borderRadius: 30,
                      width: w * 0.9,
                      paddingVertical: 15,
                    }}>
                    <Text
                      style={{
                        fontSize: 25,
                        color: "#ffffff",
                        fontWeight: "600",
                        textAlign: "center",
                      }}>
                      {countParticipant?.length === 1
                        ? "Đã Check-in"
                        : "Check-in"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingHorizontal: 15,
                  marginTop: 10,
                }}>
                {event.detailEvent.trang_thai !== "1" && (
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
                        borderRadius: 20,
                        marginRight: 10,
                      }}>
                      <View style={styles.buttonEx}>
                        <Text style={styles.buttonText}>Check-in</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                )}

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
                        borderRadius: 20,
                        marginRight: 10,
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
                        borderRadius: 20,
                      }}>
                      <View style={styles.buttonEx}>
                        <Text style={styles.buttonText}>Báo cáo</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </View>
            )}

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
    marginVertical: 5,
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
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  timeEvent: {
    fontSize: 13,
    fontWeight: "400",
    color: "#474747",
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: "center",
    width: 80,
  },
  buttonCheckin: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonEx: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});

//make this component available to the app
export default DetailEvents;
