import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const WelfareRegistrationScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false); // 드롭다운 열림 여부
  const [value, setValue] = useState([]); // 선택된 값
  const [items, setItems] = useState([
    { label: "복지대상자1", value: "welfare1" },
    { label: "복지대상자2", value: "welfare2" },
    { label: "복지대상자3", value: "welfare3" },
    { label: "Option 4", value: "welfare4" },
    { label: "Option 5", value: "welfare5" },
  ]);

  const removeSelectedItem = (item) => {
    setValue(value.filter((selected) => selected !== item));
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerText}>복지대상자 등록</Text>
      </View>

      {/* 안내 메시지 */}
      <Text style={styles.infoText}>최초 로그인 시 등록 필요</Text>
      <Text style={styles.subInfoText}>복지 대상자분을 등록해주세요</Text>

      {/* 드롭다운 */}
      <DropDownPicker
        multiple={true} // 다중 선택 가능
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="복지 대상자 검색"
        searchable={true} // 검색 기능 활성화
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* 선택된 항목 */}
      <View style={styles.selectedContainer}>
        {value.map((selected, index) => (
          <TouchableOpacity
            key={index}
            style={styles.selectedItem}
            onPress={() => removeSelectedItem(selected)}
          >
            <Text style={styles.selectedText}>
              {items.find((item) => item.value === selected)?.label}
            </Text>
            <Text style={styles.removeText}>X</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 등록 버튼 */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("AttendanceScreen")}
      >
        <Text style={styles.registerButtonText}>등록하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelfareRegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#555",
  },
  subInfoText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#777",
  },
  dropdown: {
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  dropdownContainer: {
    borderColor: "#ddd",
  },
  selectedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  selectedItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
  },
  selectedText: {
    fontSize: 14,
    color: "#333",
  },
  removeText: {
    marginLeft: 10,
    fontSize: 14,
    color: "red",
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: "#007bff",
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
