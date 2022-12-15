//import liraries
import { Ionicons } from "@expo/vector-icons";
import React, { Component, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
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
import { useDispatch, useSelector } from "react-redux";
import { eventChartAction } from "../../redux/actions/eventsAction";
import { formatDateDisplays } from "../../utils/datetime";
import moment from "moment";

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

// create a component
const Chart = () => {
  const [fromTime, setFromTime] = useState(
    moment().add(-1, "M").format("YYYY-MM-DD")
  );
  const [toTime, setToTime] = useState(new Date());
  const { auth, event } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const dueTimeDay = moment(toTime).diff(moment(fromTime), "M");
    const dueTimeDate = moment(toTime).diff(moment(fromTime), "d");

    if (dueTimeDay <= 3 && dueTimeDate >= 0) {
      dispatch(
        eventChartAction(
          auth,
          formatDateDisplays(fromTime, "-"),
          formatDateDisplays(toTime, "-")
        )
      );
    } else {
      Alert.alert(
        "Thông báo",
        "Vui lòng chọn thời gian không vượt quá 3 tháng và có ngày kết thúc lớn hơn ngày bắt đầu.",
        [{ text: "Quay lại" }]
      );
    }
  }, [fromTime, toTime]);

  // event.eventChart.sort((a, b) => a.tuan - b.tuan);

  let temp = [];
  for (let i = 0; i < event.eventChart.length; i++) {
    temp.push({
      x: `${event.eventChart[i].tuan}`,
      y: event.eventChart[i].su_kien.length,
    });
  }

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
        <Text style={styles.headerTitle}>Số liệu chi tiết</Text>
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
          <Text
            style={{
              top: 40,
              left: 15,
              fontSize: 10,
              fontFamily: "LexendDeca_500Medium",
            }}>
            Số lượng
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: width * 0.75,
              marginRight: 15,
              justifyContent: "flex-end",
            }}>
            <ChooseTime
              fromTime={fromTime}
              setFromTime={setFromTime}
              toTime={toTime}
              setToTime={setToTime}
            />
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
              data={temp}
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
                  fontSize: 12,
                  fontFamily: "LexendDeca_400Regular",
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
    fontSize: 12,
    textAlign: "center",
    marginRight: 10,
    fontFamily: "LexendDeca_400Regular",
  },
  headerTitle: {
    fontSize: 16,
    color: "#826CCF",
    fontFamily: "LexendDeca_600SemiBold",
  },
});

//make this component available to the app
export default Chart;
