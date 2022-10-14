import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  ToastAndroid,
} from "react-native";
import styles from "../../globalStyles";
import { useState, useEffect } from "react";
import Parse from "../../../backend/server";
import SInput from "../../components/SInput";
import userImg from "../../images/userImg.png";
import LoadingButton from "../../components/SButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { doUserPasswordReset } from "../../navigation/functions";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Account = () => {

  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");
  const [surName, setSurName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusPhone, setIsFocusPhone] = useState(false);
  const [isFocussurName, setIsFocussurName] = useState(false);

  useEffect(() => {
    const currentUser = async () => {
      try {
        await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
        const user = Parse.User.current();
        setUser(user);
        setName(user.get("name"));
        setEmail(user.get("email"));
        setphone(user.get("phone"));
        setSurName(user.get("surname"));
        return true;
      } catch (error) {
        return error;
      }
    };
    currentUser();
  }, [refresh]);

  const handleName = (e) => {
    setName(e.trim());
  };
  const handleSurName = (e) => {
    setSurName(e.trim());
  };
  const handlephone = (e) => {
    setphone(e.trim());
  };

  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  const handleFocusSurName = () => {
    setIsFocussurName(true);
  };
  const handleBlurSurName = () => {
    setIsFocussurName(false);
    Keyboard.dismiss();
  };
  const handleFocusPhone = () => {
    setIsFocusPhone(true);
  };
  const handleBlurPhone = () => {
    setIsFocusPhone(false);
    Keyboard.dismiss();
  };

  //Save the update
  const handleSaveButton = async () => {
    try {
      await Parse.Cloud.run('editUserProperty', {
        objectId: user.id,
        name,
        surname: surName,
        phone,
      });
      ToastAndroid.showWithGravityAndOffset(
        "Updated successfully.",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
      return setRefresh(!refresh)
    } catch (error) {
      return ToastAndroid.showWithGravityAndOffset(
        "Some error occured please try again.",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    };
  };

  const handlePassResetButton = () => {
    doUserPasswordReset(email);
  };

  return (
    <SafeAreaView style={[styles.safeContainer, { paddingTop: 0 }]}>
      <View style={[styles.container, { alignItems: "center" }]}>
        <Image
          style={{ height: 100, width: 100, marginBottom: 40 }}
          source={userImg}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.innerContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View style={{ marginVertical: 5 }}>
                <Text style={{ marginBottom: -10 }}>First Name:</Text>
                <SInput
                  placeholderTxt="Email"
                  isSercure={false}
                  keyboard="default"
                  handleChange={handleName}
                  focus={handleFocus}
                  blur={handleBlur}
                  isFocus={isFocus}
                  value={name}
                />
              </View>
              <View style={{ marginVertical: 5 }}>
                <Text style={{ marginBottom: -10 }}>Last Name:</Text>
                <SInput
                  placeholderTxt="Surname"
                  keyboard="default"
                  handleChange={handleSurName}
                  focus={handleFocusSurName}
                  blur={handleBlurSurName}
                  isFocus={isFocussurName}
                  value={surName}
                />
              </View>
              <View style={{ marginVertical: 5 }}>
                <Text style={{ marginBottom: -10 }}>Email:</Text>
                <SInput
                  placeholderTxt="Email"
                  isDisable={false}
                  value={email}
                />
              </View>
              <View style={{ marginVertical: 5 }}>
                <Text style={{ marginBottom: -10 }}>Phone Number:</Text>
                <SInput
                  placeholderTxt="069 999 8888"
                  isSercure={false}
                  keyboard="phone-pad"
                  handleChange={handlephone}
                  focus={handleFocusPhone}
                  blur={handleBlurPhone}
                  isFocus={isFocusPhone}
                  value={phone}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <LoadingButton text="Save Update"
                  onPress={() => handleSaveButton()} 
                  />
              </View>
              <View style={{ marginTop: 30 }}>
                <LoadingButton
                  text="Reset Password"
                  outline={true}
                  onPress={() => handlePassResetButton()}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};
export default Account;
