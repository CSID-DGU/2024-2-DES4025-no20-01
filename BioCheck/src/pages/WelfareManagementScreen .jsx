import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

const WelfareManagementScreen = () => {
  const [open, setOpen] = useState(false); // 드롭다운 열기 상태
  const [value, setValue] = useState(null); // 선택된 값
  const [items, setItems] = useState([
    { label: "복지대상자 A", value: "A" },
    { label: "복지대상자 B", value: "B" },
    { label: "복지대상자 C", value: "C" },
    { label: "복지대상자 D", value: "D" },
  ]);

  return (
    <View style={styles.container}>
      {/* 프로필 정보 */}
      <View style={styles.profileContainer}>
        <Ionicons name="person-circle-outline" size={80} color="gray" />
        <Text style={styles.addressText}>서울시 중구 필동3가</Text>
        <Text style={styles.timeText}>출근 시간 09:00</Text>
      </View>

      {/* 복지 대상자 선택 */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>복지 대상자 선택</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="복지대상자 A"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
        />
      </View>

      {/* 추가 및 삭제 버튼 */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle-outline" size={24} color="orange" />
        <Text style={styles.addButtonText}>복지대상자 추가 및 삭제</Text>
      </TouchableOpacity>

      {/* 확인 버튼 */}
      <Button
        mode="contained"
        buttonColor="green"
        textColor="white"
        style={styles.confirmButton}
        onPress={() => console.log("확인 버튼 클릭됨")}
      >
        확인
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  addressText: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdown: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 50,
  },
  dropdownList: {
    borderColor: "#ccc",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    marginBottom: 30,
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 16,
    color: "orange",
    marginLeft: 10,
  },
  confirmButton: {
    marginTop: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default WelfareManagementScreen;
