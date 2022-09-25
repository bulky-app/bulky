import "react-native-gesture-handler";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigator from "./src/navigation/RootNavigator";
import Wallet from "./src/screens/profile/Wallet";
import {Text, TextInput} from "react-native";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1; // the maximum amount the font size will scale.
TextInput.defaultProps = Text.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1; 

const App = () => {
  return (
    <Provider store={store}>
      {/*  <Wallet/>*/}
      <RootNavigator />
    </Provider>
  );
};

export default App;
