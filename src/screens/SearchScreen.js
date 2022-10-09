import React, { useState } from "react";
import {
  View,
  Text,
  SectionList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
  Pressable,
 FlatList
} from "react-native";
import { SearchBar } from "@rneui/base";

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
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);
export default function SearchScreen() {
  const [searchBar, setSearchBar] = useState("");
  //const onChangeSearch = (query) => setSearchBar(query);
    const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#A020F0" : "#dcdcdc";
    const color = item.id === selectedId ? 'white' : 'black';


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
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <SearchBar
              placeholder="Search"
              lightTheme
              round
              value={searchBar}
              onChangeText={setSearchBar}
              
            />
            <View><Text style={styles.output}>{searchBar}</Text></View>
            <View>
               <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#dcdcdc",
    padding: 20,
    borderRadius: 2000,
    margin: 8,
  },

  title: {
    fontSize: 10,
  },
  output:{
    padding :5,
    backgroundColor: " #C5C6D0",
    marginTop:4,
  }
});

