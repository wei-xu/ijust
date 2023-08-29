import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { componentWidth } from "../config/layout";
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
    <View>
      <Pressable
        style={[
          styles.checkinButton,
          {
            backgroundColor:
              checkinButton.color == null ? "orange" : checkinButton.color,
            width: componentWidth,
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

        <Pressable
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
      </Pressable>
      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.noteInput}
          value={checkinText}
          autoComplete="off"
          onChangeText={(text) => {
            console.log("changing text: ", text);
            setCheckinText(text);
          }}
        />
        <Button title="OK" onPress={() => setIsCheckingIn(false)} />
      </View> */}
    </View>
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
    flexDirection: "row",
  },
  checkinButtonText: {
    fontSize: 18,
    // color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  checkinButtonContent: {
    flex: 1,
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "center",
  },
  noteInput: {
    fontSize: 16,
    color: "grey",
    textAlign: "center",
    flex: 1,
    borderColor: "black",
  },
  inputView: {
    flexDirection: "row",
  },
});
