//import liraries
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCLub } from "../../../redux/actions/ClupAction";
import {
  getDetailEventsAction,
  getEventsAction,
} from "../../../redux/actions/eventsAction";
import { formatDateDisplay, formatDateDisplays } from "../../../utils/datetime";
import { URL } from "../../../utils/fetchApi";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// create a component
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

  const evented = event.getEvents.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() <
      new Date(dayNow).getTime()
  );

  useEffect(() => {
    setRefreshing(true);
    async function it() {
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));

      const arrayClub = res.map((item) => item.ma_club);

      dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
    }
    it();
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch, auth.profile.email, auth.permission.group_id]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function it() {
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));

      const arrayClub = res.map((item) => item.ma_club);

      dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
    }
    it();
    // dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch, auth.profile.email, auth.permission.group_id]);
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
        <View
          style={{
            marginTop: 10,
            height: "100%",
            marginBottom: "75%",
          }}>
          {evented.length > 0 ? (
            evented.map((item) => (
              <TouchableOpacity
                key={item._id}
                style={{
                  flexDirection: "row",
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
                      color={item.save ? "#FFBE17" : "#FEC90F"}
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
            ))
          ) : (
            <View
              style={{
                paddingVertical: 15,
                height: 200,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Text
                style={{ fontSize: 15, color: "#474747", fontWeight: "600" }}>
                Không có sự kiện nào đã diễn ra.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default EventedRoute;
