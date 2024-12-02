import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { updateUserType } from "../lib/apis/userType";

const UserTypeSelectionScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false); // 드롭다운 열림 여부
  const [value, setValue] = useState(null); // 선택된 값
  const [items] = useState([
    { label: "복지사", value: "WORKER" },
    { label: "복지대상자", value: "SUBJECT" },
  ]);

  const handleSubmit = async () => {
    if (!value) {
      Alert.alert("알림", "이용자 유형을 선택해주세요.");
      return;
    }

    try {
      // JWT 토큰 가져오기
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        Alert.alert("오류", "로그인 토큰이 없습니다.");
        return;
      }

      console.log("Selected Type:", value);

      // 서버에 PATCH 요청 보내기
      await updateUserType(token, value);

      // 선택한 유형을 AsyncStorage에 저장
      await AsyncStorage.setItem("userType", value);

      Alert.alert("성공", "이용자 유형이 저장되었습니다.");

      // 복지사 유형 선택 시 AttendanceScreen으로 이동
      if (value === "WORKER") {
        navigation.navigate("AttendanceScreen");
      } else {
        navigation.navigate("MainScreen"); // 복지 대상자라면 MainScreen으로 이동
      }
    } catch (error) {
      console.error("Error updating user type:", error.response?.data || error);
      Alert.alert("오류", "서버와 통신 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerText}>최초 로그인 시 등록 필요</Text>
        <Text style={styles.subHeaderText}>이용자 유형을 알려주세요</Text>
      </View>

      {/* 드롭다운 */}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        placeholder="선택"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* 저장하기 버튼 */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>저장하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserTypeSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // 세로 가운데 정렬
    alignItems: "center", // 가로 가운데 정렬
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  dropdown: {
    width: "90%",
    alignSelf: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  dropdownContainer: {
    width: "90%",
    alignSelf: "center",
    borderColor: "#ddd",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
