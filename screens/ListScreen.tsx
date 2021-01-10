import * as React from "react";
import { FlatList, Pressable } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { style } from "tailwind-react-native";

import { Text, ScrollView, Separator, View } from "../components/Themed";
import Checkbox from "../components/Checkbox";
import { ListsParamList } from "../navigation/types";
import { useList, setDone } from "../store";

type Props = StackScreenProps<ListsParamList, "ListScreen">;

export default function ListScreen(props: Props) {
  const list = useList(props.route.params.id);

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      title: list!.name,
    });
  }, [list]);

  const renderItem = React.useCallback(
    ({ item }) => <ListRow item={item} list={list} />,
    [props.navigation, list]
  );

  return (
    <FlatList
      renderScrollComponent={(props) => <ScrollView hasLargeTitle {...props} />}
      renderItem={renderItem}
      ItemSeparatorComponent={Separator}
      data={list!.items}
      keyExtractor={(item) => item.name}
      style={{ flex: 1 }}
    />
  );
}

function ListRow(props: { item: { name: string; done: boolean }; list: any }) {
  return (
    <Pressable
      // @ts-expect-error: cursor pointer complaints due to react-native types
      style={{ cursor: "pointer" }}
      onPress={() => {
        setDone(props.list, props.item, !props.item.done);
      }}
    >
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
        <Text style={style(["text-lg"])}>{props.item.name}</Text>
        <Checkbox
          color={props.item.done ? "green" : undefined}
          value={props.item.done}
          onValueChange={(value) => setDone(props.list, props.item, value)}
        />
      </View>
    </Pressable>
  );
}
