import styles from "../globalStyles";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CategoryCard = ({ item }, nav) => {
  return (
    <View>
      <Pressable
        style={gridStyles.item}
        onPress={() => nav.navigate("Shop", item)}
        android_ripple={{
          color: "#E7E7FF",
        }}
      >
        {item.icon}
        <Text style={gridStyles.item.name}>{item.categoryName}</Text>
      </Pressable>
    </View>
  );
};
const gridStyles = StyleSheet.create({
  app: {
    flex: 1,
    paddingHorizontal: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    margin: 10,
    width: 150,
    height: 200,
    elevation: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: styles.blackWhiteText.color,
    name: {
      fontSize: 20,
      marginTop: 20,
      textAlign: "center",
    },
  },
});

export default CategoryCard;
