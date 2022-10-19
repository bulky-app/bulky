import { Text, Pressable, StyleSheet, ImageBackground } from "react-native";

const CategoryCard = ({ item }, nav) => {
  return (
    <ImageBackground
      style={gridStyles.item}
      imageStyle={gridStyles.item.image}
      source={item.icon}
    >
      <Pressable
        style={gridStyles.press}
        onPress={() => nav.navigate("Shop", item)}
        android_ripple={{
          color: "#E7E7FF",
        }}
      >
        <Text style={gridStyles.item.name}>{item.categoryName}</Text>
      </Pressable>
    </ImageBackground>
  );
};

const gridStyles = StyleSheet.create({
  app: {
    flex: 1,
    paddingHorizontal: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  press: {
    flex: 1,
    width: 150,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    margin: 10,
    elevation: 3,
    alignItems: "center",
    justifyContent: "center",
    image: {
      borderRadius: 10,
    },
    name: {
      fontSize: 20,
      fontSize: 40,
      marginTop: 20,
      color: "white",
      fontWeight: "900",
      textAlign: "center",
    },
  },
});

export default CategoryCard;
