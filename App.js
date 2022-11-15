import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Linking from "expo-linking";
import ChooseAvatarScreen from "./scr/screens/ChooseAvatarScreen";
import { Provider as AuthProvider } from "./scr/context/AuthContext";
import { Provider as LessonProvider } from "./scr/context/LessonContext";
import { Provider as LiveSessionProvider } from "./scr/context/LiveSessionContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="ChooseAvatar"
            component={ChooseAvatarScreen}
            options={{ headerShown: false }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
