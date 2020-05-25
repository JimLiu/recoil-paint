import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { movingItemsSnapshotState, movingItemIdsState } from '../recoil/atoms';
import { movingItemsSelector } from '../recoil/selectors';
import useMove from './useMove';

export default function useMoveItems(func) {
  const [movingItems, setMovingItems] = useRecoilState(movingItemsSelector);
  const [movingItemsSnapshot, setMovingItemsSnapshot] = useRecoilState(movingItemsSnapshotState);
  const movingItemIds = useRecoilValue(movingItemIdsState);

  const { onMouseDown } = useMove((params) => {
    const { status, offset } = params;
    func(params);

    if (status === 'moving' && movingItemIds.length) {
      const newMovingItems = movingItems.map(item => {
        let snapshot = movingItemsSnapshot[item.id];
        if (!snapshot) {
          return item;
        }

        return {
          ...snapshot,
          x: snapshot.x + offset.x,
          y: snapshot.y + offset.y,
        }
      });
      setMovingItems(newMovingItems);
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

  return {
    onMouseDown
  }
}
