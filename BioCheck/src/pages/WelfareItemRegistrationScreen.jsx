import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage"; // AsyncStorage 사용
import { getUserInfo } from "../lib/apis/userInfo"; // 사용자 정보 API import

const WelfareItemRegistrationScreen = () => {
  const [image, setImage] = useState(null); // 업로드된 이미지 상태
  const [quantityOpen, setQuantityOpen] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [quantityItems, setQuantityItems] = useState([
    { label: "10개", value: "10" },
    { label: "20개", value: "20" },
    { label: "50개", value: "50" },
    { label: "100개", value: "100" },
  ]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusItems, setStatusItems] = useState([
    { label: "양호", value: "good" },
    { label: "불량", value: "bad" },
  ]);
  const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
  const [location, setLocation] = useState(null); // 현재 위치 상태
  const [isClockedIn, setIsClockedIn] = useState(false); // 출근 상태

  // 사진 업로드 핸들러
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 사용자 정보 가져오기
  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo(); // 사용자 정보 API 호출
      setUserInfo(data); // 사용자 정보 상태 업데이트
    } catch (error) {
      Alert.alert("오류", "사용자 정보를 가져오는 데 실패했습니다.");
    }
  };

  // 출근 상태 불러오기
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

      // 전체 주소 표시 (formattedAddress로 전체 주소 설정)
      setLocation(address[0].formattedAddress); // 전체 주소 표시
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  // 등록 버튼 핸들러
  const handleRegister = () => {
    if (!image || !quantity || !status) {
      Alert.alert("오류", "모든 필드를 채워주세요.");
      return;
    }

    Alert.alert("등록 완료", "복지 물품이 성공적으로 등록되었습니다.");
  };

  // 컴포넌트 마운트 시 사용자 정보 및 위치 가져오기
  useEffect(() => {
    fetchUserInfo(); // 사용자 정보 가져오기
    fetchLocation(); // 현재 위치 가져오기
    loadClockedInStatus(); // 출근 상태 불러오기
  }, []);

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>{location || "위치 정보 없음"}</Text>{" "}
        {/* 텍스트를 Text 컴포넌트로 감쌈 */}
        <Text style={styles.infoText}>
          {isClockedIn ? "근무 중이십니다." : "곧 출근하실 시간입니다."}
        </Text>
      </View>

      {/* 사진 업로드 */}
      <TouchableOpacity style={styles.imageUploadContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imageUploadText}>
            클릭해서 사진을 업로드 해주세요
          </Text>
        )}
      </TouchableOpacity>

      {/* 입력 필드 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="복지사 이름 (자동)"
          value={userInfo?.name || ""} // 사용자 정보에서 이름 자동 입력
          editable={false} // 자동 입력 필드
        />
        <TextInput
          style={styles.input}
          placeholder="복지 대상자 이름 (고정)"
          value="홍길동" // 복지 대상자 이름 고정
          editable={false} // 자동 입력 필드
        />
        <TextInput style={styles.input} placeholder="물품명을 적으세요" />

        {/* 수량 선택 */}
        <DropDownPicker
          open={quantityOpen}
          value={quantity}
          items={quantityItems}
          setOpen={setQuantityOpen}
          setValue={setQuantity}
          setItems={setQuantityItems}
          placeholder="수량 선택"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        {/* 상태 선택 */}
        <DropDownPicker
          open={statusOpen}
          value={status}
          items={statusItems}
          setOpen={setStatusOpen}
          setValue={setStatus}
          setItems={setStatusItems}
          placeholder="상태 선택"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      {/* 등록 버튼 */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>등록하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelfareItemRegistrationScreen;

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
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  imageUploadContainer: {
    height: 150,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 20,
  },
  imageUploadText: {
    color: "#aaa",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
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
