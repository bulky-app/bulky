import { Pressable, Text } from "react-native";
import styles from "../globalStyles";

const SOButton = ({ text, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && { opacity: 0.8 },
        styles.buttonOutline,
      ]}
      android_ripple={{
        color: "#F2F4F5",
        radius: 48,
      }}
      onPress={onPress}
    >
      <Text style={[styles.buttonTextOutline, styles.purpleText]}>{text}</Text>
    </Pressable>
  );
};

export default SOButton;
