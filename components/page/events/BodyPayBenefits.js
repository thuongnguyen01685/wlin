//import liraries
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import ModalSuccessRefer from "../../modal/ModalSuccessRefer";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;
// create a component
const BodyPayBenefits = () => {
  const [select, setSelect] = useState("vinh");
  const navigation = useNavigation();
  const [modalSuccess, setModalSuccess] = useState(false);
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
        Trả quyền lợi Hội viên
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: "20%",
            paddingHorizontal: 25,
            paddingTop: 15,
          }}>
          <View>
            <Text style={styles.textHeader}>Chọn hội viên</Text>
            <View
              style={{
                backgroundColor: "#FDFDFD",
                borderRadius: 7,
                marginVertical: 10,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <Picker
                selectedValue={select}
                onValueChange={(itemValue, itemIndex) => setSelect(itemValue)}>
                <Picker.Item label="Thành Vinh" value="vinh" />
                <Picker.Item label="Xuân Trường" value="truong" />
              </Picker>
            </View>
          </View>
          <View>
            <Text style={styles.textHeader}>Hình ảnh xác thực</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-start",
                width: "80%",
              }}>
              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#F3F3F3",
                    borderRadius: 7,
                    height: 100,
                    width: 150,
                  }}>
                  <Ionicons
                    name="image-outline"
                    size={25}
                    color="rgba(113, 23, 117, 0.3)"
                  />
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    color: "rgba(113, 23, 117, 0.3)",
                    fontWeight: "500",
                  }}>
                  Chưa có hình ảnh
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("CheckImage")}>
                  <LinearGradient
                    start={{ x: 0, y: 0.3 }}
                    end={{ x: 1, y: 1 }}
                    colors={["#751979", "#AE40B2"]}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      borderRadius: 50,
                      paddingHorizontal: 5,
                      paddingVertical: 4,
                    }}>
                    <Ionicons name="camera-outline" size={25} color="#ffffff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                borderRadius: 7,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                width: "40%",
                justifyContent: "center",
                marginBottom: 10,
              }}
              onPress={() => setModalSuccess(true)}>
              <LinearGradient
                start={{ x: 0.3, y: 1 }}
                end={{ x: 1, y: 1 }}
                colors={["#751979", "#AE40B2"]}
                style={{
                  paddingHorizontal: 25,
                  paddingVertical: 10,
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
                  Xác nhận
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          {modalSuccess && (
            <ModalSuccessRefer
              modalSuccess={modalSuccess}
              setModalSuccess={setModalSuccess}
              content={"Xác nhận trả quyền lợi thành công"}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  textHeader: {
    fontSize: 12,
    fontWeight: "600",
    color: "#781C7C",
  },
});

//make this component available to the app
export default BodyPayBenefits;
