import axios from "axios";

const BACKEND_URL = "https://biocheck.store"; // 백엔드 서버 URL

export const updateUserType = async (token, type) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/user/update/type`,
      { type },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // 서버에서 반환된 데이터
  } catch (error) {
    console.error("Error updating user type:", error.response?.data || error);
    throw error;
  }
};
