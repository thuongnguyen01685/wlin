//import liraries
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { formatDateDisplay } from "../../../../utils/datetime";

// create a component
const Term = () => {
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);

  const [refreshing, setRefreshing] = React.useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginBottom: "80%",
            marginTop: 10,
          }}>
          {club.detailClub.nhiem_ky &&
            club.detailClub.nhiem_ky.map((item, index) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#Ffffff",
                  marginVertical: 10,
                  borderRadius: 15,
                  paddingVertical: 15,
                  marginHorizontal: 10,
                  paddingHorizontal: 10,
                  borderColor: "#dadada",
                  borderWidth: 0.7,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      borderColor: "#dadada",
                      borderWidth: 0.7,
                      borderRadius: 15,
                      paddingHorizontal: 2,
                      paddingVertical: 15,
                    }}>
                    <Image
                      source={require("../../../../assets/logo.png")}
                      style={{
                        width: 60,
                        height: 30,
                        resizeMode: "contain",
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "column",
                      marginLeft: 20,
                      justifyContent: "center",
                    }}>
                    <Text
                      style={{
                        color: "#474747",
                        fontSize: 18,
                        fontWeight: "600",
                        marginBottom: 5,
                      }}>
                      {item.ten_nhiem_ky}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#F0ECFF",
                        borderRadius: 15,
                        paddingHorizontal: 10,
                      }}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="rgba(157, 133, 242, 0.6)"
                      />
                      <Text
                        style={{
                          color: "rgba(157, 133, 242, 0.6)",
                          fontSize: 12,
                          fontWeight: "600",
                          marginLeft: 5,
                        }}>
                        {formatDateDisplay(item.tu_ngay)} -{" "}
                        {formatDateDisplay(item.den_ngay)}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    marginRight: 15,
                    backgroundColor: "#ffffff",
                    borderColor: "#9D85F2",
                    borderWidth: 1,
                    borderRadius: 7,
                  }}>
                  <MaterialIcons name="add" size={15} color="#9D85F2" />
                </TouchableOpacity>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  itemSelect: {
    fontSize: 10,
    fontWeight: "800",
    color: "#474747",
    textAlign: "center",
  },
});

//make this component available to the app
export default Term;
