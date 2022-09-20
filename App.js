import "react-native-gesture-handler";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import RootNavigator from "./src/navigation/RootNavigator";

const App = () => {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
};

export default App;
