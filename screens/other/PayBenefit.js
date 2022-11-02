//import liraries
import { Ionicons } from "@expo/vector-icons";
import React, { Component, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import Loading from "../../components/loading/Loading";
import { getBenefitAction } from "../../redux/actions/benefitAction";
import BenefitHome from "../home/Benefit.home";

// create a component
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const PayBenefit = () => {
  const { auth, benefit } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    dispatch(getBenefitAction(auth.token, auth.profile.email));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getBenefitAction(auth.token, auth.profile.email));
    wait(1000).then(() => setRefreshing(false));
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

          {refreshing && (
            <View
              style={{
                left: 10,
                padding: 30,
                position: "absolute",
                left: "100%",
              }}>
              {/* <Lottie
                source={require("../../assets/loading.json")}
                autoPlay
                loop
              /> */}
            </View>
          )}
        </View>

        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
        </TouchableOpacity>
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
            {benefit.loading ? (
              <Loading />
            ) : (
              benefit.getPayBenefit.map((item, index) => (
                <BenefitHome item={item} key={index} />
              ))
            )}
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
});

//make this component available to the app
export default PayBenefit;
