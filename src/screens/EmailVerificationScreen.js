import {
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../globalStyles";
import emailImg from "../images/verificationImg.png";
import { Image } from "react-native";
import { useState } from "react";
import SButton from "../components/SButton";

const EmailVerificationScreen = () => {
  const handleButton = () => {};

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
            Email verification link has been sent to you email.
          </Text>
          <Text style={styles.header}>Can't find the email?.</Text>
          <SButton text="Resend Link" onPress={handleButton} />
        </View>

        <View style={[styles.inlineText, { marginTop: 25 }]}>
          <Text style={[styles.greyText]}>Need help?</Text>
          <Pressable>
            <Text style={[styles.purpleText]}>Contact Us.</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerificationScreen;
