import styles from "../globalStyles";
import { LogBox } from "react-native";
import React, { PureComponent } from "react";
import { Pressable, Text } from "react-native";
import AnimateLoadingButton from "react-native-animate-loading-button";

class LoadingButton extends PureComponent {
  //Handle Loges on console
  componentDidMount() {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  }

  //When the button is clicked
  _onPressHandler() {
    this.loadingButton.showLoading(true); // Set the button to loading
    this.props.onPress(); // Execute the fuction from props

    // Reset the loading button state after 1.5 seconds
    setTimeout(() => {
      try {
        this.loadingButton.showLoading(false);
      } catch (error) {
        return error;
      }
    }, 1500);
  }

  render() {
    return (
      <AnimateLoadingButton
        titleFontSize={16}
        useNativeDriver={true}
        title={this.props.text}
        height={styles.button.height}
        ref={(c) => (this.loadingButton = c)}
        borderRadius={styles.button.borderRadius}
        onPress={this._onPressHandler.bind(this)}
        borderWidth={this.props.outline ? 0.5 : 0}
        width={this.props.small ? 140 : styles.button.width}
        titleColor={
          this.props.outline
            ? styles.purpleText.color
            : styles.blackWhiteText.color
        }
        activityIndicatorColor={
          this.props.outline
            ? styles.whiteBlackText.color
            : styles.blackWhiteText.color
        }
        backgroundColor={
          this.props.outline
            ? styles.safeContainer.backgroundColor
            : styles.button.backgroundColor
        }
      />
    );
  }
}

const SButton = ({ text, onPress, outline }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && { opacity: 0.8 },
        outline
          ? [
              styles.button,
              {
                backgroundColor: styles.safeContainer.backgroundColor,
                borderColor: styles.purpleText.color,
                borderWidth: 1,
              },
            ]
          : styles.button,
      ]}
      android_ripple={{
        color: "#F2F4F5",
        radius: 48,
      }}
      onPress={onPress}
    >
      <Text
        style={[
          styles.buttonText,
          outline && { color: styles.purpleText.color },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};
const CartButton = ({ text, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        pressed && { opacity: 0.8 },
        styles.button,
        { height: 30, width: 85 },
      ]}
      android_ripple={{
        color: "#F2F4F5",
        radius: 10,
      }}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { fontSize: 14, fontWeight: "normal" }]}>
        {text}
      </Text>
    </Pressable>
  );
};

const SSButton = ({ click, text, outline }) => {
  return (
    <Pressable
      android_ripple={{
        color: styles.safeContainer.backgroundColor,
        radius: 48,
      }}
      style={[
        { padding: 10, width: 140, borderRadius: 48, elevation: 3 },
        outline
          ? {
              backgroundColor: styles.safeContainer.backgroundColor,
              borderColor: styles.purpleText.color,
              borderWidth: 1,
            }
          : { backgroundColor: styles.purpleText.color },
      ]}
      onPress={click}
    >
      <Text
        style={[
          { fontSize: 20, textAlign: "center" },
          outline
            ? { color: styles.purpleText.color }
            : { color: styles.blackWhiteText.color },
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export { CartButton, SSButton, SButton };
export default LoadingButton;
