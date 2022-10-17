import styles from "../../globalStyles";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Help = () => {
  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        { position: "relative", alignItems: "center" },
      ]}
    >
      <StatusBar style="light" />

      <Text>Call: +27 68 172 1606</Text>
      <Text>Email: admin@bulky.co.za</Text>
      <Text>More information comming soon</Text>
    </SafeAreaView>
  );
};
export default Help;

const localStyles = StyleSheet.create({});
