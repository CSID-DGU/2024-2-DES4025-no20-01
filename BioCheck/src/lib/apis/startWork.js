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

    console.log("Sending request with:", { date, startTime });

    const response = await axios.post(
      `${BACKEND_URL}/api/work/start`,
      { date, startTime }, // 요청 데이터
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Start work response:", response.data);
    return response.data; // 출근 성공 시 반환
  } catch (error) {
    if (error.response) {
      console.error("Server Error Response:", error.response.data);
    } else {
      console.error("Error starting work:", error.message);
    }
    throw new Error("출근 기록에 실패했습니다.");
  }
};
