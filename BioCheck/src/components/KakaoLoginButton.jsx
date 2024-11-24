import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function KakaoLoginButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>카카오 로그인</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 300, // 로고 너비
    height: 50, // 로고 높이
    backgroundColor: "#FEE500", // 카카오 노란색
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3, // Android에서 그림자
  },
  text: {
    color: "#3C1E1E", // 카카오 브라운색
    fontSize: 16,
    fontWeight: "bold",
  },
});
