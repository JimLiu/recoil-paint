import React, { useState } from 'react';
import { useSetRecoilState, useRecoilValue, useRecoilCallback } from 'recoil';
import Button from '../common/Button';
import useMove from '../../hooks/useMove';
import { itemIdsState, canvasLayoutState, selectedIdsState } from '../../recoil/atoms';
import { itemWithId } from '../../recoil/selectors';
import { createNewShape } from '../../recoil/defaults';

export default function NewItemButton({ newShapeProps = {}, ...others }) {
  const [newItem, setNewItem] = useState(null);
  const setItemIds = useSetRecoilState(itemIdsState);
  const setSelectedIds = useSetRecoilState(selectedIdsState);
  const canvasLayout = useRecoilValue(canvasLayoutState);


  const createNewItem = useRecoilCallback(async ({ getPromise }, shapeParam) => {
    let id = createNewShape(shapeParam);
    const item = await getPromise(itemWithId(id));

    return item;
  });

  const updatePosition = useRecoilCallback(({ set }, newValue) => {
    set(itemWithId(newValue.id), newValue)
  });

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
