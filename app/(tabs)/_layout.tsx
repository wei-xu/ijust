import { Tabs } from 'expo-router'
import React from 'react'

const Layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="discover" />
        <Tabs.Screen name="profile" />
    </Tabs>
  )
}

export default Layout