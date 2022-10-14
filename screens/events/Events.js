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
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import Lottie from "lottie-react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import {
  getDetailEventsAction,
  getEventsAction,
} from "../../redux/actions/eventsAction";
import {
  formatDateDisplay,
  formatDateDisplays,
  formatDateTimeDisplay,
} from "../../utils/datetime";
import { URL } from "../../utils/fetchApi";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const ratio = w / 720;

const EventRoute = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { auth, event } = useSelector((state) => state);

  const handleDetail = (_id) => {
    dispatch(getDetailEventsAction(_id, auth.token));
    navigation.navigate("DetailEvents");
  };

  let dateNow = new Date();
  let year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  let day = dateNow.getDate();
  let dayofweek = dateNow.getDay();

  const dayNow = year + "-" + month + "-" + day;

  const dayname = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  //console.log(dayname[dayofweek] + " ngày " + day + "/" + month + "/" + year);

  const events = event.getEvents.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() ===
      new Date(dayNow).getTime()
  );

  //console.log(compare_date(date1, date2));

  useEffect(() => {
    setRefreshing(true);
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9796F0", "green", "blue"]}
          />
        }>
        <View style={{ marginBottom: "16%" }}>
          {events.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                // alignItems: "center",
                marginBottom: 10,
                borderRadius: 8,
                paddingVertical: 5,
                marginHorizontal: 15,
                borderBottomColor: "#DADADA",
                borderBottomWidth: 0.5,
              }}
              onPress={() => handleDetail(item._id)}>
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: 7,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Image
                    source={{ uri: `${URL}${item.hinh_anh}` }}
                    style={{ width: 80, height: 80, borderRadius: 7 }}
                  />
                </View>
                <View
                  style={{
                    width: "75%",
                    justifyContent: "space-evenly",
                    alignItems: "stretch",
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      color: "#474747",
                      fontSize: 14,
                      fontWeight: "600",
                    }}>
                    {item.ten_su_kien}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#EEF4FF",
                      width: "50%",
                      borderRadius: 13,
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                    }}>
                    <Ionicons name="calendar" size={15} color="#769CEC" />
                    <Text
                      style={{
                        color: "#769CEC",
                        fontSize: 11,
                        fontWeight: "600",
                        left: 10,
                      }}>
                      {formatDateDisplay(item.ngay_su_kien)}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="location" size={14} />
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 10,
                        fontWeight: "600",
                        left: 5,
                      }}>
                      {item.dia_diem}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",

                  width: "15%",
                  marginLeft: 10,
                }}>
                <TouchableOpacity>
                  <Ionicons
                    name={item.save ? "bookmark" : "bookmark-outline"}
                    size={20}
                    color={item.save ? "#FFBE17" : "#711775"}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="alert-circle-outline"
                    size={20}
                    color="#9D85F2"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const EventingRoute = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { auth, event } = useSelector((state) => state);

  const handleDetail = (_id) => {
    dispatch(getDetailEventsAction(_id, auth.token));
    navigation.navigate("DetailEvents");
  };

  let dateNow = new Date();
  let year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  let day = dateNow.getDate();
  let dayofweek = dateNow.getDay();

  const dayNow = year + "-" + month + "-" + day;

  const dayname = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  //console.log(dayname[dayofweek] + " ngày " + day + "/" + month + "/" + year);

  const eventing = event.getEvents.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() >
      new Date(dayNow).getTime()
  );

  //console.log(compare_date(date1, date2));

  useEffect(() => {
    setRefreshing(true);
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9796F0", "green", "blue"]}
          />
        }>
        <View style={{ marginBottom: "16%" }}>
          {eventing.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                // alignItems: "center",
                marginBottom: 10,
                borderRadius: 8,
                paddingVertical: 5,
                marginHorizontal: 15,
                borderBottomColor: "#DADADA",
                borderBottomWidth: 0.5,
              }}
              onPress={() => handleDetail(item._id)}>
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: 7,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Image
                    source={{ uri: `${URL}${item.hinh_anh}` }}
                    style={{ width: 80, height: 80, borderRadius: 7 }}
                  />
                </View>
                <View
                  style={{
                    width: "75%",
                    justifyContent: "space-evenly",
                    alignItems: "stretch",
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      color: "#474747",
                      fontSize: 14,
                      fontWeight: "600",
                    }}>
                    {item.ten_su_kien}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#EEF4FF",
                      width: "50%",
                      borderRadius: 13,
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                    }}>
                    <Ionicons name="calendar" size={15} color="#769CEC" />
                    <Text
                      style={{
                        color: "#769CEC",
                        fontSize: 11,
                        fontWeight: "600",
                        left: 10,
                      }}>
                      {formatDateDisplay(item.ngay_su_kien)}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="location" size={14} />
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 10,
                        fontWeight: "600",
                        left: 5,
                      }}>
                      {item.dia_diem}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",

                  width: "15%",
                  marginLeft: 10,
                }}>
                <TouchableOpacity>
                  <Ionicons
                    name={item.save ? "bookmark" : "bookmark-outline"}
                    size={20}
                    color={item.save ? "#FFBE17" : "#711775"}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="alert-circle-outline"
                    size={20}
                    color="#9D85F2"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
