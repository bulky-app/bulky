import store from "./src/redux/store";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { Text, TextInput, LogBox } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";

import axios from "axios";
// import * as Device from "expo-device";
// import Parse from "parse/react-native";
// import * as DParse from "./backend/server";
// import * as Application from "expo-application";
// import * as Localization from "expo-localization";
import registerNNPushToken, { registerIndieID } from "native-notify";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1;
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1;

const App = () => {
  registerNNPushToken(4389, "doPzgNGgUBdkYeDW9LKjD4");

//   const [deviceData, setDeviceData] = useState({
//     app_id: Application.applicationId,
//     app_name: "",
//     type: "",
//     timezone: Localization.timezone,
//     locale: Localization.locale,
//     installationId: "",
//     app_version: Application.nativeApplicationVersion,
//     deviceToken: Application.androidId,
//   });

//   const getDeviceData = async () => {
//     try {
//       const installationId = await Parse._getInstallationId();

//       //setDeviceData({ ...deviceData, installationId });
//       //registerIndieID(installationId, 4389, "doPzgNGgUBdkYeDW9LKjD4");
//     } catch (error) {
//       console.log(error);
//     }
//   };

// getDeviceData();

//   useEffect(() => {

    

//     async () => {
//       const Installation = new DParse.default.Installation();

//       Installation.set("badge", 0);
//       Installation.set("pushType", "gcm");
//       Installation.set("parseVersion", "3.4.0");
//       Installation.set("channels", ["default"]);
//       Installation.set("localeIdentifier", "pt-BR");
//       Installation.set("deviceType", deviceData.type);
//       Installation.set("timeZone", deviceData.locale);
//       Installation.set("GCMSenderId", "145509535320");
//       Installation.set("appName", deviceData.app_name);
//       Installation.set("appIdentifier", deviceData.app_id);
//       Installation.set("appVersion", deviceData.app_version);
//       Installation.set("deviceToken", deviceData.deviceToken);
//       Installation.set("installationId", deviceData.installationId);

//       try {
//         await Installation.save();
//         return true;
//       } catch (error) {
//         console.log("Saving error: " + error);
//       }
//     };
//   });

  useEffect(() => {
    LogBox.ignoreAllLogs();

    axios.post(`https://app.nativenotify.com/api/analytics`, {
      app_id: 4389,
      app_token: "doPzgNGgUBdkYeDW9LKjD4",
      screenName: "HomeScreen",
    });
  }, []);

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
