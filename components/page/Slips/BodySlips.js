//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  FlatList,
} from "react-native";
import { Avatar, Surface } from "react-native-paper";

const { height } = Dimensions.get("screen");
// create a component
const data = [
  {
    key: 1,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
  },
  {
    key: 2,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
  },
  {
    key: 3,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
  },
  {
    key: 4,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
  },
  {
    key: 5,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
  },
  {
    key: 6,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
  },
  {
    key: 7,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
  },
  {
    key: 8,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
  },
  {
    key: 9,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
  },
];
const BodySlips = () => {
  const navigation = useNavigation();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{ height: "100%" }}>
      <Text
        style={{
          fontSize: 20,
          color: "#711775",
          fontWeight: "600",
          paddingLeft: 20,
          paddingTop: 18,
        }}>
        Danh sách Referrals
      </Text>
      <View
        style={{
          marginBottom: "33%",
          paddingHorizontal: 15,
          marginTop: 10,
        }}>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          data={data}
          keyExtractor={(item) => item.key}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              (height * 0.1 + 15) * index,
              (height * 0.1 + 15) * (index + 3),
            ];
            const scale = 1;
            const opacity = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const Offset = scrollY.interpolate({
              inputRange,
              outputRange: [0, 0, 0, 500],
            });
            return (
              <Animated.View
                style={{
                  transform: [{ scale: scale }, { translateX: Offset }],
                  opacity: opacity,
                }}>
                <TouchableOpacity>
                  <Surface style={styles.surface}>
                    <View style={{ flex: 0.3, justifyContent: "center" }}>
                      {/* <Avatar.Image size={42} source={item.picture} /> */}
                      <Image
                        source={item.picture}
                        style={{ width: 90, height: 40, marginLeft: 10 }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 0.6,
                        flexDirection: "column",
                        justifyContent: "center",
                      }}>
                      <Text
                        style={{
                          color: "#711775",
                          fontSize: 15,
                          fontWeight: "600",
                        }}>
                        {item.nameAreas}
                      </Text>
                      <Text>{item.person}</Text>
                    </View>
                    <View
                      style={{
                        flex: 0.1,
                        flexDirection: "column",
                        justifyContent: "center",
                      }}>
                      <TouchableOpacity
                      // onPress={() => navigation.navigate("DetailClub")}
                      >
                        <Ionicons
                          name="chevron-forward-outline"
                          size={25}
                          color="#711775"
                        />
                      </TouchableOpacity>
                    </View>
                  </Surface>
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />

        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            position: "absolute",
            top: "85%",
            zIndex: 10,
            left: "85%",
          }}
          onPress={() => {
            navigation.navigate("CreateRefer");
          }}>
          <LinearGradient
            start={{ x: 0.8, y: 1 }}
            end={{ x: 0.3, y: 0.3 }}
            colors={[
              "rgba(241, 108, 246, 0.8) 120.28%)",
              "rgba(113, 23, 117, 0.8) -6.93%",
            ]}
            style={{
              width: 70,
              paddingVertical: 18,
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 50,
            }}>
            <Ionicons name="add-outline" size={30} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  surface: {
    height: height * 0.1,
    marginTop: 15,
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: "#F3F3F3",
  },
});

//make this component available to the app
export default BodySlips;

//  <ScrollView showsVerticalScrollIndicator={false}>
//    <View
//      style={{
//        marginBottom: "20%",
//        paddingHorizontal: 15,
//        marginTop: 10,
//      }}>
//      <View>
//        {data.map((item, index) => (
//          <TouchableOpacity
//            key={index}
//            style={{
//              flexDirection: "row",
//              justifyContent: "space-around",
//              alignItems: "center",
//              backgroundColor: "#F3F3F3",
//              marginVertical: 10,
//              borderRadius: 8,
//              paddingVertical: 20,
//            }}
//            // onPress={() => navigation.navigate("DetailClub")}
//          >
//            <View
//              style={{
//                flexDirection: "row",
//                justifyContent: "space-between",
//              }}>
//              <View
//                style={{
//                  flexDirection: "row",
//                  justifyContent: "space-between",
//                  alignItems: "center",
//                }}>
//                {/* <Ionicons name="reader-outline" size={30} color="#711775" /> */}
//                <Image
//                  source={require("../../../assets/reader.png")}
//                  style={{ width: 40, height: 40 }}
//                />
//                <Image
//                  source={item.picture}
//                  style={{ width: 90, height: 40, marginLeft: 10 }}
//                />
//                <View
//                  style={{
//                    flexDirection: "column",
//                    marginLeft: 10,
//                    justifyContent: "center",
//                  }}>
//                  <Text
//                    style={{
//                      color: "#711775",
//                      fontSize: 15,
//                      fontWeight: "600",
//                    }}>
//                    {item.nameAreas}
//                  </Text>
//                  <Text>{item.person}</Text>
//                </View>
//              </View>
//            </View>
//            <TouchableOpacity
//            // onPress={() => navigation.navigate("DetailClub")}
//            >
//              <Ionicons
//                name="chevron-forward-outline"
//                size={25}
//                color="#711775"
//              />
//            </TouchableOpacity>
//          </TouchableOpacity>
//        ))}
//      </View>
//    </View>
//  </ScrollView>;
