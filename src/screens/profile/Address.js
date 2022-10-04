import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useState } from "react";
import { Input } from "@rneui/themed";
import styles from "../../globalStyles";
import React, { useEffect } from "react";
import { TextInput } from "react-native";
import Parse from "../../../backend/server";
import { ToastAndroid } from "react-native";
import SInput from "../../components/SInput";
import SButton from "../../components/SButton";
import { PLACESAPI_KEY } from "../../../backend/env.vars";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

navigator.geolocation = require("react-native-geolocation-service");

const Address = () => {

  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState("");
  const [suburb, setSuburb] = useState("");
  const [resName, setResName] = useState("");
  const [location, setLocation] = useState({});
  const [streetAddress, setStreetAddress] = useState("");


  const [isFocus, setIsFocus] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isFocusnotes, setIsFocusnotes] = useState(false);
  const [isFocussuburb, setIsFocussuburb] = useState(false);
  const [isFocuslocation, setIsFocuslocation] = useState(false);
  const [isFocussetStreetAddress, setIsFocussetStreetAddress] = useState(false);

  //Get data from DB
  useEffect(() => {
    const currentUser = async () => {
      try {
        await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
        const user = Parse.User.current();

        const query = new Parse.Query("userAddresses");
        query.contains("userId", user.id);

        const queryResult = await query.find();
        setUser(queryResult[0].id);
        setNotes(queryResult[0].get("notes"));
        setCity(queryResult[0].get("cityName"));
        setUserId(queryResult[0].get("userId"));
        setResName(queryResult[0].get("resName"));
        setSuburb(queryResult[0].get("suburbName"));
        setStreetAddress(queryResult[0].get("streetAddresses"));
        setLocation({
          latitude: queryResult[0].get("location").latitude,
          longitude: queryResult[0].get("location").longitude
        }
        );

        return true
      } catch (error) {
        return error;
      }
    };
    currentUser();
  }, [refresh]);

  const handleResName = (e) => {
    setResName(e);
  };
  const handlenotes = (e) => {
    setNotes(e.target.value);
  };
  const handlestreetAddress = (e) => {
    setStreetAddress(e);
  };
  const handlesuburb = (e) => {
    setSuburb(e);
  };
  const handlecity = (e) => {
    setCity(e);
  };
  const handleFocuslocation = () => {
    setIsFocuslocation(true);
  };
  const handleBlurlocation = () => {
    setIsFocuslocation(false);
  };
  const handleFocussuburb = () => {
    setIsFocussuburb(true);
  };
  const handleBlursuburb = () => {
    setIsFocussuburb(false);
  };
  const handleFocusnotes = () => {
    setIsFocusnotes(true);
  };
  const handleBlurnotes = () => {
    setIsFocusnotes(false);
  };
  const handleFocus = () => {
    setIsFocus(true);
  };
  const handleBlur = () => {
    setIsFocus(false);
  };
  const handleFocusstreetAddress = () => {
    setIsFocussetStreetAddress(true);
  };
  const handleBlurstreetAddress = () => {
    setIsFocussetStreetAddress(false);
  };

  //Save data to database
  const handleSave = async () => {

    const Update = new Parse.Object('userAddresses');
    Update.set('objectId', user);

    // Set new done value and save Parse Object changes
    Update.set('notes', notes);
    Update.set('userId', userId);
    Update.set('cityName', city);
    Update.set('resName', resName);
    Update.set('suburbName', suburb);
    Update.set('streetAddresses', streetAddress);
    Update.set('location', new Parse.GeoPoint(location.latitude, location.longitude));
    try {
      await Update.save();
      setRefresh(!refresh)
      return ToastAndroid.showWithGravityAndOffset(
        "Updated successfully.",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    } catch (error) {
      return ToastAndroid.showWithGravityAndOffset(
        "Some error occured please try again.",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    };
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: styles.safeContainer.backgroundColor,
        padding: 20,
        paddingTop: 0,
        height: "100%",
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 200,
          }}
        >
          <GooglePlacesAutocomplete
            placeholder="Type to start search"
            minLength={5}
            autoFocus={true}
            returnKeyType={"search"}
            listViewDisplayed="auto"
            fetchDetails={true}
            enableHighAccuracyLocation={true}
            enablePoweredByContainer={true}
            renderDescription={(row) => row.description}
            textInputProps={{
              InputComp: Input,
              leftIcon: { type: "font-awesome", name: "location-arrow" },
              errorStyle: { color: "red" },
            }}
            onPress={(data, details = null) => {
              setStreetAddress(
                details.address_components[0].long_name +
                " " +
                details.address_components[1].long_name
              );
              setSuburb(details.address_components[2].long_name);
              setCity(details.address_components[3].long_name);
              setLocation(details.geometry.location);
              setResName(details.name);
            }}
            query={{
              key: PLACESAPI_KEY,
              language: "en",
              components: "country:za",
            }}
            styles={localStyles.searchBar}
            currentLocation={true}
            currentLocationLabel="Use my current location"
          />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ marginTop: 20 }}>
            <KeyboardAvoidingView>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>
                Residence Name:
              </Text>
              <SInput
                placeholderTxt="Residence name"
                handleChange={handleResName}
                keyboardType="default"
                focus={handleFocus}
                blur={handleBlur}
                isFocus={isFocus}
                value={resName}
              />
            </KeyboardAvoidingView>

            <View tyle={{ marginTop: 40 }}>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>Address:</Text>
              <KeyboardAvoidingView>
                <SInput
                  placeholderTxt="1 Bunting Road"
                  handleChange={handlestreetAddress}
                  keyboardType="default"
                  focus={handleFocusstreetAddress}
                  blur={handleBlurstreetAddress}
                  isFocus={isFocussetStreetAddress}
                  value={streetAddress}
                />
                <SInput
                  placeholderTxt="Auckland Park"
                  handleChange={handlesuburb}
                  keyboardType="default"
                  focus={handleFocussuburb}
                  blur={handleBlursuburb}
                  isFocus={isFocussuburb}
                  value={suburb}
                />
                <SInput
                  placeholderTxt="Johannesburg"
                  handleChange={handlecity}
                  keyboardType="default"
                  focus={handleFocuslocation}
                  blur={handleBlurlocation}
                  isFocus={isFocuslocation}
                  value={city}
                />
              </KeyboardAvoidingView>
            </View>
            <View tyle={{ marginTop: 40 }}>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>Notes:</Text>
              <TextInput
                onFocus={handleFocusnotes}
                onBlur={handleBlurnotes}
                onChange={handlenotes}
                multiline={true}
                placeholder="Notes here..."
                numberOfLines={5}
                style={[
                  styles.textInput,
                  isFocusnotes && styles.textInputFocused,
                  { marginBottom: 40 },
                ]}
                value={notes}
              />
            </View>

            <SButton text="Save" onPress={handleSave} />
          </View></TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};
const localStyles = StyleSheet.create({
  searchBar: {
    container: {
      flex: 1,
      height: 10,
    },
    textInputContainer: {
      flexDirection: "row",
      borderColor: "#FF0000",
    },
    textInput: {
      backgroundColor: "#FFFFFF",
      height: 40,
      borderRadius: 5,
      paddingVertical: 3,
      paddingHorizontal: 7,
      borderColor: styles.purpleText.color,
      fontSize: 15,
    },
    poweredContainer: {
      justifyContent: "flex-end",
      alignItems: "center",
    },
    row: {
      backgroundColor: "#FFFFFF",
      height: 30,
    },
    separator: {
      height: 0.5,
      backgroundColor: "#c8c7cc",
    },
    loader: {
      flexDirection: "row",
      justifyContent: "flex-end",
      height: 20,
    },
  },
});
export default Address;
