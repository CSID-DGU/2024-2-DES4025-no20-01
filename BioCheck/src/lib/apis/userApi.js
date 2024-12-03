import axios from "axios";

const BASE_URL = "https://example.com/api/user"; // 서버 기본 URL (변경 필요)

// API 요청 함수 정의
const userApi = {
  // 복지 대상자 연결 해제
  disconnectSubject: async (authorization, subjectId) => {
    const url = `${BASE_URL}/user/disconnect`;
    return axios.patch(
      url,
      { subjectId },
      { headers: { Authorization: authorization } }
    );
  },

  // 복지 대상자 연결
  connectSubject: async (authorization, subjectId) => {
    const url = `${BASE_URL}/user/connect`;
    return axios.patch(
      url,
      { subjectId },
      { headers: { Authorization: authorization } }
    );
  },

  // 이용자 유형 설정
  updateUserType: async (authorization, type) => {
    const url = `${BASE_URL}/update/type`;
    return axios.patch(
      url,
      { type },
      { headers: { Authorization: authorization } }
    );
  },

  // 복지 대상자 주소 등록
  updateLocation: async (authorization, latitude, longitude) => {
    const url = `${BASE_URL}/update/location`;
    return axios.patch(
      url,
      { latitude, longitude },
      { headers: { Authorization: authorization } }
    );
  },

  // 복지 대상자 검색
  searchSubject: async (authorization, name) => {
    const url = `${BASE_URL}/search/${name}`;
    return axios.get(url, { headers: { Authorization: authorization } });
  },

  // 유저 정보 조회
  getUserInfo: async (authorization) => {
    const url = `${BASE_URL}/get/userInfo`;
    return axios.get(url, { headers: { Authorization: authorization } });
  },

  // 연결된 복지 대상자 조회
  getConnectedSubjects: async (authorization) => {
    const url = `${BASE_URL}/get/subjectInfo`;
    return axios.get(url, { headers: { Authorization: authorization } });
  },
};

export default userApi;
