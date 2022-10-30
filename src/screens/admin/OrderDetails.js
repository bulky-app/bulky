import styles from "../../globalStyles";
import * as Location from "expo-location";
import Parse from "../../../backend/server";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import SInput from "../../components/SInput";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SelectDropdown from 'react-native-select-dropdown';
import getDirections from "react-native-google-maps-directions";
import LoadingButton, { CartButton } from "../../components/SButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { StyleSheet, Text, View, Linking, KeyboardAvoidingView, Platform, ToastAndroid } from "react-native";

navigator.geolocation = require("react-native-geolocation-service");

const OrderDetails = ({ route }) => {
    const data = route.params;
    const objectId = data.get("userID").id;
    const orderStatus = data.get("orderStatus");

    const [user, setUser] = useState();
    const [address, setAddress] = useState({});
    const [location, setLocation] = useState({});

    const [comment, setComment] = useState("");
    const [status, setStatus] = useState(orderStatus);


    useEffect(() => {
        const getlocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        }

        const getUserAddress = async () => {
            const query = new Parse.Query("userAddresses");
            query.contains("userId", objectId);
            try {
                const queryResult = await query.find()
                const userData = queryResult[0].get("userId")
                setUser(
                    {
                        name: `${userData.get("name")} ${!!userData.get("surname")}`,
                        email: userData.get("email"),
                        phone: userData.get("phone")
                    }
                )
                setAddress({
                    latitude: queryResult[0].get("location"),
                    streetAddress: queryResult[0].get("streetAddresses") + queryResult[0].get("suburbName"),
                    notes: queryResult[0].get("notes"),
                    resName: queryResult[0].get("resName")
                })
            } catch (error) {
                console.log(`Get user Address${error}`);
            }
        }

        return () => {
            getlocation()
            getUserAddress()
        }
    }, [objectId])

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

    const handleGetUpdate = () => {
        console.log(data.id)
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={localStyles.container}
            enabled={true}
            >
            <StatusBar style="light" />
            <View style={localStyles.card}>
                <View>
                    <Text style={localStyles.card.head}>Student Details. </Text>
                </View>
                <View style={localStyles.card.container}>
                    <View style={localStyles.card.cardRow}>
                        <Text style={localStyles.card.text}>
                            Name:
                            <Text style={localStyles.card.text.bold}>  {user?.name}</Text>
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
                            <Text style={localStyles.card.text.bold}>  {user?.email}</Text>
                        </Text>
                    </View>
                    <View style={localStyles.card.cardRow}>
                        <Text style={localStyles.card.text}>
                            Phone:
                            <Text style={localStyles.card.text.bold}>  {user?.phone}</Text>
                        </Text>
                        <TouchableWithoutFeedback
                            onPress={async () => await Linking.openURL(`tel:${user?.phone}`)}
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
                            <Text style={localStyles.card.text.bold}> {address?.resName}</Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={localStyles.card.text}>
                            Street Address:
                            <Text style={localStyles.card.text.bold}> {address?.streetAddress}</Text>
                        </Text>
                    </View>
                    <View>
                        <Text style={localStyles.card.text}>
                            Notes:
                            <Text style={localStyles.card.text.bold}> {address?.notes}
                            </Text>
                        </Text>
                    </View>
                    <View style={localStyles.card.cardRow}>
                        <CartButton text="Directions" onPress={() => handleGetDirections()} />
                    </View>
                </View>
            </View>
            <View style={localStyles.card}>
                <View>
                    <Text style={localStyles.card.head}>Update Order. </Text>
                </View>
                <View style={localStyles.card.container}>
                    <SelectDropdown
                        data={["Awaiting Delivery", "Paid", "Canceled"]}
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
                <LoadingButton text="Directions" onPress={() => handleGetUpdate()} />
            </View>
        </KeyboardAvoidingView>
    );
};
export default OrderDetails;

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
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
