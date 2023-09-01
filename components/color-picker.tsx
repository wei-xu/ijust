import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const presetColors = [
  "#FF5733",
  "#FFC300",
  "#36D7B7",
  "#9B59B6",
  "#3498DB",
  "#E74C3C",
  "#2ECC71",
  "#F39C12",
  "#1ABC9C",
  "#8E44AD",
  "#E67E22",
  "#27AE60",
  "#D35400",
  "#16A085",
  "#C0392B",
  "#2980B9",
  "#2C3E50",
  "#F1C40F",
  "#7F8C8D",
  "#34495E",
];

const ColorPicker = ({ selectedColor, setSelectedColor }) => {

  const handleColorSelect = (color: string) => {
    console.log("color selected: ", color);
    setSelectedColor(color);
  };

  return (
    <View style={styles.colorPickerContainer}>
      {presetColors.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.colorItem,
            {
              backgroundColor: color,
              borderColor: color === selectedColor ? "black" : "transparent",
            },
          ]}
          onPress={() => handleColorSelect(color)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  colorPickerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  colorItem: {
    width: 25,
    height: 25,
    borderRadius: 25,
    margin: 5,
    borderWidth: 2,
  },
});

export default ColorPicker;
