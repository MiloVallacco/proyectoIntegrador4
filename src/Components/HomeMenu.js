import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import NuevoPost from "../Screens/NuevoPost";

// crear el Tab Navigator una sola vez
const Tab = createBottomTabNavigator();

export default function HomeMenu() {

  // Importante: acá NO va <NavigationContainer>. Ya hay uno en App.js (solo puede haber uno en toda la app).

  return (
    <Tab.Navigator screenOptions={{ headerShown: false,}} > 
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Nuevo Post" component={NuevoPost} />
    </Tab.Navigator>
  );
}
