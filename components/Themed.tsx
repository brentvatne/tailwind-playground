import * as React from "react";
import {
  Text as DefaultText,
  View as DefaultView,
  ScrollView as DefaultScrollView,
} from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];
export type ScrollViewProps = ThemeProps & DefaultScrollView["props"];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export const ScrollView = React.forwardRef(
  (props: ScrollViewProps, ref: any) => {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor(
      { light: lightColor, dark: darkColor },
      "background"
    );

    return (
      <DefaultScrollView
        style={[{ backgroundColor }, style]}
        {...otherProps}
        ref={ref}
      />
    );
  }
);

export function Separator() {
  return (
    <View
      lightColor="#eee"
      darkColor="rgba(255, 255, 255, 0.12)"
      style={{
        marginHorizontal: 10,
        height: 1,
      }}
    />
  );
}