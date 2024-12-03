import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // 아이콘 사용
import { getUserInfo } from "../lib/apis/userInfo";

const AttendanceScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [items] = useState([
    {
      id: "1",
      name: "쌀",
      quantity: "20kg",
      location: "Jawa Timur, Indonesia",
      image: "https://via.placeholder.com/256x222", // 더미 이미지
    },
    {
      id: "2",
      name: "물티슈",
      quantity: "200개",
      location: "Jawa Timur, Indonesia",
      image: "https://via.placeholder.com/256x222", // 더미 이미지
    },
    {
      id: "3",
      name: "옷",
      quantity: "30벌",
      location: "Seoul, South Korea",
      image: "https://via.placeholder.com/256x222", // 더미 이미지
    },
  ]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo();
        setUserInfo(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user info:", error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemBox}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.itemText}>
        {item.name} {item.quantity}
      </Text>
      <Text style={styles.itemSubText}>{item.location}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 사용자 정보 및 출근 상태 */}
      <View style={styles.header}>
        {/* 프로필 아이콘 */}
        <Ionicons
          name="person-circle-outline"
          size={80}
          color="#4CAF50"
          style={styles.profileIcon}
        />
        <Text style={styles.userName}>{userInfo.name} 님</Text>
        <Text style={styles.infoText}>
          {userInfo.clockedIn ? "근무 중이십니다." : "곧 출근하실 시간입니다."}
        </Text>
        <TouchableOpacity
          style={styles.attendanceButton}
          onPress={() => navigation.navigate("ClockInScreen")}
        >
          <Text style={styles.attendanceButtonText}>출근 도장 찍기</Text>
        </TouchableOpacity>
      </View>

      {/* 복지사 총 근무 시간 */}
      <View style={styles.targetContainer}>
        <Text style={styles.targetText}>
          복지사님의 이번 달 총 근무 시간:{" "}
          {Math.floor(userInfo.totalTime / 3600)}시간
        </Text>
      </View>

      {/* 물품 목록 */}
      <Text style={styles.sectionTitle}>
        이번 달 복지사님을 통해 지원된 물품
      </Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemList}
      />

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  profileIcon: {
    marginBottom: 10, // 아이콘과 텍스트 간 간격
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  itemList: {
    paddingHorizontal: 10,
    marginTop: 30,
  },
  itemBox: {
    width: 256,
    height: 222,
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  itemImage: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  itemSubText: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
  buttonGroup: {
    marginTop: 20,
    marginBottom: 10,
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
