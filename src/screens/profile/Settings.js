import styles from "../../globalStyles";
import { useDispatch } from "react-redux";
import { ToastAndroid } from "react-native";
import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDarkTheme, setDefaultTheme } from "../../redux/features/themeSlice";

const Settings = () => {
  const dispatch = useDispatch();

  const [isEnabledSMS, setIsEnabledSMS] = useState(false);
  const [isEnabledPush, setIsEnabledPush] = useState(false);
  const [isEnabledDark, setIsEnabledDark] = useState(false);
  const [isEnabledEmail, setIsEnabledEmail] = useState(false);

  useEffect(() => {
    const update = async () => {
      await AsyncStorage.getItem("email").then((value) => {
        return value === "true"
          ? setIsEnabledEmail(false)
          : setIsEnabledEmail(true);
      });
      await AsyncStorage.getItem("dark").then((value) => {
        return value === "true"
          ? setIsEnabledDark(false)
          : setIsEnabledDark(true);
      });
      await AsyncStorage.getItem("sms").then((value) => {
        return value === "true"
          ? setIsEnabledSMS(false)
          : setIsEnabledSMS(true);
      });
      await AsyncStorage.getItem("push").then((value) => {
        return value === "true"
          ? setIsEnabledPush(false)
          : setIsEnabledPush(true);
      });
    };

    update().catch((e) => {});
  }, []);

  const toggleSwitch = (name) => {
    const updateStorage = async (name, value) => {
      try {
        await AsyncStorage.setItem(name, value.toString());
      } catch (e) {
        ToastAndroid.showWithGravityAndOffset(
          `Some error occured, please try again.`,
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
          25,
          50
        );
      }
    };
    if (name === "push") {
      setIsEnabledPush(!isEnabledPush);
      return updateStorage(name, isEnabledPush);
    }
    if (name === "dark") {
      setIsEnabledDark(!isEnabledDark);
      if (!theme.darkmode) {
        dispatch(setDarkTheme());
      } else {
        dispatch(setDefaultTheme());
      }
      return updateStorage(name, isEnabledDark);
    }
    if (name === "email") {
      setIsEnabledEmail(!isEnabledEmail);
      return updateStorage(name, isEnabledEmail);
    }
    if (name === "sms") {
      setIsEnabledSMS(!isEnabledSMS);
      return updateStorage(name, isEnabledSMS);
    } else {
      return false;
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        {
          position: "relative",
          //alignItems: "center",
          marginTop: 0,
          paddingTop: 0,
        },
      ]}
    >
      <Text style={localStyles.text}>Communication Preferences</Text>
      <View style={localStyles.item}>
        <View style={localStyles.item.container}>
          <Text style={localStyles.item.text}>Email Notifications</Text>
          <Switch
            trackColor={{
              false: localStyles.item.switch.false,
              true: localStyles.item.switch.true,
            }}
            thumbColor={isEnabledEmail ? styles.purpleText.color : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch("email")}
            value={isEnabledEmail}
          />
        </View>
        <View style={localStyles.item.container}>
          <Text style={localStyles.item.text}>Push Notifications</Text>
          <Switch
            trackColor={{
              false: localStyles.item.switch.false,
              true: localStyles.item.switch.true,
            }}
            thumbColor={isEnabledPush ? styles.purpleText.color : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onChange={() => toggleSwitch("push")}
            //onValueChange={}
            value={isEnabledPush}
          />
        </View>
        <View style={localStyles.item.container}>
          <Text style={localStyles.item.text}>SMS Notifications</Text>
          <Switch
            trackColor={{
              false: localStyles.item.switch.false,
              true: localStyles.item.switch.true,
            }}
            thumbColor={isEnabledSMS ? styles.purpleText.color : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch("sms")}
            value={isEnabledSMS}
          />
        </View>
      </View>
      <Text style={localStyles.text}>App Appearance</Text>
      <View style={localStyles.item}>
        <View style={localStyles.item.container}>
          <Text style={localStyles.item.text}>Dark mode</Text>
          <Switch
            trackColor={{
              false: localStyles.item.switch.false,
              true: localStyles.item.switch.true,
            }}
            thumbColor={isEnabledDark ? styles.purpleText.color : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => toggleSwitch("dark")}
            value={isEnabledDark}
            disabled={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Settings;

const localStyles = StyleSheet.create({
  item: {
    padding: 5,
    borderBottomWidth: 0.3,
    borderBottomColor: styles.greyText.color,
    marginVertical: 20,
    container: {
      borderRadius: 20,
      marginVertical: 5,
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 15,
      justifyContent: "space-between",
      backgroundColor: styles.blackWhiteText.color,
    },
    text: { fontSize: 16 },
    switch: {
      true: styles.safeContainer.backgroundColor,
      false: "#767577",
    },
  },
  text: { fontSize: 21, fontWeight: "300" },
});
