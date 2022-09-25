import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import styles from "../../globalStyles";
import { useState, useEffect } from "react";
import SInput from "../../components/SInput";
import SButton from "../../components/SButton";
import userImg from "../../images/userImg.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { doUserPasswordReset } from "../../navigation/functions";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const Account = () => {
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [email, setEmail] = useState("");
  const [surName, setSurName] = useState("");

  const [isFocus, setIsFocus] = useState(false);
  const [isFocusPhone, setIsFocusPhone] = useState(false);
  const [isFocussurName, setIsFocussurName] = useState(false);

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

  const handleSaveButton = ()=>{

  }
  const handlePassResetButton =()=>{
    doUserPasswordReset(email);
  }


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
                <SButton
                  text="Save Update"
                  onPress={() => handleSaveButton()}
                />
              </View>
              <View style={{ marginTop: 30 }}>
                <SButton
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
