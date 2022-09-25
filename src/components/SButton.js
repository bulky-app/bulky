import { Pressable, Text } from "react-native";
import styles from "../globalStyles";

const SButton = ({ text, onPress, outline }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && { opacity: 0.8 },
        outline
          ? [
              styles.button,
              {
                backgroundColor: styles.safeContainer.backgroundColor,
                borderColor: styles.purpleText.color,
                borderWidth: 1,
              },
            ]
          : styles.button,
      ]}
      android_ripple={{
        color: "#F2F4F5",
        radius: 48,
      }}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          outline && { color: styles.purpleText.color },
        ]}
      >
        {text}
      </Text>
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

const SSButton = ({ click, text, outline }) => {
  return (
    <Pressable
      android_ripple={{
        color: styles.safeContainer.backgroundColor,
        radius: 48,
      }}
      style={[
        { padding: 10, width: 140, borderRadius: 48, elevation: 3 },
        outline
          ? {
              backgroundColor: styles.safeContainer.backgroundColor,
              borderColor: styles.purpleText.color,
              borderWidth: 1,
            }
          : { backgroundColor: styles.purpleText.color },
      ]}
      onPress={click}
    >
      <Text
        style={[
          { fontSize: 20, textAlign: "center" },
          outline
            ? { color: styles.purpleText.color }
            : { color: styles.blackWhiteText.color },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};
export { CartButton, SSButton };
export default SButton;
