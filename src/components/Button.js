import React from 'react';
import { View, StyleSheet } from 'react-native-web';

export default function Button({ Icon, disabled, style, ...others }) {

  return (
    <View
      accessibilityRole="button"
      disabled={disabled}
      style={[styles.root, disabled && styles.disabled, style]}
      {...others}
    >
      <Icon style={[disabled && styles.disabledIcon]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  disabled: {
    cursor: 'default',
    opacity: 0.8,
  },
  disabledIcon: {
    fill: '#ccc'
  }
})
