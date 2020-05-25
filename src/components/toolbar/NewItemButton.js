import React, { useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import Button from '../common/Button';
import useMove from '../../hooks/useMove';
import { itemIdsState, canvasLayoutState, selectedIdsState } from '../../recoil/atoms';
import { useUpdateItem, useNewItem } from '../../recoil/hooks';

export default function NewItemButton({ newShapeProps = {}, ...others }) {
  const [newItem, setNewItem] = useState(null);
  const setItemIds = useSetRecoilState(itemIdsState);
  const setSelectedIds = useSetRecoilState(selectedIdsState);
  const canvasLayout = useRecoilValue(canvasLayoutState);
  const createNewItem = useNewItem();
  const updatePosition = useUpdateItem();

  const { onMouseDown } = useMove(({ status, origin, offset }) => {
    if (status === 'start') {
      setNewItem(null);
      createNewItem({
        ...newShapeProps,
        x: origin.clientX - canvasLayout.x,
        y: origin.clientY - canvasLayout.y
      })
        .then(item => {
          setNewItem(item);
          setItemIds(items => [...items, item.id]);
          setSelectedIds([]);
        });
    }

    if (status === 'moving') {
      if (newItem) {
        updatePosition({
          ...newItem,
          x: origin.clientX + offset.x - canvasLayout.x,
          y: origin.clientY + offset.y - canvasLayout.y
        })
      }
    }

    if (status === 'end') {
      if (newItem) {
        setNewItem(null);
        setSelectedIds([newItem.id]);
      }
    }
  })



  return <Button {...others} onMouseDown={onMouseDown} />;
}
