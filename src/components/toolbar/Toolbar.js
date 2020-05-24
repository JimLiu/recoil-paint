import React from 'react';
import { View, StyleSheet } from 'react-native-web';
import Button from './Button';
import ImageIcon from '../icons/Image';
import NewRectangleButton from './NewRectangleButton';
import StatisticsIcon from '../icons/Statistics';

export default function Toolbar() {
  return (
    <View style={styles.root}>
      <NewRectangleButton style={styles.button} />
      <Button disabled Icon={ImageIcon} style={styles.button} />
      <Button disabled Icon={StatisticsIcon} style={styles.button} />
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
