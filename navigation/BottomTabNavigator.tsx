import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Text, Platform } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ListsScreen from "../screens/ListsScreen";
import {
  BottomTabParamList,
  HomeParamList,
  SettingsParamList,
  ListsParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        labelPosition: "below-icon",
        style: {
          backgroundColor: Colors[colorScheme].tabBackground,
          ...(Platform.OS === "web"
            ? {
                borderTopWidth: 0,
                alignItems: "center",
                paddingBottom: 7,
                height: 55,
              }
            : null),
        },
        tabStyle: { paddingHorizontal: 24 },
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: ({ color }) => <TabBarLabel color={color} text="Home" />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "ios-home" : "ios-home-outline"}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Lists"
        component={ListsNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <TabBarLabel color={color} text="Lists" />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "ios-list" : "ios-list-outline"}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <TabBarLabel color={color} text="Settings" />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "ios-settings" : "ios-settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarLabel({ color, text }: { color: string; text: string }) {
  return <Text style={{ fontSize: 14, color, fontWeight: "600" }}>{text}</Text>;
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={19} {...props} style={{ marginTop: 3 }} />;
}

const defaultStackOptions: any = {
  headerStyle: { backgroundColor: Colors.any.navigationBar },
  headerTintColor: "#fff",
  headerTitleAlign: "center",
};

const HomeStack = createStackNavigator<HomeParamList>();
function HomeNavigator() {
  return (
    <HomeStack.Navigator screenOptions={defaultStackOptions}>
      <HomeStack.Screen
        name="HomeScreen"
        options={{ title: "Home" }}
        component={HomeScreen}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator<SettingsParamList>();
function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={defaultStackOptions}>
      <SettingsStack.Screen
        name="SettingsScreen"
        options={{ title: "Settings" }}
        component={SettingsScreen}
      />
    </SettingsStack.Navigator>
  );
}

const ListsStack = createStackNavigator<ListsParamList>();
function ListsNavigator() {
  return (
    <ListsStack.Navigator screenOptions={defaultStackOptions}>
      <ListsStack.Screen
        name="ListsScreen"
        options={{ title: "Lists" }}
        component={ListsScreen}
      />
    </ListsStack.Navigator>
  );
}
