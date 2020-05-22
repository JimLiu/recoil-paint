import React, { useRef, useCallback } from 'react';
import { View, StyleSheet } from 'react-native-web';
import CanvasItem from './CanvasItem';
import Selection from './Selection';
import { useRecoilValue, useRecoilState } from 'recoil';
import { itemIdsState, canvasLayoutState, selectedIdsState, allItemsSelector } from '../atoms';

export default function Canvas() {
  const ref = useRef();
  const itemIds = useRecoilValue(itemIdsState);
  const [canvasLayout, setLayoutState] = useRecoilState(canvasLayoutState);
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdsState);
  const allItems = useRecoilValue(allItemsSelector);

  const onLayout = ({
    nativeEvent: {
      layout: { x, y, width, height }
    }
  }) => setLayoutState({ x, y, width, height });

  const handleClick = useCallback(({ clientX, clientY, metaKey, shiftKey }) => {

    const x = clientX - canvasLayout.x;
    const y = clientY - canvasLayout.y;
    let selectedItem = null;
    for (let i = allItems.length - 1; i >= 0; i--) {
      let item = allItems[i];
      if (x >= item.x && x <= item.x + item.width && y >= item.y && y <= item.y + item.height) {
        selectedItem = item;
        break;
      }
    }

    let ids;
    if (selectedItem) {
      if (metaKey || shiftKey) {
        ids = [...selectedIds, selectedItem.id]
      } else {
        ids = [selectedItem.id];
      }
    } else {
      ids = [];
    }

    setSelectedIds(ids);

  }, [allItems, canvasLayout.x, canvasLayout.y, selectedIds, setSelectedIds]);

  return (
    <View style={styles.root} ref={ref} onLayout={onLayout} onClick={handleClick}>
      {itemIds.map(id => <CanvasItem key={`item-${id}`} id={id} />)}
      <Selection />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  svg: {
    flex: 1,
  }
})
