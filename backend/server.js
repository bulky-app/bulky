// In a React Native application
import Parse from "parse/react-native.js";
import { APP_ID, JAVASCRIPT_KEY, SECRET_KEY } from "./env.vars";
import AsyncStorage from "@react-native-async-storage/async-storage";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(APP_ID, JAVASCRIPT_KEY, SECRET_KEY);
Parse.serverURL = "https://parseapi.back4app.com/";

export default Parse;
