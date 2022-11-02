import Product from "./Product";
import { Text } from "react-native";
import styles from "../globalStyles";
import Parse from "../../backend/server";
import { useDispatch } from "react-redux";
import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const StoreContainer = ({ category, name }) => {
  const dispatch = useDispatch();

  const nav = useNavigation();
  const [data, setData] = useState();

  async function fetchProducts() {
    const query = new Parse.Query("products");
    query.contains("productCategory", category.length > 3 ? category : "");
    try {
      const queryResult = await query.find();
      setData(queryResult);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const StoreItems = ({ nav }) => {
    return (
      <FlatList
        data={data}
        numColumns={2}
        stickyHeaderIndices={[0]}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => Product(item, dispatch, nav)}
        ListFooterComponent={() => <View style={{ height: 10 }} />}
        ListHeaderComponent={() => <Text style={headText}>{name}</Text>}
      />
    );
  };
  return (
    <StoreItems nav={nav} />
  );
};

export default StoreContainer;

const headText = {
  fontSize: 20,
  fontWeight: "700",
  paddingVertical: 15,
  textAlign: "center",
  paddingHorizontal: 5,
  backgroundColor: styles.safeContainer.backgroundColor,
}
