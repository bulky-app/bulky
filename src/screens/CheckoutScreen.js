import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { clear } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../components/SButton";
import { ScrollView } from "react-native-gesture-handler";
import { cartTotalPriceSelector } from "../redux/selectors";
import { useState, useCallback } from "react";
import { Entypo } from "@expo/vector-icons";
import { Text } from "react-native";
import { ToastAndroid } from "react-native";
import Parse from "../../backend/server";
import { Feather } from "@expo/vector-icons";

const CheckoutScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector(cartTotalPriceSelector);

  const [active, setActive] = useState(false);
  const [address, setAdress] = useState({
    street: "",
    res: "",
    note: "",
  });
  const [balance, setBalance] = useState({});
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();

  useFocusEffect(
    useCallback(() => {
      const currentUser = async () => {
        try {
          await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
          const user = Parse.User.current();
          setUserId(user.id);

          try {
            const updatedUserDetails = await Parse.Cloud.run("getUserDetails", {
              objectId: user.id,
            });
            setUser(updatedUserDetails);
            return setBalance(
              updatedUserDetails.get("walletBalance").toFixed(2)
            );
          } catch (e) {
            return setBalance(user.get("walletBalance").toFixed(2));
          }
        } catch (error) {
          return error;
        }
      };

      const currentUserAddress = async () => {
        try {
          const query = new Parse.Query("userAddresses");
          query.contains("userId", userId);
          const queryResult = await query.find();
          console.log(queryResult);
          const res = queryResult[0].get("resName");
          const note = queryResult[0].get("notes");
          const street =
            queryResult[0].get("streetAddresses") +
            " " +
            queryResult[0].get("suburbName");
          setAdress({ res, street, note });

          return true;
        } catch (error) {
          return ToastAndroid.showWithGravityAndOffset(
            "Connect to the internet and try again.",
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50
          );
        }
      };
      currentUser();
      currentUserAddress();
    }, [active])
  );

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView>
        {/* {Cart summary} */}
        <View style={localStyles.card}></View>
        {/* {Address} */}
        <View style={localStyles.card}>
          <View style={localStyles.card.address.icon}>
            <View>
              <Entypo name="address" size={24} color="grey" />
              <Text style={localStyles.card.address.left.text}>Address</Text>
            </View>
            <View style={localStyles.card.address}>
              <Text>
                Residence Name:
                <Text style={localStyles.card.address.text}>{address.res}</Text>
              </Text>
              <Text>
                Street Address:
                <Text style={localStyles.card.address.text}>
                  {address.street}
                </Text>
              </Text>
              <Text>
                Note:
                <Text style={localStyles.card.address.text}>
                  {address.note}
                </Text>
              </Text>
            </View>
          </View>
          <View style={localStyles.card.address.right}>
            <Feather name="edit" size={30} color="black" />
          </View>
        </View>
        {/* {Transaction details} */}
        <View style={localStyles.card}></View>

        <View>
          <LoadingButton
            text="Pay"
            onPress={() => navigation.navigate("Checkout")}
          />
          <View style={localStyles.separator}></View>
          <LoadingButton
            text="Cancel"
            onPress={() => navigation.navigate("Cart")}
            outline={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default CheckoutScreen;

const localStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingVertical: 20,
    margin: 10,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "white",
    alignContent: "center",
    alignItems: "flex-start",
    elevation: 3,
    address: {
      fontSize: 18,
      text: {
        fontWeight: "400",
      },
      right: {
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      },
      left: {
        textAlign: "center",
        alignContent: "center",
        //alignItems: "center",
        justifyContent: "center",
        text: {
          fontSize: 18,
          fontWeight: "600",
        },
      },
    },
  },
  separator: { marginVertical: 10 },
});
