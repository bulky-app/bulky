import styles from "../globalStyles";
import { CartButton } from "./SButton";
import { addToCart } from "../redux/features/cartSlice";
import CachedImage from "react-native-expo-cached-image";
import { View, Text, StyleSheet, Pressable, ToastAndroid } from "react-native";

const Product = ({ item }, dispatch, nav) => {

  const id = item.objectId;
  const name = item.productName
  const price = item.productPrice

  const { url } = item.productPicture;
  const currentOrders = item.currentOrders
  const poductDesc = item.poductDesc
  const productCategory = item.productCategory.objectId

  const detailsData = {
    objectId: id,
    productName: name,
    productPrice: price,
    productCategory,
    url,
    currentOrders,
    poductDesc,
  };

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
        onPress={() => nav.navigate("Details", detailsData)}
        android_ripple={{
          color: "#E7E7FF",
        }}
      >
        <CachedImage
          style={{
            height: 120,
            width: 100,
            alignSelf: "center",
            marginBottom: 10,
          }}
          source={{ uri: url }}
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
            R {price.toFixed(2)}
          </Text>
          <Text
            style={[
              gridStyles.itemData.name,
              { textAlign: "center", marginTop: 5 },
            ]}
          >
            {name}
          </Text>
        </View>
        <View style={gridStyles.itemData.buttonWrapper}>
          <CartButton
            text="Add to cart"
            onPress={() => {
              const item = {
                category: productCategory,
                image: url,
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

const SearchProduct = ({ item }, dispatch, nav) => {
  const {
    objectId,
    productName,
    productPrice,
    productCategory,
    currentOrders,
    poductDesc,
  } = item;
  const { url } = item.productPicture;

  const detailsData = {
    objectId,
    productName,
    productPrice,
    productCategory,
    url,
    currentOrders,
    poductDesc,
  };

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
        onPress={() => nav.navigate("Details", detailsData)}
        android_ripple={{
          color: "#E7E7FF",
        }}
      >
        <CachedImage
          style={{
            height: 120,
            width: 100,
            alignSelf: "center",
            marginBottom: 10,
          }}
          source={{ uri: url }}
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
            R {productPrice.toFixed(2)}
          </Text>
          <Text
            style={[
              gridStyles.itemData.name,
              { textAlign: "center", marginTop: 5 },
            ]}
          >
            {productName}
          </Text>
        </View>
        <View style={gridStyles.itemData.buttonWrapper}>
          <CartButton
            text="Add to cart"
            onPress={() => {
              const item = {
                category: productCategory,
                image: url,
                title: productName,
                price: productPrice,
                id: objectId,
              };
              dispatch(addToCart(item));
              doAddToCart(productName);
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
      height: 120,
      width: 100,
      alignSelf: "center",
      marginBottom: 10,
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

export { SearchProduct };
export default Product;
