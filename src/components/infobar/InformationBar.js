import React from 'react';
import { View, StyleSheet, Text } from 'react-native-web';
import ColorPicker from './ColorPicker';
import SelectionInfo from './SelectionInfo';

export default function InformationBar() {
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Text>Document:</Text>
      </View>
      <View style={[styles.row, styles.colorRow]}>
        <Text style={styles.title}>Background color:</Text>
        <ColorPicker />
      </View>
      <SelectionInfo />
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
  colorRow: {
    zIndex: 1,
  },
  title: {
    fontWeight: 'bold'
  }
})
