import { Text, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import Parse from "../../../backend/server";
import { useState, useCallback } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderHistoryItemAdmin } from "../../components/OrderHistoryItem";
import { ToastAndroid } from "react-native";
import { ActivityIndicator } from "react-native";
import styles from "../../globalStyles";
import { useEffect } from "react";

const Orders = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const isFocused = useIsFocused();
    const [count, setCount] = useState(0)

    useFocusEffect(
        useCallback(() => {
            setLoading(true)
            const getOrders = async () => {
                const orders = new Parse.Query("orders");
                const orders2 = new Parse.Query("orders");
                orders.equalTo("orderStatus", "Paid");
                orders2.equalTo("orderStatus", "Awaiting Delivery");
                const query = Parse.Query.or(orders, orders2);
                try {
                    const response = await query.find()
                    setData(response)
                    return setLoading(false)
                } catch (error) {
                    ToastAndroid.showWithGravity(
                        "Failed getting orders.",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    )
                }
            }
            return () => { getOrders(); setLoading(false) }
        }, [isFocused])
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(loading)
            console.log("Ran time out"),
                setCount(prev => prev + 1)
        }, 3000);
        return () => {
            if (count < 3) clearTimeout(timer);
            return
        };

    }, []);

    return (
        <SafeAreaView>
            <StatusBar style="dark" />
            <ScrollView>
                { data.length > 0 ?
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