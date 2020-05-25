import React from 'react';
import { Image as RNImage, StyleSheet } from 'react-native-web';
import Element from './Element';

export default function Image(props) {
  const { originWidth, originHeight, width, height, uri } = props;

  const ratio = originWidth / originHeight;

  return (
    <Element
      {...props}
      style={styles.root}
    >
      <RNImage
        resizeMode="contain"
        ratio={ratio}
        source={{ uri, width, height }}
      />
    </Element>
  );
}

const styles = StyleSheet.create({
  root: {

  }
})
