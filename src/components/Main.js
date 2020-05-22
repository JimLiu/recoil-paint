import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native-web';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import { useRecoilValue, useRecoilState } from 'recoil';
import { movingItemsSelector, movingItemsSnapshotState, movingItemIdsState } from '../atoms';
import useMove from './hooks/useMove';

export default function Main() {
  const [movingItems, setMovingItems] = useRecoilState(movingItemsSelector);
  const [movingItemsSnapshot, setMovingItemsSnapshot] = useRecoilState(movingItemsSnapshotState);
  const movingItemIds = useRecoilValue(movingItemIdsState);

  const { onMouseDown } = useMove(({ status, offset, origin }) => {
    if (status === 'moving' && movingItemIds.length) {
      setMovingItems(movingItems.map(item => {
        let snapshot = movingItemsSnapshot[item.id];
        if (!snapshot) {
          return item;
        }

        return {
          ...snapshot,
          x: snapshot.x + offset.x,
          y: snapshot.y + offset.y,
        }
      }))
    }
  });

  useEffect(() => {
    setMovingItemsSnapshot(movingItems.reduce((acc, item) => {
      return Object.assign(acc, {
        [item.id]: item
      })
    }, {}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movingItemIds]);

  return (
    <View style={styles.root} onMouseDown={onMouseDown}>
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
