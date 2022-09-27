//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getEventsAction } from "../../../redux/actions/eventsAction";
import CheckBox from "expo-checkbox";

import ModalRequest from "../../modal/ModalRequest";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const BodyManagementMember = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

  const [modalSuccess, setModalSuccess] = useState(false);
  const [checkPayment, setCheckPayment] = useState(false);

  const { event } = useSelector((state) => state);

  const [benefitGroup, setBenefitGroup] = useState("");
  const [member, setMember] = useState("");
  const [actionText, setActionText] = useState("");

  useEffect(() => {
    dispatch(getEventsAction());
  }, [dispatch]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEventsAction());
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  return (
    <View style={{ height: "100%" }}>
      <Text
        style={{
          fontSize: 20,
          color: "#711775",
          fontWeight: "600",
          paddingLeft: 20,
          paddingTop: 18,
        }}>
        Quản lí hội viên
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{ marginBottom: "20%", paddingHorizontal: 25, marginTop: 15 }}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              alignItems: "center",
            }}>
            <Image
              source={require("../../../assets/truong.png")}
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
                borderRadius: 50,
              }}
            />
            <Text
              style={{ fontSize: 13, fontWeight: "600", marginVertical: 10 }}>
              Xuân Trường
            </Text>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.header}>Nhóm quyền lợi</Text>
            <View style={styles.bgInput}>
              <TextInput
                style={styles.input}
                onChangeText={setBenefitGroup}
                value={benefitGroup}
                placeholder="Cập nhật nhóm quyền lợi"
                placeholderTextColor="rgba(113, 23, 117, 0.3)"
              />
              <TouchableOpacity style={styles.icon}>
                <Ionicons
                  name="chevron-forward-outline"
                  color="#711775"
                  size={25}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.header}>Thêm hội viên vào CLUB</Text>
            <View style={styles.bgInput}>
              <TextInput
                style={styles.input}
                onChangeText={setMember}
                value={member}
                placeholder="Thêm hội viên"
                placeholderTextColor="rgba(113, 23, 117, 0.3)"
              />
              <TouchableOpacity style={styles.icon}>
                <Ionicons name="duplicate-outline" color="#711775" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.containerView}>
            <Text style={styles.header}>Hoạt động sự kiện</Text>
            <View style={styles.textArea}>
              <TextInput
                style={styles.inputTextArea}
                onChangeText={setActionText}
                value={actionText}
                multiline={true}
                numberOfLines={8}
                placeholder="Hoạt động sự kiện"
                placeholderTextColor="rgba(113, 23, 117, 0.3)"
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 15,
            }}>
            <TouchableOpacity
              style={{ width: "30%" }}
              onPress={() => setModalSuccess(true)}>
              <LinearGradient
                start={{ x: 0.3, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={["#751979", "#AE40B2"]}
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ffffff",
                    textAlign: "center",
                    width: "100%",
                    fontWeight: "500",
                  }}>
                  Gửi tất toán
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {modalSuccess && (
            <ModalRequest
              modalSuccess={modalSuccess}
              setModalSuccess={setModalSuccess}
              content={"Gửi thông báo tất toán thành công"}
              textButton={"Xác nhận tất toán"}
              checkPayment={checkPayment}
              setCheckPayment={setCheckPayment}
            />
          )}
        </View>
      </ScrollView>
      {checkPayment && (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            position: "absolute",
            top: "75%",
            zIndex: 10,
            left: "80%",
          }}
          onPress={() => navigation.navigate("ReportExcel")}>
          <LinearGradient
            start={{ x: 1, y: 1 }}
            end={{ x: 0.3, y: 0.6 }}
            colors={[
              "rgba(241, 108, 246, 0.8) 120.28%)",
              "rgba(113, 23, 117, 0.8) -6.93%",
            ]}
            style={{
              width: 70,
              paddingVertical: 18,
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 50,
            }}>
            <Ionicons
              name="stats-chart-outline"
              size={30}
              color="#ffffff"
              style={{
                borderRadius: 7,
                paddingHorizontal: 2,
                paddingVertical: 1,
                borderColor: "#ffffff",
                borderWidth: 1,
              }}
            />
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
  textArea: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 7,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bgInput: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    alignItems: "center",
    alignContent: "center",
    borderRadius: 7,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    fontSize: 14,
    color: "#781C7C",
    fontWeight: "600",
    marginBottom: 7,
  },
  input: {
    height: 45,
    padding: 10,
    width: "84%",
    marginLeft: 6,
    fontSize: 12,
    color: "rgba(113, 23, 117, 0.3);",
  },
  icon: {
    width: "12%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputTextArea: {
    padding: 10,
    width: "95%",
    marginLeft: 6,
    fontSize: 12,
    color: "rgba(113, 23, 117, 0.3);",
  },
  text: {
    marginLeft: 10,
    fontSize: 12,
    color: "rgba(113, 23, 117, 0.3);",
    paddingVertical: 15,
  },
  containerView: {
    marginBottom: 8,
  },
});

//make this component available to the app
export default BodyManagementMember;
