import React from "react";
import { useState, useEffect } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  RefreshControl,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteNotify, getNotify } from "../../redux/actions/notifyAction";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

// create a component
const ModalNotify = (props) => {
  const { notify } = useSelector((state) => state);
  const [isRead, setIsRead] = useState(true);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  const sumNotifyNotRead = notify.getNotify
    ? notify.getNotify.length > 0
      ? notify.getNotify
          .filter((items) => items.read === false)
          .map((item) => item)
      : 0
    : 0;

  useEffect(() => {
    async function it() {
      const token = await AsyncStorage.getItem("@token_key");
      if (token) {
        await dispatch(getNotify(token));
      }
    }
    it();
  }, [dispatch]);

  const onRefresh = React.useCallback(async () => {
    setReload(true);
    const token = await AsyncStorage.getItem("@token_key");
    dispatch(getNotify(token));
    wait(1000).then(() => setReload(false));
  }, [dispatch]);

  const handleDeleteNo = async (id) => {
    const token = await AsyncStorage.getItem("@token_key");
    await dispatch(deleteNotify(id, token));
    dispatch(getNotify(token));
  };

  const handleDeleteAllNo = async () => {
    const token = await AsyncStorage.getItem("@token_key");
    notify.getNotify.map((item) => dispatch(deleteNotify(item._id, token)));
    dispatch(getNotify(token));
  };
  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      isVisible={props.modalVisible}
      backdropColor="#C4C4C4"
      backdropOpacity={0.5}
      onBackdropPress={() => props.setModalVisible(false)}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          padding: 20,
          elevation: 5,
          position: "absolute",
          width: "100%",
          top: 14,
          height: "auto",
          bottom: 20,
        }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 25, color: "#826CCF", fontWeight: "bold" }}>
            Thông báo
          </Text>
          <TouchableOpacity onPress={() => props.setModalVisible(false)}>
            <MaterialCommunityIcons
              name="close-outline"
              size={24}
              color="#FF0000"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            borderBottomWidth: 1,
            borderColor: "#826CCF",
            paddingBottom: 5,
          }}>
          <TouchableOpacity onPress={() => setIsRead(true)}>
            <View
              style={{
                borderRadius: 50,
                overflow: "hidden",
              }}>
              {isRead ? (
                <Text
                  style={{
                    fontSize: 15,
                    color: "#826CCF",
                    backgroundColor: "#B2CBF9",
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                  }}>
                  Tất cả
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    color: "#5F5F5F",
                    backgroundColor: "#ECECEC",
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                  }}>
                  Tất cả
                </Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsRead(false)}>
            <View style={{ borderRadius: 50, overflow: "hidden" }}>
              {isRead ? (
                <Text
                  style={{
                    fontSize: 15,
                    color: "#5F5F5F",
                    backgroundColor: "#ECECEC",
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                  }}>
                  Chưa đọc
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 15,
                    color: "#826CCF",
                    backgroundColor: "#B2CBF9",
                    borderRadius: 20,
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                  }}>
                  Chưa đọc
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={reload}
              onRefresh={onRefresh}
              colors={["#826CCF", "green", "blue"]}
            />
          }>
          {isRead
            ? notify.getNotify
              ? notify.getNotify.map((item) => (
                  <View key={item._id} style={styles.notifyContainer}>
                    <View style={styles.itemNew}>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          marginTop: 5,
                        }}>
                        <Ionicons
                          name="md-notifications"
                          size={30}
                          color="#15294D"
                          style={{ marginRight: 10 }}
                        />
                      </View>
                      <View style={styles.detailNews}>
                        <View>
                          <Text
                            style={{
                              fontSize: 17,
                              color: "#000000",
                              fontWeight: "bold",
                              opacity: 0.8,
                              marginBottom: 3,
                            }}>
                            {item.title}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}>
                            <Text
                              style={{
                                fontSize: 13,
                                color: "#C1C1C1",
                                opacity: 0.9,
                              }}>
                              {moment(item.date_created).fromNow()}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          marginTop: 5,
                        }}>
                        <TouchableOpacity
                          onPress={() => handleDeleteNo(item._id)}>
                          <MaterialCommunityIcons
                            name="close-circle-outline"
                            size={18}
                            color="#FF0000"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
              : []
            : notify.getNotify
            ? notify.getNotify
                .filter((items) => items.read === false)
                .map((item) => (
                  <View key={item._id} style={styles.notifyContainer}>
                    <View style={styles.itemNew}>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          marginTop: 5,
                        }}>
                        <Ionicons
                          name="md-notifications"
                          size={30}
                          color="#15294D"
                          style={{ marginRight: 10 }}
                        />
                      </View>
                      <View style={styles.detailNews}>
                        <View>
                          <Text
                            style={{
                              fontSize: 17,
                              color: "#000000",
                              fontWeight: "bold",
                              opacity: 0.8,
                              marginBottom: 3,
                            }}>
                            {item.title}
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}>
                            <Text
                              style={{
                                fontSize: 13,
                                color: "#C1C1C1",
                                opacity: 0.9,
                              }}>
                              {moment(item.date_created).fromNow()}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          marginTop: 5,
                        }}>
                        <TouchableOpacity
                          onPress={() => handleDeleteNo(item._id)}>
                          <MaterialCommunityIcons
                            name="close-circle-outline"
                            size={18}
                            color="#FF0000"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
            : []}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,
            top: 5,
          }}>
          <TouchableOpacity onPress={handleDeleteAllNo}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "600",
                borderBottomWidth: 0.7,
                borderColor: "#711775",
                color: "#FF0000",
              }}>
              Xóa tất cả thông báo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
  notifyContainer: {
    borderBottomWidth: 0.7,
    borderBottomColor: "#f1f1f1",
  },
  itemNew: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 15,
    borderRadius: 0,
    backgroundColor: "#fff",
    marginBottom: 5,
  },
  detailNews: {
    flex: 1,
  },
  img: {
    marginRight: 15,
    resizeMode: "contain",
    width: 130,
    height: 70,
  },
});

//make this component available to the app
export default ModalNotify;
