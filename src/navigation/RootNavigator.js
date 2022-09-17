import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import styles from "../globalStyles";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EmailVerificationScreen from "../screens/EmailVerificationScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import CartScreen from "../screens/CartScreen";
import ShopScreen from "../screens/ShopScreen";

import HomeScreen from "../screens/HomeScreen.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function RootNavigation() {
  const logedIn = true;
  return (
    <NavigationContainer>
      {logedIn ? (
        <Tab.Navigator screenOptions={optionsStyles}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={HomeScreen} />
          <Tab.Screen name="Cart" component={CartScreen} />
          <Tab.Screen name="History" component={ShopScreen} />
          <Tab.Screen name="Profile" component={HomeScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen
            name="EmailVerificationScreen"
            component={EmailVerificationScreen}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

let optionsStyles = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    let provider;
    size = 27;

    if (route.name === "Home") {
      provider = 1;
      iconName = focused ? "home" : "home";
    } else if (route.name === "Search") {
      provider = 0;
      iconName = focused ? "ios-search-outline" : "ios-search";
    } else if (route.name === "Cart") {
      provider = 0;
      iconName = focused ? "ios-cart-outline" : "ios-cart-outline";
    } else if (route.name === "History") {
      provider = 0;
      iconName = focused ? "time-outline" : "time-outline";
    } else if (route.name === "Profile") {
      provider = 0;
      iconName = focused ? "person-outline" : "person-outline";
    }

    // You can return any component that you like here!
    if (provider === 1) {
      return <Feather name={iconName} size={size} color={color} />;
    } else {
      return <Ionicons name={iconName} size={size} color={color} />;
    }
  },
  tabBarStyle: {
    height: 70,
    paddingBottom: 10,
    shadowColor: styles.purpleText.color,
  },
  tabBarLabelStyle: { fontSize: 14 },
  tabBarActiveTintColor: styles.purpleText.color,
  tabBarInactiveTintColor: styles.greyText.color,
  headerShadowVisible: true,
  headerStyle: {
    backgroundColor: styles.safeContainer.backgroundColor,
    shadowColor: styles.purpleText.color,
  },
  headerTintColor: styles.whiteBlackText.color,
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 25,
  },
});


export default RootNavigation;

