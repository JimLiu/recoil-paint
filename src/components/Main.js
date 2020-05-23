import React from 'react';
import { View, StyleSheet } from 'react-native-web';
import Canvas from './canvas/Canvas';
import Toolbar from './toolbar/Toolbar';

export default function Main() {
  return (
    <View style={styles.root}>
      <View style={styles.left}>
        <Toolbar />
      </View>
      <Canvas />
      <View style={styles.right}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100vh',
    flexDirection: 'row',
    backgroundColor: '#ebeef2',
  },
  left: {
    width: 240,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    borderRightType: 'solid',
    padding: 16
  },
  right: {
    width: 200,
    borderLeftWidth: 1,
    borderLeftColor: '#ccc',
    borderLeftType: 'solid',
  }
})
