//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Lottie from "lottie-react-native";
import React, { Component, useEffect, useRef, useState } from "react";
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
  FlatList,
  ActivityIndicator,
  useWindowDimensions,
  RefreshControl,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { getCLub } from "../../redux/actions/ClupAction";
import { URL } from "../../utils/fetchApi";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const Nation = () => {
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
    }, 2000);
  }, [dispatch, page]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCLub(auth.token, page));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch, page]);
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10, paddingBottom: "18%" }}>
        <Animated.FlatList
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#9796F0", "green", "blue"]}
            />
          }
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
                  marginBottom: 2,
                }}>
                <TouchableOpacity
                  key={item._id}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    backgroundColor: "#Ffffff",
                    marginTop: 15,
                    borderRadius: 8,
                    paddingVertical: 20,
                    borderBottomWidth: 0.5,

                    borderColor: "#DADADA",
                    // shadowColor: "#000",
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 2,
                    // },
                    // shadowOpacity: 0.25,
                    // shadowRadius: 7,
                    // elevation: 4,

                    marginHorizontal: 15,
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
                      <View
                        style={{
                          borderRadius: 8,
                          borderWidth: 0.4,
                          borderColor: "#DADADA",
                        }}>
                        {item.hinh_anh ? (
                          <Image
                            source={{
                              uri: `${URL}/`.concat(`${item.hinh_anh}`),
                            }}
                            style={{
                              width: 80,
                              height: 40,
                              borderRadius: 7,
                            }}
                          />
                        ) : (
                          <Image
                            source={require("../../assets/logo.png")}
                            style={{
                              width: 80,
                              height: 40,
                              resizeMode: "contain",
                            }}
                          />
                        )}
                      </View>

                      <View
                        style={{
                          flexDirection: "column",
                          marginLeft: 20,
                          justifyContent: "center",
                        }}>
                        <Text
                          style={{
                            color: "#826CCF",
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
                      color="#9D85F2"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />
      </View>
    </View>
  );
};
const Region = () => {
  return (
    <View style={styles.container}>
      <Text>2</Text>
    </View>
  );
};
const Area = () => {
  return (
    <View style={styles.container}>
      <Text>3</Text>
    </View>
  );
};

const renderScene = SceneMap({
  first: Nation,
  second: Region,
  third: Area,
});
// create a component

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const { height } = Dimensions.get("screen");
const Club = () => {
  const navigation = useNavigation();

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Quốc gia" },
    { key: "second", title: "Vùng" },
    { key: "third", title: "Khu vực" },
  ]);

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
    }, 2000);
  }, [dispatch, page]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getCLub(auth.token, page));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch, page]);

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
          marginTop: -55,
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
            Danh sách CLUB
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

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={({ route, color }) => (
              <Text
                style={{ color: "#826CCF", fontSize: 12, fontWeight: "600" }}>
                {route.title}
              </Text>
            )}
            indicatorStyle={styles.indicatorStyle}
            style={{ backgroundColor: "#ffffff" }}
          />
        )}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  indicatorStyle: {
    backgroundColor: "#826CCF",
    padding: 1.5,
    marginBottom: -2,
  },
});

//make this component available to the app
export default Club;
