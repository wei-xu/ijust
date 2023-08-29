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
import CheckinButton from "../components/CheckinButton";
import {
  fetchAllItemsStartingWith,
  removeAllFromAsyncStorage,
  saveItemsToStorageWithKey,
} from "../db/db_ops";
import { CheckinButtonData } from "../model/checkinButtonData";
import DraggableFlatList from "react-native-draggable-flatlist";

const ShortcutsScreen = (props) => {
  console.log("logging screen props, ", props);
  const [checkinButtons, setCheckinButtons] = useState<CheckinButtonData[]>([]);

  // store the ids of the checkin buttons of the latest order
  const [orderedButtonList, setOrderedButtonList] = useState([]);

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

  useEffect(() => {
    console.log("saving updated check in button list into storage");
  }, [checkinButtons]);

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
      <DraggableFlatList
        data={checkinButtons}
        renderItem={({ item, drag, isActive }) => (
          <CheckinButton item={item} drag={drag} isActive={isActive} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        onDragEnd={({ data }) => setCheckinButtons(data)}
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
