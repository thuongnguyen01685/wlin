import { StatusBar } from "expo-status-bar";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const w = Dimensions.get("window").width;
const h = Dimensions.get("window").height;
export default function Wellcome() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar />
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Image
            source={require("../../assets/wellcome.png")}
            style={styles.img}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 25,
              fontWeight: "700",
              color: "#9D85F2",
            }}
          >
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
            }}
          >
            WLIN Global Holdings xây dựng một hệ sinh thái phục vụ cho các Nữ
            lãnh đạo trên toàn cầu, kết nối giao thương, học hỏi và hỗ trợ nhau
            cùng phát triển để "Khỏe Đẹp Hơn - Hạnh Phúc Hơn - Thành Công Hơn".
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 30,
            }}
          >
            <LinearGradient
              start={{ x: 0, y: 0.3 }}
              end={{ x: 1, y: 1 }}
              colors={["#9796F0", "#FBC7D4"]}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 40,
                borderRadius: 30,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: "#ffffff",
                }}
              >
                Tiếp tục
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: h + 30,
    width: w,
    backgroundColor: "#fff",
  },
  img: {
    width: "100%",
    resizeMode: "contain",
  },
});
