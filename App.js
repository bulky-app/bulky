import "react-native-gesture-handler";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigator from "./src/navigation/RootNavigator";
import Wallet from "./src/screens/profile/Wallet";

const App = () => {
  return (
    <Provider store={store}>
      {/*  <Wallet/>*/}
      <RootNavigator />
    </Provider>
  );
};

export default App;
