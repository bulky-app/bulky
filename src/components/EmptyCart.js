import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import styles from "../globalStyles";
import cartImg from "../images/cartImg.png";
import historyImg from "../images/historyImg.png";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const OUButton = ({ text, onPress, icon }) => {
  return (
    <Pressable
      style={localStyles.button}
      android_ripple={{
        color: "whitesmoke",
      }}
      onPress={onPress}
    >
      <Text style={localStyles.btnText}>{text}</Text>
      {icon}
    </Pressable>
  );
};
const EmptyHistory = ({onClick}) => {
  return (
    <View style={localStyles.container}>
      <Image source={historyImg} style={localStyles.img} />
      <Text style={localStyles.txt}>No history made yet!</Text>
      <OUButton
        text="Lets make history"
        onPress={onClick}
        icon={
          <Feather
            name="arrow-right"
            size={24}
            color={styles.purpleText.color}
          />
        }
      />
    </View>
  );
};

const EmptyCart = ({onClick}) => {
  return (
    <View style={localStyles.container}>
      <Image source={cartImg} style={localStyles.img} />
      <Text style={localStyles.txt}>Looks like the cart is empyty!</Text>
      <OUButton
        text="Lets fill it"
        onPress={() => onClick={onClick}}
        icon={
          <Feather
            name="arrow-right"
            size={24}
            color={styles.purpleText.color}
          />
        }
      />
    </View>
  );
};
export { OUButton, EmptyCart, EmptyHistory };

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  img: {
    width: 230,
    height: 230,
    marginTop: 90,
  },
  txt: {
    fontSize: 22,
    marginTop: 22,
    marginBottom: 90,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
    marginHorizontal: 30,
    color: styles.purpleText.color,
  },
  button: {
    flex: 1,
    width: 200,
    borderWidth: 2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: styles.button.height,
    elevation: styles.button.elevation,
    borderRadius: styles.button.borderRadius,
    borderColor: styles.button.backgroundColor,
    backgroundColor: styles.safeContainer.backgroundColor,
  },
});
