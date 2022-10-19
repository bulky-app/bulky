import styles from "../globalStyles";
import Parse from "../../backend/server";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import CategoryCard from "../components/CategoryCard";
import { useNavigation } from "@react-navigation/native";
//import StoreContainer from "../components/StoreContainer";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";

const HomeScreen = ({ navigation }) => {
  const nav = useNavigation();

  const [error, seterror] = useState();
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [walletBalance, setWalletBalance] = useState();

  useEffect(() => {
    const currentUser = async () => {
      try {
        await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
        const user = Parse.User.current();
        setUser(user.get("name"));
        setUserId(user.id);
        setWalletBalance(user.get("walletBalance").toFixed(2));
        return true;
      } catch (error) {
        return seterror(error);
      }
    };
    currentUser();
  }, [user]);

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={styles.contentContainer}
    >
      {user && (
        <View>
          <View>
            <ProfileCard
              userId={userId}
              userName={user}
              userBalance={walletBalance}
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
            <ScrollView nestedScrollEnabled={true}>
              <FlatList
                data={itemData}
                numColumns={2}
                renderItem={(item) => CategoryCard(item, nav)}
                keyExtractor={(item) => item.id}
              />
            </ScrollView>
            {/* <StoreContainer nav={navigation} /> */}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const localStyles = StyleSheet.create({
  image:{
    height: 90,
    width: 60
  }
})

const itemData = [
  {
    icon: <Image style={localStyles.image} source={require("../images/categories/everydaymeals.jpg")} />,
    id: "SB7z4wK5Hr",
    categoryName: "Everyday Meals",
  },
  {
    icon: <Image style={localStyles.image} source={require("../images/categories/snacks.jpg")} />,
    id: "UnjwmvHJd3",
    categoryName: "Snacks",
  },
  {
    icon: <Image style={localStyles.image} source={require("../images/categories/toiletries.jpg")} />,
    id: "NM0kWSezrS",
    categoryName: "Toiletries",
  },
  {
    icon: <Image style={localStyles.image} source={require("../images/categories/busket.png")} />,
    id: "x9pc6rXKFc",
    categoryName: "Bulky bulks",
  },
];
