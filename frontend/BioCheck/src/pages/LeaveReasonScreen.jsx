import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserInfo } from "../lib/apis/userInfo"; // 사용자 정보 API import

const LeaveReasonScreen = () => {
  const [userName, setUserName] = useState("이름을 불러오는 중...");
  const [locationAddress, setLocationAddress] =
    useState("주소를 불러오는 중...");
  const [clockInTime, setClockInTime] = useState("시간 정보를 불러오는 중...");
  const [leaveRecordOpen, setLeaveRecordOpen] = useState(false); // 드롭다운 열림 여부
  const [leaveRecord, setLeaveRecord] = useState(null); // 선택된 값
  const [leaveRecordItems, setLeaveRecordItems] = useState([
    { label: "2023.11.23 16:30 ~ 17:30", value: "record1" },
    { label: "2023.11.24 10:00 ~ 11:00", value: "record2" },
    { label: "2023.11.25 14:00 ~ 15:00", value: "record3" },
  ]);
  const [reason, setReason] = useState(""); // 이탈 사유

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo(); // 사용자 정보 API 호출
      setUserName(data.name || "이름 정보 없음"); // 사용자 이름 업데이트
    } catch (error) {
      console.error("Error fetching user info:", error);
      Alert.alert("오류", "사용자 정보를 가져오는 데 실패했습니다.");
    }
  };

  // 출근 정보 가져오기
  const fetchClockInData = async () => {
    try {
      const clockInData = await AsyncStorage.getItem("clockInData");
      if (clockInData) {
        const parsedClockInData = JSON.parse(clockInData);
        setLocationAddress(parsedClockInData.address || "주소 정보 없음");
        setClockInTime(parsedClockInData.time || "시간 정보 없음");
      } else {
        setLocationAddress("저장된 주소가 없습니다.");
        setClockInTime("저장된 시간이 없습니다.");
      }
    } catch (error) {
      console.error("Error fetching clock in data:", error);
      Alert.alert("오류", "출근 정보를 가져오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchUserInfo(); // 사용자 정보 가져오기
    fetchClockInData(); // 출근 정보 가져오기
  }, []);

  const handleRegister = () => {
    if (!leaveRecord || !reason) {
      Alert.alert("오류", "모든 필드를 채워주세요.");
      return;
    }

    Alert.alert("등록 완료", "이탈 사유가 성공적으로 등록되었습니다.");
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>{locationAddress}</Text>
        <Text style={styles.subTitle}>{clockInTime}</Text>
      </View>

      {/* 입력 필드 */}
      <View style={styles.inputContainer}>
        {/* 복지사 이름 */}
        <TextInput
          style={styles.input}
          placeholder="복지사 이름 (자동)"
          value={userName} // 유저 이름 표시
          editable={false} // 자동 입력 필드
        />

        {/* 이탈 기록 선택 */}
        <DropDownPicker
          open={leaveRecordOpen}
          value={leaveRecord}
          items={leaveRecordItems}
          setOpen={setLeaveRecordOpen}
          setValue={setLeaveRecord}
          setItems={setLeaveRecordItems}
          placeholder="이탈 기록 선택"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        {/* 이탈 사유 입력 */}
        <TextInput
          style={[styles.input, styles.reasonInput]}
          placeholder="이탈한 사유를 기재"
          multiline
          textAlignVertical="top"
          value={reason}
          onChangeText={setReason}
        />
      </View>

      {/* 등록 버튼 */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>등록하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LeaveReasonScreen;

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
  reasonInput: {
    height: 100,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#6200EE",
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownContainer: {
    borderColor: "#6200EE",
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
