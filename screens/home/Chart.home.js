//import liraries
import { Ionicons } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryStack,
  VictoryLine,
  VictoryLabel,
} from "victory-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import ChooseTime from "./ChooseTime";

const { width, height } = Dimensions.get("window");

const dataDes = [
  {
    _id: 1,
    name: "Refferals",
    color: "#9D85F2",
  },
  {
    _id: 2,
    name: "TYFCBS",
    color: "#5144A6",
  },
  {
    _id: 3,
    name: "Sự kiện",
    color: "#78B1E5",
  },
];

const PropsDay = (day) => {
  //console.log(day);
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
        {/* <TouchableOpacity>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: "#909090",
            }}>
            Xem chi tiết
          </Text>
        </TouchableOpacity> */}
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: width,
            top: 10,
          }}>
          <Text style={{ top: 40, left: 15, fontSize: 12, fontWeight: "800" }}>
            Số lượng
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: width * 0.75,
              marginRight: 15,
              justifyContent: "flex-end",
            }}>
            <ChooseTime PropsDay={PropsDay} />
          </View>
        </View>
        <VictoryChart
          width={width}
          domainPadding={20}
          theme={VictoryTheme.material}>
          <VictoryStack
            colorScale={["#78B1E5"]}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}>
            {/* refferals */}
            {/* <VictoryBar
              barRatio={0.3}
              data={[
                { x: "1", y: 10 },
                { x: "2", y: 3 },
                { x: "3", y: 5 },
                { x: "4", y: 2 },
                { x: "5", y: 3 },
                { x: "6", y: 5 },
                { x: "7", y: 5 },
              ]}
            /> */}
            {/* tyfcbs */}
            {/* <VictoryBar
              barRatio={0.3}
              data={[
                { x: "1", y: 8 },
                { x: "2", y: 8 },
                { x: "3", y: 5 },
                { x: "4", y: 5 },
                { x: "5", y: 1 },
                { x: "6", y: 8 },
                { x: "7", y: 5 },
              ]}
            /> */}
            {/* sự kiện */}
            <VictoryBar
              barRatio={0.6}
              labels={({ datum }) => datum.y}
              labelComponent={
                <VictoryLabel dy={({ datum }) => (datum.y ? 20 : 0)} />
              }
              data={[
                { x: "1", y: 8 },
                { x: "2", y: 0 },
                { x: "3", y: 4 },
                { x: "4", y: 5 },
                { x: "5", y: 1 },
                { x: "6", y: 8 },
                { x: "7", y: 5 },
                { x: "8", y: 8 },
                { x: "9", y: 2 },
                { x: "10", y: 4 },
                { x: "11", y: 5 },
                { x: "12", y: 1 },
                { x: "13", y: 8 },
                { x: "14", y: 5 },
                { x: "15", y: 5 },
              ]}
            />
          </VictoryStack>
          {/* <VictoryLine
            style={{
              data: { stroke: "#DE83BC" },
              parent: { border: "1px solid #ccc" },
            }}
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 8 },
              { x: 3, y: 3 },
              { x: 4, y: 2 },
              { x: 5, y: 5 },
              { x: 6, y: 3 },
              { x: 7, y: 5 },
            ]}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
          /> */}
        </VictoryChart>
        <View
          style={{
            width,
            justifyContent: "space-around",
            flexDirection: "row",
            alignItems: "center",
            marginleft: 10,
            top: -10,
            paddingLeft: width * 0.2,
          }}>
          {dataDes.map((item) => (
            <View
              key={item._id}
              style={{
                marginRight: 15,
                flexDirection: "row",
                alignItems: "center",
              }}>
              <View
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: item.color,
                }}></View>
              <Text
                style={{
                  color: item.color,
                  fontSize: 13,
                  fontWeight: "600",
                  marginLeft: 5,
                }}>
                {item.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  buttonTime: {
    borderColor: "#826CCF",
    borderWidth: 0.6,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textTime: {
    color: "#826CCF",
    fontSize: 14,
    textAlign: "center",
    marginRight: 10,
  },
});

//make this component available to the app
export default Chart;
