//import liraries
import { Ionicons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// create a component
const Board = () => {
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [select, setSelect] = useState("nk1");
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    //   dispatch(getCLub(auth, page, auth.permission.group_id));
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const selectData = ["Nhiệm kì 1", "Nhiệm kì 2"];

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <SelectDropdown
          data={selectData}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={"Chọn nhiệm kì"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
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
            club.detailClub.quan_tri.map((item, index) => (
              <View
                key={index}
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
                      width: "50%",
                    }}>
                    <Text
                      style={{
                        color: "#474747",
                        fontSize: 16,
                        fontWeight: "600",
                      }}>
                      {item.ten_kh}
                    </Text>
                    <Text
                      style={{
                        color: "rgba(67, 67, 67, 0.4)",
                        fontSize: 12,
                        fontWeight: "600",
                        marginVertical: 5,
                      }}>
                      {item.chuc_vu2}
                    </Text>
                    <View
                      style={{
                        padding: 5,
                        backgroundColor: "#EEF4FF",
                        borderRadius: 10,
                      }}>
                      <Text
                        style={{
                          color: "#769CEC",
                          fontSize: 12,
                          fontWeight: "600",
                          textAlign: "center",
                        }}>
                        {item.ten_chuc_vu}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      width: "25%",
                      marginHorizontal: 5,
                    }}>
                    <TouchableOpacity>
                      <Ionicons
                        name="create-outline"
                        size={20}
                        color="#9D85F2"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#E55656"
                      />
                    </TouchableOpacity>
                  </View>
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
  dropdown1BtnTxtStyle: { color: "#474747", fontSize: 15 },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});

//make this component available to the app
export default Board;
