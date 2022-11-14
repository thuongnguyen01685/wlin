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
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  DeviceEventEmitter,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import HeaderPart from "../../components/HeaderPart/HeaderPart";

import { useSelector, useDispatch } from "react-redux";
import QRAdmin from "./QR/QRAdmin";
import PushImage from "./PushImage";
import { Admin } from "../../utils/AccessPermission";
import { EVENTS } from "../../redux/actions/eventsAction";
import ModalFailCheck from "../../components/modal/ModalFailCheck";
import ModalSuccessCheckGuest from "../../components/modal/ModalSuccessCheckGuest";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const CheckQR = () => {
  const navigation = useNavigation();
  const { auth, event } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showTakePicture, setShowTakePicture] = useState(false);
  const [modalCheckGuestSuccess, setModalCheckGuestSuccess] = useState(false);
  const [modalFail, setModalFail] = useState(false);

  useEffect(() => {
    DeviceEventEmitter.addListener("onwlinCheck", async (data) => {
      if (data) {
        dispatch({ type: EVENTS.SOCKETCHECKIN, payload: data });
        setModalCheckGuestSuccess(true);
      } else {
        setModalFail(true);
      }
    });
  }, []);
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
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
          {!showTakePicture ? "Check-QR" : "Xác thực biên lai"}
        </Text>
        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#9D85F2" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {auth.permission?.group_id !== Admin ? (
            <View style={{ marginBottom: "80%" }}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <View style={{ marginTop: "10%" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      fontWeight: "600",
                    }}>
                    Mã QR của bạn
                  </Text>
                </View>
                {/* <Image
                  source={require("../../assets/QRFigma.png")}
                  style={{ resizeMode: "contain", width: "60%", height: 300 }}
                /> */}
                <QRCode
                  value={auth.profile.email}
                  //logo={require("../../assets/QRFigma.png")}
                  size={200}
                />
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 12,
                      fontWeight: "600",
                    }}>
                    Đưa mã QR cho QTV để checkin sự kiện
                  </Text>
                </View>
                <View style={{ marginTop: "5%" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      fontWeight: "600",
                    }}>
                    Mã hội viên
                  </Text>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 10,
                        backgroundColor: "#F9F9F9",
                        paddingVertical: 5,
                        borderRadius: 10,
                        marginTop: 10,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "300",
                          color: "#474747",
                        }}>
                        3RWXO1
                      </Text>
                      <TouchableOpacity
                        style={{
                          backgroundColor: "#EFD445",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: 10,
                          borderRadius: 5,
                          paddingVertical: 5,
                          paddingHorizontal: 20,
                        }}
                        onPress={() => {
                          Clipboard.setString("3RWXO1");
                          ToastAndroid.showWithGravityAndOffset(
                            "Sao chép thành công !",
                            ToastAndroid.SHORT,
                            ToastAndroid.TOP,
                            25,
                            50
                          );
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "400",
                            color: "#ffffff",
                          }}>
                          Chép
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : !showTakePicture ? (
            <QRAdmin
              showTakePicture={showTakePicture}
              setShowTakePicture={setShowTakePicture}
            />
          ) : (
            <PushImage
              showTakePicture={showTakePicture}
              setShowTakePicture={setShowTakePicture}
            />
          )}

          {modalCheckGuestSuccess && (
            <ModalSuccessCheckGuest
              modalCheckGuestSuccess={modalCheckGuestSuccess}
              setModalCheckGuestSuccess={setModalCheckGuestSuccess}
            />
          )}
          {modalFail && (
            <ModalFailCheck modalFail={modalFail} setModalFail={setModalFail} />
          )}
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
  barcodebox: {
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#711775",
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
export default CheckQR;
