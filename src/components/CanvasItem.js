import React from 'react';
import { useRecoilValue } from 'recoil';
import { createShape } from './shapes';
import { itemWithId } from '../atoms';

export default function CanvasItem({ id }) {
  const itemState = useRecoilValue(itemWithId(id));

  const Shape = createShape(itemState);
  if (!Shape) {
    return null;
  }

  return <Shape {...itemState} />;
}
