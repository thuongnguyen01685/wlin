//import liraries
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment";
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { formatDateDisplay } from "../utils/datetime";

// create a component
const CardInfo = () => {
  const { auth } = useSelector((state) => state);
  const navigation = useNavigation();

  return (
    <View>
      <LinearGradient
        start={{ x: 0.05, y: 0.05 }}
        end={{ x: 0.9, y: 1 }}
        colors={
          auth.ma_goi === "01"
            ? ["#ABABAB", "#DFDFDF", "#C5C5C5", "#B9B9B9"]
            : auth.ma_goi === "02"
            ? ["#DEC1A1", "#FBECD7", "#F5DFC7", "#D5B59C"]
            : auth.ma_goi === "03"
            ? ["#7289DD", "#D0DAFF", "#ABBCF8", "#7E96E9"]
            : auth.ma_goi === "04"
            ? ["#1F1F1f", "#646464", "#484848", "#373737"]
            : ["#9D85F2", "rgba(157, 133, 242, 0.4)"]
        }
        style={{
          borderRadius: 7,
          marginTop: 8,
          paddingBottom: 10,
          borderRadius: 15,
        }}>
        {auth.ma_goi?.length > 0 && (
          <Image
            source={
              auth?.ma_goi === "01"
                ? require("../assets/bac.png")
                : auth?.ma_goi === "02"
                ? require("../assets/cchuong.png")
                : auth?.ma_goi === "03"
                ? require("../assets/kc.png")
                : auth?.ma_goi === "04" && require("../assets/partner.png")
            }
            style={{
              width: 75,
              height: 75,
              resizeMode: "contain",
              position: "absolute",
              left: 30,
            }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 5,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate("Benefit")}>
            <MaterialCommunityIcons
              name="dots-horizontal"
              color="#FFFFFF"
              size={25}
            />
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", padding: 15 }}>
          <Text
            style={{
              color:
                auth.ma_goi === "01"
                  ? "#FFFFFF"
                  : auth.ma_goi === "02"
                  ? "#8D6B48"
                  : auth.ma_goi === "03"
                  ? "#5A54A5"
                  : auth.ma_goi === "04"
                  ? "#6A6A6A"
                  : "#fff",
              fontSize: 22,
              fontFamily: "LexendDeca_800ExtraBold",
              textAlign: "center",
              top: 10,
            }}>
            {auth.customer?.ten_kh ? auth.customer?.ten_kh : "Đang cập nhật."}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10, bottom: 5, marginVertical: 15 }}>
          {auth.ma_goi?.length > 0 && (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Text
                  style={[
                    styles.textContent,
                    {
                      color:
                        auth.ma_goi === "01"
                          ? "rgba(103, 103, 103, 0.5)"
                          : auth.ma_goi === "02"
                          ? "#CAAD8B"
                          : auth.ma_goi === "03"
                          ? "rgba(90, 84, 165, 0.5)"
                          : auth.ma_goi === "04" && "rgba(255, 255, 255, 0.6)",
                    },
                  ]}>
                  {auth.customer?.contract.length > 0
                    ? formatDateDisplay(
                        auth.customer.contract[0]?.ngay_hieu_luc
                      )
                    : "..."}
                </Text>
                <Text
                  style={[
                    styles.textContent,
                    {
                      color:
                        auth.ma_goi === "01"
                          ? "rgba(103, 103, 103, 0.5)"
                          : auth.ma_goi === "02"
                          ? "#CAAD8B"
                          : auth.ma_goi === "03"
                          ? "rgba(90, 84, 165, 0.5)"
                          : auth.ma_goi === "04" && "rgba(255, 255, 255, 0.6)",
                    },
                  ]}>
                  {" "}
                  -{" "}
                  {auth.customer?.contract.length > 0
                    ? formatDateDisplay(
                        auth.customer.contract[0]?.ngay_ket_thuc
                      )
                    : "..."}
                </Text>
              </View>
              <Text
                style={[
                  styles.textContent,
                  {
                    color:
                      auth.ma_goi === "01"
                        ? "rgba(103, 103, 103, 0.5)"
                        : auth.ma_goi === "02"
                        ? "#CAAD8B"
                        : auth.ma_goi === "03"
                        ? "rgba(90, 84, 165, 0.5)"
                        : auth.ma_goi === "04" && "rgba(255, 255, 255, 0.6)",
                  },
                ]}>
                Thời gian hoạt động còn lại:{" "}
                {auth.customer?.contract.length > 0
                  ? moment(auth.customer.contract[0]?.ngay_ket_thuc).diff(
                      moment(),
                      "d"
                    )
                  : "..."}{" "}
                ngày
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
    marginVertical: 1,
  },
  textContent: {
    fontSize: 12,
    fontFamily: "LexendDeca_400Regular",
    textAlign: "center",
    marginTop: 5,
  },
});

//make this component available to the app
export default CardInfo;
