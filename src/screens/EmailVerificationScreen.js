import { useState } from "react";
import styles from "../globalStyles";
import Parse from "../../backend/server";
import LoadingButton from "../components/SButton";
import { Image, ToastAndroid } from "react-native";
import emailImg from "../images/verificationImg.png";
import { Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EmailVerificationScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [verified, setVerified] = useState(false);

  const doUserQuery = async function () {
    const parseQuery = new Parse.Query(Parse.User);
    parseQuery.equalTo("email", email.toLowerCase());
    parseQuery.equalTo("emailVerified", false);
    return await parseQuery
      .find()
      .then(async (queriedUsers) => {
        return typeof queriedUsers === "object"
          ? setVerified(queriedUsers[0].get("emailVerified"))
          : setVerified(false);
      })
      .catch((error) => {
        return ToastAndroid.showWithGravityAndOffset(
          "Some error occured!",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50
        );
      });
  };

  if (verified === true) {
    navigation.navigate("LoginScreen", email);
    return ToastAndroid.showWithGravityAndOffset(
      "Thank you for email verification.",
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.authImg}
            resizeMode="cover"
            resizeMethod="auto"
            source={emailImg}
          />
          <Text style={styles.bigText}>
            Email verification link has been sent to your email.
          </Text>
          <Text style={styles.header}>Verified?</Text>
          <LoadingButton text="Yes" onPress={doUserQuery} />
        </View>
        <View style={[styles.inlineText, { marginTop: 25 }]}>
          <Text style={styles.greyText}>Need help?</Text>
          <Pressable>
            <Text style={[styles.purpleText]}>Contact Us.</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerificationScreen;
