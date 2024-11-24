import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const LeaveReasonScreen = () => {
  const [leaveRecordOpen, setLeaveRecordOpen] = useState(false); // 드롭다운 열림 여부
  const [leaveRecord, setLeaveRecord] = useState(null); // 선택된 값
  const [leaveRecordItems, setLeaveRecordItems] = useState([
    { label: "2023.11.23 16:30 ~ 17:30", value: "record1" },
    { label: "2023.11.24 10:00 ~ 11:00", value: "record2" },
    { label: "2023.11.25 14:00 ~ 15:00", value: "record3" },
  ]);
  const [reason, setReason] = useState(""); // 이탈 사유

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
        <Text style={styles.title}>서울시 중구 필동3가</Text>
        <Text style={styles.subTitle}>곧 출근하실 시간~ 혹은 시간 표시</Text>
      </View>

      {/* 입력 필드 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="복지사 이름 (자동)"
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
