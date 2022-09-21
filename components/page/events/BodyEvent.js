//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from "react-native";

const dataHeader = [
  {
    name: "Đang diễn ra",
    code: "dangdienra",
  },
  {
    name: "Sắp diễn ra",
    code: "sapdienra",
  },
  {
    name: "Đã diễn ra",
    code: "dadienra",
  },
];
const dataEvents = [
  {
    nameEvent: "Sự kiện 1",
    picture: require("../../../assets/e1.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: true,
    code: "dangdienra",
  },
  {
    nameEvent: "Sự kiện 2",
    picture: require("../../../assets/e2.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: true,
    code: "dangdienra",
  },
  {
    nameEvent: "Sự kiện 3",
    picture: require("../../../assets/e3.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: false,
    code: "dangdienra",
  },
  {
    nameEvent: "Sự kiện 4",
    picture: require("../../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: false,
    code: "dangdienra",
  },
  {
    nameEvent: "Sự kiện 5",
    picture: require("../../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: true,
    code: "dangdienra",
  },
  {
    nameEvent: "Sự kiện 6",
    picture: require("../../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: false,
    code: "sapdienra",
  },
  {
    nameEvent: "Sự kiện 7",
    picture: require("../../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: true,
    code: "sapdienra",
  },
  {
    nameEvent: "Sự kiện 8",
    picture: require("../../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: false,
    code: "dadienra",
  },
  {
    nameEvent: "Sự kiện 9",
    picture: require("../../../assets/e4.png"),
    location: "15A Hồ Văn Huê, Phường 9, Q. Phú Nhuận, TP.HCM",
    time: "T4, 17/08/2022 9H00",
    save: true,
    code: "dadienra",
  },
];
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const BodyEvent = () => {
  const [cat, setCat] = useState("dangdienra");
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

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
        Danh sách sự kiện
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ marginBottom: "57%" }}>
          <View
            style={{
              backgroundColor: "#f3f3f3",
              marginHorizontal: 10,
              marginTop: 30,
              marginBottom: 10,
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            {dataHeader.map((item, index) => (
              <TouchableOpacity
                style={{
                  backgroundColor: item.code === cat ? "#711775" : "#f3f3f3",
                  borderRadius: 20,
                  paddingHorizontal: 25,
                }}
                key={index}
                onPress={() => setCat(item.code)}>
                <Text
                  style={{
                    color: item.code === cat ? "#ffffff" : "#A0A0A0",
                    marginVertical: 5,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {dataEvents
            .filter((items) => items.code === cat)
            .map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#F3F3F3",
                  marginVertical: 10,
                  borderRadius: 8,
                  paddingVertical: 5,
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                }}
                onPress={() => navigation.navigate("DetailEvents")}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <View style={{ flexDirection: "row" }}>
                    <Image
                      source={item.picture}
                      style={{ width: 70, height: 70 }}
                    />
                    <Image source={item.vm} style={{ width: 20, height: 20 }} />
                  </View>

                  <View
                    style={{
                      flexDirection: "column",

                      justifyContent: "space-between",
                    }}>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 11,
                        fontWeight: "600",
                      }}>
                      {item.time}
                    </Text>
                    <Text
                      style={{
                        color: "#711775",
                        fontSize: 18,
                        fontWeight: "600",
                      }}>
                      {item.nameEvent}
                    </Text>
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 8,
                        fontWeight: "600",
                      }}>
                      {item.location}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: "20%",
                  }}>
                  <TouchableOpacity>
                    <Ionicons
                      name={item.save ? "bookmark" : "bookmark-outline"}
                      size={20}
                      color={item.save ? "#FFBE17" : "#711775"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons
                      name="alert-circle-outline"
                      size={20}
                      color="#711775"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
});

//make this component available to the app
export default BodyEvent;
