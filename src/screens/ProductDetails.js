import { SafeAreaView, Text, View } from "react-native";

const ProductDetails = ({ route, navigation }) => {
    const { itemId, otherParam } = route.params;
return (
<SafeAreaView>
    <View>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
    </View>
</SafeAreaView>
);
};
export default ProductDetails;