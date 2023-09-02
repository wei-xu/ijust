import { Stack } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="add-checkin"
        options={{
          headerTitle: "Add New Button",
          headerBackTitle: "Back",
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          headerTitle: "Detail",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
