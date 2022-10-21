import styles from "../globalStyles";
import Parse from "../../backend/server";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { EmptyHistory } from "../components/EmptyCart";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import OrderHistoryItem from "../components/OrderHistoryItem";

function HistoryScreen() {
  const navigation = useNavigation();
  const [history, setHistory] = useState([])

  useEffect(() => {
    const userHistoryGet = async () => {
      try {
        await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
        const user = Parse.User.current();

        const query = new Parse.Query("orders");
        query.contains("userId", user.id); //filter for current user only
        query.addAscending('createdAt'); //sort ascending
        const queryResult = await query.find();
        return setHistory(queryResult);
      } catch (error) {
        return error;
      }
    };
    userHistoryGet();
  }, []);


  return (
    <ScrollView nestedScrollEnabled={true} style={[styles.safeContainer]}>
      <StatusBar style="light" />
      {history.length > 0 ? history.map((item) =>
        <OrderHistoryItem
          key={item.id}
          amount={item.get("totalPrice")}
          date={item.get("createdAt")}
          status={item.get("orderStatus")}
          id={item.id} />)
        :
        <EmptyHistory onClick={() => navigation.navigate("Home")} />
      }
    </ScrollView>
  );
}

export default HistoryScreen;
