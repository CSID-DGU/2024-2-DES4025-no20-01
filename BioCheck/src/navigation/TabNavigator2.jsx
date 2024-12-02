import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import WelfareItemRegistrationScreen from "../pages/WelfareItemRegistrationScreen";
import AttendanceScreen from "../pages/AttendanceScreen";
import ClockInScreen from "../pages/ClockInScreen";
import LeaveReasonScreen from "../pages/LeaveReasonScreen";
import DailyReportScreen from "../pages/DailyReportScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 스택 네비게이터: 복지 물품 추가
const WelfareItemStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="AttendanceScreen"
      component={AttendanceScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ClockInScreen"
      component={ClockInScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="WelfareItemRegistrationScreen"
      component={WelfareItemRegistrationScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LeaveReasonScreen"
      component={LeaveReasonScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="DailyReportScreen"
      component={DailyReportScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const TabNavigator2 = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          // 각 화면에 적합한 아이콘 설정
          if (route.name === "AttendanceScreen") {
            iconName = "home-outline"; // 홈
          } else if (route.name === "WelfareItemRegistrationScreen") {
            iconName = "people-outline"; // 복지 대상자 관리
          } else if (route.name === "LeaveReasonScreen") {
            iconName = "settings-outline"; // 설정
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="AttendanceScreen"
        component={AttendanceScreen}
        options={{ title: "홈" }}
      />
      <Tab.Screen
        name="WelfareItemRegistrationScreen"
        component={WelfareItemRegistrationScreen}
        options={{ title: "복지 대상자 관리" }}
      />
      <Tab.Screen
        name="LeaveReasonScreen"
        component={LeaveReasonScreen}
        options={{ title: "설정" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator2;
