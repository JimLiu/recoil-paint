import React from 'react';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { createShape } from '../shapes';
import { itemWithId, selectedIdsState, movingItemIdsState } from '../../recoil/atoms';
import useMoveItems from '../hooks/useMoveItems';

export default function CanvasItem({ id }) {
  const itemState = useRecoilValue(itemWithId(id));

  const setMovingItemIds = useSetRecoilState(movingItemIdsState);
  const [selectedIds, setSelectedIds] = useRecoilState(selectedIdsState);

  const { onMouseDown } = useMoveItems(({ status, origin }) => {
    if (status === 'start') {
      let ids;
      if (origin.metaKey || origin.shiftKey) {
        ids = [...selectedIds, id]
      } else {
        ids = [id];
      }
      setSelectedIds(ids);
      setMovingItemIds([id]);
    }

    if (status === 'end') {
      setMovingItemIds([]);
    }
  });

  const Shape = createShape(itemState);
  if (!Shape) {
    return null;
  }

  return <Shape {...itemState} onMouseDown={onMouseDown} />;
}
