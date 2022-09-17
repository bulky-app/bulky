import { Pressable, StyleSheet, Text, ToastAndroid, View } from "react-native";
import styles from "../globalStyles";
import { CartButton } from "./SButton";

const Product = (product) => {
  const doAddToCart = (id, name) => {
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
        onPress={() => console.log("Go to this product detail screen")}
        android_ripple={{
          color: "#E7E7FF",
        }}
      >
        <View style={[gridStyles.item.image]}>{product.img}</View>
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
            R {product.price}
          </Text>
          <Text
            style={[
              gridStyles.item.name,
              { textAlign: "center", marginTop: 5 },
            ]}
          >
            {product.name}
          </Text>
        </View>
        <View style={gridStyles.item.buttonWrapper}>
          <CartButton
            text="Add to cart"
            onPress={() => doAddToCart(5, "Tastic 5kg")}
          />
        </View>
      </Pressable>
    </View>
  );
};
const gridStyles = StyleSheet.create({
  item: {
    flex: 1,
    height: 250,
    width: 150,
    backgroundColor: styles.blackWhiteText.color,
    padding: 10,
    margin: 10,
    elevation: 1,
    borderRadius: 10,
    image: {
      flex: 1,
      alignItems: "center",
    },
    name: {
      textAlign: "left",
      fontSize: 20,
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
