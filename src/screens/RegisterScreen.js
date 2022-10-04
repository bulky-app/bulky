import {
  Text,
  View,
  Keyboard,
  Pressable,
  ToastAndroid,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { Image } from "react-native";
import styles from "../globalStyles";
import Parse from "../../backend/server";
import SInput from "../components/SInput";
import { CheckBox } from "react-native-btr";
import SButton from "../components/SButton";
import loginImage from "../images/registerImg.png";
import { validateEmail } from "../navigation/functions";
import { SafeAreaView } from "react-native-safe-area-context";

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
    name.length > 3 && setShow(false);
  };
  const handlePasswordConfirm = (e) => {
    setPasswordConfirm(e.trim());
  };

  const handleButton = (navigation) => {
    Keyboard.dismiss();
    if (!acceptTerms) {
      return ToastAndroid.showWithGravityAndOffset(
        "Please accept the Terms of Service to continue",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    } else if (password !== passwordConfirm) {
      return ToastAndroid.showWithGravityAndOffset(
        "Passwords do not match!",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    } else if (password.length < 5) {
      return ToastAndroid.showWithGravityAndOffset(
        "Passwords too short!",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    } else if (validateEmail(email) === false) {
      return ToastAndroid.showWithGravityAndOffset(
        "Invalid email!",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    } else {
      doUserRegistration(navigation);
    }
  };

  const doUserRegistration = async (navigation) => {
    const user = new Parse.User();
    user.set("username", email);
    user.set("password", password);
    user.set("email", email);
    user.set("name", name);
    user.set("walletBalance", 0);
    try {
      await user.signUp();
      await Parse.User.logOut();
      return navigation.navigate("EmailVerificationScreen");
    } catch (error) {
      console.log(error);
      return ToastAndroid.showWithGravityAndOffset(
        "Account already exists for this email.",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    }
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
          <Text style={styles.header}>Sign up for an account</Text>
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
              <SButton
                text="Sign Up"
                onPress={() => handleButton(navigation)}
              />
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
