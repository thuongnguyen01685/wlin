import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import ItemStatistics from "./ItemStatistics";

const StatisticsHome = () => {
  const navigation = useNavigation();
  const { club, event } = useSelector((state) => state);

  return (
    <View style={{ marginVertical: 5 }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          color: "#826CCF",
          paddingHorizontal: 15,
        }}>
        Tổng thống kê
      </Text>
      <View style={styles.row}>
        <ItemStatistics
          bg="#E8E2FE"
          color="#9D85F2"
          name="Referrals"
          navigate="Slips"
          image={require("../../../assets/notepad.png")}
          count="15"
        />
        <ItemStatistics
          bg="#E8E4FF"
          color="#5144A6"
          name="TYFCBs"
          navigate="TYFCB"
          image={require("../../../assets/people.png")}
          count="20"
        />

        <ItemStatistics
          bg="#FFEDF8"
          color="#DE83BC"
          name="Club"
          navigate="ClubScreen"
          image={require("../../../assets/connect.png")}
          count={club.getClubs.length}
        />

        <ItemStatistics
          bg="#E8F1FA"
          color="#78B1E5"
          name="Sự kiện"
          navigate="EventsScreen"
          image={require("../../../assets/events.png")}
          count={event?.getEvents?.length}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
});

export default StatisticsHome;
