import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "https://biocheck.store";

// 사용자 정보 조회 API 호출
export const getUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("로그인 토큰이 없습니다.");
    }

    const response = await axios.get(`${BACKEND_URL}/api/user/get/userInfo`, {
      headers: {
        Authorization: `Bearer ${token}`, // Bearer 토큰으로 인증
      },
    });

    return response.data; // 사용자 정보 반환
  } catch (error) {
    console.error("Error fetching user info:", error.response?.data || error);
    throw new Error("사용자 정보를 가져오는 데 실패했습니다.");
  }
};
