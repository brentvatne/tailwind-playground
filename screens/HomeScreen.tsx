import * as React from "react";
import { Image } from "react-native";
import { style } from "tailwind-react-native";

import { ScrollView, Text, View } from "../components/Themed";
import { useHomeItems } from "../store";
import Card from "../components/Card";

function HomeCard({ item }: { item: ReturnType<typeof useHomeItems>[0] }) {
  return (
    <Card style={style("m-2 resize-contain")}>
      <Image
        source={{ uri: item.image }}
        style={{ height: 140, width: "100%" }}
      />
      <View
        style={style(["pl-5", "pt-5", "pr-5", "pb-4"])}
        darkColor="rgb(15, 15, 15)"
      >
        <Text
          style={style(["text-lg", "font-bold", "text-gray-400", "uppercase"])}
        >
          {item.type}
        </Text>
        <Text style={style(["font-bold", "text-2xl"])}>{item.title}</Text>
        <Text style={style(["text-sm", "text-gray-500", "my-2"])}>
          {item.text}
        </Text>
      </View>
    </Card>
  );
}

export default function HomeScreen() {
  const homeItems = useHomeItems();

  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      hasLargeTitle
      contentContainerStyle={style(["items-center", "pt-1", "pb-2"])}
    >
      <View style={[style("w-full"), { maxWidth: 700 }]}>
        {homeItems.map((item: any) => (
          <HomeCard item={item} key={item.title} />
        ))}
      </View>
    </ScrollView>
  );
}
