import React, {useState} from "react";
import { ProfileCard , styless } from "../../components/ProfileCard";
import SInput from "../components/SInput";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../globalStyles";
import { Image, Text , View ,Keyboard , KeyboardAvoidingView, TouchableWithoutFeedback, Alert,} from "react-native";
import userImg from "../images/userImg.png";
import { SSButton } from "../../components/SButton";
import Ionicons from "@expo/vector-icons";


const EditProfile = ({navigation}) => {
    const [show, setShow] = useState(true);
    const [fname, setfName]= useState("");
    const [lname , setlName]= useState("");
    const [phonenumber, setPhoneNumber]= useState ("");
    const [isFocus, setIsFocus] = useState(false);
    const [isFocusName, setIsFocusName] = useState(false);
    const [ userdetails , setUserDetails] = useState("");
    const [saved ,setSaved] = useState([]);

    const handlefName = (e) => {
        setfName(e.trim());
        fname.length > 3 && setShow(false);
      };

      const handlelName = (e) => {
        setlName(e.trim());
        lname.length > 3 && setShow(false);
      };

      const handlePhoneNumber = (e) => {
        setPhoneNumber(e.trim());
        phonenumber.length < 10 && setShow(false);
      };
      const handleFocus = () => {
        setIsFocus(true);
      };
      const handleBlur = () => {
        setIsFocus(false);
      };
      const handleFocusName = () => {
        setIsFocusName(true);
      };
      const handleBlurName = () => {
        setIsFocusName(false);
      };

      const handleOnSave= (userdetails) => {
        const newUserDetails = [...saved , userdetails]
        setSaved(newUserDetails);

        const userdetails = JSON.stringify(newUserDetails);

        SaveUserDetails( "saved successfully" , userdetails)
        .then((res) => {
          console.warn("saved successfully" ,res);
          console.catch((e) => console.warn(e));
        });
      }
    return (
        <SafeAreaView
      style={[
        styles.safeContainer, { position: "relative", alignItems: "center", paddingTop: 0 }
      ]}>
    <Image style={styless.profileCard.imageIcon} source={userImg} />
    
    <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.innerContainer}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
                <Text>First Name</Text>
              <SInput
                placeholderTxt="First Name"
                isSercure={false}
                keyboard="default"
                handleChange={handlefName}
                focus={handleFocusName}
                blur={handleBlurName}
                isFocus={isFocusName}
              />
              <Text>Last Name</Text>
              <SInput
                placeholderTxt="Last Name"
                isSercure={false}
                keyboard="default"
                handleChange={handlelName}
                focus={handleFocus}
                blur={handleBlur}
                isFocus={isFocus}
              />
              <Text>Phone Number</Text>
              <SInput
                  placeholderTxt="000-000-0000"
                  isSercure={false}
                  keyboard="phone-pad"
                  handleChange={handlePhoneNumber}
                  focus={handleFocus}
                  blur={handleBlur}
                  isFocus={isFocus}
                  value={phone}
                />
              </View>
              </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
              <View style={otherStyles.buttonss}>
             <SSButton style={[otherStyles.purpleText]}
               text="Reset Password"
               click={() => console.log("Im clicked")}
               outline={true}
               icon={<Ionicons name="time-outline" size={24} color="black" />}
               onPress = {() => {}}
             />
            <SSButton
              text="Save"
              click={() => console.log("Im clicked")}
              outline={false}
              icon={<Ionicons name="save-outline" size={24} color="black" />}
              onPress = {() =>handleOnSave (Alert.alert ("Saved Successfully"))}
             />
             </View>
    </SafeAreaView>
    )
}
export default EditProfile;

const otherStyles = StyleSheet.create({
    buttonss: {
        flexDirection: "row",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 20,
        width: "100%",
      },
      purpleText: {
        color: styles.purpleText.color,
        textAlign: "center",
        fontSize: 24,
      },
    });