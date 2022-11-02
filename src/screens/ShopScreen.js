import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import StoreContainer from "../components/StoreContainer";

const ShopScreen = ({ route, navigation }) => {
  const { categoryName, id } = route.params;
  return (
    <View style={localStyles.contentContainer}>
      <StatusBar style="light" />
      <StoreContainer
        category={id}
        nav={navigation}
        name={categoryName}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingBottom: 25,
    alignItems: "center",
  }
});

export default ShopScreen;
