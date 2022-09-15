import { Pressable, Text } from "react-native";
import styles from "../globalStyles";

const SButton = ({ text, onPress }) => {
    return (
      <Pressable
        style={({ pressed }) => [pressed && { opacity: 0.8 }, styles.button]}
        android_ripple={{
          color: "#F2F4F5",
          radius: 48,
        }}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    );
  };

  export default SButton