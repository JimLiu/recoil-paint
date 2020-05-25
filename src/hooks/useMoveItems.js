import { useEffect } from 'react';
import { useRecoilValue, useRecoilState, useRecoilCallback } from 'recoil';
import { movingItemsSnapshotState, movingItemIdsState } from '../recoil/atoms';
import { itemWithId } from '../recoil/selectors';
import useMove from './useMove';

export default function useMoveItems(func) {
  const [movingItemsSnapshot, setMovingItemsSnapshot] = useRecoilState(movingItemsSnapshotState);
  const movingItemIds = useRecoilValue(movingItemIdsState);

  const saveMovingItems = useRecoilCallback(async ({ getPromise }, itemIds) => {
    const items = await Promise.all(itemIds.map(id => getPromise(itemWithId(id))));
    setMovingItemsSnapshot(items);
    return items;
  });

  const updateItemsPosition = useRecoilCallback(({ set }, newValue) => {
    newValue.forEach(item => {
      set(itemWithId(item.id), item);
    })
  });

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
    saveMovingItems(movingItemIds);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movingItemIds]);

  return {
    onMouseDown
  }
}
