import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "https://biocheck.store";

// 출근하기 API 호출
export const startWork = async (date, startTime) => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("로그인 토큰이 없습니다.");
    }

    const response = await axios.post(
      `${BACKEND_URL}/api/work/start`,
      { date, startTime },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // 출근 성공 시 반환
  } catch (error) {
    console.error("Error starting work:", error);
    throw new Error("출근 기록에 실패했습니다.");
  }
};
