import emailjs from "@emailjs/browser";
import Parse from "../../backend/server";
import { Alert, ToastAndroid } from "react-native";
import { EMAIL_JS_KEY } from "../../backend/env.vars";

const validateEmail = (email) => {
  const validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(validRegex) ? true : false;
};

const doUserPasswordReset = async function (email) {
  const emailValue = email;
  return await Parse.User.requestPasswordReset(emailValue)
    .then(() => {
      Alert.alert(
        "Success!",
        `Please check ${email} to proceed with password reset.`
      );
      return true;
    })
    .catch((error) => {
      Alert.alert("Error!", error.message);
      return false;
    });
};

const sendEmail = async (email, name, massage, alert) => {
  await emailjs
    .send(
      "service_ilxto2k",
      "template_96m2ygb",
      {
        to_name: name,
        message: massage,
        to_email: email,
      },
      EMAIL_JS_KEY
    )
    .then((response) => {
      console.log(response);
      if (alert === true) {
        return Alert.alert(
          "Success!",
          `Please check your eail ${email} for further infomation.`
        );
      }
      ToastAndroid.showWithGravityAndOffset(
        "An email has been sent to you.",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    })
    .catch((e) => console.log(e));
};
export { validateEmail, doUserPasswordReset, sendEmail };
