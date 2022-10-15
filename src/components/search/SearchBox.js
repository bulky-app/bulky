import styles from "../../globalStyles";
import React, { useRef, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { useSearchBox } from "react-instantsearch-hooks";

const SearchBox = (props) => {
  const { query, refine } = useSearchBox(props);
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef(null);

  function setQuery(newQuery) {
    setInputValue(newQuery);
    refine(newQuery);
  }

  if (query !== inputValue && !inputRef.current?.isFocused()) {
    setInputValue(query);
  }

  return (
    <TextInput
      ref={inputRef}
      style={localStyles.input}
      value={inputValue}
      placeholder="Type some text to start"
      onChangeText={setQuery}
      clearButtonMode="while-editing"
      autoCapitalize="none"
      autoCorrect={false}
      spellCheck={false}
      autoFocus={true}
      autoCompleteType="off"
    />
  );
};

const localStyles = StyleSheet.create({
  input: {
    height: 48,
    padding: 12,
    fontSize: 16,
    backgroundColor: styles.blackWhiteText.color,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    elevation: 2,
  },
});
export default SearchBox;
