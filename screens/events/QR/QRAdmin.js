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

import * as RNImagePicker from "expo-image-picker";

import { useEffect } from "react";

import { useSelector } from "react-redux";
import ModalSuccessCheck from "../../../components/modal/ModalSuccessCheck";
import ModalFailCheck from "../../../components/modal/ModalFailCheck";
import ModalChoosePayment from "../../../components/modal/ModalChoosePayment";
import ModalPayment from "../../../components/modal/ModalPayment";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const QRAdmin = (props) => {
  const navigation = useNavigation();
  const { auth } = useSelector((state) => state);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalCheckSuccess, setModalCheckSuccess] = useState(false);
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
  }, [hasPermission]);

  const handleBarCodeScanned = ({ type, data }, error) => {
    setScanned(true);
    if (data) {
      setModalCheckSuccess(true);
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

  //quet ảnh qr
  const decode = async () => {
    try {
      const { status } =
        await RNImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === "granted") {
        const result = await RNImagePicker.launchImageLibraryAsync({
          options: {
            allowsMultipleSelection: false,
          },
        });

        if (result && result.uri) {
          const results = await BarCodeScanner.scanFromURLAsync(result.uri);
          //console.log(results); // many information
          // console.log(results); // May be the one you are looking for
          if (results) {
            setDataCheck(results[0].data);
            setModalCheckSuccess(true);
          } else {
            setModalFail(true);
          }
        }
      }
    } catch (error) {
      console.debug(error);
    }
  };

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
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
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
        <TouchableOpacity onPress={() => setScanned(false)}>
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
      {modalCheckSuccess && (
        <ModalSuccessCheck
          modalCheckSuccess={modalCheckSuccess}
          setModalCheckSuccess={setModalCheckSuccess}
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
          modalSuccess={modalSuccess}
          setModalSuccess={setModalSuccess}
          showModalPayment={showModalPayment}
          setShowModalPayment={setShowModalPayment}
          showTakePicture={props.showTakePicture}
          setShowTakePicture={props.setShowTakePicture}
        />
      )}

      {modalSuccess && (
        <ModalPayment
          modalSuccess={modalSuccess}
          setModalSuccess={setModalSuccess}
          showTakePicture={props.showTakePicture}
          setShowTakePicture={props.setShowTakePicture}
          content={"Xác nhận thanh toán thành công"}
          textButton={"Tiếp tục"}
        />
      )}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
        onPress={decode}>
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
