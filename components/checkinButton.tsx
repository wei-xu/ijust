import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { componentWidth } from "../config/layout";
import { APP_NAME } from "../config/setup";
import { saveItemsToStorageWithKey } from "../db/db_ops";
import { CheckinData } from "../model/checkinButtonData";

const renderCheckInButton = (item, setter) => {
  const checkinButton = item.item;

  function handleShortcutPress(shortcutText) {
    // Handle the shortcut press here
    // record the checkin activity
    console.log("Shortcut pressed:", shortcutText);

    // log check in time
    const checkinTime = Date.now();
    saveItemsToStorageWithKey(
      {
        id: checkinButton.id,
        checkin_timestamp: checkinTime,
      } as CheckinData,
      `app-${APP_NAME}-checkin-${checkinButton.id}-${checkinTime}`
    );
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
          // removeFromAsyncStorage(checkinButton.id, setter);
          router.push({
            pathname: "/detail",
            params: { id: checkinButton.id },
          });
        }}
      >
        {/* <MaterialCommunityIcons
          name="delete-forever-outline"
          size={24}
          color="black"
        /> */}
        <AntDesign name="calendar" size={24} color="black" />
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
