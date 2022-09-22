import {
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../globalStyles";
import userImg from "../images/userImg.png";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";

const ProfileCard = ({ userId, userName, userBalance }) => {
  const copyToClipboard = (userId) => {
    Clipboard.setStringAsync(userId);
    ToastAndroid.showWithGravityAndOffset(
      `Reference copied to clipboard`,
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  };
  return (
    <View style={[styless.profileCard, styless.profileCard.boxWithShadow]}>
      <Image style={styless.profileCard.imageIcon} source={userImg} />
      <View
        style={[
          styless.profileCard,
          {
            padding: 0,
          },
        ]}
      >
        <Text style={[styless.profileCard.bigText]}>{userName}</Text>
        <TouchableOpacity
          onPress={() => copyToClipboard(userId)}
          activeOpacity={0.5}
        >
          <Text style={[styless.profileCard.greyText]}>
            {userId.toUpperCase() + " "}
            <Ionicons name="copy-outline" size={20} color="black" />
          </Text>
        </TouchableOpacity>
        <Text style={[styless.profileCard.purpleText]}>R {userBalance}</Text>
      </View>
    </View>
  );
};
export default ProfileCard;
export const styless = StyleSheet.create({
  profileCard: {
    padding: 20,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: styles.blackWhiteText.color,
    boxWithShadow: {
      shadowColor: styles.purpleText.color,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
    },
    imageIcon: {
      width: 74,
      height: 74,
    },
    bigText: {
      fontSize: styles.bigText.fontSize,
      textAlign: "center",
    },
    greyText: {
      color: styles.greyText.color,
      textAlign: "center",
      fontSize: 16,
      padding: 3,
      width: 110,
      backgroundColor: "#F2F4F5",
      borderRadius: 20,
      marginVertical: 5,
    },
    purpleText: {
      color: styles.purpleText.color,
      textAlign: "center",
      fontSize: 24,
    },
  },
});
