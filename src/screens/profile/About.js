import styles from "../../globalStyles";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
