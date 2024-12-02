import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, Alert } from "react-native";
import * as Location from "expo-location";

const WelfareBeneficiaryScreen = () => {
  const [locationAddress, setLocationAddress] =
    useState("위치 정보를 가져오는 중...");
  const [currentDateTime, setCurrentDateTime] = useState("");
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

  useEffect(() => {
    fetchLocation();
    updateDateTime();
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
      <View style={styles.header}>
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
  header: {
    alignItems: "center",
    marginBottom: 15, // 여백 줄이기
    marginTop: 100,
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
    marginBottom: 5, // 여백 조정
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 100,
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
    fontSize: 14,
    marginBottom: 5,
  },
});

export default WelfareBeneficiaryScreen;
