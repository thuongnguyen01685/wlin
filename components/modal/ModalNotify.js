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
import {
  changeIsReadAction,
  deleteNotify,
  getNotify,
} from "../../redux/actions/notifyAction";

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
    await dispatch(deleteNotify(token, _id));
    dispatch(getNotify(token));
  };

  const handleChangeRead = async (_id) => {
    const token = await AsyncStorage.getItem("@token_key");
    await dispatch(changeIsReadAction(token, _id));
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
          borderRadius: 30,
          padding: 20,
          elevation: 5,
          position: "absolute",
          width: "100%",
          top: 50,
          height: "auto",
          bottom: 20,
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <Image
            source={require("../../assets/notify.png")}
            style={{
              resizeMode: "contain",
              width: 180,
              height: 150,
              marginVertical: 10,
            }}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 25,
              color: "#826CCF",
              fontWeight: "bold",
              textAlign: "center",
            }}>
            Thông báo
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            borderBottomWidth: 0.5,
            borderColor: "#826CCF",
            paddingBottom: 5,
            width: "50%",
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
            <View
              style={{
                borderRadius: 50,
                overflow: "hidden",
                marginHorizontal: 5,
              }}>
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
                  <TouchableOpacity
                    key={item._id}
                    style={styles.notifyContainer}
                    onPress={() => handleChangeRead(item._id)}>
                    <View style={styles.itemNew}>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          marginTop: 5,
                        }}>
                        <Ionicons
                          name="md-notifications"
                          size={30}
                          color="#F2AF4A"
                          style={{
                            marginRight: 10,
                          }}
                        />
                        {item.read === false && (
                          <View
                            style={{
                              height: 2,
                              width: 2,
                              padding: 4,
                              backgroundColor: "#CB0505",
                              borderRadius: 50,
                              position: "absolute",
                              top: 4,
                              left: 17,
                            }}></View>
                        )}
                      </View>
                      <View style={styles.detailNews}>
                        <View>
                          <Text
                            style={{
                              fontSize: 15,
                              color: "#000000",
                              fontWeight: "bold",
                              opacity: item.read === false ? 1 : 0.5,
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
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}>
                        <View
                          style={{
                            backgroundColor:
                              item.read === false ? "#9D85F2" : "#d0d0d0",
                            padding: 5,
                            height: 5,
                            borderRadius: 50,
                          }}></View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              : []
            : notify.getNotify
            ? notify.getNotify
                .filter((items) => items.read === false)
                .map((item) => (
                  <TouchableOpacity
                    key={item._id}
                    style={styles.notifyContainer}
                    onPress={() => handleChangeRead(item._id)}>
                    <View style={styles.itemNew}>
                      <View
                        style={{
                          justifyContent: "flex-start",
                          marginTop: 5,
                        }}>
                        <Ionicons
                          name="md-notifications"
                          size={30}
                          color="#F2AF4A"
                          style={{ marginRight: 10 }}
                        />
                        <View
                          style={{
                            height: 2,
                            width: 2,
                            padding: 4,
                            backgroundColor: "#CB0505",
                            borderRadius: 50,
                            position: "absolute",
                            top: 4,
                            left: 17,
                          }}></View>
                      </View>
                      <View style={styles.detailNews}>
                        <View>
                          <Text
                            style={{
                              fontSize: 15,
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
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}>
                        <View
                          style={{
                            backgroundColor: "#9D85F2",
                            padding: 5,
                            height: 5,
                            borderRadius: 50,
                          }}></View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
            : []}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",

            top: 10,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#9D85F2",
              width: "90%",
              paddingVertical: 15,
              borderRadius: 30,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 5,
            }}
            onPress={() => props.setModalVisible(false)}>
            <Text style={{ color: "#ffffff", fontWeight: "600", fontSize: 15 }}>
              Đóng
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
