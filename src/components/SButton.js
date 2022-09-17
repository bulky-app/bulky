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
const CartButton = ({ text, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && { opacity: 0.8 },
        styles.button,
        { height: 30, width: 85 },
      ]}
      android_ripple={{
        color: "#F2F4F5",
        radius: 10,
      }}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { fontSize: 14, fontWeight: "normal" }]}>
        {text}
      </Text>
    </Pressable>
  );
};
export { CartButton };
export default SButton;
