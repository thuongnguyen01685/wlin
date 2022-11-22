//import liraries
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import SelectDropdown from "react-native-select-dropdown";
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
import HeaderPart from "../../components/HeaderPart/HeaderPart";
import { useDispatch, useSelector } from "react-redux";
import CheckBox from "expo-checkbox";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { getEventsAction } from "../../redux/actions/eventsAction";
import ModalRequest from "../../components/modal/ModalRequest";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
const { width } = Dimensions.get("window");
const ratio = w / 720;
const selectData = ["Nhiệm kì 1", "Nhiệm kì 2"];
const Unpaid = () => {
  const navigation = useNavigation();
  const [select, setSelect] = useState("nk1");
  const { auth, event } = useSelector((state) => state);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const [isSelected, setSelection] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [checkPayment, setCheckPayment] = useState(false);

  ///

  useEffect(() => {
    dispatch(getEventsAction(auth.token));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
        }}>
        <SelectDropdown
          data={selectData}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={"Chọn nhiệm kì"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <Ionicons
                name={isOpened ? "caret-up-outline" : "caret-down-outline"}
                color={"#444"}
                size={18}
              />
            );
          }}
        />
      </View>
      {modalSuccess && (
        <ModalRequest
          modalSuccess={modalSuccess}
          setModalSuccess={setModalSuccess}
          content={"Gửi thông báo nhắc nợ thành công"}
          checkPayment={checkPayment}
          setCheckPayment={setCheckPayment}
          textButton={"Tiếp tục"}
        />
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ marginBottom: "80%" }}>
          {event.detailEvent?.ds_tham_gia.length > 0 ? (
            event.detailEvent?.ds_tham_gia
              .filter((items) => items.trang_thai_tt === "0")
              .map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#Ffffff",
                    marginVertical: 10,
                    borderRadius: 15,
                    paddingVertical: 5,
                    marginHorizontal: 10,
                    paddingHorizontal: 10,
                    borderWidth: 0.5,
                    borderColor: "#dadada",
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    <View>
                      <CheckBox
                        value={item.check}
                        onValueChange={setSelection}
                      />
                    </View>
                    <View
                      style={{ flexDirection: "row", marginHorizontal: 10 }}>
                      <Image
                        source={require("../../assets/truong.png")}
                        style={{ width: 70, height: 70 }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}>
                      <Text
                        style={{
                          color: "#474747",
                          fontSize: 18,
                          fontWeight: "600",
                        }}>
                        {item.ten_kh}
                      </Text>
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 10,
                          fontWeight: "600",
                        }}>
                        Hội viên
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: "20%",
                    }}>
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
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "600",
                  marginVertical: 20,
                }}>
                Hiện chưa lượt thanh toán nào.
              </Text>
            </View>
          )}
          {checkPayment === false ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 7,
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  width: "35%",
                  justifyContent: "center",
                  marginBottom: 10,
                }}
                onPress={() => setModalSuccess(true)}>
                <LinearGradient
                  start={{ x: 0.3, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#9D85F2", "#9D85F2"]}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#ffffff",
                      textAlign: "center",
                      width: "100%",
                      fontWeight: "500",
                    }}>
                    Nhắc nợ
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingHorizontal: 20,
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 7,
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  width: "35%",
                  justifyContent: "center",
                  marginBottom: 10,
                }}>
                <LinearGradient
                  start={{ x: 0.3, y: 1 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#9D85F2", "#9D85F2"]}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#ffffff",
                      textAlign: "center",
                      width: "100%",
                      fontWeight: "500",
                    }}>
                    Xác nhận thanh toán
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const Paid = () => {
  const navigation = useNavigation();
  const [select, setSelect] = useState("nk1");
  const [refreshing, setRefreshing] = React.useState(false);
  const { auth, event } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEventsAction(auth.token));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <SelectDropdown
          data={selectData}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          defaultButtonText={"Chọn nhiệm kì"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <Ionicons
                name={isOpened ? "caret-up-outline" : "caret-down-outline"}
                color={"#444"}
                size={18}
              />
            );
          }}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{ marginBottom: "80%" }}>
          {event.detailEvent?.ds_tham_gia.length > 0 ? (
            event.detailEvent?.ds_tham_gia
              .filter((items) => items.trang_thai_tt === "1")
              .map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    marginVertical: 10,
                    borderRadius: 15,
                    paddingVertical: 5,
                    marginHorizontal: 10,
                    paddingHorizontal: 10,
                    borderWidth: 0.5,
                    borderColor: "#dadada",
                  }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                    {/* <View>
                  <CheckBox value={item.check} onValueChange={setSelection} />
                </View> */}
                    <View
                      style={{ flexDirection: "row", marginHorizontal: 10 }}>
                      <Image
                        source={require("../../assets/truong.png")}
                        style={{ width: 70, height: 70 }}
                      />
                    </View>

                    <View
                      style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}>
                      <Text
                        style={{
                          color: "#474747",
                          fontSize: 18,
                          fontWeight: "600",
                        }}>
                        {item.ten_kh}
                      </Text>
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 10,
                          fontWeight: "600",
                        }}>
                        {/* {item.vai_tro} */}
                        Hội viên
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: "20%",
                    }}>
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
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "600",
                  marginVertical: 20,
                }}>
                Hiện chưa lượt thanh toán nào.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const renderScene = SceneMap({
  first: Unpaid,
  second: Paid,
});

// create a component
const ListPaticipant = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState("first");

  const [routes] = useState([
    { key: "first", title: "Chưa thanh toán" },
    { key: "second", title: "Đã thanh toán" },
  ]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isSelected, setSelection] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [checkPayment, setCheckPayment] = useState(false);

  const [select, setSelect] = useState("nk1");
  const { auth, event } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getEventsAction(auth.token));
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEventsAction(auth.token));
    wait(2000).then(() => setRefreshing(false));
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
            Danh sách người tham gia
          </Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="alert-circle-outline" size={20} color="#826CCF" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          height: "100%",
          paddingHorizontal: 15,
        }}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={(index) => {
            setIndex(index);
            if (index === 0) {
              setTab("first");
            } else if (index === 1) {
              setTab("second");
            }
          }}
          initialLayout={{ width: layout.width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              renderLabel={({ route, focused }) => (
                <Text
                  style={{
                    color: focused ? "#826CCF" : "#dadada",
                    fontSize: 12,
                    fontWeight: "600",
                  }}>
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
  itemSelect: {
    fontSize: 10,
    fontWeight: "800",
    color: "#474747",
    textAlign: "center",
  },
  indicatorStyle: {
    backgroundColor: "#826CCF",
    padding: 1.5,
    marginBottom: -2,
  },
  ///

  dropdown1BtnStyle: {
    height: 40,
    backgroundColor: "#F8F8F8",
    borderRadius: 8,
    borderColor: "#444",
    width: 160,
    marginTop: 10,
  },
  dropdown1BtnTxtStyle: { color: "#474747", fontSize: 15 },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});

//make this component available to the app
export default ListPaticipant;
