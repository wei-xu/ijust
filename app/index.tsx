import { Stack, router, useLocalSearchParams, useNavigation } from "expo-router";
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
  saveItemsToStorageWithPrefix,
  
} from "../db/db_ops";
import { CheckinButtonData } from "../model/checkinButtonData";

const ShortcutsScreen = (props) => {
  const [checkinButtons, setCheckinButtons] = useState<CheckinButtonData[]>([]);

  const params = useLocalSearchParams<{
    new_checkin_button: string;
    typed_obj: string;
  }>();

  useEffect(() => {
    console.log("use effect getting executed");

    if (params?.new_checkin_button) {
      console.log("new button added");
      const newCheckinButton: CheckinButtonData = JSON.parse(
        params.new_checkin_button
      );

      saveItemsToStorageWithPrefix(newCheckinButton, `app-${APP_NAME}-buttons`, setCheckinButtons);
    } else {
      console.log("initializing screen");
      // initialize screen
      fetchAllItemsStartingWith<CheckinButtonData>(
        `app-${APP_NAME}-buttons`,
        setCheckinButtons
      );
    }
  }, [params?.new_checkin_button]);

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
