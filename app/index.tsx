import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import CheckinButton from "../components/CheckinButton";
import {
  fetchAllItemsFromStorageWithKeys,
  fetchItemFromStorage,
  removeAllFromAsyncStorage,
  saveItemsToStorageWithKey,
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

    const initializeButtons = async () => {
      const orderedIds = await fetchItemFromStorage<string[]>(
        "main-screen-ordered-button-id-list"
      );

      if (orderedIds == null) {
        console.log("no buttons found");
        return;
      }

      const buttons = await fetchAllItemsFromStorageWithKeys<CheckinButtonData>(
        orderedIds.map((id) => `buttons-${id}`)
      );

      setCheckinButtons(buttons);
    };

    const handleNewButton = async (newCheckinButton: CheckinButtonData) => {
      const saveItemSuccess = await saveItemsToStorageWithKey(
        newCheckinButton,
        `buttons-${newCheckinButton.id}`
      );
      // todo what if save item to storage failed?

      // add the new button to the top of the list
      // and save the ordered button list into storage

      const saveOrderButtonIdListSuccess = await saveItemsToStorageWithKey(
        [newCheckinButton.id, ...checkinButtons.map((item) => item.id)],
        "main-screen-ordered-button-id-list",
        "overwrite"
      );

      if (saveItemSuccess && saveOrderButtonIdListSuccess) {
        setCheckinButtons((prev) => {
          return [newCheckinButton, ...prev];
        });
      } else {
        console.log("failed to save new button to storage");
      }
    };

    if (params?.new_checkin_button) {
      const newCheckinButton: CheckinButtonData = JSON.parse(
        params.new_checkin_button
      );
      handleNewButton(newCheckinButton);
    } else {
      console.log("initializing screen");

      initializeButtons();
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
      <DraggableFlatList
        data={checkinButtons}
        renderItem={({ item, drag, isActive }) => (
          <CheckinButton item={item} drag={drag} isActive={isActive} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
        onDragEnd={({ data }) => {
          setCheckinButtons(data);
          saveItemsToStorageWithKey(
            data.map((item) => item.id),
            "main-screen-ordered-button-id-list",
            "overwrite"
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  addButton: {
    marginRight: 8,
  },
});

export default ShortcutsScreen;
