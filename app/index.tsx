import {
  Stack,
  router,
  useLocalSearchParams
} from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CheckinButton from "../components/CheckinButton";
import {
  fetchAllItemsStartingWith,
  removeAllFromAsyncStorage,
  saveItemsToStorageWithKey
} from "../db/db_ops";
import { CheckinButtonData } from "../model/checkinButtonData";

const ShortcutsScreen = (props) => {
  console.log("logging screen props, ", props);
    const [checkinButtons, setCheckinButtons] = useState<CheckinButtonData[]>([]);

  const params = useLocalSearchParams<{
    new_checkin_button: string;
    button_deleted: string;
  }>();

  useEffect(() => {
    console.log("use effect getting executed");

    if (params?.new_checkin_button) {
      const newCheckinButton: CheckinButtonData = JSON.parse(
        params.new_checkin_button
      );

      // todo remove setCheckinButtons logic out of this function
      saveItemsToStorageWithKey(
        newCheckinButton,
        `buttons-${newCheckinButton.id}`,
        setCheckinButtons
      );
    } else {
      console.log("initializing screen");
      // initialize screen
      fetchAllItemsStartingWith<CheckinButtonData>(
        `buttons`,
        setCheckinButtons
      );
    }
  }, [params?.new_checkin_button, params?.button_deleted]);

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
        renderItem={(item) => <CheckinButton item={item} />}
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
