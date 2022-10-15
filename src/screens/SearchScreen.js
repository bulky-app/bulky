import {
  View,
  Text,
  FlatList,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "../globalStyles";
import React, { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import SearchBox from "../components/search/SearchBox";
import { ScrollView } from "react-native-gesture-handler";
import { InstantSearch } from "react-instantsearch-hooks";
import { ALGOLIA_ID, ALGOLIA_KEY } from "../../backend/env.vars";
import { InfiniteHits } from "../components/search/InfiniteList";

const searchClient = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY);

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Canned food",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Meat",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Dairy",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d78",
    title: "Starch food",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[localStyles.item, backgroundColor]}
  >
    <Text style={[localStyles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const SearchScreen = () => {
  const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#A020F0" : "#dcdcdc";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <SafeAreaView style={localStyles.container}>
      <InstantSearch searchClient={searchClient} indexName="bulky">
        <SearchBox />
        <InfiniteHits />
      </InstantSearch>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={localStyles.wrapper}
      >
        <View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={localStyles.chips}>
              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                alwaysBounceHorizontal={true}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    padding: styles.safeContainer.padding,
  },
  wrapper: {
    alignItems: "center",
  },
  chips: {
    borderRadius: 20,
  },
  item: {
    backgroundColor: "#dcdcdc",
    padding: 10,
    height: 40,
    borderRadius: 20,
    margin: 8,
    width: 100,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default SearchScreen;
