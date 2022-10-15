import {
  PAYFAST_ID,
  PAYFAST_KEY,
  PAYFAST_PASSPHRASE,
} from "../../../backend/env.vars";
import Parse from "../../../backend/server";
import { sendEmail } from "../../navigation/functions";
import { useNavigation } from "@react-navigation/native";
import { PayFastWebView } from "react-native-payfast-gateway";
import { Alert, StyleSheet, ToastAndroid, View } from "react-native";

const PaymentScreen = ({ route }) => {
  const nav = useNavigation();
  const { name, surname, email, phone, depositAmount, id, balance, user } =
    route.params;

  const onceOffPayment = {
    merchant_id: PAYFAST_ID,
    merchant_key: PAYFAST_KEY,
    email_confirmation: 1,
    confirmation_address: "beyourownbossdsw@gmail.com",
    custom_str1: id,
    custom_str2: balance,

    item_name: `Bulky Deposits ${id}`,
    amount: depositAmount,
    name_first: name,
    name_last: surname,
    email_address: email,
    cell_number: phone,
  };

  const handleResponse = async (response) => {
    if (response === true) {
      try {
        await Parse.Cloud.run("updateUserBalance", {
          objectId: id,
          deposit: depositAmount,
          balance,
        });
        try {
          const transacton = new Parse.Object("transactionHistory");
          transacton.set("transactionName", "Deposit");
          transacton.set("transactionAmount", parseInt(depositAmount));
          transacton.set("status", "proccessed");
          transacton.set("userId", user);

          let newBalance = balance + depositAmount;
          newBalance = parseInt(newBalance).toFixed(2);
          const massage = `We have recieved your deposit of R ${depositAmount}. Your new balance is R 
          ${newBalance} in your wallet. Please allow up-to 10 minutes for it to update. If it doesn't update please reply to this email.`;

          await transacton.save();
          sendEmail(email, name, massage, false);
          return Alert.alert(
            "Success.",
            "Deposited successfully. Please allow up-to 10 minutes for it to update.",
            [{ text: "OK", onPress: () => {} }],
            { cancelable: false }
          );
        } catch (err) {
          return Alert.alert(
            "Attention.",
            "Some error occured. Please allow up-to 10 minutes for balance to update. If it does't please contact us.",
            [{ text: "OK", onPress: () => {} }],
            { cancelable: false }
          );
        }
      } catch (err) {
        return ToastAndroid.showWithGravityAndOffset(
          "Some error occured please try again.",
          ToastAndroid.LONG,
          ToastAndroid.TOP,
          25,
          50
        );
      }
    }
    return ToastAndroid.showWithGravityAndOffset(
      "Transaction failed.",
      ToastAndroid.LONG,
      ToastAndroid.TOP,
      25,
      50
    );
  };

  return (
    <View style={styles.container}>
      <PayFastWebView
        sandbox={false}
        onClick={() => nav.navigate("Wallet")}
        callback={handleResponse}
        signature={false}
        data={onceOffPayment}
        passphrase={PAYFAST_PASSPHRASE}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 0,
  },
  btnWrapper: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    margin: 10,
  },
});

export default PaymentScreen;
