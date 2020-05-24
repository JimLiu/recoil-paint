import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { createShape } from '../shapes';
import { itemWithId, selectedIdsState } from '../../recoil/atoms';

export default function CanvasItem({ id }) {
  const itemState = useRecoilValue(itemWithId(id));
  const setSelectedIds = useSetRecoilState(selectedIdsState);

  const handleClick = ({ metaKey, shiftKey }) => {
    setSelectedIds(ids => {
      if (metaKey || shiftKey) {
        return [...ids, id];
      }
      return [id];
    });
  }


  const Shape = createShape(itemState);
  if (!Shape) {
    return null;
  }

  return <Shape {...itemState} onClick={handleClick} />;
}
