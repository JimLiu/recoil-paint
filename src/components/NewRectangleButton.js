import React from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import Button from './Button';
import SquareIcon from './icons/Square';
import {
  itemIdsState,
  movingItemIdsState,
  canvasLayoutState,
  selectedIdsState,
  generateId,
  setNewItemOrigin,
} from '../atoms';
import useMove from './hooks/useMove';

export default function NewRectangleButton({ style }) {
  const [itemIds, setItemIds] = useRecoilState(itemIdsState);
  const [movingItemIds, setMovingItemIds] = useRecoilState(movingItemIdsState);
  const setSelectedIds = useSetRecoilState(selectedIdsState);
  const canvasLayout = useRecoilValue(canvasLayoutState);

  const { onMouseDown } = useMove(({ status, origin, offset, isMoving }) => {
    if (status === 'start') {
      let id = generateId();
      setNewItemOrigin(origin.clientX - canvasLayout.x, origin.clientY - canvasLayout.y);
      setItemIds([...itemIds, id]);
      setSelectedIds([]);
      setMovingItemIds([id]);
    }

    if (status === 'end') {
      setSelectedIds([...movingItemIds]);
      setMovingItemIds([]);
    }
  })


  return <Button Icon={SquareIcon} style={style} onMouseDown={onMouseDown} />;
}
