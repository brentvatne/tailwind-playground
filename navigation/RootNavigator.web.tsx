import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "./types";
import { Text } from '../components/Themed';
import PressableOpacity from "../components/PressableOpacity";
import NotFoundScreen from "../screens/NotFoundScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import useColorScheme from "../hooks/useColorScheme";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerStyle: { borderBottomWidth: 0 },
          headerLeft: () => null,
          headerRight: () => (
            <PressableOpacity
              style={{
                marginRight: 30,
                marginTop: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() =>
                navigation.canGoBack()
                  ? navigation.goBack()
                  : navigation.replace("Root")
              }
            >
              <Ionicons
                size={25}
                name="ios-close"
                color={colorScheme === "dark" ? "#fff" : "#000"}
              />
              <Text style={{fontSize: 18}}>Close</Text>
            </PressableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
}
