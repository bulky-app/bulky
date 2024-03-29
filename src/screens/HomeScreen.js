import styles from "../globalStyles";
import Parse from "../../backend/server";
import { StatusBar } from "expo-status-bar";
import { useState, useCallback } from "react";
import ProfileCard from "../components/ProfileCard";
import CategoryCard from "../components/CategoryCard";
import { FlatList, ScrollView, Text, ToastAndroid, View } from "react-native";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";

import busketImg from "../images/categories/busket.jpg";
import snacksImg from "../images/categories/snacks.jpg";
import toiletriesImg from "../images/categories/toiletries.jpg";
import everydayImg from "../images/categories/everydaymeals.jpg";


const HomeScreen = () => {
  const nav = useNavigation();
  const active = useIsFocused();

  const itemData = [
    {
      icon: busketImg,
      id: "x9pc6rXKFc",
      categoryName: "Bulky bulks",
    },
    {
      icon: everydayImg,
      id: "SB7z4wK5Hr",
      categoryName: "Everyday Meals",
    },
    {
      icon: snacksImg,
      id: "UnjwmvHJd3",
      categoryName: "Snacks",
    },
    {
      icon: toiletriesImg,
      id: "NM0kWSezrS",
      categoryName: "Toiletries",
    },
  ];

  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [walletBalance, setWalletBalance] = useState();

  useFocusEffect(
    useCallback(() => {
      const currentUser = async () => {
        try {
          await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
          const user = Parse.User.current();
          setUserId(user.id);
          try {
            const updatedUserDetails = await Parse.Cloud.run("getUserDetails", {
              objectId: user.id,
            });
            setUser(updatedUserDetails.get("name"));
            return setWalletBalance(
              updatedUserDetails.get("walletBalance").toFixed(2)
            );
          } catch (e) {
            setUser(user.get("name"));
            return setWalletBalance(user.get("walletBalance").toFixed(2));
          }
        } catch (error) {
          ToastAndroid.showWithGravityAndOffset(
            "Error. Please restart the app.",
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            50,
            25
          )
          return error;
        }
      };
      currentUser();
    }, [active])
  );

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar style="dark" />
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
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
