import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfo } from "../lib/apis/userInfo"; // 유저 정보 API import

const DailyReportScreen = () => {
  const [userName, setUserName] = useState("이름을 불러오는 중...");
  const [locationAddress, setLocationAddress] =
    useState("주소를 불러오는 중...");
  const [todayDate, setTodayDate] = useState(""); // 오늘 날짜
  const [report, setReport] = useState(""); // 오늘의 서비스 기록

  // 유저 이름 가져오기
  const fetchUserName = async () => {
    try {
      const data = await getUserInfo();
      setUserName(data.name || "이름 정보 없음");
    } catch (error) {
      console.error("Error fetching user info:", error);
      Alert.alert("오류", "복지사 이름을 가져오는 데 실패했습니다.");
      setUserName("데이터 불러오기 실패");
    }
  };

  // AsyncStorage에서 위치 정보 가져오기
  const fetchLocationData = async () => {
    try {
      const clockInData = await AsyncStorage.getItem("clockInData");
      if (clockInData) {
        const parsedData = JSON.parse(clockInData);
        setLocationAddress(parsedData.address || "위치 정보 없음");
      } else {
        setLocationAddress("저장된 위치 정보가 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      Alert.alert("오류", "위치 정보를 불러오는 데 실패했습니다.");
    }
  };

  // 오늘 날짜 가져오기
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 월 2자리
    const date = today.getDate().toString().padStart(2, "0"); // 일 2자리
    setTodayDate(`${year}-${month}-${date}`);
  };

  useEffect(() => {
    fetchUserName(); // 복지사 이름 가져오기
    fetchLocationData(); // 위치 정보 가져오기
    getTodayDate(); // 오늘 날짜 가져오기
  }, []);

  const handleRegister = () => {
    if (!report) {
      Alert.alert("오류", "오늘 수행한 서비스를 작성해주세요.");
      return;
    }

    Alert.alert("등록 완료", "오늘의 기록이 성공적으로 등록되었습니다.");
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>{locationAddress}</Text>
        <Text style={styles.subTitle}>{todayDate}</Text>
      </View>

      {/* 입력 필드 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="복지사 이름 (자동)"
          value={userName} // 유저 이름 표시
          editable={false} // 자동 입력 필드
        />
        <TextInput
          style={styles.input}
          placeholder="복지대상자 이름"
          value="홍길동" // 복지 대상자 이름 고정
          editable={false} // 수정 불가
        />
        <TextInput
          style={[styles.input, styles.reportInput]}
          placeholder="오늘 수행한 서비스를 작성"
          multiline
          textAlignVertical="top"
          value={report}
          onChangeText={setReport}
        />
      </View>

      {/* 등록 버튼 */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>등록하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DailyReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#6200EE",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: "#333",
  },
  reportInput: {
    height: 100,
  },
  registerButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
