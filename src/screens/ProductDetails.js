import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Data from "../../assets/cartItems";
import Product from "../components/Product";
import { CartButton } from "../components/SButton";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import styles from "../globalStyles";

const ProductDetails = ({ route }) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { title, price, image, description } = route.params;

  return (
    <SafeAreaView>
      <View>
        <Image source={{ uri: image }} style={localStyles.img} />
        <Text style={localStyles.title}>{title}</Text>
        <Text style={localStyles.desc}>{description}</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Text >
            Current orders: 25
          </Text>
          <Text>
            {price}
          </Text>
          <CartButton
            text="Add to cart"
            onPress={() => {
              const item = {
                description: description,
                image: image,
                price: price,
                title: title,
                id: id,
                uid: uid,
              };
              dispatch(addToCart(item));
              doAddToCart(title);
            }}
          />
        </View>
        <Text>Related</Text>
        <FlatList
          data={Data}
          horizontal={true}
          renderItem={(item) => Product(item, dispatch, nav)}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => <View style={{ height: 10 }} />}
        />
      </View>
    </SafeAreaView>
  );
};
export default ProductDetails;

const localStyles = StyleSheet.create({
  img: {
    width: 300,
    height: 250,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    elevation: 1,
  },
  title: {
    fontSize: 14,
    color: styles.purpleText.color,
    overflow: "scroll",
    height: 80,
  },
  desc: { fontSize: 20, color: styles.greyText.color },
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
