import * as React from "react";
import { FlatList, Platform, Image } from "react-native";
import { style } from "tailwind-react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { Text, ScrollView, View } from "../components/Themed";
import Faces from "../constants/Faces";

const data = Array(1000).fill(0);

export default function NotificationsScreen() {
  const renderItem = React.useCallback(
    ({ index }) => <ListRow index={index} />,
    []
  );

  return (
    <>
      <FlatList
        ListHeaderComponent={ListHeader}
        renderScrollComponent={(props) => (
          <ScrollView
            {...props}
            contentContainerStyle={{
              paddingTop: Platform.select({
                ios: 30,
                android: 40,
                default: 0,
              }),
            }}
          />
        )}
        windowSize={Platform.OS === "web" ? 200 : 50}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(_item, index) => index.toString()}
        data={data}
        style={{ flex: 1 }}
      />
      <StatusBar style="light" />
    </>
  );
}

function ListHeader() {
  if (Platform.OS === "web") {
    return <View />;
  }

  return <Text style={style(["text-2xl", "ml-4", "mb-2"])}>Notifications</Text>;
}

function ListRow(props: { index: number }) {
  return (
    <View
      style={style([
        "flex-1",
        "ml-4",
        "mr-4",
        "pt-3",
        "pb-3",
        "flex-row",
        "items-center",
      ])}
    >
      <Image
        source={Faces[(props.index % 66) + 1]}
        style={{
          marginRight: 15,
          width: 36,
          height: 36,
          borderRadius: 18,
          resizeMode: "contain",
        }}
      />
      <Text style={{ fontSize: 16 }}>You have a new friend request</Text>
      <View
        style={style(["flex-1", "flex-row", "justify-end", "items-center"])}
      >
        <Ionicons name="checkmark" size={20} color="green" />
        <View style={{ marginLeft: 5 }} />
        <Ionicons name="close-outline" size={20} color="red" />
      </View>
    </View>
  );
}
