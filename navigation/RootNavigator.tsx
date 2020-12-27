import * as React from "react";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";

import { RootStackParamList } from "../types";
import NotFoundScreen from "../screens/NotFoundScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import BottomTabNavigator from "./BottomTabNavigator";

enableScreens();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Root"
      screenOptions={{ headerShown: false, stackPresentation: "modal" }}
    >
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
