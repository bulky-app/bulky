import React from "react";
import { TextInput } from "react-native";
import styles from "../globalStyles";

const SInput = ({
  isSercure,
  keyboard,
  placeholderTxt,
  handleChange,
  isFocus,
  focus,
  blur,
  value
}) => {
  return (
    <TextInput
      placeholder={placeholderTxt}
      keyboardType={keyboard}
      secureTextEntry={isSercure}
      style={[styles.textInput, isFocus && styles.textInputFocused]}
      onChangeText={handleChange}
      onFocus={focus}
      onBlur={blur}
    />
  );
};

export default SInput;
