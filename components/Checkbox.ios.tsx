import * as React from "react";
import { Ionicons } from "@expo/vector-icons";
import { style } from "tailwind-react-native";
import { View } from "react-native";

import PressableOpacity from "./PressableOpacity";

type Props = {
  style: any;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  color?: string;
};

// Just some lame placeholder for a checkbox on iOS
export default function Checkbox(props: Props) {
  return (
    <PressableOpacity
      onPress={
        props.onValueChange
          ? () => props.onValueChange(!props.value)
          : undefined
      }
      hitSlop={{ top: 32, bottom: 32, left: 32, right: 32 }}
    >
      <View
        style={{
          ...style(["items-center", "justify-center"]),
          ...(props.value ? { backgroundColor: "green" } : undefined),
          borderWidth: 1,
          borderRadius: 3,
          borderColor: "#888",
          width: 20,
          height: 20,
        }}
      >
        {props.value ? (
          <Ionicons
            name="ios-checkmark"
            size={20}
            color="#fff"
            style={{ marginTop: -2 }}
          />
        ) : null}
      </View>
    </PressableOpacity>
  );
}
