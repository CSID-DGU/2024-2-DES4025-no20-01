import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const AttendanceScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* 사용자 정보 및 출근 버튼 */}
      <View style={styles.header}>
        <Text style={styles.userName}>사회복지사 님</Text>
        <Text style={styles.infoText}>근 클러킹 시간 ~ 혹은 시간 표시</Text>
        <TouchableOpacity
          style={styles.attendanceButton}
          onPress={() => navigation.navigate("ClockInScreen")}
        >
          <Text style={styles.attendanceButtonText}>출근 도장 찍기</Text>
        </TouchableOpacity>
      </View>

      {/* 복지 대상자 정보 */}
      <View style={styles.targetContainer}>
        <Text style={styles.targetText}>
          복지 대상자: 김OO 님{"\n"}복지서비스 이행한 근무 시간 : 12시간
        </Text>
      </View>

      {/* 복지사님을 통해 지원된 물품 */}
      <View style={styles.itemContainer}>
        <View style={styles.itemBox}>
          <Text style={styles.itemText}>물품: 20kg</Text>
          <Text style={styles.itemSubText}>Java Timur, Indonesia</Text>
        </View>
        <View style={styles.itemBox}>
          <Text style={styles.itemText}>물품: 200개</Text>
          <Text style={styles.itemSubText}>Java Timur, Indonesia</Text>
        </View>
      </View>

      {/* 주요 버튼 */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate("WelfareItemRegistrationScreen")}
        >
          <Text style={styles.buttonText}>복지 물품 추가 등록</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate("LeaveReasonScreen")}
        >
          <Text style={styles.buttonText}>이탈 사유 기재하러가기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => navigation.navigate("DailyReportScreen")}
        >
          <Text style={styles.buttonText}>오늘의 기록 작성</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AttendanceScreen;

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
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  attendanceButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  attendanceButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  targetContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  targetText: {
    fontSize: 14,
    lineHeight: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemBox: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemSubText: {
    fontSize: 12,
    color: "#777",
  },
  buttonGroup: {
    marginTop: 20,
  },
  mainButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
