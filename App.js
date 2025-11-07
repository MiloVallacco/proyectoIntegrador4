import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/Screens/Register";
import Login from "./src/Screens/Login";
import HomeMenu from "./src/Components/HomeMenu"; // <- importa las Tabs

const Stack = createNativeStackNavigator(); // <- crea el Stack

export default function App() {
  return (
    <NavigationContainer>  
      <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="HomeMenu" component={HomeMenu} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
