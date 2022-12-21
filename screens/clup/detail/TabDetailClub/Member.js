//import liraries
import { Ionicons } from "@expo/vector-icons";
import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../../../../utils/fetchApi";
import Svg, { Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import {
  getDetailClub,
  getDetailMember,
} from "../../../../redux/actions/ClupAction";
import { Dimensions } from "react-native";

// create a component
const dataColor = [
  {
    _id: 1,
    bgColor: "#F1F1F1",
    color: "#434343",
  },
  {
    _id: 2,
    bgColor: "#EEF4FF",
    color: "#769CEC",
  },
  {
    _id: 3,
    bgColor: "#E9FBEF",
    color: "#5BD3A1",
  },
  {
    _id: 4,
    bgColor: "#FEEAEA",
    color: "#F96F6D",
  },
  {
    _id: 5,
    bgColor: "#FEF8E3",
    color: "#FBD237",
  },
];
const { width, height } = Dimensions.get("window");
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const Member = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { auth, club } = useSelector((state) => state);

  let temp = -1;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getDetailClub(props.id_event, auth.token));
    wait(500).then(() => setRefreshing(false));
  }, []);

  const handleDetailMember = (ma_kh) => {
    dispatch(getDetailMember(ma_kh, auth.token));
    navigation.navigate("ManagementMember");
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
            marginBottom: "80%",
            marginTop: 10,
          }}>
          {club.detailClub.ds_thanh_vien &&
            club.detailClub.ds_thanh_vien.map((item, index) => {
              temp++;

              if (dataColor.length === temp) {
                temp = 0;
              }
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginVertical: 10,
                    borderRadius: 20,
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderColor: "#dadada",
                    borderWidth: 0.7,
                    width: width * 0.92,
                  }}
                  onPress={() => {
                    handleDetailMember(item.ma_kh);
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                    }}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={
                          item.avatar
                            ? {
                                uri: `${URL}/${item.avatar}`,
                              }
                            : require("../../../../assets/avtUser.png")
                        }
                        style={{
                          width: width * 0.12,
                          height: width * 0.12,
                          borderRadius: 50,
                          resizeMode: "contain",
                        }}
                      />
                      <Svg
                        width={18}
                        height={18}
                        viewBox="0 0 12 12"
                        fill={"none"}
                        xmlns="http://www.w3.org/2000/svg">
                        <Path
                          d="M1.26536 4.89019L4.21828 0.624856L4.38234 4.06994L7.49931 3.24968L6.67906 6.36666L10.1241 6.53071L5.8588 9.48363L1.26536 4.89019ZM4.87449 10.4679C4.67763 10.6648 4.41514 10.6648 4.21828 10.4679L0.281049 6.53071C0.0841871 6.33385 0.0841872 6.07136 0.281049 5.8745L0.609152 5.5464L5.20259 10.1398L4.87449 10.4679Z"
                          fill={
                            item.goi_thanh_vien_kh === "01"
                              ? "#B6B2AA"
                              : item.goi_thanh_vien_kh === "02"
                              ? "#FAAF73"
                              : item.goi_thanh_vien_kh === "03"
                              ? "#8084EB"
                              : item.goi_thanh_vien_kh === "04"
                              ? "#1F1F1F"
                              : "#fff"
                          }
                        />
                      </Svg>
                    </View>

                    <View
                      style={{
                        marginLeft: 10,
                        width: width * 0.6,
                        flexDirection: "column",
                      }}>
                      <Text
                        style={{
                          color: "#474747",
                          fontSize: 15,
                          fontFamily: "LexendDeca_600SemiBold",
                        }}>
                        {item.ten_kh}
                      </Text>
                      <View
                        style={{
                          backgroundColor: item.ten_chuc_vu
                            ? dataColor[temp].bgColor
                            : "#ffff",
                          paddingVertical: item.ten_chuc_vu ? 5 : 0,
                          borderRadius: 15,
                          width: width * 0.4,
                        }}>
                        <Text
                          style={{
                            color: dataColor[temp].color,
                            fontSize: 12,
                            fontFamily: "LexendDeca_400Regular",
                            textAlign: "center",
                          }}>
                          {item.ten_chuc_vu}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      handleDetailMember(item.ma_kh);
                    }}>
                    <Ionicons
                      name="alert-circle-outline"
                      size={20}
                      color="#5457A6"
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  itemSelect: {
    fontSize: 10,
    fontWeight: "800",
    color: "#474747",
    textAlign: "center",
  },
});

//make this component available to the app
export default Member;
