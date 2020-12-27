import * as React from "react";
import { Switch } from "react-native";
import { ScrollView, Text, View } from "../components/Themed";

import { style } from "tailwind-react-native";
import { useSettings } from "../store";

export default function ListScreen() {
  const [settings, setSettings] = useSettings();

  if (!settings) {
    return <View />;
  }

  return (
    <ScrollView>
      <View
        style={style([
          "flex-1",
          "ml-4",
          "mr-4",
          "pt-5",
          "pb-5",
          "flex-row",
          "justify-between",
          "items-center",
        ])}
      >
        <Text style={style(["text-lg"])}>Enable Notifications</Text>
        <Switch
          value={settings.enableNotifications}
          onValueChange={() =>
            setSettings({
              ...settings,
              enableNotifications: !settings.enableNotifications,
            })
          }
        />
      </View>
    </ScrollView>
  );
}
