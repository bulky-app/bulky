import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import styles from "../globalStyles";
import Parse from "../../backend/server";
import { useDispatch } from "react-redux";
import Product from "../components/Product";
import { useState, useEffect } from "react";
import { ToastAndroid } from "react-native";
import { CartButton } from "../components/SButton";
import { addToCart } from "../redux/features/cartSlice";
import { useNavigation } from "@react-navigation/native";

const ProductDetails = ({ route }) => {
  const item = route.params;
  const nav = useNavigation();
  const dispatch = useDispatch();

  const id = item.get("id");
  const name = item.get("productName");
  const price = item.get("productPrice");
  const pic = item.get("productPicture").url();
  const category = item.get("productCategory");

  const [related, setRelated] = useState([]);

  async function fetchProducts() {
    const query = new Parse.Query("products");
    query.contains("productName", name.substring(4, 5));
    query.contains("productCategory", category.id);
    //query.lessThanOrEqualTo("productPrice", price);
    //query.ascending("productPrice", price);
    try {
      const queryResult = await query.find();
      setRelated(queryResult);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F5", padding: 20 }}>
      <View style={localStyles.imgContainer}>
        <Image
          source={{ uri: item.get("productPicture").url() }}
          style={localStyles.img}
        />
      </View>

      <Text style={localStyles.title}>{item.get("productName")}</Text>
      <Text style={localStyles.desc}>{item.get("poductDesc")}</Text>

      <View style={localStyles.infoTextWrapper}>
        <View style={localStyles.infoTextInnerWrapper}>
          <Text>Current orders:</Text>
          <Text style={{ fontSize: 20, color: styles.purpleText.color }}>
            {item.get("currentOrders")}
          </Text>
        </View>
        <View style={localStyles.infoTextInnerWrapper}>
          <Text>Price</Text>
          <Text style={{ fontSize: 20, color: styles.purpleText.color }}>
            R {item.get("productPrice").toFixed(2)}
          </Text>
        </View>
        <CartButton
          text="Add to cart"
          onPress={() => {
            const item = {
              image: pic,
              title: name,
              price,
              id,
            };
            dispatch(addToCart(item));
            doAddToCart(name);
          }}
        />
      </View>
      <Text>Related</Text>
      <FlatList
        data={related}
        horizontal={true}
        renderItem={(item) => Product(item, dispatch, nav)}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => <View style={{ height: 150 }} />}
      />
    </SafeAreaView>
  );
};
export default ProductDetails;

const localStyles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  img: {
    width: 200,
    height: 150,
    padding: 20,
    elevation: 1,
    borderRadius: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    overflow: "scroll",
    marginVertical: 10,
    color: styles.purpleText.color,
  },
  desc: { fontSize: 18, color: styles.greyText.color },
  infoTextWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  infoTextInnerWrapper: {
    alignItems: "center",
    flexDirection: "column",
  },
});

const doAddToCart = (name) => {
  ToastAndroid.showWithGravityAndOffset(
    `${name} added to cart`,
    ToastAndroid.SHORT,
    ToastAndroid.TOP,
    25,
    50
  );
};
