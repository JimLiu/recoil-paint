import React from 'react';
import { View, StyleSheet } from 'react-native-web';
import Toolbar from '../toolbar/Toolbar';
import ItemInfoList from './ItemInfoList';

export default function Sidebar() {
  return (
    <View style={styles.root}>
      <Toolbar />
      <ItemInfoList />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: 240,
    height: '100vh',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    borderRightType: 'solid',
    padding: 16
  },
})
