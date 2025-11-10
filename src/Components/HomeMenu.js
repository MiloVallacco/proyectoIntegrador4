import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import NuevoPost from "../Screens/NuevoPost";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

// crear el Tab Navigator una sola vez
const Tab = createBottomTabNavigator();

export default function HomeMenu() {

  // Importante: acá NO va <NavigationContainer>. Ya hay uno en App.js (solo puede haber uno en toda la app).

  return (
    <Tab.Navigator screenOptions={{ headerShown: false,}} > 
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: () => <FontAwesome5 name="home" size={24} /> }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <FontAwesome5 name="user" size={24} /> }} />
      <Tab.Screen name="Nuevo Post" component={NuevoPost} options={{ tabBarIcon: () => <FontAwesome5 name="plus-square" size={24} /> }} />
    </Tab.Navigator>
  );
}
