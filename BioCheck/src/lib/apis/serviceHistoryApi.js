import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_URL = "https://biocheck.store";

// 서비스 기록(내용) 생성
export const createServiceContent = async (subjectId, date, content) => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    if (!token) throw new Error("로그인 토큰이 없습니다.");

    const response = await axios.post(
      `${BACKEND_URL}/api/history/create/content`,
      { subjectId, date, content },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error creating service content:",
      error.response?.data || error
    );
    throw new Error("서비스 내용을 생성하는 데 실패했습니다.");
  }
};

// 서비스 기록 조회
export const getServiceHistory = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    if (!token) throw new Error("로그인 토큰이 없습니다.");

    const response = await axios.get(`${BACKEND_URL}/api/history/get/content`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching service history:",
      error.response?.data || error
    );
    throw new Error("서비스 기록을 가져오는 데 실패했습니다.");
  }
};

// 서비스 응답 등록
export const updateServiceResponse = async (historyId, response) => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    if (!token) throw new Error("로그인 토큰이 없습니다.");

    const response = await axios.patch(
      `${BACKEND_URL}/api/history/update/response`,
      { historyId, response },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating service response:",
      error.response?.data || error
    );
    throw new Error("서비스 응답 등록에 실패했습니다.");
  }
};

// 최근 작성 내용 불러오기
export const getRecentHistory = async () => {
  try {
    const token = await AsyncStorage.getItem("jwtToken");
    if (!token) throw new Error("로그인 토큰이 없습니다.");

    const response = await axios.get(`${BACKEND_URL}/api/history/get/recent`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching recent history:",
      error.response?.data || error
    );
    throw new Error("최근 작성 내용을 가져오는 데 실패했습니다.");
  }
};
