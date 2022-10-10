import { Alert } from "react-native";
import Parse from "../../backend/server";

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
export { validateEmail, doUserPasswordReset };
