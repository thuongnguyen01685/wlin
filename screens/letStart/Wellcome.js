import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Wellcome() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <StatusBar />

      <View
        style={{
          marginBottom: 20,
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        <View style={styles.imgCon}>
          <View>
            <Image
              source={require("../../assets/zindex1.png")}
              style={styles.img}
            />
          </View>

          <View
            style={{
              position: "absolute",
              zIndex: 1,
              marginTop: 70,
              marginLeft: 30,
            }}>
            <Image
              source={require("../../assets/imgStart.png")}
              style={styles.img2}
            />
          </View>
          <View
            style={{
              position: "absolute",
              marginTop: 180,
              marginLeft: 160,
            }}>
            <Image
              source={require("../../assets/zindex2.png")}
              style={styles.img}
            />
          </View>
        </View>
        <View style={{ marginTop: 200 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "700",
              color: "#9D85F2",
            }}>
            Chào mừng
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "400",
              paddingHorizontal: 30,
              textAlign: "justify",
              marginTop: 10,
              lineHeight: 25,
            }}>
            WLIN Global Holdings xây dựng một hệ sinh thái phục vụ cho các Nữ
            lãnh đạo trên toàn cầu, kết nối giao thương, học hỏi và hỗ trợ nhau
            cùng phát triển để "Khỏe Đẹp Hơn - Hạnh Phúc Hơn - Thành Công Hơn".
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 30,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <LinearGradient
              start={{ x: 0, y: 0.3 }}
              end={{ x: 1, y: 1 }}
              colors={["#9796F0", "#FBC7D4"]}
              style={{
                width: "100%",
                paddingVertical: 15,
                borderRadius: 30,
                flexDirection: "row",
                justifyContent: "center",
              }}>
              {/* <Ionicons name="arrow-forward" size={25} color="#ffffff" /> */}
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#ffffff",
                }}>
                Tiếp tục
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imgCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    height: 300,
  },
  img: {
    width: 270,
    height: 310,
    resizeMode: "contain",
  },
  img2: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
});
