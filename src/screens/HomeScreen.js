import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CategoryCard from "../components/CategoryCard";
import ProfileCard from "../components/ProfileCard";
import styles from "../globalStyles";
import Parse from "../../backend/server";
import Product from "../components/Product";
import StoreContainer from "../components/StoreContainer";

const HomeScreen = () => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [walletBalance, setWalletBalance] = useState();

  useEffect(() => {
    const currentUser = async () => {
      await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
      const user = Parse.User.current();
      setUser(user.get("name"));
      setUserId(user.id);
      setWalletBalance(user.get("walletBalance"));
    };
    currentUser();
  }, [user]);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
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
            <FlatList
              data={itemData}
              numColumns={2}
              renderItem={CategoryCard}
              keyExtractor={(item) => item.id}
            />
            <Product
              img={
                <Image
                  style={{ maxHeight: 180, maxWidth: 120 }}
                  source={require("../images/categories/everdaymeals.png")}
                />
              }
              price={30}
              id="hgkgcv"
              name="Tastic 5kg"
            />
            <StoreContainer/>
          </View>
        </View>
      )}
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
