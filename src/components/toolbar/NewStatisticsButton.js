import React from 'react';
import NewItemButton from './NewItemButton';
import StatisticsIcon from '../icons/Statistics';

export default function NewStatisticsButton({ style, ...others }) {
  const newShapeProps = {
    type: 'statistics',
    width: 28 * 10 + 8,
    height: 144,
    label: 'Series 4134',
    series: [0.8, 0.2, 0.3, 0.4, 0.5, 0.7, 0.8, 0.6, 0.9, 0.2]
  };

  return (
    <NewItemButton
      {...others}
      Icon={StatisticsIcon}
      style={style}
      title="Drag to create a new Statistics"
      newShapeProps={newShapeProps}
    />
  );
}
