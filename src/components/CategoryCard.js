import { Pressable, StyleSheet, Text, View } from "react-native";
import styles from "../globalStyles";

const CategoryCard = ({ item }) => {
  return (
    <View>
      <Pressable
        style={gridStyles.item}
        onPress={() => console.log("Clicked")}
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
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 150,
    backgroundColor: styles.blackWhiteText.color,
    borderWidth: 1.5,
    borderColor: "#fff",
    margin: 10,
    elevation: 1,
    borderRadius: 10,
    name: {
      textAlign: "center",
      fontSize: 20,
      marginTop: 20,
    },
  },
});

export default CategoryCard;
