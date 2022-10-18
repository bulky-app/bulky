import Product from "./Product";
import Parse from "../../backend/server";
import { useDispatch } from "react-redux";
import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const StoreContainer = ({ category }) => {
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
      <ScrollView nestedScrollEnabled={true}>
        {data && (
          <FlatList
            data={data}
            numColumns={2}
            renderItem={(item) => Product(item, dispatch, nav)}
            keyExtractor={(item) => item.id}
            ListFooterComponent={() => <View style={{ height: 10 }} />}
          />
        )}
      </ScrollView>
    );
  };
  return (
    <View>
      <StoreItems nav={nav} />
    </View>
  );
};

export default StoreContainer;
