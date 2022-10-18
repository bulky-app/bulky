import { View, Text, StyleSheet } from "react-native";
import styles from "../globalStyles";

const HistoryItem = ({ amount, date, type, status }) => {
  return (
    <View>
      <View style={localStyles.table.row}>
        <Text
          style={[
            localStyles.table.data,
            status.toLowerCase() === "declined" && { color: "red" },
            status.toLowerCase() === "processed" && { color: "green" },
          ]}
        >
          {date.toString().substring(4, 21)}
        </Text>
        <Text
          style={[
            localStyles.table.data,
            { textAlign: "center" },
            status.toLowerCase() === "declined" && { color: "red" },
            status.toLowerCase() === "processed" && { color: "green" },
          ]}
        >
          {type}
        </Text>
        <Text
          style={[
            localStyles.table.data,
            { textAlign: "center" },
            status.toLowerCase() === "declined" && { color: "red" },
            status.toLowerCase() === "processed" && { color: "green" },
          ]}
        >
          R {amount}
        </Text>
      </View>
      <View style={localStyles.divider}></View>
    </View>
  );
};
const localStyles = StyleSheet.create({
  table: {
    row: {
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 10,
      justifyContent: "space-between",
    },
    data: {
      width: 100,
      paddingVertical: 5,
    },
  },
  divider: {
    borderColor: styles.greyText.color,
    borderBottomWidth: 1,
    paddingHorizontal: 20,
  },
});

export default HistoryItem;
