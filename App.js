import { useEffect } from "react";
import store from "./src/redux/store";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Text, TextInput, LogBox } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";

import axios from "axios";
import registerNNPushToken from "native-notify";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1;
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1;

const App = () => {
  registerNNPushToken(4389, "doPzgNGgUBdkYeDW9LKjD4");
  useEffect(() => {
    LogBox.ignoreAllLogs();
    axios.post(`https://app.nativenotify.com/api/analytics`, {
      app_id: 4389,
      app_token: "doPzgNGgUBdkYeDW9LKjD4",
      screenName: "HomeScreen",
    });
  });

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
