import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native-web';

export default function Button({
  Icon, disabled, style, children,
  title, accessibilityLabel,
  ...others
}) {
  const ref = useRef();

  useEffect(() => {
    ref.current.setNativeProps({ title });
  }, [title]);

  return (
    <View
      {...others}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      disabled={disabled}
      ref={ref}
      style={[
        styles.root,
        disabled && styles.disabled,
        Icon && styles.iconOnly,
        !Icon && styles.text,
        style
      ]}
    >
      {Icon && <Icon style={[disabled && styles.disabledIcon]} />}
      {!Icon && children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: '#d6d8d9',
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
