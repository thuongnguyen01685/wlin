//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { formatDate, formatDateDisplays } from "../../utils/datetime";
import { URL } from "../../utils/fetchApi";
import Carousel from "react-native-banner-carousel-updated";
import { getDetailEventsAction } from "../../redux/actions/eventsAction";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const CasouselEventing = (props) => {
  const { auth, event } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //eventing
  let dateNow = new Date();
  let year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  let day =
    dateNow.getDate() >= 10 ? dateNow.getDate() : `0${dateNow.getDate()}`;
  let dayofweek = dateNow.getDay();
  const dayNow = year + "-" + month + "-" + day;
  const eventing = event?.getEvents?.filter(
    (item) =>
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() >
        new Date(dayNow).getTime() ||
      new Date(formatDateDisplays(item.ngay_su_kien)).getTime() ===
        new Date(dayNow).getTime()
  );
  const images = eventing?.map((item) => item);

  const renderPage = (item, index) => {
    return (
      <TouchableOpacity
        key={item._id}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 5,
        }}
        onPress={() => handleDetail(item._id)}>
        <Image
          style={{
            width: "93%",
            height: 210,
            borderRadius: 10,
            opacity: 1,
            backgroundColor: "#474747",
          }}
          source={{
            uri: `${URL}`.concat(`${item.hinh_anh}`),
          }}
        />
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 210,
            flexDirection: "column",
            justifyContent: "space-between",
            paddingVertical: 5,
            alignItems: "flex-start",
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              width: "15%",
              marginLeft: 20,
              backgroundColor: "#FCFCFC",
              borderRadius: 8,
              padding: 5,
              opacity: 0.7,
            }}>
            <Text
              style={{
                color: "#503F8A",
                fontSize: 8,
                fontWeight: "600",
                textAlign: "center",
              }}>
              Tháng {formatDate(item.ngay_su_kien, "thang")}
            </Text>
            <View
              style={{
                padding: 5,
                backgroundColor: "#BEB0EF",
                borderRadius: 8,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 2,
              }}>
              <Text
                style={{ color: "#503F8A", fontSize: 12, fontWeight: "600" }}>
                {formatDate(item.ngay_su_kien, "ngay")}
              </Text>
              <Text
                style={{ color: "#503F8A", fontSize: 10, fontWeight: "600" }}>
                {formatDate(item.ngay_su_kien, "thu")}
              </Text>
            </View>
          </View>
          <Text style={styles.titleNews}>{item.ten_su_kien}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const handleDetail = (_id) => {
    dispatch(getDetailEventsAction(_id, auth.token));
    navigation.navigate("DetailEvents", { _id: _id });
  };
  return (
    <Carousel autoplay autoplayTimeout={5000} loop index={0} pageSize={width}>
      {images?.map((image, index) => renderPage(image, index))}
    </Carousel>
  );
};

// define your styles
const styles = StyleSheet.create({
  textContent: {
    fontSize: 12,
    fontWeight: "400",
    color: "#ffffff",
  },
  titleNews: {
    color: "#Ffffff",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "center",
    paddingHorizontal: 15,
    flexWrap: "wrap",
  },
});

//make this component available to the app
export default CasouselEventing;
