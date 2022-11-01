//import liraries
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
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

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <View
          style={{
            borderRadius: 7,
            width: 120,
            height: 40,
            backgroundColor: "#ffffff",
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
            <Picker.Item
              label="Nhiệm kì 1"
              value="nk1"
              style={styles.itemSelect}
            />
            <Picker.Item
              label="Nhiệm kì 2"
              value="nk2"
              style={styles.itemSelect}
            />
          </Picker>
        </View>
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
  itemSelect: {
    fontSize: 10,
    fontWeight: "800",
    color: "#474747",
    textAlign: "center",
  },
});

//make this component available to the app
export default Board;
