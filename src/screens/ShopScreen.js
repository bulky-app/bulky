import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import React from "react";
import StoreContainer from "../components/StoreContainer";

const ShopScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <StoreContainer />
    </ScrollView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({});
