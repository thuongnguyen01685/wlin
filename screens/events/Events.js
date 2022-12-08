//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  TextInput,
  ScrollView,
} from "react-native";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import HeaderPart from "../../components/HeaderPart/HeaderPart";

import EventRoute from "./TabEvent/EventRoute";
import EventingRoute from "./TabEvent/EventingRoute";
import EventedRoute from "./TabEvent/EventedRoute";
import { useDispatch, useSelector } from "react-redux";
import { getEventsAction } from "../../redux/actions/eventsAction";
import { URL } from "../../utils/fetchApi";

const w = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const ratio = w / 720;

const renderScene = SceneMap({
  first: EventRoute,
  second: EventingRoute,
  third: EventedRoute,
});

// create a component
const Events = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const { auth, club } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //search
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.ten_su_kien
          ? item.ten_su_kien.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  useEffect(() => {
    async function it() {
      const arrayClub = club.getClubs.map((item) => item.ma_club);

      const reEvent = await dispatch(
        getEventsAction(auth, arrayClub, auth.permission.group_id)
      );
      setFilteredDataSource(reEvent);
      setMasterDataSource(reEvent);
    }
    it();
  }, [dispatch]);

  const [routes] = useState([
    { key: "first", title: "Đang diễn ra" },
    { key: "second", title: "Sắp diễn ra" },
    { key: "third", title: "Đã diễn ra" },
  ]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderPart />
      <View style={styles.search}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "80%",
            borderRadius: 7,
          }}>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={30} color="#ffffff" />
          </TouchableOpacity>
          <TextInput
            placeholderTextColor={"#ffffff"}
            theme={{
              roundness: 50,
              colors: {
                primary: "green",
                underlineColor: "transparent",
              },
            }}
            underlineColorAndroid="transparent"
            style={styles.input}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search}
            placeholder="Tìm kiếm"
          />
        </View>
        <TouchableOpacity>
          <View
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Ionicons
              name="options-outline"
              size={25}
              color="#ffffff"
              style={{ transform: [{ rotate: "-90deg" }] }}
            />
          </View>
        </TouchableOpacity>
      </View>
      {search !== "" && (
        <View style={styles.resultSearch}>
          <View
            style={{
              borderBottomWidth: 0.3,
              borderColor: "#826CCF",
              width: w * 0.3,
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Text style={{ fontSize: 13, fontWeight: "400", color: "#826CCF" }}>
              Kết quả tìm kiếm.
            </Text>
          </View>
          <ScrollView>
            {filteredDataSource.length > 0 ? (
              filteredDataSource.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={{
                    paddingVertical: 5,
                    borderBottomWidth: 0.5,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() =>
                    navigation.navigate("DetailEvents", { _id: item._id })
                  }>
                  <Image
                    source={{ uri: `${URL}${item.hinh_anh}` }}
                    style={{
                      width: w * 0.1,
                      height: w * 0.1,
                      resizeMode: "contain",
                      borderRadius: 5,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: "#474747",
                      marginLeft: 10,
                    }}>
                    {item.ten_su_kien}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: height * 0.2,
                }}>
                <Image
                  source={require("../../assets/search.png")}
                  style={{ width: w * 0.2, height: w * 0.2, right: 5 }}
                />
                <Text
                  style={{ fontSize: 15, fontWeight: "600", color: "#474747" }}>
                  Chưa tìm thấy kết quả
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
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
            Danh sách sự kiện
          </Text>
        </View>
      </View>
      <View
        style={{
          height: "100%",
          paddingHorizontal: 15,
        }}>
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
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
  },
  indicatorStyle: {
    backgroundColor: "#826CCF",
    padding: 1.5,
    marginBottom: -2,
  },
  search: {
    zIndex: 1,
    position: "absolute",
    marginTop: "23%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 15,
  },
  input: {
    height: 40,
    width: "79%",
    marginLeft: 10,
    color: "#ffffff",
  },
  resultSearch: {
    zIndex: 5,
    position: "absolute",
    marginTop: "35%",
    width: "90%",
    marginHorizontal: 20,
    backgroundColor: "#E6E1F8",
    borderRadius: 20,
    borderWidth: 0.8,
    borderColor: "#f8f8f8",
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});

//make this component available to the app
export default Events;
