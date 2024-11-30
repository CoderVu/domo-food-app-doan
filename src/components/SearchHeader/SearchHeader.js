import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import { Feather, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { colors } from "../../theme/colors";

const ICON_SIZE = 25;

const SearchHeader = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (text) => {
    setQuery(text);
  };

  const handleSearchSubmit = () => {
    if (query.trim()) {
      console.log("Search query:", query);
      onSearch(query); // Gọi hàm tìm kiếm khi có query
    } else {
      setQuery(""); // Reset query khi không có nội dung
      console.log("Search query is empty, reset to empty string.");
      onSearch(""); // Xóa kết quả tìm kiếm khi query rỗng
    }
  };
  

  return (
    <View style={styles.header}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Feather name="search" color={colors.dark} size={ICON_SIZE} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            value={query}
            onChangeText={handleSearchChange} 
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
          <SimpleLineIcons name="microphone" color={colors.dark} size={ICON_SIZE} style={styles.icon} />
        </View>
      </View>
      <TouchableOpacity onPress={() => {}} style={styles.notifications}>
        <Ionicons
          name="notifications-outline"
          color={colors.primary}
          size={ICON_SIZE}
        />
      </TouchableOpacity>
    </View>
  );
};


export default SearchHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  icon: {
    marginHorizontal: 5,
  },
  notifications: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});