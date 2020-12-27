import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    initialRouteName: 'Root',
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: "home",
            },
          },
          Lists: {
            initialRouteName: 'ListsScreen',
            screens: {
              ListsScreen: "lists",
              ListScreen: "list/:id",
            },
          },
          Settings: {
            screens: {
              SettingsScreen: "settings",
            },
          },
        },
      },
      Notifications: "notifications",
      NotFound: "*",
    },
  },
};
