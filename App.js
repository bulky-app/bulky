import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import RootNavigation from "./src/navigation/RootNavigator";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import CartScreen from "./src/screens/CartScreen";
import EmailVerificationScreen from "./src/screens/EmailVerificationScreen";

const App = () => {
  return (
    <Provider store={store}>
      {
        //component you want to see here
      }
      <RootNavigation />
    </Provider>
  );
};

export default App;
