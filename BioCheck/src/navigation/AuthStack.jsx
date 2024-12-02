import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../pages/MainScreen"; // 메인화면
import KakaoLoginScreen from "../pages/loginScreen"; // 카카오 로그인 화면
import WelfareRegistrationScreen from "../pages/WelfareRegistrationScreen";
import AttendanceScreen from "../pages/AttendanceScreen";
import ClockInScreen from "../pages/ClockInScreen";
import WelfareItemRegistrationScreen from "../pages/WelfareItemRegistrationScreen";
import LeaveReasonScreen from "../pages/LeaveReasonScreen";
import DailyReportScreen from "../pages/DailyReportScreen";
import UserTypeSelectionScreen from "../pages/UserTypeSelectionScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainScreen">
      <Stack.Screen
        name="MainScreen"
        component={MainScreen}
        options={{ title: "메인 화면", headerShown: false }}
      />
      <Stack.Screen
        name="KakaoLoginScreen"
        component={KakaoLoginScreen}
        options={{ title: "카카오 로그인" }}
      />
      <Stack.Screen
        name="WelfareRegistrationScreen"
        component={WelfareRegistrationScreen}
        options={{ title: "복지대상자 등록" }}
      />
      <Stack.Screen
        name="AttendanceScreen"
        component={AttendanceScreen}
        options={{ title: "출퇴근 기록" }}
      />
      <Stack.Screen
        name="ClockInScreen"
        component={ClockInScreen}
        options={{ title: "출근 도장" }}
      />
      <Stack.Screen
        name="WelfareItemRegistrationScreen"
        component={WelfareItemRegistrationScreen}
        options={{ title: "복지 물품 등록" }}
      />
      <Stack.Screen
        name="LeaveReasonScreen"
        component={LeaveReasonScreen}
        options={{ title: "이탈 사유 등록" }}
      />
      <Stack.Screen
        name="DailyReportScreen"
        component={DailyReportScreen}
        options={{ title: "오늘의 일과 작성" }}
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
