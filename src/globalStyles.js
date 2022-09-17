import { StyleSheet } from "react-native";

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
    color: "white",
  },
  buttonTextOutline: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 1.25,
  },
  purpleText: {
    color: "#5538EE",
    marginVertical: 15,
  },
  greyText: {
    color: "#72777A",
    marginRight: 10,
  },
  loginSmallText: {
    lineHeight: 20,
    fontSize: 14,
    fontWeight: "400",
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "#F2F4F5",
    padding: 40,
  },
  container: {
    flex: 0.8,
  },
  inlineText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  authImg: {
    width: 210,
    height: 175,
  },
  inner: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    fontSize: 16,
    marginVertical: 40,
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
    borderColor: "#E3E5E5",
    marginVertical: 15,
    width: 272,
    color: "black",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  textInputFocused: {
    borderColor: "#6B4EFF",
  },
  checkboxWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 10,
    alignItems: "center",
  },
  bigText: {
    fontSize: 26,
    marginVertical: 40,
    textAlign: "center",
  },
  whiteBlackText: {
    color: "black",
  },
  blackWhiteText: {
    color: "white",
  },
  contentContainer: {
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F2F4F5",
  },
  dangerText: {
    color: "coral",
    fontSize: 20,
    marginVertical: 10,
    textAlign: "center",
  },
});

export default styles;
