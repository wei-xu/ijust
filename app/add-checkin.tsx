import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import uuid from "react-native-uuid";
import { componentWidth } from "../config/layout";
import { BUTTON_VERSION } from "../config/setup";
import { CheckinButtonData } from "../model/checkinButtonData";
const AddCheckinButton = ({ route }) => {
  const [checkinText, setCheckinText] = React.useState("");

  console.log("route: ", route);
  const handleAddButton = () => {
    if (checkinText.trim() == "") {
      console.log("validate failed: empty content");
    } else {
      const newCheckinButton = {
        id: uuid.v4(),
        message: checkinText,
        created_at: Date.now(),
        version: BUTTON_VERSION,
        color: null,
      } as CheckinButtonData;
      const newCheckinButtonSer = JSON.stringify(newCheckinButton);

      router.push({
        pathname: "/",
        params: {
          typed_obj: "teststring",
          new_checkin_button: newCheckinButtonSer,
        },
      });
    }
  };

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
      <TouchableOpacity style={styles.addButton} onPress={handleAddButton}>
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
