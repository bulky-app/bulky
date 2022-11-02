import styles from "../globalStyles";
import Parse from "../../backend/server";
import { StatusBar } from "expo-status-bar";
import { RefreshControl, View } from "react-native";
import React, { useCallback, useState } from "react";
import { EmptyHistory } from "../components/EmptyCart";
import { FlatList } from "react-native-gesture-handler";
import OrderHistoryItem from "../components/OrderHistoryItem";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

function HistoryScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [saved, setSaved] = useState(0)
  const [refreshing, setRefershing] = useState(false)

  async function fetchData() {
    setRefershing(true)
    try {
      await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
      const user = Parse.User.current();
      const query = new Parse.Query("orders");
      query.contains("userID", user.id); //filter for current user only
      const queryResult = await query.find();
      setRefershing(false)
      return setData(queryResult);
    } catch (error) {
      setRefershing(false)
      return error;
    }
  }

  useFocusEffect(useCallback(
    () => {
      fetchData()
    },
    [saved],
  )
  )
  return (
    <View style={[styles.safeContainer]}>
      <StatusBar style="dark" />
      <FlatList
        data={data}
        renderItem={({ item }) => <OrderHistoryItem
          id={item.id}
          key={item.id}
          date={item.get("createdAt")}
          total={item.get('totalPrice')}
          quantity={item.get("quantity")}
          amount={item.get("totalPrice")}
          status={item.get("orderStatus")}
        />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            enabled={true}
            refreshing={refreshing}
            onRefresh={() => setSaved(prev => prev + 1)}
          />
        }
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyHistory onClick={() => navigation.navigate("Home")} />}
      />
    </View>
  );
}

export default HistoryScreen;
