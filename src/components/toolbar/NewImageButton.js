import React from 'react';
import NewItemButton from './NewItemButton';
import ImageIcon from '../icons/Image';

export default function NewImageButton({ style, ...others }) {
  const newShapeProps = {
    type: 'image',
    uri: process.env.PUBLIC_URL + '/olympic-marmot.jpg',
    originWidth: 1062,
    originHeight: 1388,
    width: 306,
    height: 400,
    label: '',
  };

  return (
    <NewItemButton
      {...others}
      Icon={ImageIcon}
      style={style}
      title="Drag to create a new Image"
      newShapeProps={newShapeProps}
    />
  );
}
