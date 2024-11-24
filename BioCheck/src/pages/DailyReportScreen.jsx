import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const DailyReportScreen = () => {
  const [report, setReport] = useState(""); // 오늘의 서비스 기록

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
        <Text style={styles.title}>서울시 중구 필동3가</Text>
        <Text style={styles.subTitle}>오늘 날짜</Text>
      </View>

      {/* 입력 필드 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="복지사 이름 (자동)"
          editable={false} // 자동 입력 필드
        />
        <TextInput
          style={styles.input}
          placeholder="복지대상자 이름 (자동)"
          editable={false} // 자동 입력 필드
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
