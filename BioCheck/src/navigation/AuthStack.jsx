import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator1 from "../navigation/TabNavigator1"; // 탭 1 네비게이터
import TabNavigator2 from "../navigation/TabNavigator2"; // 탭 2 네비게이터
import WelfareRegistrationScreen from "../pages/WelfareRegistrationScreen";
import AttendanceScreen from "../pages/AttendanceScreen";
import ClockInScreen from "../pages/ClockInScreen";
import WelfareItemRegistrationScreen from "../pages/WelfareItemRegistrationScreen";
import LeaveReasonScreen from "../pages/LeaveReasonScreen";
import DailyReportScreen from "../pages/DailyReportScreen";
import UserTypeSelectionScreen from "../pages/UserTypeSelectionScreen";
import WelfareAddressScreen from "../pages/WelfareAddressScreen";
import WelfareBeneficiaryScreen from "../pages/WelfareBeneficiaryScreen";
import MainScreen from "../pages/MainScreen";
import KakaoLoginScreen from "../pages/loginScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelfareMainTabs"
        component={TabNavigator1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="KakaoLoginScreen"
        component={KakaoLoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelfareRegistrationScreen"
        component={WelfareRegistrationScreen}
        options={{ title: "복지대상자 등록", headerShown: true }}
      />
      <Stack.Screen
        name="UserTypeSelectionScreen"
        component={UserTypeSelectionScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
