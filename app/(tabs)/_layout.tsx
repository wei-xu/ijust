import { Tabs } from "expo-router";
import React from "react";
import {
  TabDiscoverIcon,
  TabHomeIcon,
  TabProfileIcon,
} from "../../components/tab-icons";

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: TabHomeIcon,
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: TabDiscoverIcon,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: TabProfileIcon,
        }}
      />
    </Tabs>
  );
};

export default Layout;
