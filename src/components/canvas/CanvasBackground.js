import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native-web';
import { useSetRecoilState } from 'recoil';
import { selectedIdsState } from '../../atoms';

export default function CanvasBackground(props) {
  const setSelectedIds = useSetRecoilState(selectedIdsState);

  const handleClick = useCallback(() => {
    setSelectedIds([]);
  }, [setSelectedIds]);

  return (
    <View style={StyleSheet.absoluteFill} onClick={handleClick} />
  );
}
