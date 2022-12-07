//import liraries
import { Ionicons } from "@expo/vector-icons";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StatusBar,
  Animated,
  Dimensions,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import Loading from "../../components/loading/Loading";

import {
  getBenefitAction,
  getBenefitManagemant,
} from "../../redux/actions/benefitAction";
import { getCLub } from "../../redux/actions/ClupAction";
import BenefitHome from "../home/Benefit.home";

// create a component
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const PayBenefit = () => {
  const { auth, benefit } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);

  //search
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  //animated
  const circleAnimatedValue = useRef(new Animated.Value(0)).current;

  const circleAnimated = () => {
    circleAnimatedValue.setValue(0);
    Animated.timing(circleAnimatedValue, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        circleAnimated();
      }, 1000);
    });
  };

  const translateX = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 100],
  });

  const translateX2 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 200],
  });
  const translateX3 = circleAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 90],
  });
  useEffect(() => {
    setRefreshing(true);
    circleAnimated();
    //dispatch(getBenefitAction(auth.token, auth.profile.email));
    async function it() {
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));

      const arrMember = res
        ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
        .filter((item, index, arr) => {
          const itemIndex = arr.findIndex((it) => it === item);
          return itemIndex === index;
        });
      const reBe = await dispatch(getBenefitManagemant(auth.token, arrMember));

      setFilteredDataSource(reBe);
      setMasterDataSource(reBe);
      setRefreshing(false);
    }
    it();
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    circleAnimated();

    async function it() {
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));

      const arrMember = res
        ?.flatMap((items) => items.ds_thanh_vien.map((item) => item.ma_kh))
        .filter((item, index, arr) => {
          const itemIndex = arr.findIndex((it) => it === item);
          return itemIndex === index;
        });
      const reBe = await dispatch(getBenefitManagemant(auth.token, arrMember));

      setFilteredDataSource(reBe);
      setMasterDataSource(reBe);
    }
    it();

    wait(500).then(() => setRefreshing(false));
  }, [dispatch]);
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.ten_quyen_loi
          ? item.ten_quyen_loi.toUpperCase()
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
          <TouchableOpacity style={{ marginRight: 10 }}>
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
            Danh sách chỉ số quyền lợi chưa trả
          </Text>
        </View>
      </View>
      <View style={{ height: "100%" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#9D85F2", "red", "green"]}
            />
          }>
          <View style={{ marginBottom: "60%" }}>
            {refreshing
              ? Array(10)
                  .fill("")
                  .map((i, index) => (
                    <View
                      style={[
                        {
                          marginBottom: 8,
                          flexDirection: "row",
                          justifyContent: "center",
                        },
                        styles.card,
                      ]}
                      key={index}>
                      <View
                        style={{
                          width: w * 0.05,
                          height: w * 0.05,
                          borderRadius: 5,
                          backgroundColor: "#ECEFF1",
                          overflow: "hidden",
                          marginRight: 10,
                        }}>
                        <Animated.View
                          style={{
                            width: "30%",
                            opacity: 0.5,
                            height: "100%",
                            backgroundColor: "white",
                            transform: [{ translateX: translateX }],
                          }}></Animated.View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "space-evenly",
                          overflow: "hidden",
                          borderRadius: 10,
                        }}>
                        <Animated.View
                          style={{
                            backgroundColor: "#ECEFF1",
                            height: 28,
                          }}>
                          <Animated.View
                            style={{
                              width: "20%",
                              height: "100%",
                              backgroundColor: "white",
                              opacity: 0.5,
                              transform: [{ translateX: translateX2 }],
                            }}></Animated.View>
                        </Animated.View>
                        <View
                          style={{ backgroundColor: "#ECEFF1", height: 28 }}>
                          <Animated.View
                            style={{
                              width: "20%",
                              height: "100%",
                              backgroundColor: "white",
                              opacity: 0.5,
                              transform: [{ translateX: translateX2 }],
                            }}></Animated.View>
                        </View>
                      </View>
                    </View>
                  ))
              : filteredDataSource.map((item, index) => (
                  <BenefitHome item={item} key={index} />
                ))}
          </View>
        </ScrollView>
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
  card: {
    padding: 10,
    shadowColor: "black",
    borderRadius: 20,
    backgroundColor: "#FAFAFA",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  search: {
    zIndex: 1,
    position: "absolute",
    marginTop: h * 0.13,
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
});

//make this component available to the app
export default PayBenefit;
