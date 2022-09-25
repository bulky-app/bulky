import Parse from "../../backend/server";

const validateEmail = (email) => {
  var validRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(validRegex)) {
    return true;
  } else {
    return false;
  }
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
