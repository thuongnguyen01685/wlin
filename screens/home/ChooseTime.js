//import liraries
import { Ionicons } from "@expo/vector-icons";
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Appearance,
} from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { formatDateDisplays } from "../../utils/datetime";
import moment from "moment";

// create a component
const { width, height } = Dimensions.get("window");
const ChooseTime = (props) => {
  //From time
  const [isDatePickerVisibleFrom, setDatePickerVisibilityFrom] =
    useState(false);

  const showDatePickerFromTime = () => {
    setDatePickerVisibilityFrom(true);
  };

  const hideDatePickerFromTime = () => {
    setDatePickerVisibilityFrom(false);
  };

  const handleConfirmFromTime = (date) => {
    props.setFromTime(date);
    hideDatePickerFromTime();
  };

  //To time

  const [isDatePickerVisibleTo, setDatePickerVisibilityTo] = useState(false);

  const showDatePickerToTime = () => {
    setDatePickerVisibilityTo(true);
  };

  const hideDatePickerToTime = () => {
    setDatePickerVisibilityTo(false);
  };

  const handleConfirmToTime = (date) => {
    props.setToTime(date);
    hideDatePickerToTime();
  };

  // const dueTimeDay = moment(toTime).diff(moment(fromTime), "days");

  // const q = {
  //   $and: [
  //     {
  //       date_created: { $gte: moment(fromTime).startOf("day") },
  //     },
  //     {
  //       date_created: { $lte: moment(toTime).endOf("day") },
  //     },
  //   ],
  // };

  return (
    <View
      style={{
        flexDirection: "row",
        width: width * 0.75,
        marginRight: 15,
        justifyContent: "flex-end",
      }}>
      <DateTimePickerModal
        isVisible={isDatePickerVisibleFrom}
        mode="date"
        date={new Date(props.fromTime)}
        onConfirm={handleConfirmFromTime}
        onCancel={hideDatePickerFromTime}
        isDarkModeEnabled={
          Appearance.getColorScheme() === "light" ? false : true
        }
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisibleTo}
        mode="date"
        date={new Date(props.toTime)}
        onConfirm={handleConfirmToTime}
        onCancel={hideDatePickerToTime}
        isDarkModeEnabled={
          Appearance.getColorScheme() === "light" ? false : true
        }
      />
      <TouchableOpacity
        style={[styles.buttonTime, { paddingHorizontal: 7 }]}
        onPress={showDatePickerFromTime}>
        <Text style={styles.textTime}>
          {formatDateDisplays(props.fromTime, "/")}
        </Text>
        <Ionicons name="caret-down-outline" size={20} color="#826CCF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonTime, { marginLeft: 15, paddingHorizontal: 5 }]}
        onPress={showDatePickerToTime}>
        <Text style={styles.textTime}>
          {formatDateDisplays(props.toTime, "/")}
        </Text>
        <Ionicons name="caret-down-outline" size={20} color="#826CCF" />
      </TouchableOpacity>
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
    fontFamily: "LexendDeca_400Regular",
  },
});

//make this component available to the app
export default ChooseTime;
