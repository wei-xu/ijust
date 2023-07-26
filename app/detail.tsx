import { View, Text } from "react-native";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import moment from "moment"

const DetailScreen = () => {
    const currentDs = moment().format("YYYY-MM-DD");
    const [selected, setSelected] = useState(currentDs);
    
  const markedDates = {
    // Marking the past 3 days
    "2023-07-14": { marked: true, dotColor: "red" },
    "2023-07-15": { marked: true, dotColor: "red" },
    "2023-07-16": { marked: true, dotColor: "red" },
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        markedDates={markedDates}
        // Add other props you may need
        enableSwipeMonths
        onDayPress={(day) => {
          console.log("selected day", day);
        }}
      />
    </View>
  );
};

export default DetailScreen;
