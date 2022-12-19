import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";

const { width, height } = Dimensions.get("window");

const COLORS = { primary: "#282534", white: "#fff", purple: "#9D85F2" };

const slides = [
  {
    id: "1",
    image: require("../../assets/wellcome.png"),
    title: "Chào mừng",
    subtitle: `WLIN Global Holdings xây dựng một hệ sinh thái phục\nvụ cho các Nữ lãnh đạo trên toàn cầu, kết nối giao\n thương, học hỏi và hỗ trợ nhau cùng phát triển để\n"Khỏe Đẹp Hơn - Hạnh Phúc Hơn - Thành Công Hơn"`,
  },
  {
    id: "2",
    image: require("../../assets/start5.png"),
    title: "Chào mừng",
    subtitle: `WLIN Global Holdings xây dựng một hệ sinh thái phục\nvụ cho các Nữ lãnh đạo trên toàn cầu, kết nối giao\n thương, học hỏi và hỗ trợ nhau cùng phát triển để\n"Khỏe Đẹp Hơn - Hạnh Phúc Hơn - Thành Công Hơn"`,
  },
  {
    id: "3",
    image: require("../../assets/start6.png"),
    title: "Chào mừng",
    subtitle: `WLIN Global Holdings xây dựng một hệ sinh thái phục\nvụ cho các Nữ lãnh đạo trên toàn cầu, kết nối giao\n thương, học hỏi và hỗ trợ nhau cùng phát triển để\n"Khỏe Đẹp Hơn - Hạnh Phúc Hơn - Thành Công Hơn"`,
  },
];

const Slide = ({ item }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image source={item?.image} style={{ width, resizeMode: "contain" }} />
      <View style={{ width, paddingHorizontal: 15, top: -15 }}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
      </View>
    </View>
  );
};

const Wellcome = () => {
  const navigation = useNavigation();
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    return (
      <View
        style={{
          paddingHorizontal: 20,
        }}>
        {/* Indicator container */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}>
          {/* Render indicator */}
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: COLORS.purple,
                  width: 25,
                  height: 5,
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{
          height: Platform.OS === "ios" ? height * 0.8 : height * 0.9,
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={slides}
        pagingEnabled
        renderItem={({ item }) => <Slide item={item} />}
      />
      <View style={{ height: height * 0.13 }}>
        <Footer />
        {/* Render buttons */}
        <View
          style={{
            height: height * 0.13,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: "#9796f0",
              paddingVertical: 15,
              marginHorizontal: 15,
              borderRadius: 30,
              width: "90%",
            }}>
            <Text
              style={{
                fontSize: 22,
                color: "#ffffff",
                fontFamily: "LexendDeca_400Regular",
              }}>
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    color: "#000",
    fontSize: 12.5,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "LexendDeca_400Regular",
  },
  title: {
    color: COLORS.purple,
    fontSize: 30,
    fontFamily: "LexendDeca_600SemiBold",
    textAlign: "center",
  },

  indicator: {
    height: 5,
    width: 5,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 3,
    borderRadius: 50,
  },
});
export default Wellcome;
