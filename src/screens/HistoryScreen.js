import React from "react";
import { EmptyHistory } from "../components/EmptyCart";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

function HistoryScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView nestedScrollEnabled={true}>
      <EmptyHistory onClick={() => navigation.navigate("Home")} />
    </ScrollView>
  );
}

export default HistoryScreen;
