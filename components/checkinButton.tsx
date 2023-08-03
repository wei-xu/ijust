import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { componentWidth } from "../config/layout";
import { removeFromAsyncStorage } from "../db/db_ops";

const renderCheckInButton = (item, setter) => {
  const checkinButton = item.item;

  function handleShortcutPress(shortcutText) {
    // Handle the shortcut press here
    console.log("Shortcut pressed:", shortcutText);

    router.push("/detail");
  }

  return (
    <TouchableOpacity
      style={[
        styles.checkinButton,
        { backgroundColor: "orange", width: componentWidth }, // what if color is null
      ]}
      onPress={() => handleShortcutPress(checkinButton.message)}
    >
      <Text style={styles.checkinButtonText}>{checkinButton.message}</Text>

      <TouchableOpacity
        onPress={() => {
          console.log("delete checkinButton: ", checkinButton);
          removeFromAsyncStorage(checkinButton.id, setter);
        }}
      >
        <MaterialCommunityIcons
          name="delete-forever-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default renderCheckInButton;

const styles = StyleSheet.create({
  checkinButton: {
    // aspectRatio: 4,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 16,
    padding: 16,
    flexDirection: "row",
  },
  checkinButtonText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});
