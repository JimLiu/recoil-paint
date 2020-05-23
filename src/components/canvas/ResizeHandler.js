import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native-web';
import { useRecoilState } from 'recoil';
import { selectedItemsSelector } from '../../recoil/selectors';
import useMove from '../hooks/useMove';


function resizeItem(item, offset) {
  let { x, y, width, height } = item;
  width += offset.x;
  height += offset.y;

  if (width < 0) {
    width = -width;
    x -= width;
  }

  if (height < 0) {
    height = -height;
    y -= height;
  }

  return {
    ...item,
    x,
    y,
    width,
    height,
  };
}

export default function ResizeHandler() {
  const [selectedItems, setSelectedItems] = useRecoilState(selectedItemsSelector);
  const [selectedItemsSnapshot, setSelectedItemsSnapshot] = useState(null);

  const { onMouseDown } = useMove(({ status, offset }) => {
    if (selectedItems.length !== 1) {
      return;
    }

    if (status === 'start') {
      setSelectedItemsSnapshot(selectedItems)
    }

    if (status === 'moving') {
      setSelectedItems(selectedItemsSnapshot.map(item => resizeItem(item, offset)));
    }
  })

  if (selectedItems.length !== 1) {
    return null;
  }

  const { x, y, width, height } = selectedItems[0];

  return (
    <View
      style={[styles.resizeHandler, {
        left: x + width,
        top: y + height,
      }]}
      onMouseDown={onMouseDown}
    >
      <View style={styles.resizeHandlerDot} />
    </View>
  )
}

const styles = StyleSheet.create({
  resizeHandler: {
    width: 24,
    height: 24,
    marginLeft: -13,
    marginTop: -13,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'nwse-resize',
  },
  resizeHandlerDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'blue',
    position: 'absolute',
  }
})
