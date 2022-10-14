import styles from "../../globalStyles";
import Parse from "../../../backend/server";
import { useState, useEffect } from "react";
import LoadingButton from "../../components/SButton";
import { Text, View, StyleSheet } from "react-native";
import HistoryItem from "../../components/HistoryItem";
import { styless } from "../../components/ProfileCard";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { TModal } from "../../components/Modal";

const Wallet = () => {
  const [user, setUser] = useState();
  const [balance, setBalance] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const currentUser = async () => {
      try {
        await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
        const user = Parse.User.current();
        const updatedUserDetails = await Parse.Cloud.run("getUserDetails", {
          objectId: user.id,
        });
        setUser(user);
        setBalance(updatedUserDetails.get("walletBalance"));

        const query = new Parse.Query("transactionHistory");
        query.contains("userId", user.id);

        const queryResult = await query.findAll();
        return setHistory(queryResult);
      } catch (error) {
        return error;
      }
    };
    currentUser();
  }, [refresh]);

  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        { position: "relative", alignItems: "center", paddingTop: 0 },
      ]}
    >
      <View style={[localStyles.walletCard, styless.profileCard.boxWithShadow]}>
        <Text style={localStyles.walletCard.leftText}>Wallet balance:</Text>
        <Text style={localStyles.walletCard.rightText}>
          R {balance.toFixed(2)}
        </Text>
      </View>

      <View style={localStyles.table}>
        <View style={{ display: "flex", justifyContent: "space-between" }}>
          <Text>*Pending</Text>
          <Text style={{ color: "red" }}>*Declined</Text>
          <Text style={{ color: "green" }}>*Processed</Text>
        </View>
        <Text style={[styles.greyText, { fontSize: 18 }]}>
          Transactions History:
        </Text>

        <View style={localStyles.table.head}>
          <Text style={localStyles.table.head.data}>Date</Text>
          <Text style={localStyles.table.head.data}>Type</Text>
          <Text style={localStyles.table.head.data}>Amount</Text>
        </View>

        <View style={{ height: 500 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {history ? (
              history.map((item) => (
                <HistoryItem
                  key={item.id}
                  status={item.get("status")}
                  date={item.get("createdAt")}
                  type={item.get("transactionName")}
                  amount={item.get("transactionAmount")}
                />
              ))
            ) : (
              <Text style={localStyles.table.head.data}>No Data</Text>
            )}
          </ScrollView>
        </View>
      </View>
      <View style={localStyles.buttons}>
        <LoadingButton
          text="Withdraw"
          onPress={() => setShowModal(true)}
          outline={true}
          small={true}
        />
        <LoadingButton
          text="Deposit"
          onPress={() => setShowModal(true)}
          outline={false}
          small={true}
        />
      </View>
      <TModal
        name="withdraw"
        other={[user, balance, refresh,setRefresh]}
        modalVisible={showModal}
        handleModal={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
};
export default Wallet;

const localStyles = StyleSheet.create({
  walletCard: {
    elevation: 3,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 15,
    flexDirection: "row",
    paddingHorizontal: 22,
    justifyContent: "space-between",
    backgroundColor: styles.blackWhiteText.color,
    leftText: {
      fontWeight: "800",
      fontSize: 20,
    },
    rightText: {
      fontSize: 20,
      fontWeight: "800",
      color: styles.purpleText.color,
    },
  },
  table: {
    marginTop: 20,
    head: {
      flexDirection: "row",
      paddingVertical: 10,
      color: styles.greyText.color,
      justifyContent: "space-between",
      backgroundColor: styles.blackWhiteText.color,
      data: {
        width: 100,
        textAlign: "center",
      },
    },
  },
  buttons: {
    bottom: 20,
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
