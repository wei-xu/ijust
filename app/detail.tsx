import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, router, useLocalSearchParams } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { APP_NAME } from "../config/setup";
import {
  fetchAllItemsStartingWith,
  removeAllFromAsyncStorageWithPrefix,
  removeItemFromAsyncStorage,
} from "../db/db_ops";
import { CheckinData } from "../model/checkinButtonData";

const DetailScreen = (props) => {
  console.log("logging screen props, ", props);
  const params = useLocalSearchParams();
  const [markedDates, setMarkedDates] = useState({});

  const [checkinActivities, setCheckinActivities] = useState<CheckinData[]>([]);

  const checkinButtonId = params.id;

  useEffect(() => {
    const activities = fetchAllItemsStartingWith<CheckinData>(
      `checkin-${checkinButtonId}`
    );

    activities.then((res) => {
      // sort the res by timestamp in descending order
      res.sort((a, b) => {
        return b.checkin_timestamp - a.checkin_timestamp;
      });

      setCheckinActivities(res);

      // truncate the res to date level
      const truncatedDates = res.map((item) => {
        return moment(item.checkin_timestamp).format("YYYY-MM-DD");
      });

      // convert truncated dates to object in this format { "date": { marked: true } }
      const uniqueDates = truncatedDates.reduce((acc, cur) => {
        acc[cur] = { marked: true, dotColor: "red" };
        return acc;
      }, {});

      setMarkedDates(uniqueDates);
    });
  }, []);

  const handleDeleteButton = async () => {
    console.log("deleting button");
    // remove the activities from storage
    await removeAllFromAsyncStorageWithPrefix(
      `checkin-${checkinButtonId}`
    );

    // remove the buttons from storage
    // removeItemFromAsyncStorage(`buttons-${checkinButtonId}`);
    await removeAllFromAsyncStorageWithPrefix(`buttons-${checkinButtonId}`);
    
    console.log("deleted the button");

    router.push({
      pathname: "/",
      params: {
        button_deleted: true,
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <Pressable onPress={handleDeleteButton}>
                <MaterialCommunityIcons
                  name="delete-forever-outline"
                  size={24}
                  color="black"
                />
              </Pressable>
            );
          },
        }}
      />
      <Calendar
        markedDates={markedDates}
        // Add other props you may need
        enableSwipeMonths={true}
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
      />

      <FlatList
        data={checkinActivities}
        renderItem={(item) => {
          return (
            <View style={styles.activity}>
              <Text style={styles.text}>
                checked in {moment(item.item.checkin_timestamp).fromNow()}
              </Text>
            </View>
          );
        }}
        keyExtractor={(item) => `item.id-${item.checkin_timestamp}`}
        contentContainerStyle={styles.container}
        ListEmptyComponent={() => (
          <View>
            <Text>No activities found</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    marginLeft: 8,
    marginRight: 8,
    fontSize: 16,
    alignItems: "center",
  },
  activity: {
    // justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 8,
    minHeight: 48,
    justifyContent: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "grey",
  },
});

export default DetailScreen;
