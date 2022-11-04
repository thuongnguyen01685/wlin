//import liraries
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { Component, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/actions/authAction";
import { URL } from "../../utils/fetchApi";
import Header from "../Header";
// import Animated from "react-native-reanimated";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const { timing } = Animated;
// create a component
const SearchBar = () => {
  const _input_box_translate_x = useRef(new Animated.Value(width)).current;
  const _back_button_opacity = useRef(new Animated.Value(0)).current;
  const _content_translate_y = useRef(new Animated.Value(width)).current;
  const _content_opacity = useRef(new Animated.Value(0)).current;

  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState("");

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const handleShowProfile = () => {
    //dispatch({ type: AUTH.SHOWPROFILE, payload: true });
    navigation.navigate("Profile");
  };

  const { auth, notify } = useSelector((state) => state);

  useEffect(() => {
    const it = async () => {
      const token = await AsyncStorage.getItem("@token_key");
      dispatch(getProfileAction(token));
    };
    it();
  }, []);

  const _onFocus = () => {
    //animation config
    //input box
    setIsFocused(true);
    const _input_box_translate_x_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };

    const _back_button_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
    //content
    const _content_translate_y_config = {
      duration: 0,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };

    const _content_opacity_config = {
      duration: 200,
      toValue: 1,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };

    //run animation
    timing(_input_box_translate_x, _input_box_translate_x_config).start();
    timing(_back_button_opacity, _back_button_opacity_config).start();
    timing(_content_translate_y, _content_translate_y_config).start();
    timing(_content_opacity, _content_opacity_config).start();
  };
  const _onBlur = () => {
    //animation config
    //input box
    setIsFocused(false);
    const _input_box_translate_x_config = {
      duration: 200,
      toValue: width,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };

    const _back_button_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };
    //content
    const _content_translate_y_config = {
      duration: 0,
      toValue: height,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };

    const _content_opacity_config = {
      duration: 200,
      toValue: 0,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    };

    //run animation
    timing(_input_box_translate_x, _input_box_translate_x_config).start();
    timing(_back_button_opacity, _back_button_opacity_config).start();
    timing(_content_translate_y, _content_translate_y_config).start();
    timing(_content_opacity, _content_opacity_config).start();
  };
  return (
    <>
      <SafeAreaView style={styles.header_safe_area}>
        <View style={styles.header}>
          <View style={styles.header_inner}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              {/* {props.backHome !== false && (
          <TouchableOpacity
            style={{
              backgroundColor: "#ffffff",
              width: 40,
              height: 40,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
              // transform: [{ rotate: "-45deg" }],
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              zIndex: 1001,
              elevation: 5,
            }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={25} color="#9D85F2" />
          </TouchableOpacity>
        )} */}

              <View
                style={{ left: 3, flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    width: 52,
                    height: 52,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 50,
                    borderColor: "#ffffff",
                    borderWidth: 1.5,
                  }}
                  onPress={handleShowProfile}>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: "contain",
                      borderRadius: 50,
                    }}>
                    <Image
                      source={{ uri: `${URL}${auth.profile.picture}` }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 30,
                      }}
                    />
                  </View>
                </TouchableOpacity>
                <View style={{ marginLeft: 5 }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontSize: 15,
                        fontWeight: "400",
                      }}>
                      Chào buổi sáng
                    </Text>
                  </View>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 22,
                      fontWeight: "600",
                    }}>
                    {auth.profile.name}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableHighlight
              activeOpacity={1}
              underlayColor={"#ccd0d5"}
              onPress={_onFocus}
              style={styles.search_icon_box}>
              <Icon name="search" size={22} color="#000000" />
            </TouchableHighlight>
            <Animated.View
              style={[
                styles.input_box,
                {
                  transform: [
                    {
                      translateX: _input_box_translate_x,
                    },
                  ],
                },
              ]}>
              <Animated.View style={{ opacity: _back_button_opacity }}>
                <TouchableHighlight
                  activeOpacity={1}
                  underlayColor="#ccd0d5"
                  onPress={_onBlur}
                  style={styles.back_icon_box}>
                  <Icon name="chevron-left" size={22} color="#000000" />
                </TouchableHighlight>
              </Animated.View>
              <TextInput
                placeholder="Tìm kiếm..."
                clearButtonMode="always"
                value={keyword}
                onChangeText={(value) => setKeyword(value)}
                style={styles.input}
              />
            </Animated.View>
          </View>
        </View>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: _content_opacity,
            transform: [
              {
                translateY: _content_translate_y,
              },
            ],
          },
        ]}>
        <SafeAreaView style={styles.content_safe_area}>
          <View style={styles.content_inner}>
            <View style={styles.separator}>
              {keyword === "" ? (
                <View style={styles.image_placeholder_container}>
                  <Image
                    source={require("../../assets/search.png")}
                    style={styles.image_placeholder}
                  />
                  <Text style={styles.image_placeholder_text}>
                    Enter a few words{"\n"}
                    to search on Event
                  </Text>
                </View>
              ) : (
                <ScrollView>
                  <View style={styles.search_item}>
                    <Icon
                      name="search"
                      size={16}
                      color="#cccccc"
                      style={styles.item_icon}
                    />
                    <Text>Result 1</Text>
                  </View>
                  <View style={styles.search_item}>
                    <Icon
                      name="search"
                      size={16}
                      color="#cccccc"
                      style={styles.item_icon}
                    />
                    <Text>Result 2</Text>
                  </View>
                  <View style={styles.search_item}>
                    <Icon
                      name="search"
                      size={16}
                      color="#cccccc"
                      style={styles.item_icon}
                    />
                    <Text>Result 3</Text>
                  </View>
                  <View style={styles.search_item}>
                    <Icon
                      name="search"
                      size={16}
                      color="#cccccc"
                      style={styles.item_icon}
                    />
                    <Text>Result 4</Text>
                  </View>
                  <View style={styles.search_item}>
                    <Icon
                      name="search"
                      size={16}
                      color="#cccccc"
                      style={styles.item_icon}
                    />
                    <Text>Result 5</Text>
                  </View>
                </ScrollView>
              )}
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  header_safe_area: {
    zIndex: 10,
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
  },
  header_inner: {
    flex: 1,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  search_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input_box: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 0,
    backgroundColor: "white",
    width: width - 32,
  },
  back_icon_box: {
    width: 40,
    height: 40,
    borderRadius: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#e6e4eb",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: 15,
  },
  content: {
    width: width,
    height: height,
    position: "absolute",
    left: 0,
    bottom: 0,
    top: 0,
    zIndex: 9,
  },
  content_safe_area: {
    flex: 1,
    backgroundColor: "#ffffff",
    zIndex: 9,
  },
  content_inner: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#ffffff",
    zIndex: 999,
  },
  separator: {
    marginTop: 5,
    backgroundColor: "#ffffff",
  },
  image_placeholder_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "20%",
    backgroundColor: "#ffffff",
  },
  image_placeholder: {
    width: 250,
    height: 150,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: "20%",
  },
  image_placeholder_text: {
    textAlign: "center",
    color: "gray",
    marginTop: 5,
  },
  search_item: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e6e4eb",
    marginLeft: 16,
    width: width,
  },
  item_icon: {
    marginHorizontal: 15,
  },
});

//make this component available to the app
export default SearchBar;
