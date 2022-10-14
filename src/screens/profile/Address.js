import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { Input } from "@rneui/themed";
import styles from "../../globalStyles";
import React, { useEffect } from "react";
import { TextInput } from "react-native";
import * as Location from "expo-location";
import Parse from "../../../backend/server";
import { ToastAndroid } from "react-native";
import SInput from "../../components/SInput";
import SButton from "../../components/SButton";
import { MaterialIcons } from "@expo/vector-icons";
import { PLACESAPI_KEY } from "../../../backend/env.vars";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

navigator.geolocation = require("react-native-geolocation-service");

const Address = () => {
  const [city, setCity] = useState("");
  const [user, setUser] = useState();
  const [notes, setNotes] = useState("");
  const [userId, setUserId] = useState();
  const [suburb, setSuburb] = useState("");
  const [resName, setResName] = useState("");
  const [location, setLocation] = useState({});
  const [firstTime, setFirstTime] = useState(true);
  const [streetAddress, setStreetAddress] = useState("");
  const [addressID, setAddressID] = useState("");

  const [isFocus, setIsFocus] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isFocusnotes, setIsFocusnotes] = useState(false);
  const [isFocussuburb, setIsFocussuburb] = useState(false);
  const [isFocuslocation, setIsFocuslocation] = useState(false);
  const [isFocussetStreetAddress, setIsFocussetStreetAddress] = useState(false);

  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    //Ask user for location permission ?
    if (status !== "granted") {
      return ToastAndroid.showWithGravityAndOffset(
        "Permission to access location was denied.",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    }

    const location = await Location.getCurrentPositionAsync();

    const { latitude, longitude } = location.coords;
    try {
      //Get user address
      await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${PLACESAPI_KEY}`
      )
        .then((response) => response.json())
        .then(async (json) => {
          const data = json.results[0].formatted_address.split(",");
          setCity(data[data.length - 3]);
          setSuburb(data[data.length - 4]);
          setLocation({
            latitude,
            longitude,
          });
          setStreetAddress(data.length > 5 ? data[0] + data[1] : data[0]);

          const placeId = json.results[0].place_id;
          //Getting the users location name
          try {
            await fetch(
              `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${PLACESAPI_KEY}&fields=name`,
              {
                method: "get",
                headers: {},
              }
            )
              .then((response) => response.json())
              .then((json) => {
                setResName(json.result.name);
              })
              .catch((error) => {
                return ToastAndroid.showWithGravityAndOffset(
                  "Some error occured, please try again!",
                  ToastAndroid.SHORT,
                  ToastAndroid.TOP,
                  25,
                  50
                );
              });
          } catch (error) {
            ToastAndroid.showWithGravityAndOffset(
              "Some error occured, please try again!",
              ToastAndroid.SHORT,
              ToastAndroid.TOP,
              25,
              50
            );
          }
        })
        .catch((error) => {
          return ToastAndroid.showWithGravityAndOffset(
            "Some error occured, please try again!",
            ToastAndroid.SHORT,
            ToastAndroid.TOP,
            25,
            50
          );
        });
    } catch (error) {
      //If any of the tries fails we display this error
      ToastAndroid.showWithGravityAndOffset(
        "Some error occured, please try again!",
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
        25,
        50
      );
    }
  };

  //Get data from DB
  useEffect(() => {
    const currentUser = async () => {
      try {
        await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
        const user = Parse.User.current();
        setUser(user);
        const query = new Parse.Query("userAddresses");
        query.contains("userId", user.id);

        const queryResult = await query.find();
        setAddressID(queryResult[0].id);
        setNotes(queryResult[0].get("notes"));
        setCity(queryResult[0].get("cityName"));
        setUserId(queryResult[0].get("userId"));
        setFirstTime(queryResult[0].get("userId").length === 0);
        setResName(queryResult[0].get("resName"));
        setSuburb(queryResult[0].get("suburbName"));
        setStreetAddress(queryResult[0].get("streetAddresses"));
        setLocation({
          latitude: queryResult[0].get("location").latitude,
          longitude: queryResult[0].get("location").longitude,
        });

        return true;
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
    const Update = new Parse.Object("userAddresses");
    Update.set("objectId", addressID);

    // Set new done value and save Parse Object changes
    Update.set("notes", notes);
    Update.set("userId", user);
    Update.set("cityName", city);
    Update.set("resName", resName);
    Update.set("suburbName", suburb);
    Update.set("streetAddresses", streetAddress);
    Update.set(
      "location",
      new Parse.GeoPoint(location.latitude, location.longitude)
    );

    if (!firstTime) {
      Update.set("userId", userId);
    } else {
      Update.set("userId", user);
    }
    try {
      await Update.save();
      setRefresh(!refresh);
      return ToastAndroid.showWithGravityAndOffset(
        "Updated successfully.",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    } catch (error) {
      console.error(error);
      return ToastAndroid.showWithGravityAndOffset(
        "Some error occured please try again.",
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
    }
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={localStyles.currentLocation}
            onPress={getCurrentPosition}
          >
            <MaterialIcons name="gps-fixed" size={24} color="black" />
            <Text style={localStyles.currentLocation.text}>
              Use my current location.
            </Text>
          </TouchableOpacity>
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
              currentLocation={false}
              //currentLocationLabel="Use my current location"
            />
          </View>

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
            <LoadingButton text="Save" onPress={() => handleSave()} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
const localStyles = StyleSheet.create({
  searchBar: {
    container: {
      //flex: 1,
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
  currentLocation: {
    padding: 5,
    width: 350,
    elevation: 1,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    text: { marginLeft: 10 },
  },
});
export default Address;
