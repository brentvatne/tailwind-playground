import * as React from "react";
import { FlatList, Pressable } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { style } from "tailwind-react-native";

import { Text, ScrollView, Separator, View } from "../components/Themed";
import { ListsParamList } from "../navigation/types";
import { useLists } from "../store";

type Props = StackScreenProps<ListsParamList, "ListsScreen">;

export default function ListsScreen(props: Props) {
  const lists = useLists();
  const renderItem = React.useCallback(
    ({ item }) => <ListRow item={item} navigation={props.navigation} />,
    [props.navigation]
  );

  return (
    <FlatList
      renderScrollComponent={(props) => <ScrollView {...props} />}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      data={lists}
      style={{ flex: 1 }}
    />
  );
}

function ListRow(props: {
  item: { name: string; id: string; items: string[] };
  navigation: Props["navigation"];
}) {
  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        cursor: "pointer",
      })}
      onPress={() =>
        props.navigation.navigate("ListScreen", { id: props.item.id })
      }
    >
      <View style={style(["flex-1", "ml-4", "mr-4", "pt-5", "pb-5"])}>
        <Text style={style("text-lg")}>{props.item.name}</Text>
      </View>
    </Pressable>
  );
}
