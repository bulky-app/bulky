import React from "react";
import styles from "../../globalStyles";
import { Input } from "@rneui/themed";
import PLACESAPI_KEY from "../../../backend/env.vars";
import SInput from "../../components/SInput";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState } from "react";
import { TextInput } from "react-native";
import SButton from "../../components/SButton";

navigator.geolocation = require("react-native-geolocation-service");
// navigator.geolocation = require('@react-native-community/geolocation');

const Address = () => {
  const [resName, setResName] = useState("");
  const [notes, setNotes] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [location, setLocation] = useState({});
  const [isFocus, setIsFocus] = useState(false);
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

  const handleSave = () => {
    
  };


  return (
    <View style={[styles.safeContainer,{ flex: 1, padding: 40, alignItems: "center" }]}>
      <View style={{ flex: 1, alignItems: "center" }}>
        
        <KeyboardAvoidingView
          style={{ alignItems: "center", height: 550 }}
          onPress={Keyboard.dismiss}
        >
          
          <GooglePlacesAutocomplete
            placeholder="Type to start search"
            minLength={5}
            autoFocus={false}
            returnKeyType={"search"}
            listViewDisplayed="auto"
            fetchDetails={true}
            //enableHighAccuracyLocation={true}
            //enablePoweredByContainer={true}
            renderDescription={(row) => row.description}
            textInputProps={{
              InputComp: Input,
              leftIcon: { type: "font-awesome", name: "location-arrow" },
              errorStyle: { color: "red" },
            }}
            onPress={(data, details = null) => {
              console.log("data", data);
              console.log("details", details);
            }}
            query={{
              key: PLACESAPI_KEY,
              language: "en",
              //components: 'country:za',
            }}
            styles={{
              container: {
                flex: 1,
              },
              textInputContainer: {
                flexDirection: "row",
              },
              textInput: {
                backgroundColor: "#FFFFFF",
                height: 44,
                borderRadius: 5,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderColor: styles.purpleText.color,
                fontSize: 15,
              },
              poweredContainer: {
                justifyContent: "flex-end",
                alignItems: "center",
              },
              powered: {},
              listView: {},
              row: {
                backgroundColor: "#FFFFFF",
                padding: 13,
                height: 44,
                flexDirection: "row",
              },
              separator: {
                height: 0.5,
                backgroundColor: "#c8c7cc",
              },
              description: {},
              loader: {
                flexDirection: "row",
                justifyContent: "flex-end",
                height: 20,
              },
            }}
            currentLocation={true}
            currentLocationLabel="Use my current location"
            GoogleReverseGeocodingQuery={
              {
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }
            }
            GooglePlacesSearchQuery={{
              // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
              rankby: "distance",
            }}
            //debounce={200}
          />
          <View style={{ marginTop: 0 }}>
            <View style={{ marginTop: 40 }}>
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
              />
            </View>
            <View tyle={{ marginTop: 40 }}>
              <Text style={{ fontWeight: "500", fontSize: 16 }}>Address:</Text>
              <SInput
                placeholderTxt="1 Bunting Road"
                handleChange={handleResName}
                keyboardType="default"
                focus={handleFocusstreetAddress}
                blur={handleBlurstreetAddress}
                isFocus={isFocussetStreetAddress}
              />
              <SInput
                placeholderTxt="Auckland Park"
                handleChange={handleResName}
                keyboardType="default"
                focus={handleFocussuburb}
                blur={handleBlursuburb}
                isFocus={isFocussuburb}
              />
              <SInput
                placeholderTxt="Johannesburg"
                handleChange={handleResName}
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
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        <SButton text="Save" onPress />
      </View>
    </View>
  );
};
const localStyles = StyleSheet.create({});
export default Address;
