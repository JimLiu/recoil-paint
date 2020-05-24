import React from 'react';
import { TextInput, StyleSheet } from 'react-native-web';

export default function NumberInput(props) {
  const { value, style, onChangeNumber, ...others } = props;

  const handleChnageText = (text) => {
    let number = parseInt(text);
    if (isNaN(number)) {
      return;
    }
    onChangeNumber(number);
  }

  return (
    <TextInput
      {...others}
      value={value}
      style={[styles.input, style]}
      onChangeText={handleChnageText}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 8,
  }
})
