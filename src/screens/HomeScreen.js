import { Text,View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../globalStyles";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View>
        <Text>HomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
