import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import RootNavigation from "./src/navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from './src/screens/LoginScreen';
import SearchScreen from'./src/screens/SearchScreen';
import EmailVerificationScreen from "./src/screens/EmailVerificationScreen";

const App = () => {
  return (
    /*component you want to see here*/ 
    // <NavigationContainer>
      <RootNavigation />
    //</NavigationContainer>
  );
};

export default App;
