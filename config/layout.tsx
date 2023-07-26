import { Dimensions } from "react-native";

export const screenWidth = Dimensions.get("window").width;
export const componentWidth = screenWidth - 32; // Subtract the desired horizontal padding