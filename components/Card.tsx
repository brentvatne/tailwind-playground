import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "./Themed";

export default function Card(props: any) {
  return (
    <View style={[styles.outer, props.style]}>
      <View style={styles.inner}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.6,
    elevation: 3,
  },
  inner: {
    borderRadius: 10,
    overflow: "hidden",
  },
});
