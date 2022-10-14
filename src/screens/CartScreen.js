import { useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch } from "react-redux";
import { loadCart } from "../redux/features/cartSlice";
import CartContainer from "../components/CartContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const name = async () => {
      await AsyncStorage.getItem("cart")
        .then(async (value) => {
          console.log("Update cart from stor");
          return await JSON.parse(value);
        })
        .catch((e) => {
          console.log("error donload cart" + e);
          return [];
        });
    };
    () => {
      console.log("Loaded");
      return dispatch(loadCart(name));
    };
  });

  return (
    <ScrollView nestedScrollEnabled={true}>
      <CartContainer />
    </ScrollView>
  );
};

export default CartScreen;
