import styles from "../../globalStyles";
import { useState, useEffect } from "react";
import Parse from "../../../backend/server";
import { StatusBar } from "expo-status-bar";
import SInput from "../../components/SInput";
import LoadingButton from "../../components/SButton";
import { TextInput } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendEmail, validateEmail } from "../../navigation/functions"
import { Text, View, StyleSheet, KeyboardAvoidingView, ToastAndroid, Linking, Pressable } from "react-native";

const Help = () => {
  const [user, setUser] = useState()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [topic, setTopic] = useState('')
  const [massage, setMassage] = useState('')
  const [focus, setFocus] = useState(false)
  const [reference, setReference] = useState("")

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
        const user = Parse.User.current();

        setUser(user);
        setName(user.get("name"));
        setEmail(user.get("email"));
        return true;
      } catch (error) {
        return ToastAndroid.showWithGravityAndOffset(
          "Error connecting to server, check your internet connection.",
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50
        );
      }
    }
    return () => {
      getUserDetails()
    }
  }, [focus])


  const handlePress = async () => {
    if (name.length === 0) return ToastAndroid.showWithGravityAndOffset(
      "Please enter your name.",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      50,
      25
    )

    if (!validateEmail(email)) return ToastAndroid.showWithGravityAndOffset(
      "Invalid email.",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      50,
      25
    )
    if (massage.length < 5) return ToastAndroid.showWithGravityAndOffset(
      "Please eneter more discriptive massage.",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      50,
      25
    )

    const request = new Parse.Object("requests");
    request.set("name", name)
    request.set("email", email)
    request.set("userId", user)
    request.set("topic", topic)
    request.set("massage", massage)
    request.set("reference", reference)

    try {
      const id = await request.save()
      sendEmail(
        email,
        name,
        `Good day${name}, We have recieved your massage please allow us up-to 12 hours to get back to you. Ticket No: ${id.id}`,
        true
      )
      setTopic("")
      setMassage("")
      setReference("")
    } catch (error) {
      return ToastAndroid.showWithGravityAndOffset(
        "Some erreor occured please try again.",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        50,
        25
      )
    }
  }

  return (
    <SafeAreaView
      style={[
        styles.safeContainer, { paddingTop: -10, marginTop: 0, paddingHorizontal: 40 }
      ]}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={
          { position: "relative", alignItems: "center", paddingTop: -10, marginTop: 0 }
        }
      >
        <Text style={localStyles.headerText}>Leave us a massage</Text>
        <View>
          <Text style={localStyles.headText}>Name:</Text>
          <SInput
            placeholderTxt="Name"
            keyboard="default"
            handleChange={e => setName(e)}
            value={name}
            focus={() => setFocus(!focus)} />
        </View>
        <View>
          <Text style={localStyles.headText}>Email:</Text>
          <SInput
            placeholderTxt="Email"
            keyboard="email-address"
            handleChange={e => setEmail(e)}
            value={email} />
        </View>
        <View>
          <Text style={localStyles.headText}>Help with:</Text>
          <SelectDropdown
            data={["Deposit", "Withrawal", "Order", "New Product", "App"]}
            buttonStyle={localStyles.selection.button}
            buttonTextStyle={localStyles.selection.text}
            onSelect={(selcted, index) => setTopic(selcted)}
            rowStyle={{ height: 40, padding: 0 }}
          />
        </View>
        {topic === "App" || topic === "New Product" ? null : <View>
          <Text style={localStyles.headText}>Reference:</Text>
          <SInput
            placeholderTxt={topic === "Deposit" ? "Deposit date" : topic === "Withrawal" ? "Withrawal date" : "Order ID"}
            keyboard="default"
            handleChange={e => setReference(e)}
            value={reference}
          />
        </View>}
        <View>
          <Text style={localStyles.headText}>Massage:</Text>
          <TextInput
            style={localStyles.textInput}
            onChangeText={e => setMassage(e)}
            multiline={true}
            numberOfLines={4}
            value={massage}
            placeholder={topic === "New Product" ? "Enter product description. E.g. '2kg Tastic Parboiled rice'" : "Massage"}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <LoadingButton onPress={() => handlePress()} text="Submit" />
        </View>
      </KeyboardAvoidingView>
      <View style={localStyles.contacts}>
        <Text style={localStyles.headerText}>Contas Us</Text>
        <Pressable onPress={async () => await Linking.openURL("mailto:help@bulky.co.za")}>
          <Text style={localStyles.contacts.text}>
            Email us:
            <Text style={localStyles.contacts.text.link}> help@bulky.co.za</Text>
          </Text>
        </Pressable>
        <Pressable onPress={async () => await Linking.openURL('tel:0111234567')}>
          <Text style={localStyles.contacts.text}>
            Call us:
            <Text style={localStyles.contacts.text.link}> 011 123 4567</Text>
          </Text>
        </Pressable>
        <Pressable onPress={async () => await Linking.openURL("https://wa.me/27681721606")}>
          <Text style={localStyles.contacts.text}>
            WhatsApp:
            <Text style={localStyles.contacts.text.link}> 068 172 1606</Text>
          </Text>
        </Pressable>
        <Pressable onPress={async () => await Linking.openURL("https://bulky.b4a.app")}>
          <Text style={localStyles.contacts.text}>
            Website:
            <Text style={localStyles.contacts.text.link}> www.bulky.b4a.app</Text>
          </Text>
        </Pressable>
        <Pressable onPress={async () => await Linking.openURL("https://goo.gl/maps/4oxpV5HAuY16Ngqd6")}>
          <Text style={localStyles.contacts.text}>
            Visit us:
            <Text style={localStyles.contacts.text.link}> 37 Bunting Road, Cottesloe, Johannesburg, 2092</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
export default Help;

const localStyles = StyleSheet.create({
  headText: {
    padding: 0,
    marginBottom: -10
  },
  headerText: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
    textAlign: "center"
  },
  textInput: {
    borderColor: "#000000",
    borderWidth: 1,
    borderColor: "#E3E5E5",
    marginVertical: 5,
    width: 272,
    backgroundColor: "#fbfafc",
    color: "black",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16, marginVertical: 15,
  },
  selection: {
    button: {
      width: 272, marginVertical: 15,
      height: 40,
      borderColor: "#000000",
      borderWidth: 1,
      borderColor: "#E3E5E5",
      backgroundColor: "#fbfafc",
      color: "black",
      borderRadius: 8,
      paddingVertical: 0,
      paddingHorizontal: 16,
    },
    text: {
      fontSize: 12,
    },

  }, contacts: {
    marginTop: 20,
    text: {
      fontSize: 18,
      marginVertical: 5,
      link: {
        color: styles.purpleText.color,
        fontWeight: "800"
      }
    }
  }
});
