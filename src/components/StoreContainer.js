import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Data from "../../assets/cartItems";
import Product from "./Product";

const url = "https://course-api.com/react-useReducer-cart-project";

const StoreContainer = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(Data);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const StoreItems = () => {
    return (
      <View>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={(item) => Product(item, dispatch)}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    );
  };
  return (
    <View>
      <StoreItems />
    </View>
  );
};

export default StoreContainer;
