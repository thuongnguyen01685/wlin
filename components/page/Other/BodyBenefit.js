//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { useEffect } from "react";
import { getListBenefit } from "../../../redux/actions/ClupAction";

// create a component
const data = [
  {
    picture: require("../../../assets/logo.png"),
    name: "Nhóm quyền lợi Partner",
    rank: "Partner",
  },
  {
    picture: require("../../../assets/logo.png"),
    name: "Nhóm quyền lợi Kim cương",
    rank: "Kim cương",
  },
  {
    picture: require("../../../assets/logo.png"),
    name: "Nhóm quyền lợi Vàng",
    rank: "Vàng",
  },
  {
    picture: require("../../../assets/logo.png"),
    name: "Nhóm quyền lợi Bạc",
    rank: "Bạc",
  },
];
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const BodyBenefit = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setRefreshing(true);
    dispatch(getListBenefit(auth.token));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [dispatch]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getListBenefit(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

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
        Danh sách nhóm quyền lợi
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor="#711775"
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#711775", "green", "blue"]}
          />
        }>
        <View
          style={{
            marginBottom: "20%",
            paddingHorizontal: 15,
            marginTop: 10,
          }}>
          <View>
            {club.getBenefit.map((item) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#F3F3F3",
                  marginVertical: 10,
                  borderRadius: 8,
                  paddingVertical: 20,
                  paddingHorizontal: 15,
                }}
                key={item._id}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <Image
                      source={require("../../../assets/logo.png")}
                      style={{ width: 90, height: 40 }}
                    />

                    <View
                      style={{
                        flexDirection: "column",
                        marginLeft: 10,
                        justifyContent: "center",
                      }}>
                      <Text
                        style={{
                          color: "#711775",
                          fontSize: 15,
                          fontWeight: "600",
                        }}>
                        {item.ten_nhquyenloi}
                      </Text>
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 12,
                          fontWeight: "500",
                        }}>
                        Gói: {item.ten_goi_thanh_vien}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                // onPress={() => navigation.navigate("DetailClub")}
                >
                  <Ionicons
                    name="chevron-forward-outline"
                    size={25}
                    color="#711775"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default BodyBenefit;
