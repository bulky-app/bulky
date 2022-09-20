import Product from "./Product";
import Data from "../../assets/cartItems";
import { View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const url = "https://course-api.com/react-useReducer-cart-project";

const StoreContainer = () => {
  const dispatch = useDispatch();

  const nav = useNavigation();
  const [data, setData] = useState(Data);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const StoreItems = ({ nav }) => {
    return (
      <View>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={(item) => Product(item, dispatch, nav)}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    );
  };
  return (
    <View>
      <StoreItems nav={nav} />
    </View>
  );
};

export default StoreContainer;
