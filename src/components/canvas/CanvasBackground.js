import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native-web';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { selectedIdsState, backgroundColorState } from '../../recoil/atoms';

export default function CanvasBackground(props) {
  const setSelectedIds = useSetRecoilState(selectedIdsState);
  const backgroundColor = useRecoilValue(backgroundColorState);

  const handleClick = useCallback(() => {
    setSelectedIds([]);
  }, [setSelectedIds]);

  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor }]} onClick={handleClick} />
  );
}
