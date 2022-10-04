import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  increment,
  decrement,
  clear,
  removeItem,
  loadCart,
} from "../redux/features/cartSlice";
import SButton from "./SButton";
import { useEffect } from "react";
import styles from "../globalStyles";
import { EmptyCart } from "./EmptyCart";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { cartTotalPriceSelector } from "../redux/selectors";

const amount = 0;
const CartContainer = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    () => {
      dispatch(loadCart());
    };
  }, []);

  //Items in the cart
  const renderStoreItems = ({ item }) => {
    return (
      <View style={LocalStyles.storeItem}>
        <View style={LocalStyles.storeItemImg}>
          <Image
            style={LocalStyles.storeItemImage}
            source={{ uri: item.image }}
          />
        </View>

        <View style={LocalStyles.storeItemInfo}>
          <View
            style={[
              LocalStyles.storeItemInfo,
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <Text style={LocalStyles.storeItemTitle}>{item.title}</Text>
            <Text style={LocalStyles.storeItemPrice}>
              R{(item.quantity * item.price)
              }
            </Text>
          </View>

          <View style={LocalStyles.addToCart}>
            <View style={LocalStyles.cartItemAmount}>
              <TouchableOpacity
                onPress={() => {
                  if (item.quantity === 1) {
                    dispatch(removeItem(item.id));
                    return;
                  } else {
                    dispatch(decrement(item.id));
                  }
                }}
              >
                <Ionicons name="md-remove" size={24} color="black" />
              </TouchableOpacity>
              <Text style={LocalStyles.cartItemAmountText}>
                {item.quantity}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  dispatch(increment(item.id));
                }}
              >
                <Ionicons name="md-add" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={LocalStyles.cartItemRemove}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(removeItem(item.id));
                }}
                style={LocalStyles.cartItemRemoveButton}
              >
                <Ionicons name="md-trash" size={22} color="grey" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ paddingHorizontal: 15 }}>
      <FlatList
        data={cart}
        renderItem={renderStoreItems}
        keyExtractor={(item) => item.id}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};
export default CartContainer;
const LocalStyles = StyleSheet.create({
  storeItem: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 3,
    margin: 10,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  storeItemImg: {
    width: "30%",
    height: 100,
    borderRadius: 5,
    overflow: "hidden",
  },
  storeItemImage: {
    width: "100%",
    height: "100%",
  },
  storeItemInfo: {
    width: "70%",
    padding: 10,
  },
  storeItemTitle: {
    fontSize: 16,
    width: 150,
    fontWeight: "300",
    overflow: "hidden",
  },
  storeItemPrice: {
    fontWeight: "600",
    color: styles.purpleText.color,
    fontSize: 18,
    overflow: "hidden",
  },
  addToCart: {
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cartItemAmount: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 150,
  },
  cartItemAmountText: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: styles.purpleText.color,
    padding: 4,
    minWidth: 30,
    textAlign: "center",
    borderRadius: 100,
    color: "white",
  },
  cartItemRemove: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  cartItemRemoveButton: {
    marginTop: 8,
    alignItems: "center",
  },
  cartFooter: {
    justifyContent: "space-between",
  },
  checkoutFull: {
    flex: 1,
    alignItems: "center",
  },
});

const ListFooterComponent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const totalPrice = useSelector(cartTotalPriceSelector);

  const AlertItem = () => {
    Alert.alert(
      "Are you sure you want to clear the cart?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        { text: "OK", onPress: () => dispatch(clear()) },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={LocalStyles.cartFooter}>
      <View style={LocalStyles.checkout}>
        {totalPrice === 0 ? (
          <EmptyCart onClick={() => navigation.navigate("Home")} />
        ) : (
          <View style={LocalStyles.checkoutFull}>
            <Text
              style={[
                {
                  fontSize: 20,
                  fontWeight: "400",
                  backgroundColor: styles.blackWhiteText.color,
                  textAlign: "center",
                  padding: 5,
                  minWidth: 160,
                  elevation: 6,
                  borderRadius: 20,
                  marginVertical: 20,
                },
              ]}
            >
              Total:
              <Text style={styles.purpleText}> R {totalPrice
              }</Text>
            </Text>

            <SButton
              text="Checkout"
              onPress={() => {
                // dispatch(checkout());
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity onPress={AlertItem}>
                <Text style={styles.dangerText}>Clear cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
