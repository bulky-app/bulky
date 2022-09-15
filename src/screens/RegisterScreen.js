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
import loginImage from "../images/registerImg.png";
import { Image } from "react-native";
import SInput from "../components/SInput";
import { useState } from "react";
import SButton from "../components/SButton";
import { CheckBox } from "react-native-btr";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [show, setShow] = useState(true);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusPass, setIsFocusPass] = useState(false);
  const [isFocusName, setIsFocusName] = useState(false);
  const [acceptTerms, setacceptTerms] = useState(false);
  const [isFocusPassConfirm, setIsFocusPassConfirm] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.trim());
  };
  const handlePassword = (e) => {
    setPassword(e.trim());
  };
  const handleName = (e) => {
    setName(e.trim());
    name.length > 3 && setShow(false)
  };
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.trim());
  };

  const handleButton = () => {
    Keyboard.dismiss();
    console.log("Email: " + name);
    console.log("Pass: " + email);
    console.log("Email: " + password);
    console.log("Pass: " + passwordConfirm);
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
  const handleFocusName = () => {
    setIsFocusName(true);
  };
  const handleBlurName = () => {
    setIsFocusName(false);
  };
  const handleFocusPassConfirm = () => {
    setIsFocusPassConfirm(true);
  };
  const handleBlurPassConfirm = () => {
    setIsFocusPassConfirm(false);
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
                placeholderTxt="Name"
                isSercure={false}
                keyboard="default"
                handleChange={handleName}
                focus={handleFocusName}
                blur={handleBlurName}
                isFocus={isFocusName}
              />
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
              <SInput
                placeholderTxt="Confirm Password"
                isSercure={true}
                keyboard="default"
                handleChange={handlePasswordConfirm}
                focus={handleFocusPassConfirm}
                blur={handleBlurPassConfirm}
                isFocus={isFocusPassConfirm}
              />
              <Pressable style={styles.checkboxWrapper}>
                <CheckBox
                  style={{ marginRight: 5 }}
                  checked={acceptTerms}
                  color={styles.purpleText.color}
                  disabled={show}
                  onPress={() => setacceptTerms(!acceptTerms)}
                />
                <Text style={[styles.greyText, { marginLeft: 5 }]}>
                  I agree to
                </Text>
                <Pressable>
                  <Text style={[styles.purpleText, { marginLeft: -7 }]}>
                    Ts & Cs
                  </Text>
                </Pressable>
              </Pressable>
              <SButton text="Sign Up" onPress={handleButton} />
              <View style={[styles.inlineText]}>
                <Text style={[styles.greyText]}>Already signed up?</Text>
                <Pressable onPress={() => navigation.navigate("LoginScreen")}>
                  <Text style={styles.purpleText}>Sign In.</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
