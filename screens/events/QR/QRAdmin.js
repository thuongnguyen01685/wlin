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

import { BarCodeScanner } from "expo-barcode-scanner";

import { useEffect } from "react";

import { useSelector } from "react-redux";
import ModalSuccessCheck from "../../../components/modal/ModalSuccessCheck";
import ModalFailCheck from "../../../components/modal/ModalFailCheck";
import ModalChoosePayment from "../../../components/modal/ModalChoosePayment";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const QRAdmin = () => {
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
            onBarCodeScanned={scanned ? handleBarCodeScanned : undefined}
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
                source={require("../../../assets/btncheckqr.png")}
                style={styles.imageCheckin}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}>
        <Ionicons name="image-outline" size={20} />
        <Text style={{ fontSize: 12, fontWeight: "600", marginLeft: 5 }}>
          Tải mã QR có sẵn
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barcodebox: {
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "#9796F0",
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
export default QRAdmin;
