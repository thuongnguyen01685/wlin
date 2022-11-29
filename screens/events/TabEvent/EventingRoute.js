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
  ChangeStatusLoveAction,
  getDetailEventsAction,
  getEventsAction,
} from "../../../redux/actions/eventsAction";
import { formatDateDisplay, formatDateDisplays } from "../../../utils/datetime";
import { URL } from "../../../utils/fetchApi";
import Svg, { Path } from "react-native-svg";
import ItemEvent from "./ItemEvent";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// create a component
const EventingRoute = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { auth, event } = useSelector((state) => state);

  const handleDetail = (_id) => {
    dispatch(getDetailEventsAction(_id, auth.token));
    navigation.navigate("DetailEvents", { _id: _id });
  };

  let dateNow = new Date();
  let year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  let day =
    dateNow.getDate() >= 10 ? dateNow.getDate() : `0${dateNow.getDate()}`;
  let dayofweek = dateNow.getDay();

  const dayNow = year + "-" + month + "-" + day;

  const dayname = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  const eventing = event?.getEvents?.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() >
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
    setRefreshing(false);
  }, [auth.profile.email, auth.permission.group_id]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function it() {
      const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));

      const arrayClub = res.map((item) => item.ma_club);

      dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
    }
    it();
    wait(1000).then(() => setRefreshing(false));
  }, [auth.profile.email, auth.permission.group_id]);

  const onChangeStatusLove = async (_id, trang_thai, _idDelete) => {
    await dispatch(
      ChangeStatusLoveAction(_id, trang_thai, auth.token, _idDelete)
    );
    const res = await dispatch(getCLub(auth, 1, auth.permission.group_id));

    const arrayClub = res.map((item) => item.ma_club);

    dispatch(getEventsAction(auth, arrayClub, auth.permission.group_id));
  };
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
          {eventing?.length > 0 ? (
            eventing.map((item) => (
              <ItemEvent
                onChangeStatusLove={onChangeStatusLove}
                key={item._id}
                item={item}
                handleDetail={handleDetail}
              />
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
                Không có sự kiện nào sắp diễn ra.
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
export default EventingRoute;
