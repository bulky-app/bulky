import styles from "../globalStyles";
import Parse from "../../backend/server";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import CategoryCard from "../components/CategoryCard";
import { useNavigation } from "@react-navigation/native";
import StoreContainer from "../components/StoreContainer";
import { FlatList, Image, ScrollView, Text, View } from "react-native";

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
              renderItem={(item) => CategoryCard(item, nav)}
              keyExtractor={(item) => item.id}
            />
            <StoreContainer nav={navigation} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;

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
