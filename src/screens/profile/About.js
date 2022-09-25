import styles from "../../globalStyles";
import { useState, useEffect } from "react";
import { SSButton } from "../../components/SButton";
import { Text, View, StyleSheet } from "react-native";
import HistoryItem from "../../components/HistoryItem";
import { styless } from "../../components/ProfileCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const About = () => {
  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        { position: "relative", alignItems: "center" },
      ]}
    >
      <Text>Version: 1.0.0</Text>
    </SafeAreaView>
  );
};
export default About;

const localStyles = StyleSheet.create({});
