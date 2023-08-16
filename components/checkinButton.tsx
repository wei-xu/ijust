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

  /**
   *
   * @param backgroundColor input color in hex format
   * @returns
   */
  const getTextColor = (backgroundColor: string) => {
    if (backgroundColor == null) {
      return "black";
    }
    // Convert the hexadecimal color to RGB components
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);

    // Calculate the brightness using the YIQ formula
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Determine the appropriate text color based on brightness
    return brightness >= 128 ? "black" : "white";
  };

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
        {
          backgroundColor: checkinButton.color == null ? "orange" : checkinButton.color,
          width: componentWidth,
        }, // what if color is null
      ]}
      onPress={() => handleShortcutPress(checkinButton.message)}
    >
      <Text
        style={[styles.checkinButtonText, { color: getTextColor(checkinButton.color) }]}
      >
        {checkinButton.message}
      </Text>

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
    // color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
});
