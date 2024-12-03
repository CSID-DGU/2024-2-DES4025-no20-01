import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import AttendanceScreen from "../pages/AttendanceScreen";
import ClockInScreen from "../pages/ClockInScreen";
import LeaveReasonScreen from "../pages/LeaveReasonScreen";
import WelfareManagementScreen from "../pages/WelfareManagementScreen ";
import WelfareItemRegistrationScreen from "../pages/WelfareItemRegistrationScreen";
import DailyReportScreen from "../pages/DailyReportScreen";
import SettingsScreen from "../pages/SettingsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 스택 네비게이터로 Tab.Navigator 내부에서 관리
const AttendanceStack = () => (
  <Stack.Navigator
    initialRouteName="AttendanceScreen"
    screenOptions={{ headerShown: false }}
  >
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
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "WelfareManagement") {
            iconName = "people-outline";
          } else if (route.name === "Settings") {
            iconName = "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "puple",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={AttendanceStack} // 스택 네비게이터 연결
        options={{ title: "홈", headerShown: false }} // 헤더 숨김 설정
      />
      <Tab.Screen
        name="WelfareManagement"
        component={WelfareManagementScreen}
        options={{ title: "복지 대상자 관리" }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "설정" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator2;
