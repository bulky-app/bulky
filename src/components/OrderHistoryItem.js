import { Feather, Ionicons } from "@expo/vector-icons";
import { copyToClipboard, styless } from "./ProfileCard";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OrderHistoryItem = ({ date, id, status }) => {
  let textStyle = "";
  if (status.toLowerCase() === "awaiting delivery") {
    textStyle = localStyles.awaitting;
  } else if (status.toLowerCase() === "paid") {
    textStyle = localStyles.paid;
  } else {
    textStyle = localStyles.delivered;
  }
  date = date.toString().substring(4, 21);
  return (
    <View style={localStyles.container}>
      <View style={localStyles.container.outer}>
        <Feather name="box" size={24} color="black" />
      </View>
      <View style={localStyles.container.middle}>
        <Text style={localStyles.idCover}>
          Order ID:{" "}
          <TouchableOpacity
            onPress={() => copyToClipboard(id)}
            activeOpacity={0.5}
            style={localStyles.clip}
          >
            <Text style={localStyles.id}>
              {`${id.toUpperCase()} `}
              <Ionicons name="copy-outline" size={12} color="black" />
            </Text>
          </TouchableOpacity>
        </Text>
        <Text style={localStyles.container.middle.text}>{date.toString()}</Text>
        <View style={localStyles.group}>
          <Text style={[localStyles.container.middle.text, textStyle]}>
            {status}
          </Text>
          <Text style={[localStyles.container.middle.text]}>R 255</Text>
          <Text style={[localStyles.container.middle.text]}>15</Text>
        </View>
      </View>
      <TouchableOpacity style={localStyles.container.outer}>
        <Ionicons name="chevron-forward-sharp" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};
export default OrderHistoryItem;
const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    margin: 10,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    alignItems: "center",
    elevation: 3,
    outer: { flex: 1, alignItems: "center" },
    middle: {
      width: 200,
      text: {
        fontSize: 18,
        paddingVertical: 5,
        marginRight: 7,
      },
    },
  },
  id: {
    fontSize: 14,
    color: "black",
    backgroundColor: styless.profileCard.greyText.backgroundColor,
    padding: 2,
    borderRadius: 10,
    margin: 0,
    padding: 0,
  },
  idCover: {
    alignItems: "center",
    flex: 1,
    fontSize: 18,
    alignContent: "center",
    paddingVertical: 2,
  },
  awaitting: {
    backgroundColor: "#ffe7b0",
    color: "orange",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  paid: {
    backgroundColor: "#b0dfff",
    color: "blue",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  delivered: {
    backgroundColor: "#c2ffb0",
    color: "green",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  clip: { margin: 0, padding: 0 },
  group: { flexDirection: "row" },
});
