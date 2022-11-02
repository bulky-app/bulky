import { StatusBar } from "expo-status-bar";
import Parse from "../../../backend/server";
import { FlatList } from "react-native-gesture-handler";
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { OrderHistoryItemAdmin } from "../../components/OrderHistoryItem";
import { RefreshControl, Text, ToastAndroid, View, StyleSheet } from "react-native";

const Orders = () => {
    const [data, setData] = useState();
    const [saved, setSaved] = useState(0)
    const [refreshing, setRefershing] = useState(false)


    async function fetchData() {
        const orders = new Parse.Query("orders");
        const orders2 = new Parse.Query("orders");
        const orders3 = new Parse.Query("orders");
        orders.equalTo("orderStatus", "Paid");
        orders2.equalTo("orderStatus", "Awaiting Delivery");
        orders3.equalTo("orderStatus", "Awaiting Payment");
        const query = Parse.Query.or(orders, orders2, orders3);
        try {
            const response = await query.find()
            setData(response)
            return setRefershing(false)
        } catch (error) {
            console.log(error); setRefershing(false)
            ToastAndroid.showWithGravity(
                "Failed getting orders.",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            )
        }
    }

    useFocusEffect(useCallback(
        () => {
            fetchData()
        }, [saved])
    )

    return (
        <View>
            <StatusBar style="dark" />
            <FlatList
                data={data}
                renderItem={({ item }) => <OrderHistoryItemAdmin
                    id={item.id}
                    data={item}
                    key={item.id}
                    date={item.get("createdAt")}
                    total={item.get('totalPrice')}
                    quantity={item.get("quantity")}
                    status={item.get("orderStatus")}
                    showsVerticalScrollIndicator ={false}
                />
            }
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        enabled={true}
                        refreshing={refreshing}
                        onRefresh={() => setSaved(prev => prev + 1)}
                    />
                }
                ListEmptyComponent={<Text style={localStyle.emptyText}>No orders at this moment</Text>}
            />
        </View>
    );
};
export default Orders;

const localStyle = StyleSheet.create({
    emptyText: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: "700",
        textAlign: "center",
    }
})