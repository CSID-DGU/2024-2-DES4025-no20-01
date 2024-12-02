import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator1 from "../navigation/TabNavigator1"; // 탭 1 네비게이터
import TabNavigator2 from "../navigation/TabNavigator2"; // 탭 2 네비게이터
import KakaoLoginScreen from "../pages/loginScreen";
import WelfareRegistrationScreen from "../pages/WelfareRegistrationScreen";
import AttendanceScreen from "../pages/AttendanceScreen";
import ClockInScreen from "../pages/ClockInScreen";
import WelfareItemRegistrationScreen from "../pages/WelfareItemRegistrationScreen";
import LeaveReasonScreen from "../pages/LeaveReasonScreen";
import DailyReportScreen from "../pages/DailyReportScreen";
import UserTypeSelectionScreen from "../pages/UserTypeSelectionScreen";
import WelfareAddressScreen from "../pages/WelfareAddressScreen";
import WelfareBeneficiaryScreen from "../pages/WelfareBeneficiaryScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="KakaoLoginScreen">
      {/* 탭이 없는 일반 화면 */}
      <Stack.Screen
        name="KakaoLoginScreen"
        component={KakaoLoginScreen}
        options={{ title: "카카오 로그인", headerShown: true }}
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
      <Stack.Screen
        name="WelfareAddressScreen"
        component={WelfareAddressScreen}
        options={{ headerShown: false }}
      />

      {/* 탭 2 적용 화면 */}
      <Stack.Screen
        name="AttendanceScreen"
        component={TabNavigator2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ClockInScreen"
        component={TabNavigator2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="WelfareItemRegistrationScreen"
        component={TabNavigator2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LeaveReasonScreen"
        component={TabNavigator2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DailyReportScreen"
        component={TabNavigator2}
        options={{ headerShown: false }}
      />

      {/* 탭 1 적용 화면 */}
      <Stack.Screen
        name="WelfareBeneficiaryScreen"
        component={TabNavigator1}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
