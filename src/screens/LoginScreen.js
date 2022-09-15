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
import loginImage from "../images/loginImg.png";
import { Image } from "react-native";
import SInput from "../components/SInput";
import { useState } from "react";
import SButton from "../components/SButton";
import Parse from "../../backend/server";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusPass, setIsFocusPass] = useState(false);

  const handleEmail = (e) => {
    //Strip white spaces
    setEmail(e.trim());
  };
  const handlePassword = (e) => {
    //Strip white spaces
    setPassword(e.trim());
  };

  const handleButton = () => {
    Keyboard.dismiss();
    console.log("Email: " + email);
    console.log("Pass: " + password);
    setPassword("");
    setEmail("");
  };

  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  const handleFocusPass = () => {
    setIsFocusPass(true);
  };
  const handleBlurPass = () => {
    setIsFocusPass(false);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
            style={styles.authImg}
            resizeMode="center"
            resizeMethod="auto"
            source={loginImage}
          />
          <Text style={styles.header}>Sign in to your account</Text>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.innerContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <SInput
                placeholderTxt="Email"
                isSercure={false}
                keyboard="email-address"
                handleChange={handleEmail}
                focus={handleFocus}
                blur={handleBlur}
                isFocus={isFocus}
              />
              <SInput
                placeholderTxt="Password"
                isSercure={true}
                keyboard="default"
                handleChange={handlePassword}
                focus={handleFocusPass}
                blur={handleBlurPass}
                isFocus={isFocusPass}
              />
              <Pressable style={styles.purpleText}>
                <Text style={styles.purpleText}>Fogot Password?</Text>
              </Pressable>
              <SButton text="Sign In" onPress={handleButton} />
              <View style={[styles.inlineText]}>
                <Text style={[styles.greyText]}>New to Bulky?</Text>
                <Pressable onPress={() => navigation.navigate("RegisterScreen")}>
                  <Text style={styles.purpleText}>Create an account.</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
