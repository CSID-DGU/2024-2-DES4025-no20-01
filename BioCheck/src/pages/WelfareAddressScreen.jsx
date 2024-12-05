import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps"; // 지도 컴포넌트
import * as Location from "expo-location"; // 위치 기능 사용
import { Ionicons } from "@expo/vector-icons"; // 아이콘 사용

const WelfareAddressScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null); // 현재 위치 상태
  const [locationAddress, setLocationAddress] =
    useState("위치 정보를 가져오는 중..."); // 현재 위치 주소

  // 현재 위치 가져오기
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

      // reverse geocoding을 통해 주소를 가져옵니다
      const address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // 전체 주소 표시 (null 체크 및 필드 결합)
      const fullAddress = [
        address[0]?.country || "",
        address[0]?.region || "",
        address[0]?.city || "",
        address[0]?.district || "",
        address[0]?.street || "",
        address[0]?.name || "",
      ]
        .filter((field) => field) // 비어있는 필드 제거
        .join(" "); // 필드들 결합
      setLocationAddress(fullAddress); // 전체 주소 저장
      setLocation({ latitude, longitude }); // 위치 정보 저장
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationAddress("위치 정보를 가져올 수 없습니다.");
    }
  };

  // 컴포넌트 마운트 시 현재 위치 가져오기
  useEffect(() => {
    fetchLocation(); // 현재 위치 가져오기
  }, []);

  // 위치가 정확한지 확인하는 버튼 클릭 시 실행
  const handleConfirmLocation = () => {
    Alert.alert("위치 확인", "네, 정확합니다.", [
      {
        text: "확인",
        onPress: () => navigation.navigate("WelfareBeneficiaryScreen"), // 화면 이동
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* 프로필 아이콘 */}
        <View style={styles.profileIconContainer}>
          <Ionicons name="person-circle-outline" size={50} color="#4CAF50" />
        </View>
        {/* 주소 텍스트 */}
        <Text style={styles.title}>{locationAddress || "위치 정보 없음"}</Text>
        <Text style={styles.infoText}>
          현재 계신 위치가 복지사 분이 찾아올 주소로 등록됩니다.
        </Text>
        <Text style={styles.title}>이 위치가 정확한가요?</Text>
      </View>

      {/* 지도 */}
      {location && (
        <MapView
          style={styles.map}
          region={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={location}
            title={"복지 대상자 위치"}
            description={locationAddress}
          />
        </MapView>
      )}

      {/* 확인 버튼 */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmLocation}
      >
        <Text style={styles.confirmButtonText}>네, 정확합니다</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around", // 상단, 하단 균형 맞춤
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 70, // 헤더를 더 아래로 내리기 위해 여백 추가
  },
  profileIconContainer: {
    marginBottom: 10, // 아이콘과 텍스트 사이 여백
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
    marginBottom: 10,
    textAlign: "center",
  },
  map: {
    width: 342,
    height: 380,
    borderRadius: 10,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    marginHorizontal: 20,
    alignItems: "center",
    borderRadius: 8,
    width: 346,
    marginBottom: 70,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WelfareAddressScreen;
