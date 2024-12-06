import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons"; // 아이콘 사용
import { getRecentHistory } from "../lib/apis/serviceHistoryApi"; // 최근 승인 내역 API 가져오기

const WelfareBeneficiaryScreen = ({ navigation }) => {
  const [locationAddress, setLocationAddress] =
    useState("위치 정보를 가져오는 중...");
  const [currentDateTime, setCurrentDateTime] = useState("");
  const [recentApproval, setRecentApproval] = useState(null); // 최근 승인 내역
  const [items] = useState([
    {
      id: "1",
      name: "쌀",
      quantity: "20kg",
      location: "Jawa Timur, Indonesia",
      image: "https://via.placeholder.com/256x222",
    },
    {
      id: "2",
      name: "물티슈",
      quantity: "200개",
      location: "Jawa Timur, Indonesia",
      image: "https://via.placeholder.com/256x222",
    },
  ]);

  // 위치 가져오기
  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("위치 권한이 필요합니다.");
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const { latitude, longitude } = currentLocation.coords;

      // Reverse geocoding
      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const fullAddress = [
        address[0]?.country || "",
        address[0]?.region || "",
        address[0]?.city || "",
        address[0]?.district || "",
        address[0]?.street || "",
        address[0]?.name || "",
      ]
        .filter((field) => field)
        .join(" ");
      setLocationAddress(fullAddress);
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationAddress("위치 정보를 가져올 수 없습니다.");
    }
  };

  // 현재 날짜와 시간 업데이트
  const updateDateTime = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const formattedTime = now.toTimeString().split(" ")[0];
    setCurrentDateTime(`${formattedDate} ${formattedTime}`);
  };

  // 최근 승인 내역 가져오기
  const fetchRecentApproval = async () => {
    try {
      const data = await getRecentHistory();
      if (data.recentHistoryList && data.recentHistoryList.length > 0) {
        setRecentApproval(data.recentHistoryList[0]); // 가장 최근 내역만 가져오기
      }
    } catch (error) {
      console.error("Error fetching recent approval:", error);
    }
  };

  useEffect(() => {
    fetchLocation();
    updateDateTime();
    fetchRecentApproval();
    const interval = setInterval(updateDateTime, 1000); // 1초마다 업데이트
    return () => clearInterval(interval);
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

  return (
    <View style={styles.container}>
      {/* 알림 아이콘과 최근 승인 내역 말풍선 */}
      <View style={styles.notificationContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ServiceApprovalScreen")}
          style={styles.notificationButton}
        >
          <Ionicons name="notifications-outline" size={28} color="#000" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
        {recentApproval && (
          <View style={styles.recentApprovalBubble}>
            <Text style={styles.recentApprovalText}>
              최근 승인: {recentApproval.content}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.header}>
        {/* 프로필 아이콘 */}
        <Ionicons
          name="person-circle-outline"
          size={80}
          color="#4CAF50"
          style={styles.profileIcon}
        />
        <Text style={styles.title}>{locationAddress}</Text>
        <Text style={styles.infoText}>{currentDateTime}</Text>
        <Text style={styles.infoText}>복지 대상자: 서하은 님</Text>
      </View>

      <Text style={styles.sectionTitle}>이번 달 지원받으신 물품</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemList}
      />

      <View style={styles.contactSection}>
        <Text style={styles.contactText}>📞 보건복지부 콜센터 129</Text>
        <Text style={styles.contactText}>📞 노인학대신고 1577-1389</Text>
        <Text style={styles.contactText}>
          📞 노인일자리종합 안내 콜센터 1577-1960
        </Text>
        <Text style={styles.contactText}>
          📞 사회보장정보원 콜센터 1566-3232
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  notificationContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  notificationButton: {
    position: "relative",
    marginLeft: 10,
  },
  notificationDot: {
    width: 10,
    height: 10,
    backgroundColor: "red",
    borderRadius: 5,
    position: "absolute",
    top: 0,
    right: 0,
  },
  recentApprovalBubble: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 15,
    marginLeft: 10,
    maxWidth: "80%",
  },
  recentApprovalText: {
    fontSize: 14,
    color: "#333",
  },
  header: {
    alignItems: "center",
    marginBottom: 15,
    marginTop: 40,
  },
  profileIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  itemList: {
    paddingHorizontal: 10,
    marginTop: 20,
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
  contactSection: {
    marginTop: 20,
  },
  contactText: {
    fontSize: 20,
    marginBottom: 8,
  },
});

export default WelfareBeneficiaryScreen;
