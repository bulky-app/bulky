import styles from "../../globalStyles";
import * as Location from "expo-location";
import Parse from "../../../backend/server";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import SInput from "../../components/SInput";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useIsFocused, useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown';
import getDirections from "react-native-google-maps-directions";
import LoadingButton, { CartButton } from "../../components/SButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StyleSheet, Text, View, Linking, KeyboardAvoidingView, Platform, ToastAndroid } from "react-native";
import { useCallback } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


navigator.geolocation = require("react-native-geolocation-service");

const OrderDetails = ({ route }) => {
    const nav = useNavigation();
    const isFocused = useIsFocused();

    const data = route.params;
    const objectId = data.get("userID").id;
    const orderStatus = data.get("orderStatus");

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState({ notes: "", streetAddress: "", resName: "" });
    const [location, setLocation] = useState({});

    const [comment, setComment] = useState("");
    const [status, setStatus] = useState(orderStatus);
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)

    useEffect(() => {
        const getlocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                ToastAndroid.showWithGravity(
                    'Permission to access location was denied',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                )
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        }

        const getUserAddress = async () => {
            const query = new Parse.Query("userAddresses");
            query.contains("userId", data.get("userID").id);
            try {
                const queryResult = await query.find()
                const updatedUserDetails = await Parse.Cloud.run("getUserDetails", {
                    objectId
                });
                setName(`${updatedUserDetails.get("name")} ${updatedUserDetails.get("surname") ? updatedUserDetails.get("surname") : " "}`)
                setEmail(updatedUserDetails.get("email"))
                setPhone(updatedUserDetails.get("phone"))
                setAddress({
                    latitude: queryResult[0].get("location"),
                    streetAddress: queryResult[0].get("streetAddresses") + queryResult[0].get("suburbName"),
                    notes: queryResult[0].get("notes"),
                    resName: queryResult[0].get("resName")
                })
            } catch (error) {
                return
            }
        }

        return () => {
            getlocation()
            getUserAddress()
            return setLoading(false)
        }
    }, [count])

    const handleGetDirections = () => {
        getDirections({
            source: {
                latitude: location?.latitude,
                longitude: location?.longitude,
            },
            destination: address.latitude,
            params: [
                {
                    key: "travelmode",
                    value: "driving",
                },
                {
                    key: "dir_action",
                    value: "navigate",
                },
            ],
            waypoints: [],
        });
    };

    const handleGetUpdate = async () => {
        const update = new Parse.Object("orders");

        update.set('objectId', data.id);
        update.set("orderStatus", status);
        update.set("comment", comment);
        try {
            await update.save();
            ToastAndroid.showWithGravity(
                "Updated successfuly.",
                ToastAndroid.SHORT,
                ToastAndroid.SHORT
            );
            return nav.navigate('Orders');
        } catch (error) {
            console.log(error)
            return ToastAndroid.showWithGravity(
                "Failed to update please try again.",
                ToastAndroid.SHORT,
                ToastAndroid.SHORT
            )
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setStatus(status);
            console.log("Ran time out"),
                setCount(prev => prev + 1)
        }, 1000);
        return () => {
            if (count < 3) clearTimeout(timer);
            return
        };

    }, []);
    return (
        <SafeAreaView>
            <StatusBar style="light" />
            {<View>
                <View style={localStyles.card}>
                    <View>
                        <Text style={localStyles.card.head}>Student Details.</Text>
                    </View>
                    <View style={localStyles.card.container}>
                        <View style={localStyles.card.cardRow}>
                            <Text style={localStyles.card.text}>
                                Name:
                                <Text style={localStyles.card.text.bold}> {name}</Text>
                            </Text>
                        </View>
                        <View>
                            <Text style={localStyles.card.text}>
                                Student ID:
                                <Text style={localStyles.card.text.bold}> {objectId}</Text>
                            </Text>
                        </View>
                        <View>
                            <Text style={localStyles.card.text}>
                                Email:
                                <Text style={localStyles.card.text.bold}>  {email}</Text>
                            </Text>
                        </View>
                        <View style={localStyles.card.cardRow}>
                            <Text style={localStyles.card.text}>
                                Phone:
                                <Text style={localStyles.card.text.bold}>  {phone}</Text>
                            </Text>
                            <TouchableWithoutFeedback
                                onPress={async () => await Linking.openURL(`tel:${phone}`)}
                            >
                                <Feather name="phone-outgoing" size={16} color={styles.purpleText.color} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
                <View style={localStyles.card}>
                    <View>
                        <Text style={localStyles.card.head}>Address Details. </Text>
                    </View>
                    <View style={localStyles.card.container}>
                        <View style={localStyles.card.cardRow}>
                            <Text style={localStyles.card.text}>
                                Residence Name:
                                <Text style={localStyles.card.text.bold}> {address.resName}</Text>
                            </Text>
                        </View>
                        <View>
                            <Text style={localStyles.card.text}>
                                Street Address:
                                <Text style={localStyles.card.text.bold}> {address.streetAddress}</Text>
                            </Text>
                        </View>
                        <View>
                            <Text style={localStyles.card.text}>
                                Notes:
                                <Text style={localStyles.card.text.bold}> {address.notes} </Text>

                            </Text>
                        </View>
                        <View style={localStyles.card.cardRow}>
                            <CartButton text="Directions" onPress={() => handleGetDirections()} />
                        </View>
                    </View>
                </View>
                <View style={localStyles.card}>
                    <View>
                        <Text style={localStyles.card.head}>Update Order.</Text>
                    </View>
                    <View style={localStyles.card.container}>
                        <SelectDropdown
                            data={["Delivered", "Awaiting Delivery", "Paid", "Canceled"]}
                            defaultValue={status}
                            onSelect={(selectedItem, index) => {
                                setStatus(selectedItem)
                            }}
                            buttonStyle={
                                {
                                    borderRadius: 10,
                                    padding: 0,
                                    height: 40,
                                    width: 240,
                                    marginTop: 10
                                }
                            }
                            buttonTextStyle={{
                                fontSize: 14,
                                textAlign: "left"
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />
                        <SInput
                            isSercure={false}
                            keyboard="default"
                            placeholderTxt="Comment"
                            value={comment}
                            handleChange={e => setComment(e)}
                        />
                    </View>

                </View>
                <View style={localStyles.container.btn}>
                    <LoadingButton text="Update Order" onPress={() => handleGetUpdate()} />
                </View>
            </View>}
        </SafeAreaView>
    );
};
export default OrderDetails;

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
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
        head: {
            fontSize: 20,
            fontWeight: "900",
            color: styles.purpleText.color,
        },
        container: {
            paddingHorizontal: 10
        },
        text: {
            fontSize: 16,
            paddingVertical: 2,
            bold: {
                fontWeight: "900",
            },
        },
        cardRow: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 5
        },
        btn: {
            justifyContent: "center",
            alignItems: "center"
        }
    },

});
