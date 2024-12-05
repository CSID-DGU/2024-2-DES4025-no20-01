import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import {
  getServiceHistory,
  updateServiceResponse,
} from "../lib/apis/serviceHistoryApi";

const ServiceApprovalScreen = () => {
  const [serviceHistory, setServiceHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const dummyData = [
    {
      id: 1,
      content: "2024-12-01: 서하은님께 쌀 10kg 전달",
      date: "2024-12-01",
      approved: false,
    },
    {
      id: 2,
      content: "2024-12-02: 서하은님께 물티슈 200개 전달",
      date: "2024-12-02",
      approved: true,
    },
    {
      id: 3,
      content: "2024-12-03: 서하은님께 식료품 세트 전달",
      date: "2024-12-03",
      approved: false,
    },
  ];

  useEffect(() => {
    const fetchServiceHistory = async () => {
      try {
        console.log("Fetching service history...");
        const data = await getServiceHistory();
        console.log("API Response:", data);
        const apiData = data.serviceHistoryList || [];
        setServiceHistory([...dummyData, ...apiData]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching service history:", error);
        console.log("Using dummy data only...");
        setServiceHistory(dummyData);
        setLoading(false);
      }
    };

    fetchServiceHistory();
  }, []);

  const handleApprove = async (historyId) => {
    try {
      console.log(`Approving service with ID: ${historyId}`);
      await updateServiceResponse(historyId, true);
      Alert.alert("승인 완료", "서비스 기록이 승인되었습니다.");
      setServiceHistory((prev) =>
        prev.map((item) =>
          item.id === historyId ? { ...item, approved: true } : item
        )
      );
    } catch (error) {
      console.error("Error approving service:", error);
      Alert.alert("오류", "서비스 승인에 실패했습니다.");
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyContent}>{item.content}</Text>
      <Text style={styles.historyDate}>{item.date}</Text>
      <TouchableOpacity
        style={[styles.approveButton, item.approved && styles.approvedButton]}
        onPress={() => handleApprove(item.id)}
        disabled={item.approved}
      >
        <Text style={styles.approveButtonText}>
          {item.approved ? "승인 완료" : "승인"}
        </Text>
      </TouchableOpacity>
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
      <Text style={styles.title}>서비스 기록 승인</Text>
      <FlatList
        data={serviceHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default ServiceApprovalScreen;

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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  historyItem: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  historyContent: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  historyDate: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  approveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  approvedButton: {
    backgroundColor: "#888", // 승인 완료 버튼 색상
  },
  approveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
