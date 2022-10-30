import { Text, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import Parse from "../../../backend/server";
import { useState, useCallback } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderHistoryItemAdmin } from "../../components/OrderHistoryItem";

const Orders = () => {
    const [data, setData] = useState([])
    const [update, setupdate] = useState(false)

    useFocusEffect(
        useCallback(() => {
            const getOrders = async () => {
                const orders = new Parse.Query("orders");
                orders.equalTo("orderStatus", "Paid");
                try {
                    const response = await orders.find()
                    setData(response)
                } catch (error) {
                    Alert.alert("Error", error.massage)
                }
            }
            return () => getOrders();
        }, [update])
    );

    return (
        <SafeAreaView>
            <StatusBar style="dark" />
            <ScrollView>
                {data.length > 0 ?
                    data.map(item =>
                        <OrderHistoryItemAdmin
                            id={item.id}
                            data={item}
                            key={item.id}
                            date={item.get("createdAt")}
                            total={item.get('totalPrice')}
                            quantity={item.get("quantity")}
                            status={item.get("orderStatus")}
                        />
                    )
                    :
                    <Text>No orders</Text>}
            </ScrollView>
        </SafeAreaView>
    );
};
export default Orders;