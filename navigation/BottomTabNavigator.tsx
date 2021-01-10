import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import createNativeStackNavigator from "./createNativeStackNavigator";
import * as React from "react";
import { Image, Text, Platform, View } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import PressableOpacity from "../components/PressableOpacity";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ListsScreen from "../screens/ListsScreen";
import ListScreen from "../screens/ListScreen";
import {
  BottomTabParamList,
  HomeParamList,
  SettingsParamList,
  ListsParamList,
} from "./types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tint,
        labelPosition: "below-icon",
        ...Platform.select({
          web: {
            style: {
              backgroundColor: Colors[colorScheme].tabBackground,
              borderTopWidth: 0,
              alignItems: "center",
              paddingBottom: 7,
              height: 55,
            },
            tabStyle: { paddingHorizontal: 28, flex: 0 },
          },
          default: {
            style: {
              backgroundColor: Colors[colorScheme].tabBackground,
            },
          },
        }),
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: ({ color }) => <TabBarLabel color={color} text="Feed" />,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "ios-flash" : "ios-flash-outline"}
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

const TIM_COOK_PNG =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

function HeaderRight({ navigation }: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginRight: Platform.OS === "web" ? 15 : 0,
        alignItems: "center",
      }}
    >
      <PressableOpacity onPress={() => navigation.navigate("Notifications")}>
        <Ionicons
          size={24}
          color={Colors.dark.tabIconDefault}
          name="ios-notifications-outline"
        />
      </PressableOpacity>
      <View style={{ marginLeft: 20 }} />
      <PressableOpacity onPress={() => {}}>
        <Image
          source={{ uri: TIM_COOK_PNG }}
          style={{
            ...Platform.select({
              web: {
                width: 32,
                height: 32,
                borderRadius: 16,
              },
              default: {
                width: 26,
                height: 26,
                borderRadius: 13,
              },
            }),
            backgroundColor: "#eee",
          }}
        />
      </PressableOpacity>
    </View>
  );
}

const defaultStackOptions: any = ({ navigation }: any) => ({
  headerLargeTitle: true,
  stackAnimation: Platform.OS === "android" ? "none" : "default",
  headerRight: () => <HeaderRight navigation={navigation} />,
});

const HomeStack = createNativeStackNavigator<HomeParamList>();
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

const SettingsStack = createNativeStackNavigator<SettingsParamList>();
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

const ListsStack = createNativeStackNavigator<ListsParamList>();
function ListsNavigator() {
  return (
    <ListsStack.Navigator screenOptions={defaultStackOptions}>
      <ListsStack.Screen
        name="ListsScreen"
        options={{ title: "Lists" }}
        component={ListsScreen}
      />
      <ListsStack.Screen
        name="ListScreen"
        options={{ title: "List", headerRight: () => null }}
        component={ListScreen}
      />
    </ListsStack.Navigator>
  );
}
