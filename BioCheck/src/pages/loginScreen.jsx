import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { WebView } from "react-native-webview";
import { loginWithKakao } from "../lib/apis/auth";

const REST_API_KEY = "2b619c57d18cfd7bd921d94e6ef00940"; // REST API 키
const REDIRECT_URI = "https://biocheck.store/auth/kakao/login"; // 리디렉션 URI

const KakaoLoginScreen = ({ navigation }) => {
  const [webviewVisible, setWebviewVisible] = useState(true);

  // 인가 코드를 처리하는 함수
  const handleCode = async (code) => {
    console.log("Received Code:", code);

    try {
      // API 호출: 백엔드로 인가 코드 전달
      const response = await loginWithKakao(code);

      const { userId, name, token } = response; // 백엔드 응답 데이터
      console.log("User Info:", { userId, name });
      console.log("JWT Token:", token);

      Alert.alert("로그인 성공", `환영합니다, ${name}!`);
      setWebviewVisible(false);

      // UserTypeSelectionScreen으로 이동
      navigation.navigate("UserTypeSelectionScreen", { token, userId, name });
    } catch (error) {
      console.error("Error during backend login:", error.message);
      Alert.alert("로그인 실패", error.message);
    }
  };

  // WebView에서 URL 변경 시 실행되는 함수
  const getCode = (url) => {
    const codeMatch = url.match(/code=([^&]*)/); // URL에서 `code` 추출
    if (codeMatch) {
      const code = codeMatch[1];
      handleCode(code); // 백엔드로 코드 전달
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {webviewVisible && (
        <WebView
          style={styles.webView}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
              REDIRECT_URI
            )}`,
          }}
          javaScriptEnabled
          onLoadStart={() => console.log("WebView 로드 시작")}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error("WebView 로드 에러:", nativeEvent);
            Alert.alert("로드 실패", nativeEvent.description);
          }}
          onNavigationStateChange={(event) => {
            if (event.url.includes("code=")) {
              getCode(event.url);
            }
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default KakaoLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  webView: {
    flex: 1,
    width: 400,
    height: 300,
  },
});
