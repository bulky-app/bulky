import "react-native-gesture-handler";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigator from "./src/navigation/RootNavigator";
import Address from "./src/screens/profile/Address";

const App = () => {
  return (
    <Provider store={store}>
      {/* <RootNavigator /> */}
      <Address/>
    </Provider>
  );
};

export default App;
