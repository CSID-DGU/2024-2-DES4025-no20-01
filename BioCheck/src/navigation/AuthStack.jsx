import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../pages/MainScreen"; // 메인화면
import KakaoLoginScreen from "../pages/loginScreen"; // 카카오 로그인 화면
import WelfareRegistrationScreen from "../pages/WelfareRegistrationScreen";
import AttendanceScreen from "../pages/AttendanceScreen";
import ClockInScreen from "../pages/ClockInScreen";

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
    </Stack.Navigator>
  );
};

export default AuthStack;
