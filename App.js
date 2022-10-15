import { useEffect } from "react";
import store from "./src/redux/store";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { Text, TextInput, LogBox } from "react-native";
import RootNavigator from "./src/navigation/RootNavigator";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1;

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
