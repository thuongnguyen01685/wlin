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
                      source={require("../../../../assets/truong.png")}
                      style={{ width: 70, height: 70 }}
                    />
                    <Image
                      source={require("../../../../assets/vmvang.png")}
                      style={{ width: 20, height: 20 }}
                    />
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
