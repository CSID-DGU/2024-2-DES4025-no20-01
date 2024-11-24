import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import qs from "qs";

const REST_API_KEY = "a805301eda7dac65f0e4f24bdee7d443";
const REDIRECT_URI = "http://localhost:3000/oauth";

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const KakaoLoginScreen = ({ navigation }) => {
  const [webviewVisible, setWebviewVisible] = useState(true);

  const getCode = (target) => {
    const exp = "code=";
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
    }
  };

  const requestToken = async (code) => {
    const requestTokenUrl = "https://kauth.kakao.com/oauth/token";

    const options = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
    });

    try {
      const tokenResponse = await axios.post(requestTokenUrl, options);
      const ACCESS_TOKEN = tokenResponse.data.access_token;

      Alert.alert("로그인 성공", `Access Token: ${ACCESS_TOKEN}`);
      setWebviewVisible(false);
      navigation.navigate("MainScreen"); // 로그인 성공 후 메인으로 이동
    } catch (error) {
      console.error("Error fetching access token:", error);
      Alert.alert("로그인 실패", "토큰 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {webviewVisible && (
        <WebView
          style={styles.webView}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={(event) => {
            const data = event.nativeEvent.url;
            getCode(data);
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
  },
  webView: {
    flex: 1,
    width: 400,
    height: 300,
  },
});
