import { StyleSheet, Pressable, Text } from "react-native";

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
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 48,
    elevation: 3,
    backgroundColor: "#6B4EFF",
    height: 40,
    width: 250,
  },
  buttonOutline: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 48,
    elevation: 3,
    backgroundColor: "#E7E7FF",
    width: 327,
    height: 58,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1.25,
  },
  buttonTextOutline: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1.25,
  },
  purpleText: {
    color: "#5538EE",
  },
  greyText: {
    color: "#72777A",
  },
  loginSmallText: {
    lineHeight: 20,
    fontSize: 14,
    fontWeight: "400",
  },
  container: {
    flex: 1,
  },
});

export { SButton, SOButton };
export default styles;
