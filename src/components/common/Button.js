import React from 'react';
import { View, StyleSheet } from 'react-native-web';

export default function Button({ Icon, disabled, style, children, ...others }) {

  return (
    <View
      accessibilityRole="button"
      disabled={disabled}
      style={[
        styles.root,
        disabled && styles.disabled,
        Icon && styles.iconOnly,
        !Icon && styles.text,
        style
      ]}
      {...others}
    >
      {Icon && <Icon style={[disabled && styles.disabledIcon]} />}
      {!Icon && children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  iconOnly: {
    width: 32,
    height: 32,
  },
  text: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  disabled: {
    cursor: 'default',
    opacity: 0.8,
  },
  disabledIcon: {
    fill: '#ccc'
  }
})
