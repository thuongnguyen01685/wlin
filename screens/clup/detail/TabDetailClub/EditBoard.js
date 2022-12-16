//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../../../components/HeaderPart/HeaderPart";
import Loading from "../../../../components/loading/Loading";
import {
  deleteBQTAction,
  getCLub,
  getDetailClub,
  getDmchucvu,
  getMemberAction,
} from "../../../../redux/actions/ClupAction";
import SelectDropdown from "react-native-select-dropdown";
import { LinearGradient } from "expo-linear-gradient";
import { URL } from "../../../../utils/fetchApi";

// create a component
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const EditBoard = ({ route }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = useState(false);
  const infoBoard = club.detailClub.quan_tri.filter(
    (item) => item._id === route.params.id_board
  )[0];

  const [maNk, setMaNk] = useState(
    club.detailClub.nhiem_ky.filter(
      (item) => item.ma_nhiem_ky === infoBoard.nhiem_ky
    )[0]?.ma_nhiem_ky
  );
  const [maHV, setMaHV] = useState(infoBoard.ma_kh);
  const [chucvu, setChucvu] = useState(infoBoard.chuc_vu);
  const [CDDD, setCDDD] = useState(infoBoard.chuc_vu2);
  const [description, setDescription] = useState(infoBoard.dien_giai);
  const [position, setPosition] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [data, setData] = useState([]);
  const [nameHV, setNameHV] = useState(infoBoard.ten_kh);

  const listBoard = {
    ...infoBoard,
    dien_giai: description,
    chuc_vu: chucvu,
    chuc_vu2: CDDD,
    nhiem_ky: maNk,
    ma_kh: maHV,
  };

  const DiffBoard = club.detailClub.quan_tri.filter(
    (item) => item._id !== route.params.id_board
  );

  const putQuantri = [...DiffBoard, listBoard];

  useEffect(() => {
    setRefreshing(true);
    async function it() {
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
      const arrMember = res
        ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
        .filter((item, index, arr) => {
          const itemIndex = arr.findIndex((it) => it === item);
          return itemIndex === index;
        });
      const reListMe = await dispatch(
        getMemberAction(auth.token, arrMember, 1, position)
      );

      setData([...data, ...reListMe]);
    }
    it();
    setRefreshing(false);
  }, [position]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getDmchucvu());
    async function it() {
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
      const arrMember = res
        ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
        .filter((item, index, arr) => {
          const itemIndex = arr.findIndex((it) => it === item);
          return itemIndex === index;
        });
      const reListMe = await dispatch(
        getMemberAction(auth.token, arrMember, 1, position)
      );
      setData([...data, ...reListMe]);
    }
    it();
    wait(1000).then(() => setRefreshing(false));
  };

  const handleEditBoard = async () => {
    setRefreshing(true);
    await dispatch(
      deleteBQTAction(auth.token, putQuantri, club.detailClub._id)
    );
    await dispatch(getDetailClub(route.params.id_event, auth.token));
    setRefreshing(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {refreshing && (
        <View
          style={{
            opacity: 0.2,
            backgroundColor: "#474747",
            flex: 1,
            position: "absolute",
            height: h,
            width: w,
            zIndex: 5,
          }}>
          <Loading size="large" />
        </View>
      )}
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
          marginTop: -55,
          marginHorizontal: 15,
          paddingVertical: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: "row",
            marginLeft: 10,
            alignItems: "center",
          }}>
          <Text style={styles.headerTitle}>Chỉnh sửa thông tin</Text>

          {refreshing && <Loading size="large" />}
        </View>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refreshing}
          //     onRefresh={onRefresh}
          //     colors={["#9D85F2", "green", "blue"]}
          //   />
          // }
        >
          <KeyboardAvoidingView
            style={{
              marginBottom: "70%",
              paddingHorizontal: 30,
              marginTop: 10,
              flex: 1,
            }}
            behavior={"position"}
            keyboardVerticalOffset={
              Platform.OS === "ios" ? h * 0.01 : h * 0.01
            }>
            {/* ten nhiem ki */}
            <View style={styles.cardContainer}>
              <Text style={styles.headerName}>Tên nhiệm kì(*)</Text>

              <SelectDropdown
                data={club.detailClub.nhiem_ky}
                onSelect={(selectedItem, index) => {
                  setMaNk(selectedItem.ma_nhiem_ky);
                }}
                defaultButtonText={
                  club.detailClub.nhiem_ky.filter(
                    (item) => item.ma_nhiem_ky === infoBoard.nhiem_ky
                  )[0]?.ten_nhiem_ky
                }
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.ten_nhiem_ky;
                }}
                rowTextForSelection={(item, index) => {
                  return item.ten_nhiem_ky;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Ionicons
                      name={
                        isOpened ? "caret-up-outline" : "caret-down-outline"
                      }
                      color={"#444"}
                      size={18}
                    />
                  );
                }}
              />
            </View>

            {/* hoi vien */}
            <View style={styles.cardContainer}>
              <Text style={styles.headerName}>Hội viên(*)</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#f8f8f8",
                  borderRadius: 10,
                  marginVertical: 10,
                  justifyContent: "center",
                }}>
                <TextInput
                  style={styles.input}
                  onChangeText={(text) => {
                    setData([]);
                    setPosition(text);
                  }}
                  value={position}
                  placeholder={nameHV}
                />
                <TouchableOpacity
                  style={{
                    backgroundColor: "#f8f8f8",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 8,
                    paddingHorizontal: 5,
                    top: 0.1,
                  }}
                  onPress={() => setShowResult(!showResult)}>
                  <Ionicons name="caret-down-outline" size={18} />
                </TouchableOpacity>
              </View>
            </View>
            {(showResult || position !== "") && (
              <View
                style={{
                  backgroundColor: "#efefef",
                  position: "absolute",
                  zIndex: 5,
                  top: h * 0.2,
                  borderRadius: 10,
                  height: h * 0.3,
                  paddingHorizontal: 10,
                  width: w * 0.8,
                }}>
                <View
                  style={{
                    borderColor: "#826CCF",
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "400",
                      color: "#826CCF",
                      fontFamily: "LexendDeca_300Light",
                    }}>
                    Chọn thành viên bên dưới.
                  </Text>
                </View>

                <ScrollView>
                  {data.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        paddingVertical: 5,
                        borderBottomWidth: 0.5,
                        flexDirection: "row",
                        alignItems: "center",
                        width: w * 0.65,
                      }}
                      onPress={() => {
                        setMaHV(item.ma_kh);
                        setNameHV(item.ten_kh);
                        setPosition("");
                        setShowResult(false);
                      }}>
                      <Image
                        source={
                          item.hinh_anh
                            ? { uri: `${URL}${item.hinh_anh}` }
                            : require("../../../../assets/avtUser.png")
                        }
                        style={{
                          width: w * 0.1,
                          height: w * 0.1,
                          resizeMode: "contain",
                          borderRadius: 5,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "600",
                          color: "#474747",
                          marginLeft: 10,
                          fontFamily: "LexendDeca_500Medium",
                        }}>
                        {item.ten_kh}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* chuc danh  */}

            <View style={styles.cardContainer}>
              <Text style={styles.headerName}>Chức danh(*)</Text>

              {/* <SelectDropdown
                data={club.getMember}
                onSelect={(selectedItem, index) => {
                  setMaHV(selectedItem.ma_kh);
                }}
                defaultButtonText={infoBoard.ten_kh}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.ten_kh;
                }}
                rowTextForSelection={(item, index) => {
                  return item.ten_kh;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Ionicons
                      name={
                        isOpened ? "caret-up-outline" : "caret-down-outline"
                      }
                      color={"#444"}
                      size={18}
                    />
                  );
                }}
              /> */}
              <SelectDropdown
                data={club.dmchucvu}
                onSelect={(selectedItem, index) => {
                  setChucvu(selectedItem._id);
                }}
                defaultButtonText={infoBoard.ten_chuc_vu}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.group_name;
                }}
                rowTextForSelection={(item, index) => {
                  return item.group_name;
                }}
                buttonStyle={styles.dropdown1BtnStyle}
                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                dropdownIconPosition={"right"}
                dropdownStyle={styles.dropdown1DropdownStyle}
                rowStyle={styles.dropdown1RowStyle}
                rowTextStyle={styles.dropdown1RowTxtStyle}
                renderDropdownIcon={(isOpened) => {
                  return (
                    <Ionicons
                      name={
                        isOpened ? "caret-up-outline" : "caret-down-outline"
                      }
                      color={"#444"}
                      size={18}
                    />
                  );
                }}
              />
            </View>
            {/* chuc danh day du */}
            <View style={styles.cardContainer}>
              <Text style={styles.headerName}>Chức danh đầy đủ</Text>
              <View style={styles.card}>
                <TextInput
                  style={{
                    marginHorizontal: 15,
                    fontSize: 12,
                    color: "#474747",
                    width: "90%",
                    fontFamily: "LexendDeca_400Regular",
                  }}
                  onChangeText={setCDDD}
                  value={CDDD}
                  placeholderTextColor="rgba(71, 71, 71, 0.3)"
                  placeholder="Chức danh đầy đủ"
                />
              </View>
            </View>

            {/* mo ta */}
            <View style={styles.cardContainer}>
              <Text style={styles.headerName}>Mô tả</Text>
              <View style={styles.card}>
                <TextInput
                  style={{
                    marginHorizontal: 15,
                    fontSize: 12,
                    color: "#474747",
                    width: "90%",
                    fontFamily: "LexendDeca_400Regular",
                  }}
                  onChangeText={setDescription}
                  value={description}
                  placeholderTextColor="rgba(71, 71, 71, 0.3)"
                  placeholder="Mô tả"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
                paddingHorizontal: 15,
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  width: "35%",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
                onPress={handleEditBoard}>
                <LinearGradient
                  start={{ x: 0.3, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#9D85F2", "#9D85F2"]}
                  style={{
                    paddingHorizontal: 50,
                    paddingVertical: 10,
                    borderRadius: 20,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      color: "#ffffff",
                      textAlign: "center",
                      width: "100%",
                      fontFamily: "LexendDeca_400Regular",
                    }}>
                    Lưu
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 16,
    color: "#826CCF",
    fontFamily: "LexendDeca_600SemiBold",
  },
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
  textContent: {
    fontSize: 13,
    fontWeight: "400",
    marginVertical: 3,
  },
  headerName: {
    color: "#474747",
    fontSize: 14,
    fontFamily: "LexendDeca_600SemiBold",
    opacity: 0.7,
  },
  cardContainer: {
    marginBottom: 5,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: "#FDFDFD",
    paddingVertical: 9,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 8,
  },

  ///drop select
  dropdown1BtnStyle: {
    height: 40,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    borderColor: "#444",
    width: w * 0.86,
    marginTop: 10,
  },
  dropdown1BtnTxtStyle: {
    color: "#474747",
    fontSize: 15,
    fontFamily: "LexendDeca_400Regular",
    textAlign: "left",
    opacity: 0.6,
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF", borderRadius: 15 },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    color: "#474747",
    textAlign: "left",
    fontFamily: "LexendDeca_400Regular",
  },
  //
  input: {
    height: 40,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    width: "90%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    fontFamily: "LexendDeca_400Regular",
  },
});

//make this component available to the app
export default EditBoard;
