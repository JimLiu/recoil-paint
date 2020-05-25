import React from 'react';
import NewItemButton from './NewItemButton';
import SquareIcon from '../icons/Square';

export default function NewRectangleButton({ style, ...others }) {
  return (
    <NewItemButton
      {...others}
      Icon={SquareIcon}
      style={style}
      title="Drag to create a new Rectangle"
    />
  );
}
