import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native-web';
import { SketchPicker } from 'react-color';
import { useRecoilState } from 'recoil';
import { backgroundColorState } from '../../recoil/atoms';

export default function ColorPicker() {
  const [shown, setShown] = useState(false);
  const [backgroundColor, setBackgroundColor] = useRecoilState(backgroundColorState);

  const handleChangeComplete = useCallback((color) => {
    setBackgroundColor(color.hex);
  }, [setBackgroundColor]);

  const handleClick = useCallback(() => {
    setShown(true);
  }, []);

  useEffect(() => {
    function hidePopup(e) {
      if (e.target.closest('#color-picker')) {
        return;
      }
      setShown(false);
    }

    document.body.addEventListener('click', hidePopup);

    return () => {
      document.body.removeEventListener('click', hidePopup);
    }
  }, []);

  return (
    <View style={styles.root} onClick={handleClick}>
      <View style={[styles.inner, { backgroundColor: backgroundColor }]} />
      {shown && (
        <View style={styles.popup} nativeID="color-picker">
          <SketchPicker
            color={backgroundColor}
            onChangeComplete={handleChangeComplete}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: '50%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d6d8d9',
    width: 24,
    height: 24,
    marginLeft: 16,
    padding: 2,
  },
  inner: {
    borderRadius: '50%',
    width: 18,
    height: 18,
  },
  popup: {
    position: 'absolute',
    right: 32,
  }
})