const EventedRoute = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { auth, event } = useSelector((state) => state);

  const handleDetail = (_id) => {
    dispatch(getDetailEventsAction(_id, auth.token));
    navigation.navigate("DetailEvents");
  };

  let dateNow = new Date();
  let year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  let day = dateNow.getDate();
  let dayofweek = dateNow.getDay();

  const dayNow = year + "-" + month + "-" + day;

  const dayname = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  //console.log(dayname[dayofweek] + " ngày " + day + "/" + month + "/" + year);

  const evented = event.getEvents.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() <
      new Date(dayNow).getTime()
  );

  //console.log(compare_date(date1, date2));

  useEffect(() => {
    setRefreshing(true);
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9796F0", "green", "blue"]}
          />
        }>
        <View style={{ marginBottom: "16%" }}>
          {evented.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                // alignItems: "center",
                marginBottom: 10,
                borderRadius: 8,
                paddingVertical: 5,
                marginHorizontal: 15,
                borderBottomColor: "#DADADA",
                borderBottomWidth: 0.5,
              }}
              onPress={() => handleDetail(item._id)}>
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: 7,
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  <Image
                    source={{ uri: `${URL}${item.hinh_anh}` }}
                    style={{ width: 80, height: 80, borderRadius: 7 }}
                  />
                </View>
                <View
                  style={{
                    width: "75%",
                    justifyContent: "space-evenly",
                    alignItems: "stretch",
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      color: "#474747",
                      fontSize: 14,
                      fontWeight: "600",
                    }}>
                    {item.ten_su_kien}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#EEF4FF",
                      width: "50%",
                      borderRadius: 13,
                      paddingHorizontal: 4,
                      paddingVertical: 2,
                    }}>
                    <Ionicons name="calendar" size={15} color="#769CEC" />
                    <Text
                      style={{
                        color: "#769CEC",
                        fontSize: 11,
                        fontWeight: "600",
                        left: 10,
                      }}>
                      {formatDateDisplay(item.ngay_su_kien)}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Ionicons name="location" size={14} />
                    <Text
                      style={{
                        color: "#000000",
                        fontSize: 10,
                        fontWeight: "600",
                        left: 5,
                      }}>
                      {item.dia_diem}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",

                  width: "15%",
                  marginLeft: 10,
                }}>
                <TouchableOpacity>
                  <Ionicons
                    name={item.save ? "bookmark" : "bookmark-outline"}
                    size={20}
                    color={item.save ? "#FFBE17" : "#711775"}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons
                    name="alert-circle-outline"
                    size={20}
                    color="#9D85F2"
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const renderScene = SceneMap({
  first: EventRoute,
  second: EventingRoute,
  third: EventedRoute,
});

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
// create a component
const Events = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { auth, event } = useSelector((state) => state);
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: "first", title: "Đang diễn ra" },
    { key: "second", title: "Sắp diễn ra" },
    { key: "third", title: "Đã diễn ra" },
  ]);

  // console.log(
  //   event.getEvents.map((item) => formatDateTimeDisplay(item.ngay_su_kien))
  // );

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
            Danh sách sự kiện
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
      {/* <View style={{ height: "100%" }}> */}
      {/* <View
          style={{
            backgroundColor: "#f3f3f3",
            marginHorizontal: 15,
            marginTop: 15,
            marginBottom: 10,
            borderRadius: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          {dataHeader.map((item, index) => (
            <TouchableOpacity
              style={{
                backgroundColor: item.code === cat ? "#711775" : "#f3f3f3",
                borderRadius: 20,
                paddingHorizontal: 23,
              }}
              key={index}
              onPress={() => setCat(item.code)}>
              <Text
                style={{
                  color: item.code === cat ? "#ffffff" : "#A0A0A0",
                  marginVertical: 5,
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View> */}
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
      {/* <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ marginBottom: "80%" }}>
            {event.getEvents.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={{
                  flexDirection: "row",
                  // justifyContent: "space-between",
                  // alignItems: "center",
                  marginBottom: 10,
                  borderRadius: 8,
                  paddingVertical: 5,
                  marginHorizontal: 15,
                  borderBottomColor: "#DADADA",
                  borderBottomWidth: 0.5,
                }}
                onPress={() => navigation.navigate("DetailEvents")}>
                <View
                  style={{
                    flexDirection: "row",
                    width: "80%",
                    marginBottom: 5,
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      borderRadius: 7,
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Image
                      source={{ uri: `${URL}${item.hinh_anh}` }}
                      style={{ width: 80, height: 80, borderRadius: 7 }}
                    />
                  </View>
                  <View
                    style={{
                      width: "75%",
                      justifyContent: "space-evenly",
                      alignItems: "stretch",
                      marginLeft: 10,
                    }}>
                    <Text
                      style={{
                        color: "#474747",
                        fontSize: 14,
                        fontWeight: "600",
                      }}>
                      {item.ten_su_kien}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#EEF4FF",
                        width: "50%",
                        borderRadius: 13,
                        paddingHorizontal: 4,
                        paddingVertical: 2,
                      }}>
                      <Ionicons name="calendar" size={15} color="#769CEC" />
                      <Text
                        style={{
                          color: "#769CEC",
                          fontSize: 11,
                          fontWeight: "600",
                          left: 10,
                        }}>
                        {formatDateDisplay(item.ngay_su_kien)}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Ionicons name="location" size={14} />
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 10,
                          fontWeight: "600",
                          left: 5,
                        }}>
                        {item.dia_diem}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",

                    width: "15%",
                    marginLeft: 10,
                  }}>
                  <TouchableOpacity>
                    <Ionicons
                      name={item.save ? "bookmark" : "bookmark-outline"}
                      size={20}
                      color={item.save ? "#FFBE17" : "#711775"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons
                      name="alert-circle-outline"
                      size={20}
                      color="#9D85F2"
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView> */}
      {/* </View> */}
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
});

//make this component available to the app
export default Events;
