import React from 'react';
import { View, StyleSheet, Text } from 'react-native-web';
import ColorPicker from './ColorPicker';

function Row({ children }) {
  return (
    <View style={styles.row}>{children}</View>
  );
}

export default function InformationBar() {
  return (
    <View style={styles.root}>
      <Row>
        <Text>Document:</Text>
      </Row>
      <Row>
        <Text style={styles.title}>Background color:</Text>
        <ColorPicker />
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 240,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    borderLeftType: 'solid',
    padding: 16,
  },
  row: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold'
  }
})
