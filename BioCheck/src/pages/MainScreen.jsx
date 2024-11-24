import React from "react";
import { View, StyleSheet, Image } from "react-native";
import KakaoLoginButton from "../components/KakaoLoginButton";

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* 로고 이미지 */}
      <Image
        source={require("../assets/BioCheck.png")} // 로고 이미지 파일 경로
        style={styles.logo}
      />
      {/* 로그인 버튼 */}
      <KakaoLoginButton
        onPress={() => navigation.navigate("KakaoLoginScreen")}
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // 배경색
  },
  logo: {
    width: 200, // 로고 너비
    height: 200, // 로고 높이
    marginBottom: 30, // 버튼과의 간격
    resizeMode: "contain", // 이미지 비율 유지
  },
});
