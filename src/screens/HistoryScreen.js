import React from "react";
import { EmptyHistory } from "../components/EmptyCart";
import { useNavigation } from "@react-navigation/native";

function HistoryScreen() {
    const navigation = useNavigation()
  return (
    <EmptyHistory onClick={()=>navigation.navigate("Home")} />
  );
}

export default HistoryScreen;
