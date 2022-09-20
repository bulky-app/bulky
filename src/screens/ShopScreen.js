import React from "react";
import StoreContainer from "../components/StoreContainer";
import { StyleSheet, Text ,ScrollView, View} from "react-native";

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
