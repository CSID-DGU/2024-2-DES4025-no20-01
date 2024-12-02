import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "https://biocheck.store";

// 퇴근하기 API 호출
export const endWork = async (date, endTime, pausedTime) => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    if (!token) {
      throw new Error("로그인 토큰이 없습니다.");
    }

    const response = await axios.patch(
      `${BACKEND_URL}/api/work/end`,
      { date, endTime, pausedTime },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // 퇴근 성공 시 반환
  } catch (error) {
    console.error("Error ending work:", error);
    throw new Error("퇴근 기록에 실패했습니다.");
  }
};
