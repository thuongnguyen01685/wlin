//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  Animated,
} from "react-native";
import Lottie from "lottie-react-native";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { useDispatch } from "react-redux";
import { Avatar, Surface } from "react-native-paper";
const w = Dimensions.get("window").width;
const { height } = Dimensions.get("screen");
const ratio = w / 720;
const data = [
  {
    key: 1,
    picture: require("../../assets/logo.png"),
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
    bg: "#FEEAEA",
    color: "#F96F6D",
  },
  {
    key: 2,
    picture: require("../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
    bg: "#EEF4FF",
    color: "#769CEC",
  },
  {
    key: 3,
    picture: require("../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
    bg: "#E9FBEF",
    color: "#47CE96",
  },
];
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const Slips = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart />
      <View
        style={{
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
          zIndex: 3,
          marginTop: -50,
          marginHorizontal: 15,
          paddingVertical: 20,
          borderRadius: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
          <Text style={{ fontSize: 18, fontWeight: "600", color: "#826CCF" }}>
            Danh sách phiếu
          </Text>

          {refreshing && (
            <View
              style={{
                left: 10,
                padding: 30,
                position: "absolute",
                left: "100%",
              }}>
              <Lottie
                source={require("../../assets/loading.json")}
                autoPlay
                loop
              />
            </View>
          )}
        </View>

        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
        </TouchableOpacity>
      </View>
      <View style={{ height: "100%" }}>
        <View
          style={{
            marginBottom: "75%",
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
                      <View
                        style={{
                          flex: 0.3,
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                        }}>
                        {/* <Avatar.Image size={42} source={item.picture} /> */}
                        <Ionicons name="reader" size={30} color={item.color} />
                        <View
                          style={{
                            borderColor: "#dadada",
                            borderRadius: 15,
                            borderWidth: 0.7,
                            paddingVertical: 18,
                            paddingHorizontal: 5,
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: 5,
                          }}>
                          <Image
                            source={item.picture}
                            style={{ width: 60, height: 30 }}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 0.6,
                          flexDirection: "column",
                          justifyContent: "center",
                          marginLeft: 10,
                        }}>
                        <Text
                          style={{
                            color: "#474747",
                            fontSize: 15,
                            fontWeight: "600",
                          }}>
                          {item.nameAreas}
                        </Text>
                        <View
                          style={{
                            backgroundColor: item.bg,
                            width: "50%",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 15,
                            paddingVertical: 2,
                          }}>
                          <Text
                            style={{
                              color: "#474747",
                              fontSize: 12,
                              fontWeight: "400",
                              color: item.color,
                            }}>
                            {item.person}
                          </Text>
                        </View>
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
                            color="#9D85F2"
                          />
                        </TouchableOpacity>
                      </View>
                    </Surface>
                  </TouchableOpacity>
                </Animated.View>
              );
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}>
            <TouchableOpacity
              style={{
                top: 15,
              }}
              onPress={() => {
                navigation.navigate("CreateRefer");
              }}>
              <LinearGradient
                start={{ x: 0.3, y: 0.5 }}
                end={{ x: 1, y: 0 }}
                colors={["#9D85F2", "#9D85F2"]}
                style={{
                  padding: 10,
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRadius: 20,
                }}>
                <Text
                  style={{ fontSize: 15, fontWeight: "600", color: "#ffffff" }}>
                  Tạo mới
                </Text>
                {/* <Ionicons name="add-outline" size={30} color="#ffffff" /> */}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  surface: {
    height: height * 0.1,
    marginTop: 15,
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    flexDirection: "row",
    backgroundColor: "#Ffffff",
    borderBottomWidth: 0.5,
    borderColor: "#DADADA",
  },
});

//make this component available to the app
export default Slips;
