//import liraries
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { Component } from "react";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 0) => `rgba(113, 23, 117, 0.8)`,
  labelColor: (opacity = 0) => `rgba(113, 23, 117, 0.8)`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: "6",
    strokeWidth: "2",
    stroke: "#f8f8f8",
  },
};
const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  // legend: ["Rainy Days"], // optional
};

// create a component
const BodyHome = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          color: "#711775",
          fontWeight: "600",
          paddingLeft: 20,
          paddingTop: 18,
        }}>
        Trang chủ
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: "57%" }}>
          <View
            style={{
              //   paddingHorizontal: 10,
              marginHorizontal: 15,
              borderRadius: 15,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              backgroundColor: "#ffff",
              marginTop: 10,
              marginBottom: 10,
            }}>
            <LinearGradient
              start={{ x: 1, y: 0.3 }}
              end={{ x: 1, y: 1 }}
              colors={["#751979", "#AE40B2"]}
              style={{
                borderRadius: 10,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                padding: 8,
                marginBottom: 10,
                width: "100%",
              }}>
              <Text style={{ fontSize: 12, color: "#ffffff" }}>
                Thông tin thành viên
              </Text>
            </LinearGradient>
            <View
              style={{
                paddingHorizontal: 15,
                paddingBottom: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <View>
                <Text
                  style={{ color: "#711775", fontSize: 15, fontWeight: "600" }}>
                  Thuong Nguyen
                </Text>
                <View style={{ marginVertical: 10 }}>
                  <Text style={styles.contentHeader}>WLIN Member</Text>
                  <Text style={styles.contentHeader}>Gói thành viên: Vàng</Text>
                  <Text style={styles.contentHeader}>
                    Ngày Bắt đầu: 1/2/2021
                  </Text>
                  <Text style={styles.contentHeader}>
                    Ngày hết hạn: 1/2/2022
                  </Text>
                  <Text style={styles.contentHeader}>
                    Thời gian hoạt động còn lại: 20 ngày
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  height: "93%",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  borderRadius: 5,
                  elevation: 5,
                }}>
                <LinearGradient
                  start={{ x: 1, y: 0.7 }}
                  end={{ x: 0.3, y: 0.8 }}
                  colors={["#F9C271", "#F4EFB8", "#F4EFB8", "#F9C271"]}
                  style={{ width: 100, height: 130, borderRadius: 5 }}>
                  <View
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}>
                    <Image
                      source={require("../../assets/logo.png")}
                      style={{ width: 70, height: 30 }}
                    />
                    <Text style={{ fontSize: 10, color: "#969696" }}>
                      Gói vàng
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
            <View
              style={{
                width: "100%",

                flexDirection: "row",
                justifyContent: "flex-end",
                paddingHorizontal: 15,
              }}>
              <TouchableOpacity
                style={{
                  borderRadius: 7,
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  width: "35%",
                  justifyContent: "flex-end",
                  marginBottom: 10,
                }}>
                <LinearGradient
                  start={{ x: 1, y: 0.3 }}
                  end={{ x: 1, y: 1 }}
                  colors={["#751979", "#AE40B2"]}
                  style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderRadius: 7,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#ffffff",
                      textAlign: "center",
                      width: "100%",
                    }}>
                    Xem chi tiết
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <TouchableOpacity
              style={{
                //   paddingHorizontal: 10,
                marginHorizontal: 15,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                backgroundColor: "#ffff",
                marginTop: 10,
                marginBottom: 10,
                width: "43%",
              }}
              onPress={() => navigation.navigate("SlipsScreen")}>
              <LinearGradient
                start={{ x: 1, y: 0.3 }}
                end={{ x: 1, y: 1 }}
                colors={["#751979", "#AE40B2"]}
                style={{
                  borderRadius: 7,
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  padding: 5,
                  marginBottom: 10,
                  width: "100%",
                }}>
                <Text style={{ fontSize: 12, color: "#ffffff" }}>
                  Referrals
                </Text>
              </LinearGradient>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                <Image
                  source={require("../../assets/uil_notes.png")}
                  style={{ width: 35, height: 30 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#711775",
                      textAlign: "center",
                    }}>
                    1/2/2022
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      color: "#711775",
                      textAlign: "center",
                      fontWeight: "700",
                    }}>
                    10
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                //   paddingHorizontal: 10,
                marginHorizontal: 15,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                backgroundColor: "#ffff",
                marginTop: 10,
                marginBottom: 10,
                width: "43%",
              }}>
              <LinearGradient
                start={{ x: 1, y: 0.3 }}
                end={{ x: 1, y: 1 }}
                colors={["#751979", "#AE40B2"]}
                style={{
                  borderRadius: 7,
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  padding: 5,
                  marginBottom: 10,
                  width: "100%",
                }}>
                <Text style={{ fontSize: 12, color: "#ffffff" }}>TYFCBs</Text>
              </LinearGradient>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                {/* <Ionicons
                  name="heart-circle-outline"
                  size={40}
                  color="#711775"
                /> */}
                <Image
                  source={require("../../assets/fa6-regular_handshake.png")}
                  style={{ width: 40, height: 30 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#711775",
                      textAlign: "center",
                    }}>
                    19/2/2022
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      color: "#711775",
                      textAlign: "center",
                      fontWeight: "700",
                    }}>
                    30
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <TouchableOpacity
              style={{
                //   paddingHorizontal: 10,
                marginHorizontal: 15,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                backgroundColor: "#ffff",
                marginTop: 10,
                marginBottom: 10,
                width: "43%",
              }}
              onPress={() => navigation.navigate("ClubScreen")}>
              <LinearGradient
                start={{ x: 1, y: 0.3 }}
                end={{ x: 1, y: 1 }}
                colors={["#751979", "#AE40B2"]}
                style={{
                  borderRadius: 7,
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  padding: 5,
                  marginBottom: 10,
                  width: "100%",
                }}>
                <Text style={{ fontSize: 12, color: "#ffffff" }}>CLUB</Text>
              </LinearGradient>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                {/* <Ionicons
                  name="shield-checkmark-outline"
                  size={40}
                  color="#711775"
                /> */}
                <Image
                  source={require("../../assets/uit_shield-check.png")}
                  style={{ width: 36, height: 33 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#711775",
                      textAlign: "center",
                    }}>
                    1/2/2022
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      color: "#711775",
                      textAlign: "center",
                      fontWeight: "700",
                    }}>
                    10
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                //   paddingHorizontal: 10,
                marginHorizontal: 15,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                backgroundColor: "#ffff",
                marginTop: 10,
                marginBottom: 10,
                width: "43%",
              }}
              onPress={() => navigation.navigate("EventsScreen")}>
              <LinearGradient
                start={{ x: 1, y: 0.3 }}
                end={{ x: 1, y: 1 }}
                colors={["#751979", "#AE40B2"]}
                style={{
                  borderRadius: 7,
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  padding: 5,
                  marginBottom: 10,
                  width: "100%",
                }}>
                <Text style={{ fontSize: 12, color: "#ffffff" }}>Sự kiện</Text>
              </LinearGradient>
              <View
                style={{
                  paddingHorizontal: 15,
                  paddingBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                {/* <Ionicons
                  name="heart-circle-outline"
                  size={40}
                  color="#711775"
                /> */}
                <Image
                  source={require("../../assets/Calendar.png")}
                  style={{ width: 30, height: 33 }}
                />
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#711775",
                      textAlign: "center",
                    }}>
                    19/2/2022
                  </Text>
                  <Text
                    style={{
                      fontSize: 30,
                      color: "#711775",
                      textAlign: "center",
                      fontWeight: "700",
                    }}>
                    30
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              //   paddingHorizontal: 10,
              marginHorizontal: 15,
              borderRadius: 15,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
              backgroundColor: "#ffff",
              marginTop: 10,
              marginBottom: 10,
            }}>
            <LinearGradient
              start={{ x: 1, y: 0.3 }}
              end={{ x: 1, y: 1 }}
              colors={["#751979", "#AE40B2"]}
              style={{
                borderRadius: 10,
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                padding: 8,
                marginBottom: 10,
                width: "100%",
              }}>
              <Text style={{ fontSize: 12, color: "#ffffff" }}>Hoạt động</Text>
            </LinearGradient>
            <View style={{ paddingHorizontal: 15, flexDirection: "row" }}>
              <Text>Hoạt động trong</Text>
              <View>
                <Text> tuần</Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "600", color: "#751979" }}>
                  {" "}
                  65
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
              <LineChart
                data={data}
                width={screenWidth / 1.13}
                height={200}
                chartConfig={chartConfig}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  contentHeader: {
    color: "#000",
    fontSize: 12,
    fontWeight: "400",
    marginVertical: 1,
  },
});

//make this component available to the app
export default BodyHome;
