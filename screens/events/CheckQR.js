//import liraries
import { Ionicons } from "@expo/vector-icons";
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
  ToastAndroid,
} from "react-native";
import * as Clipboard from "expo-clipboard";

import HeaderPart from "../../components/HeaderPart/HeaderPart";

import { BarCodeScanner } from "expo-barcode-scanner";
import ModalSuccessCheck from "../../components/modal/ModalSuccessCheck";
import ModalFailCheck from "../../components/modal/ModalFailCheck";
import { useEffect } from "react";
import ModalChoosePayment from "../../components/modal/ModalChoosePayment";
import { useSelector } from "react-redux";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const CheckQR = () => {
  const navigation = useNavigation();
  const { auth } = useSelector((state) => state);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

  const [modalFail, setModalFail] = useState(false);
  const [showModalPayment, setShowModalPayment] = useState(false);
  const [dataCheck, setDataCheck] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }, error) => {
    setScanned(false);

    if (data) {
      setModalSuccess(true);
      setDataCheck(data);
    } else {
      setModalFail(true);
    }
    //alert(`Code ${type} và Thông tin ${data} đã được quét!`);
  };

  if (hasPermission === null) {
    return <Text>Cấp quyền cho camera truy cập ứng dụng</Text>;
  }
  if (hasPermission === false) {
    return <Text>Chưa cho phép quyền camera</Text>;
  }
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
          Check-QR
        </Text>
        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#9D85F2" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {modalSuccess && (
            <ModalSuccessCheck
              modalSuccess={modalSuccess}
              setModalSuccess={setModalSuccess}
              showModalPayment={showModalPayment}
              setShowModalPayment={setShowModalPayment}
              dataCheck={dataCheck}
            />
          )}
          {modalFail && (
            <ModalFailCheck modalFail={modalFail} setModalFail={setModalFail} />
          )}

          {showModalPayment && (
            <ModalChoosePayment
              showModalPayment={showModalPayment}
              setShowModalPayment={setShowModalPayment}
            />
          )}

          {!auth.permission.admin ? (
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
                <Image
                  source={require("../../assets/QRFigma.png")}
                  style={{ resizeMode: "contain", width: "60%", height: 300 }}
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
          ) : (
            <View style={{ marginBottom: "80%" }}>
              <View style={{ marginVertical: 12 }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    fontWeight: "600",
                  }}>
                  Quét mã QR bằng thiết bị của bạn để checkin sự kiện
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <View style={styles.barcodebox}>
                  <BarCodeScanner
                    onBarCodeScanned={
                      scanned ? handleBarCodeScanned : undefined
                    }
                    style={{ height: 400, width: 300 }}
                  />
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginVertical: 10,
                }}>
                <TouchableOpacity
                  style={{ width: "15%" }}
                  onPress={() => setScanned(true)}>
                  <LinearGradient
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#9796F0", "#FBC7D4"]}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      borderRadius: 30,
                    }}>
                    <View style={styles.borderBacRounded}>
                      <Image
                        source={require("../../assets/btncheckqr.png")}
                        style={styles.imageCheckin}
                      />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                }}>
                <Ionicons name="image-outline" size={20} />
                <Text
                  style={{ fontSize: 12, fontWeight: "600", marginLeft: 5 }}>
                  Tải mã QR có sẵn
                </Text>
              </TouchableOpacity>
            </View>
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
