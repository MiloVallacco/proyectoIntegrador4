import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import HomeMenu from "./src/components/HomeMenu"; // <- importa las Tabs

const Stack = createNativeStackNavigator(); // <- crea el Stack

export default function App() {
  return (
    <NavigationContainer>  
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeMenu" component={HomeMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
