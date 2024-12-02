import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "https://biocheck.store";

// 백엔드로 로그인 요청 및 토큰 저장
export const loginWithKakao = async (code) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/auth/kakao/login/${code}`
    );
    const { userId, name, token } = response.data;

    // 토큰 저장
    await AsyncStorage.setItem("jwtToken", token);

    return { userId, name, token };
  } catch (error) {
    console.error("Error during backend login:", error.response?.data || error);
    throw new Error("로그인 요청 중 문제가 발생했습니다.");
  }
};

// 스토리지에서 JWT 토큰 가져오기
export const getStoredToken = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    return token;
  } catch (error) {
    console.error("Error fetching token from storage:", error);
    throw new Error("토큰을 가져오는 데 실패했습니다.");
  }
};
