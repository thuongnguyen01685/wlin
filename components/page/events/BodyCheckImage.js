//import liraries
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BarCodeScanner } from "expo-barcode-scanner";

import React, { Component, useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
// create a component
const BodyCheckImage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(false);
    alert(`Code ${type} và Thông tin ${data} đã được quét!`);
  };

  if (hasPermission === null) {
    return <Text>Cấp quyền cho camera truy cập ứng dụng</Text>;
  }
  if (hasPermission === false) {
    return <Text>Chưa cho phép quyền camera</Text>;
  }
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          color: "#711775",
          fontWeight: "600",
          paddingLeft: 20,
          paddingTop: 18,
        }}>
        Checkin bằng hình ảnh
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: "57%" }}>
          <View style={{ marginVertical: 12 }}>
            <Text
              style={{ textAlign: "center", fontSize: 12, fontWeight: "600" }}>
              Dùng máy ảnh của bạn chụp lại để checkin sự kiện
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
                colors={["#751979", "#AE40B2"]}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignContent: "center",
                  alignItems: "center",
                  borderRadius: 30,
                }}>
                <View style={styles.borderBacRounded}>
                  <Ionicons name="camera-outline" size={20} color="#ffffff" />
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
            <Text style={{ fontSize: 12, fontWeight: "600", marginLeft: 5 }}>
              Tải mã QR có sẵn
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
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
export default BodyCheckImage;
