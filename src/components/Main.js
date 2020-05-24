import React from 'react';
import { View, StyleSheet } from 'react-native-web';
import Canvas from './canvas/Canvas';
import Sidebar from './sidebar/Sidebar';
import InformationBar from './infobar/InformationBar';

export default function Main() {
  return (
    <View style={styles.root}>
      <Sidebar />
      <Canvas />
      <InformationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100vh',
    flexDirection: 'row',
    backgroundColor: '#ebeef2',
  },
})
