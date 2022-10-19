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
    { label: "Thúy", value: "spain" },
    { label: "Thu", value: "madrid" },
    { label: "Trâm", value: "barcelona" },
    { label: "Hồng", value: "italy" },
    { label: "Chanh", value: "rome" },
    { label: "Quýt", value: "finland" },
  ]);
  const [selectedPermission, setSelectedPermission] = useState("");
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
            <Text style={styles.textHeader}>Gói thành viên</Text>
            <TouchableOpacity style={styles.card}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}>
                <LinearGradient
                  start={{ x: 1, y: 0.7 }}
                  end={{ x: 0.3, y: 0.8 }}
                  colors={["#F9C271", "#F4EFB8", "#F4EFB8", "#F9C271"]}
                  style={{ width: 20, height: 20, borderRadius: 5 }}>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}>
                    <Image
                      source={require("../../assets/logo.png")}
                      style={{ width: 10, height: 10 }}
                    />
                    <Text style={{ fontSize: 3, color: "#969696" }}>
                      Gói vàng
                    </Text>
                  </View>
                </LinearGradient>
                <Text
                  style={{
                    color: "#D9BD9C",
                    fontSize: 11,
                    fontWeight: "500",
                    marginHorizontal: 10,
                  }}>
                  Gói vàng
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="#474747"
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.textHeader}>Chọn chỉ số quyền lợi</Text>
            <Picker
              selectedValue={selectedPermission}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedPermission(itemValue)
              }
              style={{ backgroundColor: "#f9f9f9", fontWeight: "600" }}>
              <Picker.Item
                label="Trở thành thành viên chính thức của WLIN Global và được tham gia các group Members để quảng bá, truyền thông và kết nối."
                value="1"
                style={styles.itemPick}
              />
              <Picker.Item
                label="Được 1 bằng chứng nhận & hoa kết nạp thành viên Vàng của WLIN Global"
                value="2"
                style={styles.itemPick}
              />
              <Picker.Item
                label="Được 2 bài viết truyền thông về thương hiệu cá nhân trên trang wlin.com.vn/ năm"
                value="3"
                style={styles.itemPick}
              />
            </Picker>
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
                      color="rgba(157, 133, 242, 0.35)"
                    />
                  )}
                </View>
                {!route.params && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "rgba(157, 133, 242, 0.35)",
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
                    colors={["#9D85F2", "#9D85F2"]}
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
                colors={["#9D85F2", "#9D85F2"]}
                style={{
                  paddingHorizontal: 25,
                  paddingVertical: 10,
                  borderRadius: 15,
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
  textHeader: {
    fontSize: 14,
    color: "#474747",
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: "#F9f9f9",
    paddingVertical: 9,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  itemPick: {
    fontSize: 10,
    borderRadius: 30,
    fontWeight: "600",
  },
});

//make this component available to the app
export default PayBenefits;
