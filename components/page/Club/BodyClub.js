//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component, useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  FlatList,
  ActivityIndicator,
  Animated,
  Dimensions,
} from "react-native";
import { CLUB, getCLub } from "../../../redux/actions/ClupAction";
import { URL } from "../../../utils/fetchApi";

// create a component
const data = [
  {
    _id: 1,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
    code: "quocgia",
  },
  {
    _id: 2,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
    code: "quocgia",
  },
  {
    _id: 3,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
    code: "quocgia",
  },
  {
    _id: 1,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
    code: "khuvuc",
  },
  {
    _id: 2,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
    code: "khuvuc",
  },
  {
    _id: 3,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
    code: "khuvuc",
  },
  {
    _id: 1,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PASSION USA+",
    person: "Mai Thu Huyền",
    code: "vung",
  },
  {
    _id: 2,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN STARS ASIA+",
    person: "Mai Thu Huyền",
    code: "vung",
  },
  {
    _id: 3,
    picture: require("../../../assets/logo.png"),
    nameAreas: "WLIN PIONEER EU+",
    person: "Mai Thu Huyền",
    code: "vung",
  },
];
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const { height } = Dimensions.get("screen");
const BodyClub = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { auth, club } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = useState(1);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setRefreshing(true);
    dispatch(getCLub(auth.token, page));
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [dispatch, page, props.code]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCLub(auth.token, page));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch, page]);

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: refreshing ? "space-between" : "flex-start",
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: "#711775",
            fontWeight: "600",

            paddingTop: 15,
          }}>
          Danh sách CLUB
        </Text>
        {refreshing && <ActivityIndicator size="large" color="#711775" />}
      </View>

      {/* <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor="#711775"
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#711775", "green", "blue"]}
          />
        }> */}

      <View
        style={{ marginBottom: "30%", paddingHorizontal: 15, marginTop: 10 }}>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          data={club.getClubs}
          onEndReachedThreshold={0.5}
          onEndReached={() => setPage(page + 1)}
          keyExtractor={(item, index) => index}
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
                <TouchableOpacity
                  key={item._id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "#F3F3F3",
                    marginVertical: 10,
                    borderRadius: 8,
                    paddingVertical: 20,
                  }}
                  onPress={() =>
                    navigation.navigate("DetailClub", { _id: item._id })
                  }>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      width: "70%",
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}>
                      {item.hinh_anh ? (
                        <Image
                          source={{
                            uri: `${URL}/`.concat(`${item.hinh_anh}`),
                          }}
                          style={{ width: 80, height: 40, borderRadius: 7 }}
                        />
                      ) : (
                        <Image
                          source={require("../../../assets/logo.png")}
                          style={{ width: 80, height: 40 }}
                        />
                      )}

                      <View
                        style={{
                          flexDirection: "column",
                          marginLeft: 10,
                          justifyContent: "center",
                        }}>
                        <Text
                          style={{
                            color: "#711775",
                            fontSize: 15,
                            fontWeight: "600",
                          }}>
                          {item.ten_club}
                        </Text>
                        <Text>{item.ten_partner}</Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("DetailClub")}>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={25}
                      color="#711775"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default BodyClub;
