import React from 'react';
import { StyleSheet } from 'react-native-web';
import Element from './Element';

export default function Rectangle(props) {
  return (
    <Element
      {...props}
      style={styles.root}
    />
  );
}

const styles = StyleSheet.create({
  root: {

  }
})
