import * as React from "react";
import { Pressable } from "react-native";

function withPressEffect(styles?: any) {
  const mergedStyles = { cursor: "pointer", ...styles };
  return ({ pressed }: { pressed: boolean }) =>
    pressed ? { opacity: 0.5, ...mergedStyles } : mergedStyles;
}

export default function PressableOpacity(
  props: React.ComponentProps<typeof Pressable>
) {
  return (
    <Pressable onPress={props.onPress} style={withPressEffect(props.style)}>
      {props.children}
    </Pressable>
  );
}
