import React from 'react';
import { StyleSheet, View } from 'react-native-web';
import Element from './Element';

export default function Statistics({ series, ...others }) {
  return (
    <Element
      {...others}
      style={styles.root}
    >
      <View style={styles.container}>
        {series.map((serie, i) => (
          <View
            key={`serie-${i}`}
            style={[
              styles.bar,
              {
                height: serie * 100,
              }
            ]}
          />
        ))}
      </View>
    </Element>
  );
}

const styles = StyleSheet.create({
  root: {},
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 4,
    alignItems: 'flex-end',
  },
  bar: {
    marginHorizontal: 4,
    backgroundColor: '#1189c7',
    width: 20,
  }
});
