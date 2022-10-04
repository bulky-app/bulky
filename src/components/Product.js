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

  const { id } = item;
  const name = item.get("productName");
  const price = item.get("productPrice");
  const pic = item.get("productPicture").url();
  const category = item.get("productCategory");

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
        style={gridStyles.itemData}
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
          source={{ uri: item.get("productPicture").url() }}
        />
        <View>
          <Text
            style={[
              gridStyles.itemData.name,
              {
                fontWeight: "700",
                color: styles.purpleText.color,
                marginLeft: 5,
              },
            ]}
          >
            R {item.get("productPrice").toFixed(2)}
          </Text>
          <Text
            style={[
              gridStyles.itemData.name,
              { textAlign: "center", marginTop: 5 },
            ]}
          >
            {item.get("productName")}
          </Text>
        </View>
        <View style={gridStyles.itemData.buttonWrapper}>
          <CartButton
            text="Add to cart"
            onPress={() => {
              const item = {
                image: pic,
                title: name,
                price,
                id: id,
              };
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
  itemData: {
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
