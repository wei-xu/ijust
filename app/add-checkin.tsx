import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { componentWidth } from "../config/layout";
import { router, useNavigation } from "expo-router";
import CheckInButton from "../components/checkinButton";
import { CheckinButtonData } from "../model/checkinButtonData";
const AddCheckinButton = () => {
  const n = useNavigation();
  const [checkinText, setCheckinText] = React.useState("");

  return (
    <View>
      <TextInput
        style={styles.input}
        value={checkinText}
        autoComplete="off"
        onChangeText={(text) => {
          //   console.log("changing text: ", text);
          setCheckinText(text);
        }}
        textAlignVertical="bottom" // don't know what this does
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          router.push({
            pathname: "/",
            params: {
              test: "teststring",
              new_checkin: JSON.stringify({
                id: "1",
                message: "teststring",
                created_at: Date.now(),
                version: 1,
                color: null,
              } as CheckinButtonData),
            },
          })
        }
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 2,
    margin: 16,
    width: componentWidth,
    fontSize: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 16,
    padding: 16,
  },
  addButtonText: {
    textAlign: "center",
    fontSize: 18,
  },
  addButton: {
    padding: 16,
    margin: 16,
  },
});

export default AddCheckinButton;
