import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import styles from "../globalStyles";
import { CartButton } from "./SButton";

import { addToCart } from "../redux/features/cartSlice";

const Product = ({ item }, dispatch, nav) => {

  const doAddToCart = (name) => {
    ToastAndroid.showWithGravityAndOffset(
      `${name} added to cart`,
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
      25,
      50
    );
  };
  return (
    <View>
      <Pressable
        style={gridStyles.item}
        onPress={() => nav.navigate("Details", item)}
        android_ripple={{
          color: "#E7E7FF",
        }}
      >
        <Image
          style={{
            height: 120,
            width: 100,
            alignSelf: "center",
            marginBottom: 10,
          }}
          source={{ uri: item.image }}
        />
        <View>
          <Text
            style={[
              gridStyles.item.name,
              {
                fontWeight: "700",
                color: styles.purpleText.color,
                marginLeft: 5,
              },
            ]}
          >
            R {item.price}
          </Text>
          <Text
            style={[
              gridStyles.item.name,
              { textAlign: "center", marginTop: 5 },
            ]}
          >
            {item.title}
          </Text>
        </View>
        <View style={gridStyles.item.buttonWrapper}>
          <CartButton
            text="Add to cart"
            onPress={() => {
              dispatch(addToCart(item));
              doAddToCart(item.title);
            }}
          />
        </View>
      </Pressable>
    </View>
  );
};
const gridStyles = StyleSheet.create({
  item: {
    flex: 1,
    height: 300,
    width: 150,
    backgroundColor: styles.blackWhiteText.color,
    padding: 10,
    margin: 10,
    elevation: 1,
    borderRadius: 10,
    image: {
      flex: 1,
      align: "center",
    },
    name: {
      textAlign: "left",
      fontSize: 20,
      height: 40,
      overflow: "hidden",
    },
    buttonWrapper: {
      flex: 1,
      marginTop: 3,
      alignItems: "center",
      justifyContent: "center",
    },
  },
});
export default Product;
