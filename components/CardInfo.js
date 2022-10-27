//import liraries
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getRankAction } from "../redux/actions/authAction";

// create a component
const CardInfo = () => {
  const { auth } = useSelector((state) => state);

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
            : ["#000", "#000"]
        }
        style={{ borderRadius: 7, marginTop: 8 }}
      >
        <Image
          source={
            auth.ma_goi === "01"
              ? require("../assets/bac.png")
              : auth.ma_goi === "02"
              ? require("../assets/cchuong.png")
              : auth.ma_goi === "03"
              ? require("../assets/kc.png")
              : auth.ma_goi === "04" && require("../assets/partner.png")
          }
          style={{
            width: 60,
            height: 60,
            resizeMode: "contain",
            position: "absolute",
            left: 30,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-horizontal"
              color="#FFFFFF"
              size={20}
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
                  : auth.ma_goi === "04" && "#6A6A6A",
              fontSize: 25,
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            {auth.permission.name}
          </Text>
        </View>
        <View style={{ paddingHorizontal: 10, bottom: 5 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
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
              ]}
            >
              Start date: 1/2/2021
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
              ]}
            >
              Due date: 1/2/2022
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
            ]}
          >
            Thời gian hoạt động còn lại: 20 ngày
          </Text>
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
    fontSize: 11,
    fontWeight: "400",
  },
});

//make this component available to the app
export default CardInfo;
