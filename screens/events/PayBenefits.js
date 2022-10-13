//import liraries
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
} from "react-native";

import HeaderPart from "../../components/HeaderPart/HeaderPart";
import ModalSuccessRefer from "../../components/modal/ModalSuccessRefer";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

// create a component
const PayBenefits = ({ route }) => {
  const navigation = useNavigation();
  const [select, setSelect] = useState("vinh");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([
    "italy",
    "spain",
    "barcelona",
    "finland",
  ]);
  const [items, setItems] = useState([
    { label: "Spain", value: "spain" },
    { label: "Madrid", value: "madrid", parent: "spain" },
    { label: "Barcelona", value: "barcelona", parent: "spain" },
    { label: "Italy", value: "italy" },
    { label: "Rome", value: "rome", parent: "italy" },
    { label: "Finland", value: "finland" },
  ]);

  const [modalSuccess, setModalSuccess] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart />
      <View
        style={{
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          zIndex: 3,
          marginTop: -40,
          marginHorizontal: 15,
          paddingVertical: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
          Trả quyền lợi hội viên
        </Text>
        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "100%" }}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <View
          style={{
            marginBottom: "80%",
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
                zIndex: 8,
              }}>
              {/* <Picker
                  selectedValue={select}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelect(itemValue)
                  }>
                  <Picker.Item label="Thành Vinh" value="vinh" />
                  <Picker.Item label="Xuân Trường" value="truong" />
                </Picker> */}
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                theme="LIGHT"
                multiple={true}
                mode="BADGE"
                badgeDotColors={[
                  "#e76f51",
                  "#00b4d8",
                  "#e9c46a",
                  "#e76f51",
                  "#8ac926",
                  "#00b4d8",
                  "#e9c46a",
                ]}
              />
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
                  {route.params ? (
                    <Image
                      source={{
                        uri: route.params.photo,
                      }}
                      style={{
                        height: 100,
                        width: 150,
                        borderRadius: 7,
                        // resizeMode: "contain",
                      }}
                    />
                  ) : (
                    <Ionicons
                      name="image-outline"
                      size={25}
                      color="rgba(113, 23, 117, 0.3)"
                    />
                  )}
                </View>
                {!route.params && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "rgba(113, 23, 117, 0.3)",
                      fontWeight: "500",
                    }}>
                    Chưa có hình ảnh
                  </Text>
                )}
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
        {/* </ScrollView> */}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

//make this component available to the app
export default PayBenefits;
