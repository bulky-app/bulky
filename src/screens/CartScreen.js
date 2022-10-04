import { ScrollView } from "react-native";

import CartContainer from "../components/CartContainer";

const CartScreen = () => {
  return (
    <ScrollView nestedScrollEnabled={true}>
      <CartContainer />
    </ScrollView>
  );
};

export default CartScreen;
