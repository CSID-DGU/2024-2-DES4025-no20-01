import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage import
import { startWork } from "../lib/apis/startWork"; // 출근 API 임포트
import { endWork } from "../lib/apis/endWork"; // 퇴근 API 임포트

const ClockInScreen = () => {
  const [isClockedIn, setIsClockedIn] = useState(false); // 출근 여부 상태
  const [isAuthenticating, setIsAuthenticating] = useState(false); // 인증 중 상태
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37.5642135,
    longitude: 127.0016985,
  }); // 현재 위치 초기값
  const [locationAddress, setLocationAddress] = useState("서울시 중구 필동3가"); // 현재 위치 주소

  // 위치 권한 요청
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    return status === "granted";
  };

  // 현재 위치 가져오기
  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert("권한 거부", "위치 권한이 필요합니다.");
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });

      // 주소 가져오기 로직 추가
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (geocode.length > 0) {
        setLocationAddress(
          geocode[0].formattedAddress || "주소를 가져올 수 없습니다."
        );
      } else {
        setLocationAddress("주소를 가져올 수 없습니다.");
      }
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert("위치 오류", "현재 위치를 가져올 수 없습니다.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const loadClockedInStatus = async () => {
    try {
      const status = await AsyncStorage.getItem("isClockedIn");
      if (status !== null) {
        setIsClockedIn(JSON.parse(status)); // 저장된 출근 상태 불러오기
      }
    } catch (error) {
      console.error("Error loading clocked in status:", error);
    }
  };

  // 출근/퇴근 상태 저장
  const handleAuthentication = async () => {
    setIsAuthenticating(true);

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert("지문 인증 불가", "이 기기는 지문 인증을 지원하지 않습니다.");
      setIsAuthenticating(false);
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert("지문 인증 불가", "등록된 생체 인증 정보가 없습니다.");
      setIsAuthenticating(false);
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: isClockedIn ? "퇴근 인증" : "출근 인증",
    });

    setIsAuthenticating(false);

    if (result.success) {
      const currentDate = new Date().toISOString().split("T")[0]; // 현재 날짜
      const currentTime = new Date().toLocaleTimeString("ko-KR"); // 현재 시간

      if (!isClockedIn) {
        try {
          await startWork(currentDate, currentTime);
          setIsClockedIn(true);
          await AsyncStorage.setItem(
            "clockInData",
            JSON.stringify({
              isClockedIn: true,
              time: currentTime,
              address: locationAddress,
            })
          );
          Alert.alert(
            "출근 완료",
            `출근이 성공적으로 등록되었습니다.\n출근 시간: ${currentTime}`
          );
        } catch (error) {
          Alert.alert("출근 실패", "출근 기록에 실패했습니다.");
        }
      } else {
        try {
          await endWork(currentDate, currentTime, 0);
          setIsClockedIn(false);
          await AsyncStorage.setItem(
            "clockInData",
            JSON.stringify({
              isClockedIn: false,
              time: null,
              address: null,
            })
          );
          Alert.alert("퇴근 완료", "퇴근이 성공적으로 등록되었습니다.");
        } catch (error) {
          Alert.alert("퇴근 실패", "퇴근 기록에 실패했습니다.");
        }
      }
    } else {
      Alert.alert("인증 실패", "지문 인증에 실패했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>{locationAddress}</Text>
        <Text style={styles.subTitle}>
          {isClockedIn ? "근무 중이십니다." : "곧 출근하실 시간입니다."}
        </Text>
        <TouchableOpacity style={styles.statusButton}>
          <Text style={styles.statusButtonText}>
            {isClockedIn ? "퇴근이 가능합니다" : "출근이 가능합니다"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 지도 */}
      <MapView
        style={styles.map}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={currentLocation}
          title={isClockedIn ? "퇴근 위치" : "출근 위치"}
          description={locationAddress}
        />
      </MapView>

      {/* 출근/퇴근 등록 버튼 */}
      <TouchableOpacity
        style={styles.clockButton}
        onPress={handleAuthentication} // 지문 인증 호출
        disabled={isAuthenticating} // 인증 중 비활성화
      >
        <Text style={styles.clockButtonText}>
          {isAuthenticating
            ? "인증 중..."
            : isClockedIn
            ? "퇴근 등록"
            : "출근 등록"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClockInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
    marginTop: 70,
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
  statusButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  statusButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  map: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
  },
  clockButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    marginHorizontal: 20,
    alignItems: "center",
    borderRadius: 8,
  },
  clockButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tabButton: {
    alignItems: "center",
  },
  tabButtonText: {
    fontSize: 12,
    color: "#666",
  },
});
