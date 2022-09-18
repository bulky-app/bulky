import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import SOButton from "../components/SOButton";
import Image from "../images/welcomeImg.png";
import { StackActions } from "@react-navigation/native";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={localStyles.container}>
        <ImageBackground
          source={Image}
          resizeMode="contain"
          style={localStyles.image}
        ></ImageBackground>
        <Text>
          <SOButton
            style={localStyles.button}
            text="Get Started!"
            onPress={() =>
              navigation.dispatch(StackActions.replace("RegisterScreen"))
            }
          />
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6B4EFF",
    padding: 40,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    position: "relative",
  },
  button: {
    position: "absolute",
    bottom: 48,
  },
});
