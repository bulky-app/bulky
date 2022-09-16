import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import RootNavigation from "./src/navigation/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const App = () => {
  return (
    //<RegisterScreen />
        /*component you want to see here*/ 
    <NavigationContainer>
      <RootNavigation />
    </NavigationContainer>
  );
};

export default App;
