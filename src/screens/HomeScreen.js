import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CategoryCard from "../components/CategoryCard";
import ProfileCard from "../components/ProfileCard";
import styles from "../globalStyles";

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View>
        <ProfileCard
          userId="uuekyheby"
          userName="Axole Maranjana"
          userBalance={50000}
        />
      </View>

      <View style={{ marginVertical: 25 }}>
        <Text style={{ fontSize: 20, fontWeight: "300" }}>
          Shop by category
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          alignContent: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
        }}
      >
        <FlatList
          data={itemData}
          numColumns={2}
          renderItem={CategoryCard}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
const gridStyles = StyleSheet.create({});

const itemData = [
  {
    icon: <Image source={require("../images/categories/everdaymeals.png")} />,
    id: 1,
    categoryName: "My Needs",
  },
  {
    icon: <Image source={require("../images/categories/snacks.png")} />,
    id: 2,
    categoryName: "Snacks",
  },
  {
    icon: <Image source={require("../images/categories/toiletries.png")} />,
    id: 3,
    categoryName: "Toiletries",
  },
  {
    icon: <Image source={require("../images/categories/busket.png")} />,
    id: 4,
    categoryName: "Bulky bulks",
  },
];
