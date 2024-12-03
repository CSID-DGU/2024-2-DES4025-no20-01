import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SettingsScreen = () => {
  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "더미 대상자 A",
      profileImage: "https://via.placeholder.com/100", // 더미 이미지 URL
      description: "서울시 중구 필동3가",
    },
    {
      id: 2,
      name: "더미 대상자 B",
      profileImage: "https://via.placeholder.com/100", // 더미 이미지 URL
      description: "서울시 종로구 혜화동",
    },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>홍길동님</Text>

      {/* 연결된 복지 대상자 */}
      <Text style={styles.sectionTitle}>연결된 복지 대상자</Text>
      <FlatList
        data={subjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.profileCard}>
            <Image
              source={{ uri: item.profileImage }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{item.name}</Text>
              <Text style={styles.profileDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      {/* 복지 대상자 검색 버튼 */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="search-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>복지 대상자 검색</Text>
      </TouchableOpacity>

      {/* 이용자 유형 설정 버튼 */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="person-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>이용자 유형 변경</Text>
      </TouchableOpacity>

      {/* 복지 대상자 주소 등록 버튼 */}
      <TouchableOpacity style={styles.button}>
        <Ionicons name="location-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>복지 대상자 주소 등록</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  profileCard: {
    flexDirection: "row", // 이미지와 텍스트를 가로로 정렬
    alignItems: "center", // 세로 가운데 정렬
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
