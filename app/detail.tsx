import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  fetchAllItemsStartingWith,
  removeFromAsyncStorage,
} from "../db/db_ops";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { APP_NAME } from "../config/setup";

const DetailScreen = (props) => {
  console.log("logging screen props, ", props);
  const params = useLocalSearchParams();
  console.log("params, ", params);
  const currentDs = moment().format("YYYY-MM-DD");
  const [selected, setSelected] = useState(currentDs);

  const [checkinActivities, setCheckinActivities] = useState([]);

  const checkinButtonId = params.id;

  useEffect(() => {
    fetchAllItemsStartingWith(
      `app-${APP_NAME}-checkin-${checkinButtonId}`,
      setCheckinActivities
    );
  }, []);

  console.log("checkin activities: ", checkinActivities);

  const markedDates = {
    // Marking the past 3 days
    "2023-07-14": { marked: true, dotColor: "red" },
    "2023-07-15": { marked: true, dotColor: "red" },
    "2023-07-16": { marked: true, dotColor: "red" },
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // todo: remove button and its activities
                  // removeFromAsyncStorage(checkinButtonId);
                  console.log("deleting(not implemented): ");
                }}
              >
                <MaterialCommunityIcons
                  name="delete-forever-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Calendar
        markedDates={markedDates}
        // Add other props you may need
        enableSwipeMonths
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
      />
      <Text>something below</Text>

    </View>
  );
};

export default DetailScreen;
