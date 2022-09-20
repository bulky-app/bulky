import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import styles from "../globalStyles";
import Data from "../../assets/cartItems";
import { useDispatch } from "react-redux";
import Product from "../components/Product";
import { ToastAndroid } from "react-native";
import { CartButton } from "../components/SButton";
import { addToCart } from "../redux/features/cartSlice";
import { useNavigation } from "@react-navigation/native";

const ProductDetails = ({ route }) => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const { title, price, image, description } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F2F4F5", padding: 20 }}>
      <View style={localStyles.imgContainer}>
        <Image source={{ uri: image }} style={localStyles.img} />
      </View>

      <Text style={localStyles.title}>{title}</Text>
      <Text style={localStyles.desc}>{description}</Text>

      <View style={localStyles.infoTextWrapper}>
        <View style={localStyles.infoTextInnerWrapper}>
          <Text>Current orders:</Text>
          <Text style={{ fontSize: 20, color: styles.purpleText.color }}>
            25
          </Text>
        </View>
        <View style={localStyles.infoTextInnerWrapper}>
          <Text>Price</Text>
          <Text style={{ fontSize: 20, color: styles.purpleText.color }}>
            {price}
          </Text>
        </View>
        <CartButton
          text="Add to cart"
          onPress={() => {
            const item = {
              image: image,
              price: price,
              title: title,
              id: id,
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
        ListFooterComponent={() => <View style={{ height: 150 }} />}
      />
    </SafeAreaView>
  );
};
export default ProductDetails;

const localStyles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  img: {
    width: 200,
    height: 150,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    elevation: 1,
  },
  title: {
    fontSize: 24,
    color: styles.purpleText.color,
    overflow: "scroll",
    marginVertical: 10,
  },
  desc: { fontSize: 18, color: styles.greyText.color },
  infoTextWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  infoTextInnerWrapper: {
    flexDirection: "column",
    alignItems: "center",
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
