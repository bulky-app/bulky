import React from "react";
import StoreContainer from "../components/StoreContainer";
import { StyleSheet, Text, ScrollView, View, SafeAreaView } from "react-native";

const ShopScreen = ({ route, navigation }) => {
  const { categoryName, id } = route.params;
  return (
    <SafeAreaView style={localStyles.contentContainer}>
      <ScrollView
        contentContainerStyle={localStyles.contentContainer}
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text style={localStyles.categoryName}>{categoryName}</Text>
        </View>

        <StoreContainer nav={navigation} category={id} />
      </ScrollView>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 25,
  },
  categoryName: {
    fontSize: 18,
    elevation: 3,
    paddingVertical: 10,
  },
});

export default ShopScreen;
