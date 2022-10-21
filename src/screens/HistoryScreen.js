import styles from "../globalStyles";
import React, { useState } from "react";
import Parse from "../../backend/server";
import { StatusBar } from "expo-status-bar";
import { EmptyHistory } from "../components/EmptyCart";
import { ScrollView } from "react-native-gesture-handler";
import OrderHistoryItem from "../components/OrderHistoryItem";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

function HistoryScreen() {
  const navigation = useNavigation();
  const [history, setHistory] = useState([]);
  const [active, setActive] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      const userHistoryGet = async () => {
        try {
          await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
          const user = Parse.User.current();
          const query = new Parse.Query("orders");
          query.contains("userID", user.id); //filter for current user only
          const queryResult = await query.find();
          return setHistory(queryResult);
        } catch (error) {
          return error;
        }
      };
      return () => userHistoryGet();
    }, [])
  );

  return (
    <ScrollView nestedScrollEnabled={true} style={[styles.safeContainer]}>
      <StatusBar style="light" />
      {history.length > 0 ? (
        history.map((item) => (
          <OrderHistoryItem
            key={item.id}
            amount={item.get("totalPrice")}
            date={item.get("createdAt")}
            status={item.get("orderStatus")}
            id={item.id}
          />
        ))
      ) : (
        <EmptyHistory onClick={() => navigation.navigate("Home")} />
      )}
    </ScrollView>
  );
}

export default HistoryScreen;
