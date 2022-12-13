//import liraries
import React, { useRef } from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/home/Home";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Club from "../screens/clup/Club";

import Events from "../screens/events/Events";
import DetailEvents from "../screens/events/DetailEvents";
import CheckQR from "../screens/events/CheckQR";
import CheckImage from "../screens/events/CheckImage";
import Slips from "../screens/slips/Slips";
import CreateRefer from "../screens/slips/CreateRefer";
import Other from "../screens/other/Other";
import Profile from "../screens/other/Profile";
import Benefit from "../screens/other/Benefit";
import TYFCB from "../screens/other/TYFCB";
import CreateTYFCB from "../screens/other/CreateTYFCB";
import UpgradeMember from "../screens/other/UpgradeMember";
import { useSelector } from "react-redux";
import ListPaticipant from "../screens/events/ListParticipant";
import ConfirmPayment from "../screens/events/ConfirmPayment";
import UpdateEvent from "../screens/events/UpdateEvent";
import ReportExcel from "../screens/events/ReportExcel";
import ListMember from "../screens/other/ListMember";
import ManagementMember from "../screens/other/ManagementMember";
import PayBenefits from "../screens/events/PayBenefits";
import Map from "../screens/events/Map";
import { Animated, Dimensions, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import DetailBenefit from "../screens/other/DetailBenefit";
import DetailClub from "../screens/clup/detail/DetailClub";
import Svg, { Path } from "react-native-svg";
import EditBoard from "../screens/clup/detail/TabDetailClub/EditBoard";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ClubScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Club"
        component={Club}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailClub"
        component={DetailClub}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditBoard"
        component={EditBoard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function EventsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Events"
        component={Events}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailEvents"
        component={DetailEvents}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckQR"
        component={CheckQR}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CheckImage"
        component={CheckImage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListParticipant"
        component={ListPaticipant}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmPayment"
        component={ConfirmPayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateEvent"
        component={UpdateEvent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReportExcel"
        component={ReportExcel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PayBenefits"
        component={PayBenefits}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function SlipsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Slips"
        component={Slips}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateRefer"
        component={CreateRefer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function OtherScreen() {
  const { auth } = useSelector((state) => state);

  return (
    <Stack.Navigator
      initialRouteName={auth.showNaProfile ? "Profile" : "Other"}>
      <Stack.Screen
        name="Other"
        component={Other}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Benefit"
        component={Benefit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailBenefit"
        component={DetailBenefit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TYFCB"
        component={TYFCB}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateTYFCB"
        component={CreateTYFCB}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpgradeMember"
        component={UpgradeMember}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListMember"
        component={ListMember}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManagementMember"
        component={ManagementMember}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width;
  width = width - 40;
  return width / 5;
}

// create a component
const TabBar = () => {
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const { auth } = useSelector((state) => state);

  const IconEvent = [
    "M1.59253 8.40421H19.4165",
    "M14.942 12.3097H14.9512",
    "M10.5047 12.3097H10.514",
    "M6.05793 12.3097H6.0672",
    "M14.942 16.1962H14.9512",
    "M10.5047 16.1962H10.514",
    "M6.05793 16.1962H6.0672",
    "M14.5438 1V4.29078",
    "M6.4654 1V4.29078",
    "M14.7383 2.5791H6.27096C3.33427 2.5791 1.5 4.21504 1.5 7.22213V16.2718C1.5 19.3261 3.33427 20.9999 6.27096 20.9999H14.729C17.675 20.9999 19.5 19.3545 19.5 16.3474V7.22213C19.5092 4.21504 17.6842 2.5791 14.7383 2.5791Z",
  ];

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }, props) => {
            if (route.name === "Home") {
              return (
                <Svg
                  width={24}
                  height={25}
                  viewBox="0 0 21 22"
                  fill={focused ? "#9D85F2" : "none"}
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}>
                  <Path
                    d={
                      "M7.65722 19.7714V16.7047C7.6572 15.9246 8.29312 15.2908 9.08101 15.2856H11.9671C12.7587 15.2856 13.4005 15.9209 13.4005 16.7047V16.7047V19.7809C13.4003 20.4432 13.9343 20.9845 14.603 21H16.5271C18.4451 21 20 19.4607 20 17.5618V17.5618V8.83784C19.9898 8.09083 19.6355 7.38935 19.038 6.93303L12.4577 1.6853C11.3049 0.771566 9.6662 0.771566 8.51342 1.6853L1.96203 6.94256C1.36226 7.39702 1.00739 8.09967 1 8.84736V17.5618C1 19.4607 2.55488 21 4.47291 21H6.39696C7.08235 21 7.63797 20.4499 7.63797 19.7714V19.7714"
                    }
                    stroke={focused ? "#9D85F2" : "#676767"}
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              );
            }

            if (route.name === "OtherScreen") {
              return (
                <Svg
                  width={28}
                  height={27}
                  viewBox="0 0 25 24"
                  fill={focused ? "#9D85F2" : "none"}
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}>
                  <Path
                    d={
                      "M3.5 5.5C3.5 5.36739 3.55268 5.24021 3.64645 5.14645C3.74021 5.05268 3.86739 5 4 5H21C21.1326 5 21.2598 5.05268 21.3536 5.14645C21.4473 5.24021 21.5 5.36739 21.5 5.5C21.5 5.63261 21.4473 5.75979 21.3536 5.85355C21.2598 5.94732 21.1326 6 21 6H4C3.86739 6 3.74021 5.94732 3.64645 5.85355C3.55268 5.75979 3.5 5.63261 3.5 5.5ZM3.5 12C3.5 11.8674 3.55268 11.7402 3.64645 11.6464C3.74021 11.5527 3.86739 11.5 4 11.5H21C21.1326 11.5 21.2598 11.5527 21.3536 11.6464C21.4473 11.7402 21.5 11.8674 21.5 12C21.5 12.1326 21.4473 12.2598 21.3536 12.3536C21.2598 12.4473 21.1326 12.5 21 12.5H4C3.86739 12.5 3.74021 12.4473 3.64645 12.3536C3.55268 12.2598 3.5 12.1326 3.5 12ZM3.5 18.5C3.5 18.3674 3.55268 18.2402 3.64645 18.1464C3.74021 18.0527 3.86739 18 4 18H21C21.1326 18 21.2598 18.0527 21.3536 18.1464C21.4473 18.2402 21.5 18.3674 21.5 18.5C21.5 18.6326 21.4473 18.7598 21.3536 18.8536C21.2598 18.9473 21.1326 19 21 19H4C3.86739 19 3.74021 18.9473 3.64645 18.8536C3.55268 18.7598 3.5 18.6326 3.5 18.5Z"
                    }
                    stroke={focused ? "#9D85F2" : "#676767"}
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              );
            }
            if (route.name === "ClubScreen") {
              return focused ? (
                <Svg
                  width={24}
                  height={28}
                  viewBox="0 0 17 20"
                  fill={"#9D85F2"}
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}>
                  <Path
                    d={
                      "M8.2281 19.9137C8.33884 19.9715 8.46266 20.0009 8.58649 20C8.71032 19.999 8.83314 19.9686 8.94489 19.9097L12.5128 18.0025C13.5245 17.4631 14.3168 16.8601 14.935 16.1579C16.279 14.6282 17.0129 12.6758 16.9998 10.6626L16.9575 4.02198C16.9535 3.25711 16.4511 2.57461 15.7082 2.32652L9.07073 0.0995642C8.67106 -0.0357592 8.23313 -0.0328174 7.8405 0.106428L1.22824 2.41281C0.489299 2.67071 -0.00400248 3.35811 2.44719e-05 4.12397L0.0423075 10.7597C0.0553951 12.7758 0.814476 14.7194 2.18062 16.2335C2.8048 16.9258 3.60415 17.52 4.62699 18.0505L8.2281 19.9137ZM7.28357 12.1089C7.43257 12.2521 7.62586 12.3227 7.81916 12.3207C8.01245 12.3198 8.20474 12.2472 8.35172 12.1021L12.2508 8.2581C12.5438 7.96882 12.5408 7.50401 12.2448 7.21866C11.9478 6.9333 11.4696 6.93526 11.1766 7.22454L7.80808 10.5449L6.42885 9.21909C6.13186 8.93373 5.65467 8.93667 5.3607 9.22595C5.06774 9.51523 5.07076 9.98004 5.36775 10.2654L7.28357 12.1089Z"
                    }
                    stroke={"#fff"}
                    strokeWidth={1.35}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              ) : (
                <Svg
                  width={29.5}
                  height={31}
                  viewBox="0 0 24 24"
                  fill={"none"}
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}>
                  <Path
                    d={
                      "M11.8853 2.10169L5.24174 4.37005C4.49797 4.62306 4 5.30545 4 6.07198V12.7097C4 14.7315 4.7529 16.6789 6.10912 18.196C6.74795 18.9121 7.56192 19.5077 8.54931 20.0259L12.1466 21.9118C12.3711 22.0295 12.6414 22.0294 12.8658 21.9116L16.4568 20.0269C17.4415 19.5095 18.2555 18.9127 18.8944 18.1964C20.2486 16.6804 21 14.7342 21 12.7136V6.07198C21 5.30545 20.502 4.62306 19.7574 4.36977L13.1156 2.10202C12.718 1.96605 12.2837 1.96605 11.8853 2.10169ZM12.6131 3.48951L19.2563 5.75777C19.3945 5.80477 19.4861 5.9303 19.4861 6.07198V12.7136C19.4861 14.3792 18.8668 15.9832 17.7508 17.2327L17.5525 17.4427C17.0722 17.9246 16.4672 18.3492 15.7369 18.7329L12.505 20.4283L9.26848 18.7316C8.4313 18.2922 7.76044 17.8013 7.25256 17.232C6.13446 15.9813 5.51389 14.3761 5.51389 12.7097V6.07198C5.51389 5.9303 5.6055 5.80477 5.74283 5.75805L12.3866 3.48962C12.4599 3.46466 12.5404 3.46466 12.6131 3.48951ZM16.2553 9.2399C15.9597 8.95269 15.4804 8.95269 15.1848 9.2399L11.7854 12.5422L10.4118 11.2062L10.3269 11.1349C10.0307 10.9212 9.61013 10.9448 9.34132 11.2059C9.04564 11.493 9.04551 11.9587 9.34104 12.246L11.2506 14.1023L11.3355 14.1735C11.6318 14.3872 12.0524 14.3636 12.3212 14.1024L16.2553 10.28L16.3286 10.1975C16.5485 9.90959 16.524 9.501 16.2553 9.2399Z"
                    }
                    stroke={"#676767"}
                    strokeWidth={1.35}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              );
            }
            if (route.name === "QRScreen") {
              return (
                <View
                  style={{
                    backgroundColor: "#9D85F2",
                    paddingHorizontal: 4,
                    paddingVertical: 3,
                    top: 2,
                    zIndex: 3,
                    position: "absolute",
                    borderRadius: 50,
                  }}>
                  <Ionicons
                    name="qr-code"
                    size={30}
                    color="#ffffff"
                    style={{ margin: 10 }}
                  />
                </View>
              );
            }
            if (route.name === "EventsScreen") {
              return focused ? (
                <Svg
                  width={25}
                  height={26}
                  fill={"#9D85F2"}
                  viewBox="0 0 19 20"
                  fillRule="evenodd"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}>
                  <Path
                    d="M13.9109 0.768617L13.9119 1.51824C16.6665 1.73413 18.4862 3.61119 18.4891 6.48975L18.5 14.9155C18.5039 18.054 16.5322 19.985 13.3718 19.99L5.65188 20C2.51119 20.004 0.514817 18.027 0.510867 14.8795L0.500007 6.55272C0.496057 3.65517 2.25153 1.78311 5.00617 1.53024L5.00518 0.780611C5.0042 0.340832 5.33001 0.00999726 5.76444 0.00999726C6.19886 0.00899776 6.52468 0.338833 6.52567 0.778612L6.52666 1.47826L12.3914 1.47027L12.3904 0.770616C12.3894 0.330837 12.7152 0.00100177 13.1497 2.26549e-06C13.5742 -0.000997234 13.9099 0.328838 13.9109 0.768617ZM2.02148 6.86157L16.9696 6.84158V6.49175C16.9272 4.34283 15.849 3.21539 13.9138 3.04748L13.9148 3.81709C13.9148 4.24688 13.5801 4.5877 13.1556 4.5877C12.7212 4.5887 12.3943 4.24887 12.3943 3.81909L12.3934 3.0095L6.52863 3.01749L6.52962 3.82609C6.52962 4.25687 6.20479 4.5967 5.77036 4.5967C5.33594 4.5977 5.00913 4.25887 5.00913 3.82809L5.00815 3.05847C3.08286 3.25137 2.01753 4.38281 2.02049 6.55072L2.02148 6.86157ZM12.7399 11.4043V11.4153C12.7498 11.8751 13.125 12.2239 13.5801 12.2139C14.0244 12.2029 14.3789 11.8221 14.369 11.3623C14.3483 10.9225 13.9918 10.5637 13.5485 10.5647C13.0944 10.5747 12.7389 10.9445 12.7399 11.4043ZM13.5554 15.892C13.1013 15.882 12.735 15.5032 12.734 15.0435C12.7241 14.5837 13.0884 14.2029 13.5426 14.1919H13.5525C14.0165 14.1919 14.3927 14.5707 14.3927 15.0405C14.3937 15.5102 14.0185 15.891 13.5554 15.892ZM8.67212 11.4203C8.69187 11.8801 9.06804 12.2389 9.52221 12.2189C9.96651 12.1979 10.321 11.8181 10.3012 11.3583C10.2903 10.9085 9.92504 10.5587 9.48074 10.5597C9.02657 10.5797 8.67113 10.9605 8.67212 11.4203ZM9.52616 15.8471C9.07199 15.8671 8.6968 15.5082 8.67607 15.0485C8.67607 14.5887 9.03052 14.2089 9.48469 14.1879C9.92899 14.1869 10.2953 14.5367 10.3052 14.9855C10.3259 15.4463 9.97046 15.8261 9.52616 15.8471ZM4.60433 11.4553C4.62408 11.915 5.00025 12.2749 5.45442 12.2539C5.89872 12.2339 6.25317 11.8531 6.23243 11.3933C6.22256 10.9435 5.85725 10.5937 5.41196 10.5947C4.95779 10.6147 4.60334 10.9955 4.60433 11.4553ZM5.45837 15.8521C5.0042 15.8731 4.62901 15.5132 4.60828 15.0535C4.60729 14.5937 4.96273 14.2129 5.4169 14.1929C5.8612 14.1919 6.2275 14.5417 6.23737 14.9915C6.2581 15.4513 5.90365 15.8321 5.45837 15.8521Z"
                    stroke={"none"}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              ) : (
                <Svg
                  width={25}
                  height={26}
                  fill={"none"}
                  viewBox="0 0 21 22"
                  xmlns="http://www.w3.org/2000/svg"
                  {...props}>
                  {IconEvent.map((i, index) => (
                    <Path
                      d={`${i}`}
                      stroke={"#676767"}
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      key={index}
                    />
                  ))}
                </Svg>
              );
            }
          },
          tabBarActiveTintColor: "#9D85F2",
          tabBarInactiveTintColor: "#909090",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },

          tabBarBackground: () => (
            <View style={{ flex: 1 }}>
              <LinearGradient
                start={{ x: 1, y: 0.1 }}
                end={{ x: 1, y: 1 }}
                colors={["#474747", "#f8f8f8"]}
                style={{ height: 0.2 }}
              />
            </View>
          ),
          headerShown: false,
          tabBarStyle: {
            height: 75,
            position: "absolute",
            // bottom: 5,
            // right: 5,
            // left: 5,
            // borderRadius: 10,
            paddingHorizontal: 5,
            paddingTop: 5,
            paddingBottom: 15,
            backgroundColor: "#ffffff",
          },
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ title: "Trang chủ" }}
          listeners={({ navigation, route }) => ({
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        {/* <Tab.Screen
          name="SlipsScreen"
          component={SlipsScreen}
          options={{ title: "Phiếu" }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1.08,
                useNativeDriver: true,
              }).start();
            },
          })}
        /> */}
        <Tab.Screen
          name="ClubScreen"
          component={ClubScreen}
          options={{ headerShown: false, title: "CLUB" }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....

            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 1.08,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="QRScreen"
          component={CheckQR}
          options={{ headerShown: false, title: "" }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: -100,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="EventsScreen"
          component={EventsScreen}
          options={{ headerShown: false, title: "Sự kiện" }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3.24,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="OtherScreen"
          component={OtherScreen}
          options={{ title: "Khác" }}
          listeners={({ navigation, route }) => ({
            // Onpress Update....
            tabPress: (e) => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4.33,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 30,
          height: 2,
          backgroundColor: "#9796F0",
          position: "absolute",
          bottom: 10,
          borderRadius: 50,
          opacity: 0.9,
          left: 23,
          transform: [{ translateX: tabOffsetValue }],
        }}></Animated.View>
    </>
  );
};

//make this component available to the app
export default TabBar;
