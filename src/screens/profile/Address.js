import React from "react";
import styles from "../../globalStyles";
import { Input } from "@rneui/themed";
import { PLACESAPI_KEY } from "../../../backend/env.vars";
import SInput from "../../components/SInput";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState } from "react";
import { TextInput } from "react-native";
import SButton from "../../components/SButton";
import { SafeAreaView } from "react-native-safe-area-context";

 navigator.geolocation = require("react-native-geolocation-service");

const Address = () => {
  const [resName, setResName] = useState("");
  const [notes, setNotes] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [location, setLocation] = useState({});
  const [isFocus, setIsFocus] = useState(false);
  const [city, setCity] = useState("");
  const [isFocusnotes, setIsFocusnotes] = useState(false);
  const [isFocussuburb, setIsFocussuburb] = useState(false);
  const [isFocuslocation, setIsFocuslocation] = useState(false);
  const [isFocussetStreetAddress, setIsFocussetStreetAddress] = useState(false);

  const handleResName = (e) => {
    setResName(e);
  };
  const handlenotes = (e) => {
    setNotes(e);
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

  const handleSave = () => {};

  return (
    <SafeAreaView
      style={{
        backgroundColor: styles.safeContainer.backgroundColor,
        padding: 20,
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

        <View style={{ marginTop: 40 }}>
          <View>
            <KeyboardAvoidingView behavior="position">
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
          </View>
          <View tyle={{ marginTop: 40 }}>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>Address:</Text>
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
            />
          </View>
          <View tyle={{ marginTop: 40 }}>
            <Text style={{ fontWeight: "500", fontSize: 16 }}>Notes:</Text>
            <TextInput
              onFocus={handleFocusnotes}
              onBlur={handleBlurnotes}
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
        </View>
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
