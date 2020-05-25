import { useEffect, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { movingItemIdsState } from '../recoil/atoms';
import { useLoadItems, useUpdateItems } from '../recoil/hooks';
import useMove from './useMove';

export default function useMoveItems(func) {
  const [movingItemsSnapshot, setMovingItemsSnapshot] = useState([]);
  const movingItemIds = useRecoilValue(movingItemIdsState);

  const loadMovingItems = useLoadItems();
  const updateItemsPosition = useUpdateItems();

  const updateSnpashot = useCallback(async () => {
    const items = await loadMovingItems(movingItemIds);
    setMovingItemsSnapshot(items);
  }, [loadMovingItems, movingItemIds]);

  const { onMouseDown } = useMove((params) => {
    const { status, offset } = params;
    func(params);

    if (status === 'moving' && movingItemsSnapshot.length) {
      const newMovingItems = movingItemsSnapshot.map(item => {
        return {
          ...item,
          x: item.x + offset.x,
          y: item.y + offset.y,
        }
      });
      updateItemsPosition(newMovingItems);
    }
  });

  useEffect(() => {
    updateSnpashot();
  }, [movingItemIds, updateSnpashot]);

  return {
    onMouseDown
  }
}
