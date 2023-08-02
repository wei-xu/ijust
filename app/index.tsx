import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import renderCheckInButton from "../components/checkinButton";
import { APP_NAME } from "../config/setup";
import {
  fetchAllItemsStartingWith,
  removeAllFromAsyncStorage,
  saveItemsToStorage,
} from "../db/db_ops";
import { CheckinButtonData } from "../model/checkinButtonData";

const ShortcutsScreen = (props) => {
  const [checkinButtons, setCheckinButtons] = useState<CheckinButtonData[]>([]);
  const { new_checkin_button } = useLocalSearchParams<{
    new_checkin_button: string;
    typed_obj: string;
  }>();

  useEffect(() => {
    console.log("use effect getting executed");
    console.log("new_checking_button: ", new_checkin_button)
    fetchAllItemsStartingWith<CheckinButtonData>(
      `app-${APP_NAME}`,
      setCheckinButtons
    );
  }, [new_checkin_button]);

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
          headerLeft: () => (
            <Button title="Delete All" onPress={removeAllFromAsyncStorage} />
          ),
        }}
      />
      <FlatList
        data={checkinButtons}
        renderItem={(item) => renderCheckInButton(item, setCheckinButtons)}
        keyExtractor={(item) => item.id}
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
