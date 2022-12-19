//import liraries
import { Ionicons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Admin, Member, Partner } from "../../../../utils/AccessPermission";
import {
  deleteBQTAction,
  getCLub,
  getDetailClub,
  getDmchucvu,
  getMemberAction,
} from "../../../../redux/actions/ClupAction";
import { useNavigation } from "@react-navigation/native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// create a component
const Board = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [maNk, setMaNk] = useState("");
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    dispatch(getDmchucvu(auth.token));
    async function it() {
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));
      const arrMember = res
        ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
        .filter((item, index, arr) => {
          const itemIndex = arr.findIndex((it) => it === item);
          return itemIndex === index;
        });
      await dispatch(getMemberAction(auth.token, arrMember, 1, ""));
    }
    it();
  }, []);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getDetailClub(props.id_event, auth.token));
    wait(500).then(() => setRefreshing(false));
  }, []);

  const handleDeleteMember = (_id) => {
    const arr = club.detailClub.quan_tri.filter((item) => item._id !== _id);

    Alert.alert("Thông báo", "Bạn chắc chắn muốn xóa", [
      {
        text: "Hủy",
        onPress: () => console.log("Hủy"),
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: () => {
          dispatch(deleteBQTAction(auth.token, arr, props.id_event));
          dispatch(getDetailClub(props.id_event, auth.token));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <SelectDropdown
          data={club.detailClub.nhiem_ky}
          onSelect={(selectedItem, index) => {
            setMaNk(selectedItem.ma_nhiem_ky);
          }}
          defaultButtonText={"Chọn nhiệm kì"}
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
                name={isOpened ? "caret-up-outline" : "caret-down-outline"}
                color={"#444"}
                size={18}
              />
            );
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9796F0", "green", "blue"]}
          />
        }>
        <View
          style={{
            marginBottom: "80%",
          }}>
          {club.detailClub.quan_tri &&
            club.detailClub.quan_tri
              .filter((item) => {
                if (maNk === "") {
                  return item;
                } else {
                  return item.nhiem_ky === maNk;
                }
              })
              .map((item) => (
                <View
                  key={item._id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#Ffffff",
                    marginVertical: 10,
                    borderRadius: 15,
                    paddingVertical: 10,
                    marginHorizontal: 10,
                    paddingHorizontal: 10,
                    borderColor: "#dadada",
                    borderWidth: 0.7,
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        borderColor: "#dadada",
                        borderWidth: 0.7,
                        borderRadius: 15,
                        paddingHorizontal: 2,
                        paddingVertical: 15,
                      }}>
                      <Image
                        source={require("../../../../assets/logo.png")}
                        style={{ width: 60, height: 30 }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: "column",
                        marginLeft: 20,
                        justifyContent: "center",
                        width:
                          auth.permission.group_id === Member ? "70%" : "50%",
                      }}>
                      <Text
                        style={{
                          color: "#474747",
                          fontSize: 16,
                          fontFamily: "LexendDeca_600SemiBold",
                        }}>
                        {item.ten_kh}
                      </Text>
                      <Text
                        style={{
                          color: "rgba(67, 67, 67, 0.4)",
                          fontSize: 12,
                          marginVertical: 5,
                          fontFamily: "LexendDeca_400Regular",
                        }}>
                        {item.chuc_vu2}
                      </Text>
                      <View
                        style={{
                          backgroundColor: "#EEF4FF",
                          borderRadius: 10,
                          width: "90%",
                        }}>
                        <Text
                          style={{
                            color: "#769CEC",
                            fontSize: 12,
                            fontWeight: "600",
                            textAlign: "center",
                            fontFamily: "LexendDeca_400Regular",
                          }}>
                          {item.ten_chuc_vu}
                        </Text>
                      </View>
                    </View>

                    {(auth.permission.group_id === Admin ||
                      auth.permission.group_id === Partner) && (
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          alignItems: "center",
                          width: "25%",
                          marginHorizontal: 5,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate("EditBoard", {
                              id_event: props.id_event,
                              id_board: item._id,
                            });
                          }}>
                          <Ionicons
                            name="create-outline"
                            size={20}
                            color="#9D85F2"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => handleDeleteMember(item._id)}>
                          <Ionicons
                            name="trash-outline"
                            size={20}
                            color="#E55656"
                          />
                        </TouchableOpacity>
                      </View>
                    )}
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

  //
  dropdown1BtnStyle: {
    height: 40,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    borderColor: "#444",
    width: 160,
    marginTop: 10,
  },
  dropdown1BtnTxtStyle: {
    color: "#474747",
    fontSize: 15,
    fontFamily: "LexendDeca_400Regular",
  },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: {
    color: "#444",
    textAlign: "center",
    fontFamily: "LexendDeca_400Regular",
  },
});

//make this component available to the app
export default Board;
