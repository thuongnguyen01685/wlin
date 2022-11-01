//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

//stackbar chart

const dataX = {
  data: [
    [60, 60, 60],
    [30, 30, 60],
    [60, 60, 60],
    [70, 30, 60],
    [20, 30, 60],
    [30, 50, 60],
    [50, 80, 60],
    [50, 30, 60],
    [20, 60, 60],
    [10, 30, 60],
    [60, 20, 60],
    [30, 50, 20],
  ],
  labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  legend: ["Referrals", "TYFCBs", "Event"],

  barColors: ["#9D85F2", "#5144A6", "#78B1E5"],
};
// create a component
const Chart = () => {
  return (
    <View
      style={{
        borderRadius: 15,
      }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 15,
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "600",
            color: "#826CCF",
          }}>
          Số liệu chi tiết
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#909090",
            }}>
            Xem chi tiết
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingHorizontal: 10,
          paddingBottom: 10,
          marginTop: 10,
        }}>
        <StackedBarChart
          data={dataX}
          width={screenWidth / 1.07}
          height={220}
          strokeWidth={16}
          radius={1}
          chartConfig={{
            backgroundGradientFrom: "#f0f0f0",
            backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "#ffffff",
            backgroundGradientToOpacity: 0.5,
            barPercentage: 0.3,
            useShadowColorFromDataset: false,
            barRadius: 1,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(13, 136, 56, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0,0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffff",
            },
          }}
          style={{
            borderRadius: 1,
            paddingHorizontal: 5,
          }}
          hideLegend={true}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default Chart;
