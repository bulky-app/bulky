import styles from "../../globalStyles";
import { SSButton } from "../../components/SButton";
import { Text, View, StyleSheet } from "react-native";
import HistoryItem from "../../components/HistoryItem";
import { styless } from "../../components/ProfileCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";

const Wallet = () => {
  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        { position: "relative", alignItems: "center" },
      ]}
    >
      <View style={[localStyles.walletCard, styless.profileCard.boxWithShadow]}>
        <Text style={localStyles.walletCard.leftText}>Wallet balance:</Text>
        <Text style={localStyles.walletCard.rightText}>R 800.59</Text>
      </View>

      <View style={localStyles.table}>
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
            <HistoryItem
              amount={800.59}
              date="2021/10/20 - 15:23"
              type="Deposit"
            />
          </ScrollView>
        </View>
      </View>
      <View style={localStyles.buttons}>
        <SSButton
          text="Withdraw"
          click={() => console.log("Im clicked")}
          outline={true}
        />
        <SSButton
          text="Deposit"
          click={() => console.log("Im clicked")}
          outline={false}
        />
      </View>
    </SafeAreaView>
  );
};
export default Wallet;

const localStyles = StyleSheet.create({
  walletCard: {
    flexDirection: "row",
    paddingHorizontal: 22,
    paddingVertical: 15,
    width: "100%",
    justifyContent: "space-between",
    elevation: 4,
    backgroundColor: styles.blackWhiteText.color,
    borderRadius: 10,
    marginVertical: 10,
    leftText: {
      fontWeight: "800",
      fontSize: 20,
    },
    rightText: {
      color: styles.purpleText.color,
      fontWeight: "800",
      fontSize: 20,
    },
  },
  table: {
    marginTop: 20,
    head: {
      flexDirection: "row",
      paddingVertical: 10,
      justifyContent: "space-between",
      backgroundColor: styles.blackWhiteText.color,
      color: styles.greyText.color,
      data: {
        width: 100,
        textAlign: "center",
      },
    },
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
});
