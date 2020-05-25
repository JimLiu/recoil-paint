import { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { movingItemsSnapshotState, movingItemIdsState } from '../recoil/atoms';
import { useLoadItems, useUpdateItems } from '../recoil/hooks';
import useMove from './useMove';

export default function useMoveItems(func) {
  const [movingItemsSnapshot, setMovingItemsSnapshot] = useRecoilState(movingItemsSnapshotState);
  const movingItemIds = useRecoilValue(movingItemIdsState);

  const loadMovingItems = useLoadItems();
  const updateItemsPosition = useUpdateItems();

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
    loadMovingItems(movingItemIds)
      .then(items => {
        setMovingItemsSnapshot(items);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movingItemIds]); // should only depend on `movingItemIds`

  return {
    onMouseDown
  }
}
