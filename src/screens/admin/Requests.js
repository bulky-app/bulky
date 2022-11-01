import styles from "../../globalStyles";
import Parse from "../../../backend/server";
import { StatusBar } from "expo-status-bar";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { copyToClipboard } from "../../components/ProfileCard";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Text, View, RefreshControl, ToastAndroid } from "react-native";

const Requests = () => {
    const [data, setData] = useState();
    const [saved, setSaved] = useState(0)
    const [refreshing, setRefershing] = useState(false)

    async function fetchData() {
        const query = new Parse.Query("requests");
        query.equalTo("complete", false)
        try {
            const queryResult = await query.find();
            setData(queryResult);
            setRefershing(false)
        } catch (error) {
            setRefershing(false)
            return error;
        }
    }

    useFocusEffect(useCallback(
        () => {
            fetchData()
        },
        [saved],
    )
    )

    const markComplete = (userId) => {
        const mark = new Parse.Object("requests");
        mark.set("objectId", userId)
        mark.set("complete", true);

        try {
            mark.save();
            setSaved(prev => prev + 1);
            ToastAndroid.showWithGravityAndOffset(
                "Saved!",
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                50,
                25
            )
        } catch (error) {
            return ToastAndroid.showWithGravityAndOffset(
                "Error saving! Try again.",
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
                50,
                25
            )
        }
    };

    return (
        <View>
            <StatusBar style="dark" />
            <FlatList
                data={data}
                renderItem={({ item }) => <ListItem data={item} update={markComplete} />}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        enabled={true}
                        refreshing={refreshing}
                        onRefresh={() => setSaved(prev => prev + 1)}
                    />
                }
                ListEmptyComponent={<Text style={localStyle.emptyText}>No new massages at this moment</Text>}
            />
        </View>
    );
};

export default Requests;

const ListItem = ({ data, update }) => {
    const userId = data.get("userId")?.id;

    return (
        <View style={localStyle.card}>
            <View>
                <View style={localStyle.card.group} >
                    <Text style={localStyle.card.group.text}>ID:</Text>
                    <Copyable text={data.id} />
                </View>
                <View style={localStyle.card.group} >
                    <Text style={localStyle.card.group.text}>Name:</Text>
                    <Text style={localStyle.card.group.text.info}>{data.get("name")}</Text>
                    <Copyable text={userId} />
                </View>
                <View style={localStyle.card.group} >
                    <Text style={localStyle.card.group.text}>Email:</Text>
                    <Copyable text={data.get("email")} />
                </View>
                <View style={localStyle.card.group} >
                    <Text style={localStyle.card.group.text}>Ref:</Text>
                    <Copyable text={data.get("reference")} />
                </View>
                <View style={localStyle.card.group} >
                    <Text style={localStyle.card.group.text}>Topic:</Text>
                    <Text style={localStyle.card.group.text.info}>{data.get("topic")}</Text>
                </View>
                <View style={localStyle.card.group} >
                    <Text style={localStyle.card.group.text}>Massage:</Text>
                    <Text style={localStyle.card.group.text.info}>{data.get("massage")}</Text>
                </View></View><View>
                <TouchableOpacity onPress={() => update(data.id)}>
                    <MaterialCommunityIcons name="sticker-check-outline" size={26} color={styles.purpleText.color} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const localStyle = StyleSheet.create({
    card: {
        flex: 1,
        margin: 10,
        elevation: 3,
        borderRadius: 10,
        paddingVertical: 15,
        borderColor: "black",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "white",
        justifyContent: "space-between",
        group: {
            flex: 1,
            flexDirection: "row",
            text: {
                fontSize: 16,
                fontWeight: "600",
                marginRight: 5,
                marginVertical: 2,
                info: {
                    fontSize: 16,
                    marginVertical: 2,
                }
            }
        }
    },
    emptyText:{
        fontSize: 20,
        marginTop: 20,
        fontWeight: "700",
        textAlign: "center",
    }
})

export const Copyable = ({ text }) => {
    return (
        <TouchableOpacity onPress={() => copyToClipboard(text.id)}>
            <Text style={localStyle.card.group.text.info}>{text}</Text>
        </TouchableOpacity>
    )
}