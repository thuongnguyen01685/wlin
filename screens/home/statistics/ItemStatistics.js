//import liraries
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

// create a component
const ItemStatistics = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.itemStatistics, { backgroundColor: props.bg }]}
      onPress={() => navigation.navigate(`${props.navigate}`)}>
      <View style={styles.containerStatistics}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <Image
            source={props.image}
            style={{ width: 20, height: 20, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontSize: 12,
              color: props.color,
              marginLeft: 5,
            }}>
            {props.name}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 10,
            textAlign: "center",
          }}>
          1/2/2022
        </Text>
      </View>

      <View style={styles.contentStatistics}>
        <View
          style={{
            borderRadius: 50,
            backgroundColor: props.color,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
          }}>
          <Text style={styles.quantityStatistics}>{props.count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
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
    width: "45%",
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
    fontSize: 25,
    color: "#ffffff",
    fontWeight: "700",
  },
});

//make this component available to the app
export default ItemStatistics;
