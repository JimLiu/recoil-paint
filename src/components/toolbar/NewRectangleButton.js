import React from 'react';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import Button from './Button';
import SquareIcon from '../icons/Square';
import {
  itemIdsState,
  movingItemIdsState,
  canvasLayoutState,
  selectedIdsState,
} from '../../recoil/atoms';
import useMoveItems from '../hooks/useMoveItems';
import { createNewShape } from '../../recoil/defaults';

export default function NewRectangleButton({ style }) {
  const [itemIds, setItemIds] = useRecoilState(itemIdsState);
  const [movingItemIds, setMovingItemIds] = useRecoilState(movingItemIdsState);
  const setSelectedIds = useSetRecoilState(selectedIdsState);
  const canvasLayout = useRecoilValue(canvasLayoutState);

  const { onMouseDown } = useMoveItems(({ status, origin }) => {
    if (status === 'start') {
      let id = createNewShape({ x: origin.clientX - canvasLayout.x, y: origin.clientY - canvasLayout.y });
      // setNewItemOrigin(origin.clientX - canvasLayout.x, origin.clientY - canvasLayout.y);
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
