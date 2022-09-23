//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import { URL } from "../../../utils/fetchApi";

// create a component

const BodyCreateClub = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { club } = useSelector((state) => state);

  const [maClub, setMaClub] = useState("");
  const [nameClub, setNameClub] = useState("");
  const [partner, setPartner] = useState("");
  const [maQTV, setMaQTV] = useState("");
  const [maBvClub, setMaBvClub] = useState("");

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
        Tạo CLUB
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: "40%",
            paddingHorizontal: 20,
            marginTop: 20,
          }}>
          <View>
            <View style={styles.containerView}>
              <Text style={styles.header}>Mã Club</Text>
              <View style={styles.bgInput}>
                <TextInput
                  style={styles.input}
                  onChangeText={setMaClub}
                  value={maClub}
                  placeholder="Nhập mã CLUB"
                  placeholderTextColor="rgba(113, 23, 117, 0.3)"
                />
              </View>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.header}>Tên CLUB</Text>
              <View style={styles.bgInput}>
                <TextInput
                  style={styles.input}
                  onChangeText={setNameClub}
                  value={nameClub}
                  placeholder="Nhập tên CLUB"
                  placeholderTextColor="rgba(113, 23, 117, 0.3)"
                />
              </View>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.header}>Poster CLUB</Text>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#ffffff",
                  alignItems: "center",
                  alignContent: "center",
                  borderRadius: 7,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  paddingVertical: 10,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#D9D9D9",
                    marginLeft: 20,
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}>
                  <Text style={{ fontSize: 10 }}>Chọn tệp</Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 12,
                    color: "rgba(113, 23, 117, 0.3);",
                    textAlign: "center",
                    alignItems: "center",
                    marginHorizontal: 10,
                  }}>
                  Chọn poster cho CLUB
                </Text>
              </View>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.header}>Partner CLUB</Text>
              <View style={styles.bgInput}>
                <TextInput
                  style={styles.input}
                  onChangeText={setPartner}
                  value={partner}
                  placeholder="Nhập partner"
                  placeholderTextColor="rgba(113, 23, 117, 0.3)"
                />
                {/* <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  padding: 7,

                  borderTopRightRadius: 7,
                  borderBottomRightRadius: 7,
                }}>
                <Ionicons name="search-outline" size={20} color="#711775" />
              </TouchableOpacity> */}
              </View>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.header}>QTV CLUB</Text>
              <View style={styles.bgInput}>
                <TextInput
                  style={styles.input}
                  onChangeText={setMaQTV}
                  value={maQTV}
                  placeholder="Nhập QTV"
                  placeholderTextColor="rgba(113, 23, 117, 0.3)"
                />
                {/* <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  padding: 7,

                  borderTopRightRadius: 7,
                  borderBottomRightRadius: 7,
                }}>
                <Ionicons name="search-outline" size={20} color="#711775" />
              </TouchableOpacity> */}
              </View>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.header}>B.D CLUB</Text>
              <View style={styles.bgInput}>
                <TextInput
                  style={styles.input}
                  onChangeText={setMaBvClub}
                  value={maBvClub}
                  placeholder="Nhập B.D"
                  placeholderTextColor="rgba(113, 23, 117, 0.3)"
                />
                {/* <TouchableOpacity
                style={{
                  marginHorizontal: 10,
                  padding: 7,

                  borderTopRightRadius: 7,
                  borderBottomRightRadius: 7,
                }}>
                <Ionicons name="search-outline" size={20} color="#711775" />
              </TouchableOpacity> */}
              </View>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.header}>Thêm Thành viên CLUB</Text>
              <View style={styles.bgInput}>
                <Text style={styles.text}>Nhập thành viên CLUB</Text>
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    padding: 7,
                    borderRadius: 7,
                    borderColor: "#711775",
                    borderWidth: 1,
                    width: 27,
                    height: 27,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Ionicons name="add-outline" size={10} color="#711775" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.header}>Thêm Nhiệm Kỳ CLUB</Text>
              <View style={styles.bgInput}>
                <Text style={styles.text}>Nhập nhiệm kỳ CLUB</Text>
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    padding: 7,
                    borderRadius: 7,
                    borderColor: "#711775",
                    borderWidth: 1,
                    width: 27,
                    height: 27,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Ionicons name="add-outline" size={10} color="#711775" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.containerView}>
              <Text style={styles.header}>Thêm Ban Quản Trị CLUB</Text>
              <View style={styles.bgInput}>
                <Text style={styles.text}>Nhập ban quản trị CLUB</Text>
                <TouchableOpacity
                  style={{
                    marginHorizontal: 10,
                    padding: 7,
                    borderRadius: 7,
                    borderColor: "#711775",
                    borderWidth: 1,
                    width: 27,
                    height: 27,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Ionicons name="add-outline" size={10} color="#711775" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
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
              }}>
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
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
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
    width: "95%",
    marginLeft: 10,
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
export default BodyCreateClub;
