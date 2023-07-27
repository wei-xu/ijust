import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { componentWidth } from "../config/layout";

const CheckInButton = ({ item }) => {
  const router = useRouter();

  const handleShortcutPress = (shortcutText) => {
    // Handle the shortcut press here
    console.log("Shortcut pressed:", shortcutText);
    router.push("/detail");
  };

  return (
    <TouchableOpacity
      style={[
        styles.checkinButton,
        { backgroundColor: item.color, width: componentWidth }, // what if color is null
      ]}
      onPress={() => handleShortcutPress(item.text)}
    >
      <Text style={styles.checkinButtonText}>{item.text}</Text>
    </TouchableOpacity>
  );
};

export default CheckInButton;

const styles = StyleSheet.create({
  checkinButton: {
    // aspectRatio: 4,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 16,
    padding: 16,
  },
  checkinButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
