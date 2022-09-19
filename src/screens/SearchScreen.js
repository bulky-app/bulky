import React,{useState} from 'react';
import { View, Text, SectionList,StatusBar,StyleSheet, SafeAreaView,KeyboardAvoidingView,
TouchableWithoutFeedback,Keyboard, TouchableOpacity,Platform} from 'react-native';
import {SearchBar} from"react-native-elements";

const DATA = [
  {
    title: "Search by Category :",
    data: ["Canned food", "Meat", "Dairy", "Starch food"]
  },
  
];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
export default function SearchScreen() {
  const[searchBar, setSearchBar]=useState('');
  const onChangeSearch = query => setSearchBar(query);
  return (
    <SafeAreaView>
       <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View >
      <SearchBar
      placeholder="Search"
      lightTheme
      round
      onChangeText={onChangeSearch}
      value={searchBar}
      /><View>
      
      </View>
      <View>
       <TouchableOpacity
       
      >
      <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
     </TouchableOpacity>
      </View>
    </View>
     </TouchableWithoutFeedback>
     </KeyboardAvoidingView>

    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#dcdcdc",
    padding: 20,
    borderRadius:2000,
    margin: 8
  },
 
  title: {
    fontSize: 15,
    
  },
});

