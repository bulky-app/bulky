import { Alert } from "react-native";
import styles from "../globalStyles";
import { Keyboard } from "react-native";
import Parse from "../../backend/server";
import SInput from "../components/SInput";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useState, useCallback } from "react";
import { sendEmail } from "../navigation/functions";
import { clear } from "../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CachedImage from "react-native-expo-cached-image";
import { SafeAreaView } from "react-native-safe-area-context";
import LoadingButton, { CartButton } from "../components/SButton";
import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { cartTotalPriceSelector, cartTotalSelector } from "../redux/selectors";
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native-gesture-handler";

const CheckoutScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const cart = useSelector((state) => state.cart);
    const totalPrice = useSelector(cartTotalPriceSelector);

    const [user, setUser] = useState();
    const [userId, setUserId] = useState("");
    const [balance, setBalance] = useState(0);
    const [userInput, setUserInput] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [isFocus, setIsFocus] = useState(false);
    const [address, setAdress] = useState({
        street: "",
        res: "",
        note: "",
    });
    const delivery = 15

    const placeOrder = async () => {
        const quantity = cart.length
        const email = user.get("email")
        const name = user.get("name")
        const currentMonth = new Date().getMonth() + 1;

        const total = delivery + totalPrice - discount
        const credit = balance - (delivery + totalPrice - discount)
        const order = new Parse.Object("orders");
        order.set("items", cart)
        order.set("userID", user);
        order.set("cupon", userInput)
        order.set("totalPrice", total);
        order.set("quantity", quantity);
        order.set("discountValue", discount)
        if (balance - (delivery + discount + totalPrice) < 0) {
            order.set("orderStatus", "Awaiting Payment");
        } else {
            order.set("orderStatus", "Paid");
        }

        //Save The Order
        try {
            const result = await order.save()
            //Send confirmation Email
            if (balance - (delivery + discount + totalPrice) < 0) {
                const massage = `We have recieved your order (${result.id}), however you did not have enough balance. Please make a diposit of R 
                ${credit.toFixed(2)} for you order to be processed by the 28th of ${currentMonth}`
                sendEmail(email, name, massage)
            } else {
                const massage = `We have recieved your order (${result.id}).`
                sendEmail(email, name, massage)
            }

            //Update user balance
            await Parse.Cloud.run('depleteUserBalance', { credit, balance, objectId: userId });

            //Save cart items
            try {
                cart.map(async (item) => {
                    const query = new Parse.Query("products");
                    query.equalTo("objectId", item.id);
                    const id = await query.find()
                    const singleItem = new Parse.Object("orderItems");
                    id.map(i => singleItem.set("productId", i))
                    singleItem.set("productQuantity", `${item.quantity}`);
                    singleItem.set("orderID", result);
                    await singleItem.save()
                })
            } catch (error) {
            }

            //Save transaction
            const transaction = new Parse.Object("transactionHistory");
            transaction.set("status", "processed");
            transaction.set("transactionAmount", total);
            transaction.set("transactionName", "Purchase");
            transaction.set("userId", user)
            try {
                await transaction.save()
            } catch (error) {
                return
            }

            Alert.alert("Order Recived",
                "We have sent you an email with there verification of the order. If the are some abnormalies please contact us urgently."
            )
            //Clean the cart
            dispatch(clear())
            return navigation.navigate("Tabs")
        } catch (error) {
            Alert.alert("Error",
                error.massage
            )
        }
    }

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
                        ToastAndroid.SHORT,
                        ToastAndroid.TOP,
                        25,
                        50
                    );
                }
            };
            currentUser();
            currentUserAddress();
        }, [1])
    ), [1];

    const applyDiscount = () => {
        if (userInput === "bulky100") {
            return setDiscount(100)
        }
        if (userInput === "bulky10") {
            return setDiscount(10 / 100 * totalPrice)
        }
        return ToastAndroid.showWithGravityAndOffset(
            "invalid cupon code.",
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            25,
            50
        );
    }

    return (
        <SafeAreaView>
            <StatusBar style="light" />
            <ScrollView>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* {Cart summary} */}
                    <View style={localStyles.card}>
                        <Text style={localStyles.card.cart.head}>Cart Summary</Text>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {cart?.map((item) => (
                                <CachedImage
                                    key={item.id}
                                    style={{
                                        height: 60,
                                        width: 60,
                                        alignSelf: "center",
                                        marginBottom: 10,
                                    }}
                                    source={{ uri: item.image }}
                                />
                            ))}
                        </ScrollView>
                    </View>
                    {/* {Address} */}
                    <View style={localStyles.card}>
                        <Text style={localStyles.card.cart.head}>Saved Address</Text>
                        <View style={localStyles.card.cardRow}>
                            <View style={localStyles.card.address}>
                                <Text style={localStyles.card.address}>
                                    Residence Name:
                                    <Text style={localStyles.card.address.text}>
                                        {address.res}
                                    </Text>
                                </Text>
                                <Text style={localStyles.card.address}>
                                    Street Address:
                                    <Text style={localStyles.card.address.text}>
                                        {address.street}
                                    </Text>
                                </Text>
                                <Text style={localStyles.card.address}>
                                    Note:
                                    <Text style={localStyles.card.address.text}>
                                        {address.note}
                                    </Text>
                                </Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Address")}
                                style={localStyles.card.address.icon}
                            >
                                <Feather name="edit" size={26} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* {Discount details} */}
                    <View style={localStyles.card}>
                        <Text style={localStyles.card.cart.head}>Discount </Text>
                        <SInput
                            keyboard="default"
                            placeholderTxt="Cupon code"
                            value={setUserInput}
                            handleChange={(e) => setUserInput(e)}
                            isSercure={false}
                            focus={() => setIsFocus(true)}
                            blur={() => {
                                setIsFocus(false)
                                applyDiscount()
                            }}
                            isFocus={isFocus}
                        />
                        <Text style={localStyles.card.smallText}>Please wait few second after input well hanlde the rest.</Text>
                    </View>
                    {/* {Discount details} */}
                    <View style={localStyles.card}>
                        <Text style={localStyles.card.cart.head}>Invoice </Text>
                        <View>
                            <Text style={localStyles.card.invoice.text}>
                                Balance: {`R ${balance}`}
                            </Text>
                            <Text style={localStyles.card.invoice.text}>
                                Subtotal: {`R ${(totalPrice - (totalPrice * 15 / 100)).toFixed(2)}`}
                            </Text>
                            <Text style={localStyles.card.invoice.text}>
                                Discount: {`R ${discount.toFixed(2)}`}
                            </Text>
                            <Text style={localStyles.card.invoice.text}>
                                VAT (15%): {totalPrice * 15 / 100}
                            </Text>
                            <Text style={localStyles.card.invoice.text}>
                                Delivery: R15.00
                            </Text>
                            <Text style={[localStyles.card.invoice.text, localStyles.card.invoice.bold]}>
                                Total: {`R ${(totalPrice + 15 - discount).toFixed(2)}`}
                            </Text>
                            <Text style={[localStyles.card.invoice.text, localStyles.card.invoice.purple]}>
                                You are saving: {`R ${(10 + discount + (totalPrice * 10 / 100)).toFixed(2)}`}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <LoadingButton
                            text="Place Order"
                            onPress={() => placeOrder()}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </SafeAreaView>
    );
};
export default CheckoutScreen;

const localStyles = StyleSheet.create({
    card: {
        elevation: 3,
        marginTop: 0,
        marginBottom: 20,
        borderRadius: 10,
        paddingVertical: 20,
        borderColor: "black",
        marginHorizontal: 10,
        paddingHorizontal: 30,
        alignContent: "center",
        alignItems: "flex-start",
        backgroundColor: "white",
        smallText: {
            color: styles.greyText.color,
            fontSize: 12,
        },
        cardRow: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
        },
        address: {
            icon: {
                marginHorizontal: 10,
                paddingLeft: 10,
                paddingVertical: 10,
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
            },
            fontSize: 16,
            marginRight: 10,
            text: {
                fontWeight: "400",
                fontSize: 16,
            },
            rightCol: {
                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
            },
        },
        cart: {
            head: {
                marginBottom: 10,
                fontSize: 16,
                fontWeight: "600",
            },
        },
        invoice: {
            text: {
                fontSize: 18,
            },
            purple: {
                color: styles.purpleText.color
            }, bold: { fontWeight: "bold" }
        }
    },
    separator: { marginVertical: 10 },
});
