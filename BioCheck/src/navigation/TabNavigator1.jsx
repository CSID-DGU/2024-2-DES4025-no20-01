import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import WelfareBeneficiaryScreen from "../pages/WelfareBeneficiaryScreen";
import ClockInScreen from "../pages/ClockInScreen";
import WelfareAddressScreen from "../pages/WelfareAddressScreen";
import { Ionicons } from "@expo/vector-icons";
import SettingsScreen from "../pages/SettingsScreen";
import ServiceApprovalScreen from "../pages/ServiceApprovalScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 스택 네비게이터
const WelfareStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="WelfareAddressScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="WelfareBeneficiaryScreen"
        component={WelfareBeneficiaryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelfareAddressScreen"
        component={WelfareAddressScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceApprovalScreen"
        component={ServiceApprovalScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// 탭 네비게이터
const TabNavigator1 = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // 각 화면에 적합한 아이콘 설정
          if (route.name === "Home") {
            iconName = "home-outline"; // 홈
          } else if (route.name === "Settings") {
            iconName = "settings-outline"; // 설정
          } else if (route.name === "Address") {
            iconName = "location-outline"; // 주소 관리
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green", // 활성 아이콘 색상: 보라색
        tabBarInactiveTintColor: "gray", // 비활성 아이콘 색상
      })}
    >
      {/* 홈 탭 */}
      <Tab.Screen
        name="Home"
        component={WelfareStack}
        options={{ title: "홈" }}
      />

      {/* 설정 탭 */}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "설정" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator1;
