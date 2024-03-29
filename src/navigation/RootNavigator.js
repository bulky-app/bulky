import Parse from "../../backend/server";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ToastAndroid, TouchableOpacity } from "react-native";

import {
  NavigationContainer,
  useNavigation,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import styles from "../globalStyles";

import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EmailVerificationScreen from "../screens/EmailVerificationScreen";

import CartScreen from "../screens/CartScreen";
import HomeScreen from "../screens/HomeScreen.js";
import SearchScreen from "../screens/SearchScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";

import ShopScreen from "../screens/ShopScreen";
import ProductDetails from "../screens/ProductDetails";
import CheckoutScreen from "../screens/CheckoutScreen";

import axios from "axios";
import { toggleActive } from "../redux/features/auth";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState, useRef } from "react";

import Help from "../screens/profile/Help";
import About from "../screens/profile/About";
import Wallet from "../screens/profile/Wallet";
import Address from "../screens/profile/Address";
import Account from "../screens/profile/Account";
import Settings from "../screens/profile/Settings";
import PaymentScreen from "../screens/profile/PaymentScreen";

import Orders from "../screens/admin/Orders";
import Requests from "../screens/admin/Requests";
import OrderDetails from "../screens/admin/OrderDetails";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AllScreens() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: styles.purpleText.color,
          shadowColor: styles.purpleText.color,
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tabs"
        component={Tabs}
      />
      <Stack.Screen
        name="Details"
        component={ProductDetails}
        options={{ headerTintColor: "white" }}
      />
      <Stack.Screen
        name="Shop"
        component={ShopScreen}
        options={{ headerTintColor: "white" }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerTintColor: "white" }}
      />
      {/* Profile Screen Navigations */}
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerTintColor: "white" }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerTintColor: "white" }}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{ headerTintColor: "white" }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerTintColor: "white" }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{ headerTintColor: "white" }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{ headerTintColor: "white" }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerTintColor: "white" }}
      />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator screenOptions={optionsStyles}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const AdminStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: styles.purpleText.color,
          shadowColor: styles.purpleText.color,
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tabs"
        component={AdminTabs}
      />
      <Stack.Screen
        name="Order Details"
        component={OrderDetails}
        options={{ headerTintColor: "white" }}
      />
    </Stack.Navigator>
  );
}

function AdminTabs() {
  const nav = useNavigation()
  const dispatch = useDispatch()
  const logout = async () => {
    try {
      await Parse.User.logOut();
      ToastAndroid.showWithGravityAndOffset(
        `Logged out successfully.`,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        50
      );
      const keys = ["address", "cart", "userDetails"];
      await AsyncStorage.multiRemove(keys);
      dispatch(toggleActive());
      return nav.navigate("LoginScreen")
    } catch (error) {
      () => error;
    }
  }

  return (
    <Tab.Navigator screenOptions={optionsStyles}>
      <Tab.Screen name="Orders" component={Orders} options={{
        headerRight: () => {
          return (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={logout} >
              <Ionicons name="md-exit-outline" size={24} color="black" />
            </TouchableOpacity>
          );
        },
      }} />
      <Tab.Screen name="Requests" component={Requests} />
    </Tab.Navigator>
  );
}

function NotLogged() {
  return (
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
  );
}

const RootNavigator = () => {
  const routeNameRef = useRef();
  const navigationRef = useNavigationContainerRef();
  const [loggedIn, setLoggedin] = useState(userIsActive);
  const [isAdmin, setIsAdmin] = useState(false);
  const userIsActive = useSelector((state) => state.user.active);

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        await Parse.User.currentAsync(); // Do not remove it Solves a certain error LOL.
        const user = Parse.User.current();
        if (user != null) {
          setIsAdmin(user.get("isAdmin"));
          setLoggedin(true);
        } else {
          setLoggedin(false);
        }
      } catch (error) {
        //Display error
      }
    };
    isLoggedIn();
  }, [userIsActive]);
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          useEffect(() => {
            axios.post(`https://app.nativenotify.com/api/analytics`, {
              app_id: 4389,
              app_token: "doPzgNGgUBdkYeDW9LKjD4",
              screenName: currentRouteName,
            });
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      {loggedIn ? isAdmin ? <AdminStack /> : <AllScreens /> : <NotLogged />}
    
    </NavigationContainer>
  );
};

const optionsStyles = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;
    let provider;
    size = 27;

    if (route.name === "Home") {
      provider = 1;
      iconName = "home";
    } else if (route.name === "Search") {
      provider = 0;
      iconName = focused ? "ios-search-outline" : "ios-search";
    } else if (route.name === "Cart") {
      provider = 0;
      iconName = "ios-cart-outline";
    } else if (route.name === "History") {
      provider = 0;
      iconName = "time-outline";
    } else if (route.name === "Profile") {
      provider = 0;
      iconName = "person-outline";
    } else if (route.name === "Orders") {
      provider = 1;
      iconName = "package";
    } else if (route.name === "Requests") {
      provider = 1;
      iconName = "inbox";
    }


    return provider === 1 ? (
      <Feather name={iconName} size={size} color={color} />
    ) : (
      <Ionicons name={iconName} size={size} color={color} />
    );
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

export default RootNavigator;
