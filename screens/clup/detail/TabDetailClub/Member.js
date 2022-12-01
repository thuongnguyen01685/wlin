//import liraries
import { Ionicons } from "@expo/vector-icons";
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../../../utils/fetchApi";
import Svg, { Path } from "react-native-svg";

// create a component
const Member = () => {
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: "80%",
            marginTop: 10,
          }}>
          {club.detailClub.ds_thanh_vien &&
            club.detailClub.ds_thanh_vien.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 10,
                  borderRadius: 15,
                  paddingVertical: 10,
                  marginHorizontal: 5,
                  paddingHorizontal: 10,
                  borderColor: "#dadada",
                  borderWidth: 0.7,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "55%",
                  }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={
                        item.avatar
                          ? {
                              uri: `${URL}/${item.avatar}`,
                            }
                          : require("../../../../assets/avtUser.png")
                      }
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 50,
                        resizeMode: "contain",
                      }}
                    />

                    <Svg
                      width={18}
                      height={18}
                      viewBox="0 0 12 12"
                      fill={"none"}
                      xmlns="http://www.w3.org/2000/svg">
                      <Path
                        d="M1.26536 4.89019L4.21828 0.624856L4.38234 4.06994L7.49931 3.24968L6.67906 6.36666L10.1241 6.53071L5.8588 9.48363L1.26536 4.89019ZM4.87449 10.4679C4.67763 10.6648 4.41514 10.6648 4.21828 10.4679L0.281049 6.53071C0.0841871 6.33385 0.0841872 6.07136 0.281049 5.8745L0.609152 5.5464L5.20259 10.1398L4.87449 10.4679Z"
                        fill={
                          item.goi_thanh_vien_kh === "01"
                            ? "#B6B2AA"
                            : item.goi_thanh_vien_kh === "02"
                            ? "#FAAF73"
                            : item.goi_thanh_vien_kh === "03"
                            ? "#8084EB"
                            : item.goi_thanh_vien_kh === "04"
                            ? "#1F1F1F"
                            : "#fff"
                        }
                      />
                    </Svg>
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      marginLeft: 4,
                    }}>
                    <Text
                      style={{
                        color: "#474747",
                        fontSize: 14,
                        fontWeight: "600",
                      }}>
                      {item.ten_kh}
                    </Text>
                    <View
                      style={{
                        backgroundColor: "#FEEAEA",
                        padding: 5,
                        borderRadius: 15,
                      }}>
                      <Text
                        style={{
                          color: "#F96F6D",
                          fontSize: 12,
                          fontWeight: "600",
                          textAlign: "center",
                        }}>
                        {item.ten_chuc_vu}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "20%",
                    height: "50%",
                  }}>
                  <TouchableOpacity>
                    <Ionicons
                      name="alert-circle-outline"
                      size={20}
                      color="#5457A6"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  itemSelect: {
    fontSize: 10,
    fontWeight: "800",
    color: "#474747",
    textAlign: "center",
  },
});

//make this component available to the app
export default Member;
