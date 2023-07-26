import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import checkinButton from "../components/checkinButton";
import { CheckinButtonData } from "../model/checkinButtonData";
import { saveItemsToStorage } from "../db/db_ops";

const ShortcutsScreen = (props) => {
  const [checkinButtons, setCheckinButtons] = useState([]);
  const { test, new_checkin } = useLocalSearchParams<{
    new_checkin: string;
    test: string;
  }>();

  useEffect(() => {
    console.log("new checkin button added: ", new_checkin);

    const deser: CheckinButtonData = JSON.parse(new_checkin)

    saveItemsToStorage(deser, "ijust")

    setCheckinButtons(prev => {
      return [...prev, deser]
    })
  }, [new_checkin]);

  const shortcuts = [
    { text: "Shortcut 1", color: "#FF6384" },
    {
      text: "Shortcut 2 is a super long text and it may go beyond what's defined for the size of the button. Shortcut 2 is a super long text and it may go beyond what's defined for the size of the button",
      color: "#36A2EB",
    },
    { text: "Shortcut 3", color: "#FFCE56" },
    { text: "Shortcut 4", color: "#FEC888" },
    { text: "Shortcut 1", color: "#FF6384" },
    { text: "Shortcut 2", color: "#36A2EB" },
    { text: "Shortcut 3", color: "#FFCE56" },
    { text: "Shortcut 4", color: "#FEC888" },
    { text: "Shortcut 1", color: "#FF6384" },
    { text: "Shortcut 2", color: "#36A2EB" },
    { text: "Shortcut 3", color: "#FFCE56" },
    { text: "Shortcut 4", color: "#FEC888" },
    { text: "Shortcut 1", color: "#FF6384" },
    { text: "Shortcut 2", color: "#36A2EB" },
    { text: "Shortcut 3", color: "#FFCE56" },
    // { text: "Shortcut 4", color: "#FEC888" },
    // Add more shortcuts as needed
  ];

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: "I just",
          headerRight: () => (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("add-checkin")}
            >
              {/* TODO change text color or use icon */}
              <Text>{"Add"}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        data={shortcuts}
        renderItem={checkinButton}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  addButton: {
    marginRight: 8,
  },
});

export default ShortcutsScreen;
