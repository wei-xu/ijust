import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { saveItemsToStorageWithKey } from "../db/db_ops";
import { CheckinButtonData, CheckinData } from "../model/checkinButtonData";

const CheckInButton = ({ item, drag, isActive }) => {
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  const checkinButton = item as CheckinButtonData;

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

  function handleCheckinPress(shortcutText) {
    // Handle the shortcut press here
    // record the checkin activity
    console.log("Shortcut pressed:", shortcutText);

    if (isCheckingIn) {
      return;
    }

    setIsCheckingIn(true);
    // log check in time
    const checkinTime = Date.now();
    saveItemsToStorageWithKey(
      {
        id: checkinButton.id,
        checkin_timestamp: checkinTime,
      } as CheckinData,
      `checkin-${checkinButton.id}-${checkinTime}`
    );

    // maintain isCheckingIn state for 5 second
    setTimeout(() => {
      setIsCheckingIn(false);
    }, 5000);
  }

  return (
    <View style={styles.listItemContainer}>
      <Pressable
        style={[
          styles.checkinButtonContainer,
          {
            backgroundColor:
              checkinButton.color == null ? "orange" : checkinButton.color,
            // width: componentWidth,
          },
        ]}
        onLongPress={drag}
        onPress={() => handleCheckinPress(checkinButton.message)}
        disabled={isCheckingIn || isActive}
      >
        <View style={styles.checkinButtonContent}>
          {isCheckingIn ? (
            <Feather name="check-circle" size={24} color="black" />
          ) : (
            <Text
              style={[
                styles.checkinButtonText,
                { color: getTextColor(checkinButton.color) },
              ]}
            >
              {checkinButton.message}
            </Text>
          )}
        </View>
      </Pressable>
      <Pressable
      style={styles.calenderIcon}
        onPress={() => {
          // removeFromAsyncStorage(checkinButton.id, setter);
          router.push({
            pathname: "/detail",
            params: { id: checkinButton.id },
          });
        }}
      >
        <AntDesign name="calendar" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default CheckInButton;

const styles = StyleSheet.create({
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkinButtonContainer: {
    // aspectRatio: 4,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginVertical: 8,
    padding: 16,
    flexDirection: "row",
    flex: 1,
  },
  checkinButtonContent: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    minHeight: 24,
  },
  checkinButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  calenderIcon: {
    marginLeft: 8,
    alignContent: "center",
  },
});
