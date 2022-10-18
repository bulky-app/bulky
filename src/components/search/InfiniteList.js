import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { SearchProduct } from "../Product";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, FlatList } from "react-native";
import { useInfiniteHits } from "react-instantsearch-hooks";
import { TouchableOpacity } from "react-native-gesture-handler";

export function InfiniteHits({ ...props }) {
  const nav = useNavigation();
  const listRef = useRef(null);
  const dispatch = useDispatch();

  const { hits, isLastPage, showMore } = useInfiniteHits(props);
  function scrollToTop() {
    listRef.current?.scrollToOffset({ animated: true, offset: 0 });
  }

  return (
    <FlatList
      data={hits}
      numColumns={2}
      style={{ alignSelf: "center" }}
      keyExtractor={(item) => item.objectID}
      renderItem={(item) => SearchProduct(item, dispatch, nav)}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={() => {
        if (!isLastPage) {
          showMore();
        }
      }}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={
        <TouchableOpacity
          onPress={() => scrollToTop()}
          style={{ marginBottom: 50 }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  item: {
    padding: 18,
  },
});
