import { SOButton } from "../globalStyles";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Image from "../images/welcomeImg.png";

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={localStyles.container}>
        <ImageBackground
          source={Image}
          resizeMode="contain"
          style={localStyles.image}
        ></ImageBackground>
        <Text>
          <SOButton style={localStyles.button} text="Get Started!" />
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
