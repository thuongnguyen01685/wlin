//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect } from "react";
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
import { CLUB, getCLub } from "../../../redux/actions/ClupAction";
import { URL } from "../../../utils/fetchApi";

// create a component
const data = [
  {
    _id: 1,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
    code: "quocgia",
  },
  {
    _id: 2,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
    code: "quocgia",
  },
  {
    _id: 3,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
    code: "quocgia",
  },
  {
    _id: 1,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
    code: "khuvuc",
  },
  {
    _id: 2,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
    code: "khuvuc",
  },
  {
    _id: 3,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
    code: "khuvuc",
  },
  {
    _id: 1,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
    code: "vung",
  },
  {
    _id: 2,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
    code: "vung",
  },
  {
    _id: 3,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
    code: "vung",
  },
];
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const BodyClub = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    setRefreshing(true);
    dispatch(getCLub());
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [dispatch, props.code]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCLub());
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
          paddingTop: 15,
        }}>
        Danh sách CLUB
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
          style={{ marginBottom: "20%", paddingHorizontal: 15, marginTop: 10 }}>
          {club.getClubs.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: "#F3F3F3",
                marginVertical: 10,
                borderRadius: 8,
                paddingVertical: 20,
              }}
              onPress={() =>
                navigation.navigate("DetailClub", { _id: item._id })
              }>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "70%",
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  {item.hinh_anh ? (
                    <Image
                      source={{
                        uri: `${URL}/`.concat(`${item.hinh_anh}`),
                      }}
                      style={{ width: 80, height: 40, borderRadius: 7 }}
                    />
                  ) : (
                    <Image
                      source={require("../../../assets/logo.png")}
                      style={{ width: 80, height: 40 }}
                    />
                  )}

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
                      {item.ten_club}
                    </Text>
                    <Text>{item.ten_partner}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("DetailClub")}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={25}
                  color="#711775"
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default BodyClub;
