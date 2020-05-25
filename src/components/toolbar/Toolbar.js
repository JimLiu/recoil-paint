import React from 'react';
import { View, StyleSheet } from 'react-native-web';
import NewRectangleButton from './NewRectangleButton';
import NewImageButton from './NewImageButton';
import NewStatisticsButton from './NewStatisticsButton';

export default function Toolbar() {
  return (
    <View style={styles.root}>
      <NewRectangleButton style={styles.button} />
      <NewImageButton style={styles.button} />
      <NewStatisticsButton style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  button: {
    marginRight: 8,
  }
})
