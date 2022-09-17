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
          justifyContent: "space-around",
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
        <View style={{ marginTop: 230 }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "700",
              color: "#711775",
            }}>
            Chào mừng
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "400",
              paddingHorizontal: 40,
              textAlign: "justify",
              marginTop: 10,
              lineHeight: 25,
            }}>
            WLIN hiểu rằng phụ nữ đóng vai trò vô cùng quan trọng trong việc giữ
            gìn hạnh phúc gia đình, trong việc nuôi dạy con cái và đóng góp
            không nhỏ vào sự phát triển của cộng đồng trong nước cũng như toàn
            thế giới.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <LinearGradient
              start={{ x: 0, y: 0.3 }}
              end={{ x: 1, y: 1 }}
              colors={[
                "rgba(241, 108, 246, 0.8) 120.28%)",
                "rgba(113, 23, 117, 0.8) -6.93%",
              ]}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 19,
                borderRadius: 30,
                flexDirection: "row",
                justifyContent: "space-around",
              }}>
              <Ionicons name="arrow-forward" size={25} color="#ffffff" />
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
