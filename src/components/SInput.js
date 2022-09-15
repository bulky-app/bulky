import React from "react";
import { TextInput } from "react-native";
import styles from "../globalStyles";

const SInput = ({ isSercure, keyboard, placeholderTxt, handleChange, isFocus }) => {
    

  return (
    <TextInput
      placeholder={placeholderTxt}
      keyboardType={keyboard}
      secureTextEntry={isSercure}
      style={[styles.textInput, isFocus && styles.textInputFocused]}
      onChangeText={handleChange}
    />
  );
};

export default SInput;
