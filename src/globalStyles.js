import { StyleSheet, Button, Pressable, Text } from "react-native";

const SButton = ({ text, onPress }) => {
  return (
    <Pressable
      color='#fff'
        onPress={console.log("Im")}
        style={({ pressed }) => [
          {
            backgroundColor: pressed
              ? 'rgb(210, 230, 255)'
              : 'white'
          },
          styles.wrapperCustom
        ]}>
        {({ pressed }) => (
          <Text style={styles.text}>
            {pressed ? 'Pressed!' : 'Press Me'}
          </Text>
        )}
      </Pressable>
  );
};
const styles = StyleSheet.create({
  primaryColor: {
    color: "#7CCEE0",
  },
  secondaryColor: {
    backgroundColor: "#4BB7CF",
  },container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 16
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
    backgroundColor: '#f9f9f9'
  },
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  }
});

export { SButton };
export default styles;
