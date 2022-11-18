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

import { useDispatch, useSelector } from "react-redux";
import ModalSuccessCheck from "../../../components/modal/ModalSuccessCheck";
import ModalFailCheck from "../../../components/modal/ModalFailCheck";
import ModalChoosePayment from "../../../components/modal/ModalChoosePayment";
import ModalPayment from "../../../components/modal/ModalPayment";
import {
  checkEventAction,
  getDetailEventsAction,
} from "../../../redux/actions/eventsAction";
import { AUTH } from "../../../redux/actions/authAction";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const QRAdmin = (props) => {
  const navigation = useNavigation();
  const { auth, event } = useSelector((state) => state);

  //console.log(event.detailEvent._id);

  const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalCheckSuccess, setModalCheckSuccess] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFail, setModalFail] = useState(false);
  const [showModalPayment, setShowModalPayment] = useState(false);
  const [dataCheck, setDataCheck] = useState("");
  const [detailData, setDetailData] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, [hasPermission]);

  const handleBarCodeScanned = async ({ type, data }, error) => {
    setScanned(true);
    if (data) {
      dispatch({ type: AUTH.MA_KHQR, payload: data });
      const personParticipant = event.detailEvent.ds_tham_gia.filter(
        (item) => item.ma_kh === data
      );

      if (personParticipant.length > 0) {
        const result = await dispatch(
          checkEventAction(event.detailEvent, auth.token, data)
        );
        setDetailData(personParticipant);
        setDataCheck(data);
        if (result) {
          dispatch(getDetailEventsAction(event.detailEvent._id, auth.token));
          setModalCheckSuccess(true);
        } else {
          setModalFail(true);
        }
      } else {
        setModalFail(true);
      }
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
          if (results && results[0]?.data) {
            const personParticipant = event.detailEvent.ds_tham_gia.filter(
              (item) => item.ma_kh === results[0].data
            );
            console.log("Check mã thành công");
            setDataCheck(results[0].data);
            dispatch({ type: AUTH.MA_KHQR, payload: results[0].data });

            if (personParticipant.length > 0) {
              console.log("Check có thành viên tham gia");
              dispatch(
                checkEventAction(event.detailEvent, auth.token, results[0].data)
              );

              setDetailData(personParticipant);
              setDataCheck(results[0].data);
              dispatch(
                getDetailEventsAction(event.detailEvent._id, auth.token)
              );
              setModalCheckSuccess(true);
            } else {
              setModalFail(true);
              console.log("Không có thành viên tham gia");
            }
          } else {
            setModalFail(true);
            console.log("Check mã thất bại");
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
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            borderRadius: 30,
            backgroundColor: "#9D85F2",
          }}>
          <View style={styles.borderBacRounded}>
            <Image
              source={require("../../../assets/btncheckqr.png")}
              style={styles.imageCheckin}
            />
          </View>
        </TouchableOpacity>
      </View>
      {modalCheckSuccess && (
        <ModalSuccessCheck
          modalCheckSuccess={modalCheckSuccess}
          setModalCheckSuccess={setModalCheckSuccess}
          showModalPayment={showModalPayment}
          setShowModalPayment={setShowModalPayment}
          dataCheck={dataCheck}
          detailData={detailData}
          setDetailData={setDetailData}
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
          dataCheck={dataCheck}
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
