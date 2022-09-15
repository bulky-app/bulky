// In a React Native application
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_ID, JAVASCRIPT_KEY} from "./env.vars";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(APP_ID, JAVASCRIPT_KEY);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default Parse;