import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const StatisticsHome = () => {
  const navigation = useNavigation();

  return (
    <View style={{ marginVertical: 5 }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "600",
          color: "#826CCF",
          paddingHorizontal: 15,
        }}
      >
        Tổng thống kê
      </Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.itemStatistics}
          onPress={() => navigation.navigate("Slips")}
        >
          <View style={styles.containerStatistics}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/notepad.png")}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "#5144A6",
                  marginLeft: 5,
                }}
              >
                Referrals
              </Text>
            </View>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
              }}
            >
              1/2/2022
            </Text>
          </View>

          <View style={styles.contentStatistics}>
            <View style={{ borderRadius: 50, backgroundColor: "#000" }}>
              <Text style={styles.quantityStatistics}>15</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemStatistics}
          onPress={() => navigation.navigate("TYFCB")}
        >
          <View style={styles.containerStatistics}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/people.png")}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "#5144A6",
                  marginLeft: 5,
                }}
              >
                TYFCBs
              </Text>
            </View>
            <Text
              style={{
                fontSize: 10,
                textAlign: "center",
              }}
            >
              1/2/2022
            </Text>
          </View>

          <View style={styles.contentStatistics}>
            <View style={{ borderRadius: 50, backgroundColor: "#000" }}>
              <Text style={styles.quantityStatistics}>15</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.itemStatistics}
          onPress={() => navigation.navigate("ClubScreen")}
        >
          <View style={styles.containerStatistics}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/connect.png")}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "#DE83BC",
                  marginLeft: 5,
                }}
              >
                CLUB
              </Text>
            </View>
            <Text
              style={{
                fontSize: 10,
              }}
            >
              1/2/2022
            </Text>
          </View>

          <View style={styles.contentStatistics}>
            <View style={{ borderRadius: 50, backgroundColor: "#000" }}>
              <Text style={styles.quantityStatistics}>15</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.itemStatistics}
          onPress={() => navigation.navigate("EventsScreen")}
        >
          <View style={styles.containerStatistics}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../assets/events.png")}
                style={{ width: 20, height: 20, resizeMode: "contain" }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "#78B1E5",
                  marginLeft: 5,
                }}
              >
                Sự kiện
              </Text>
            </View>
            <Text
              style={{
                fontSize: 10,
              }}
            >
              1/2/2022
            </Text>
          </View>

          <View style={styles.contentStatistics}>
            <View style={{ borderRadius: 50, backgroundColor: "#000" }}>
              <Text style={styles.quantityStatistics}>15</Text>
            </View>
          </View>
        </TouchableOpacity>
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
    marginVertical: 7,
  },
  containerStatistics: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  contentStatistics: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityStatistics: {
    fontSize: 30,
    color: "#ffffff",
    fontWeight: "700",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  itemStatistics: {
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#E8E2FE",
    width: "45%",
  },
});

export default StatisticsHome;
