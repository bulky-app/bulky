import {
  Text,
  View,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import SInput from "./SInput";
import { useState } from "react";
import styles from "../globalStyles";
import LoadingButton from "./SButton";
import Parse from "../../backend/server";
import { useDispatch } from "react-redux";
import { sendEmail } from "../navigation/functions";
import { toggleActive } from "../redux/features/auth";
import { useNavigation } from "@react-navigation/native";

const SModal = ({ handleModal, modalVisible }) => {

  const nav = useNavigation();
  const dispatch = useDispatch();

  const logout = async (nav, dispatch) => {
    try {
      await Parse.User.logOut();
      ToastAndroid.showWithGravityAndOffset(
        `Logged out successfully.`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );

      return dispatch(toggleActive());
    } catch (error) {
      () => error;
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleModal();
      }}
    >
      <View style={localStyles.bottomView}>
        <Text style={{ fontSize: 24 }}>Are you sure you want to logout?</Text>
        <View style={localStyles.modalView}>
          <Pressable
            style={localStyles.button}
            activeOpacity={0.3}
            onPress={() => logout(nav, dispatch)}
          >
            <Text style={[localStyles.textStyle, styles.dangerText]}>
              Logout
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={localStyles.lastButton}
          activeOpacity={0.3}
          onPress={() => handleModal()}
        >
          <Text style={[localStyles.textStyle, { marginLeft: 0 }]}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const TModal = ({ handleModal, modalVisible, name, other }) => {
  const [user, balance, refresh, setRefresh] = other;
  const [withdrawAmount, setWithdrawAmount] = useState(0);

  if (withdrawAmount > balance) {
    return setWithdrawAmount(balance);
  }

  const addNewTransaction = async () => {
    const transacton = new Parse.Object("transactionHistory");
    transacton.set("transactionName", "Withdrawal");
    transacton.set("transactionAmount", parseInt(withdrawAmount));
    transacton.set("status", "pending");
    transacton.set("userId", user);

    const email = user.get("email");
    const name = user.get("email");
    const massage = `We have recieved your withdral request of R ${withdrawAmount}. After it has been proccessed you will be left with R 
    ${
      balance - withdrawAmount
    } in your wallet. If you would like to cancel this withdrawal please reply to this eamil.`;

    try {
      await transacton.save();
      setRefresh(!refresh);
      handleModal();
      sendEmail(email, name, massage, false);
      return Alert.alert(
        "Success.",
        "Your withdrawal request has been recieved. Please allow up to 12 hour for it to be processed.",
        [{ text: "OK", onPress: () => {} }],
        { cancelable: false }
      );
    } catch (error) {
      return ToastAndroid.showWithGravityAndOffset(
        "Some error occured. Please try again.",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        handleModal();
      }}
    >
      <View style={localStyles.centeredView}>
        <Text style={{ fontSize: 24 }}>How much do you want to withdraw?</Text>

        <View style={localStyles.modalView}>
          <Text style={{ fontSize: 18 }}>
            Available to withdraw:{" "}
            <Text style={{ color: styles.purpleText.color }}>{balance}</Text>
          </Text>
          <SInput
            handleChange={setWithdrawAmount}
            placeholderTxt="100"
            value={withdrawAmount}
            keyboard="numeric"
          />

          {name === "withdraw" && withdrawAmount < 100 ? (
            <Text style={{ fontSize: 18 }}>Enter value above R100.00</Text>
          ) : (
            <LoadingButton
              text="Withdraw"
              onPress={() => addNewTransaction()}
            />
          )}

          {name === "deposit" && (
            <LoadingButton
              text="Deposit"
              outline={false}
              onPress={() => console.log("Deposit")}
            />
          )}
        </View>
        <Pressable
          style={localStyles.lastButton}
          activeOpacity={0.3}
          onPress={() => handleModal()}
        >
          <Text style={[localStyles.textStyle, { marginLeft: 0 }]}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  bottomView: {
    flex: 1,
    padding: 30,
    width: "100%",
    marginTop: "150%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: styles.safeContainer.backgroundColor,
    //alignItems: "center", //To be activated in future
  },
  centeredView: {
    flex: 1,
    padding: 30,
    width: "100%",
    marginTop: "80%",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: styles.safeContainer.backgroundColor,
  },
  modalView: {
    marginVertical: 30,
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  lastButton: {
    borderRadius: 20,
    paddingVertical: 10,
    alignSelf: "center",
    flexDirection: "row",
  },
  textStyle: {
    fontSize: 18,
    color: "black",
    textAlign: "center",
  },
});
export { TModal };
export default SModal;
