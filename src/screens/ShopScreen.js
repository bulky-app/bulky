import React from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native";
import { View } from "react-native-web";
import StoreContainer from "../components/StoreContainer";

const ShopScreen = ({ route }) => {
  const { categoryName, id } = route.params;
  return (
    <ScrollView contentContainerStyle={localStyles.contentContainer}>
      <View>
        <Text style={localStyles.categoryName}>{categoryName}</Text>
      </View>
      <StoreContainer />
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryName: {
    height: 50,
  },
});

export default ShopScreen;
