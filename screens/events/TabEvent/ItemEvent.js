//import liraries
import { Ionicons } from "@expo/vector-icons";

import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import { formatDateDisplay, formatDateDisplays } from "../../../utils/datetime";
import { URL } from "../../../utils/fetchApi";
import Svg, { Path } from "react-native-svg";

// create a component
const ItemEvent = (props) => {
  const [loadingFa, setLoadingFa] = useState(false);
  return (
    <View
      key={props.item._id}
      style={{
        flexDirection: "row",
        marginBottom: 10,
        borderRadius: 8,
        paddingVertical: 5,
        marginHorizontal: 15,
        borderBottomColor: "#DADADA",
        borderBottomWidth: 0.5,
      }}>
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          marginBottom: 5,
        }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderRadius: 7,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => props.handleDetail(props.item._id)}>
          <Image
            source={{ uri: `${URL}${props.item.hinh_anh}` }}
            style={{ width: 80, height: 80, borderRadius: 7 }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: "75%",
            justifyContent: "space-evenly",
            alignItems: "stretch",
            marginLeft: 10,
          }}>
          <TouchableOpacity onPress={() => props.handleDetail(props.item._id)}>
            <Text
              style={{
                color: "#474747",
                fontSize: 14,
                fontFamily: "LexendDeca_600SemiBold",
              }}>
              {props.item.ten_su_kien}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#EEF4FF",
              width: "50%",
              borderRadius: 13,
              paddingHorizontal: 4,
              paddingVertical: 2,
            }}>
            <Ionicons name="calendar" size={15} color="#769CEC" />
            <Text
              style={{
                color: "#769CEC",
                fontSize: 11,
                fontFamily: "LexendDeca_400Regular",
                left: 10,
              }}>
              {formatDateDisplay(props.item.ngay_su_kien)}
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="location-outline" size={14} />
            <Text
              style={{
                color: "#000000",
                fontSize: 10,
                fontFamily: "LexendDeca_400Regular",
                left: 5,
              }}>
              {props.item.dia_diem}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        {loadingFa ? (
          <View style={{ paddingHorizontal: 12 }}>
            <ActivityIndicator />
          </View>
        ) : (
          !props.noLove && (
            <TouchableOpacity
              style={{
                paddingVertical: 12,
                paddingHorizontal: 14,
              }}
              onPress={async () => {
                setLoadingFa(true);
                await props.onChangeStatusLove(
                  props.item._id,
                  props.item.favourite,
                  props.item.favourite ? props.item.obj_favourite._id : ""
                );
                setLoadingFa(false);
              }}>
              {props.item.favourite ? (
                <Svg
                  width={16}
                  height={22}
                  viewBox="0 0 14 18"
                  fill={"#FEC90F"}
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d={
                      "M4.41665 0.666626H9.55831C11.8166 0.666626 13.6416 1.55829 13.6666 3.82496V16.475C13.6666 16.6166 13.6333 16.7583 13.5666 16.8833C13.4583 17.0833 13.275 17.2333 13.05 17.3C12.8333 17.3666 12.5916 17.3333 12.3916 17.2166L6.99165 14.5166L1.58331 17.2166C1.45915 17.2825 1.31665 17.325 1.17498 17.325C0.708313 17.325 0.333313 16.9416 0.333313 16.475V3.82496C0.333313 1.55829 2.16665 0.666626 4.41665 0.666626ZM3.84998 7.01663H10.125C10.4833 7.01663 10.775 6.72413 10.775 6.35829C10.775 5.99163 10.4833 5.69996 10.125 5.69996H3.84998C3.49165 5.69996 3.19998 5.99163 3.19998 6.35829C3.19998 6.72413 3.49165 7.01663 3.84998 7.01663Z"
                    }
                    stroke={"#ffffff"}
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              ) : (
                <Svg
                  width={16}
                  height={19}
                  viewBox="0 0 16 19"
                  fill={"none"}
                  xmlns="http://www.w3.org/2000/svg">
                  <Path
                    d={
                      "M7.72061 14.5264L2.77782 17.2342C2.38318 17.4393 1.89699 17.2941 1.67942 16.9062V16.9062C1.61648 16.7861 1.58252 16.6528 1.58026 16.5172V4.51873C1.58026 2.2304 3.14395 1.31506 5.39414 1.31506H10.6802C12.8617 1.31506 14.4941 2.16937 14.4941 4.36617V16.5172C14.4941 16.7337 14.4081 16.9413 14.255 17.0943C14.102 17.2474 13.8944 17.3334 13.6779 17.3334C13.5398 17.3312 13.4041 17.2973 13.2813 17.2342L8.30795 14.5264C8.12469 14.4273 7.90388 14.4273 7.72061 14.5264Z"
                    }
                    stroke={"#FEC90F"}
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
            </TouchableOpacity>
          )
        )}

        <TouchableOpacity
          onPress={() => props.handleDetail(props.item._id)}
          style={{ padding: 12 }}>
          <Ionicons name="alert-circle-outline" size={20} color="#9D85F2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default ItemEvent;
