import {
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Pressable,
} from "react-native";
import { useState } from "react";
import { Image } from "react-native";
import styles from "../globalStyles";
import { useDispatch } from "react-redux";
import Parse from "../../backend/server";
import SInput from "../components/SInput";
import { ToastAndroid } from "react-native";
import SButton from "../components/SButton";
import loginImage from "../images/loginImg.png";
import { toggleActive } from "../redux/features/auth";
import { validateEmail } from "../navigation/functions";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusPass, setIsFocusPass] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.trim());
  };
  const handlePassword = (e) => {
    setPassword(e.trim());
  };
  const dispatch = useDispatch();
  const handleButton = () => {
    Keyboard.dismiss();

    if (validateEmail(email) === true) {
      doUserLogIn(navigation);
    } else {
      ToastAndroid.showWithGravityAndOffset(
        `Invalid email.`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    }
  };

  const doUserLogIn = async (navigation) => {
    const user = new Parse.User();
    user.set("username", email);
    user.set("password", password);
    return await user
      .logIn()
      .then(async (loggedInUser) => {
        const currentUser = await Parse.User.currentAsync();
        if (loggedInUser === currentUser) {
          if (loggedInUser.get("emailVerified") === true) {
            ToastAndroid.showWithGravityAndOffset(
              `Hi, ${loggedInUser.get("name")} you successfully signed in!`,
              ToastAndroid.LONG,
              ToastAndroid.TOP,
              25,
              50
            );
            return dispatch(toggleActive());
          } else {
            // if use not verified
            return navigation.navigate("EmailVerificationScreen");
          }
        } else {
          // if users do not match we logout and display the massage
          await Parse.User.logOut();
          return ToastAndroid.showWithGravityAndOffset(
            "Some error occured please try again.",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
          );
        }
      })
      // if error occures during login
      .catch((error) => {
        console.log(error); //Watch out
        return ToastAndroid.showWithGravityAndOffset(
          "Invalid username/password.",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50
        );
      });
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
              <SButton
                text="Sign In"
                onPress={() => handleButton(navigation)}
              />
              <View style={[styles.inlineText]}>
                <Text style={[styles.greyText]}>New to Bulky ?</Text>
                <Pressable
                  onPress={() => navigation.navigate("RegisterScreen")}
                >
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
