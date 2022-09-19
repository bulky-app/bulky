import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import RootNavigation from "./src/navigation/RootNavigator";
import { Provider } from "react-redux";
import store from "./src/redux/store";

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
