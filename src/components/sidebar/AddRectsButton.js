import React from 'react';
import { StyleSheet, Text } from 'react-native-web';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Button from '../common/Button';
import { itemIdsState, selectedIdsState } from '../../recoil/atoms';
import { createNewShape } from '../../recoil/defaults';

export default function AddRectsButton() {
  const [itemIds, setItemIds] = useRecoilState(itemIdsState);
  const setSelectedIds = useSetRecoilState(selectedIdsState);

  const handleClick = () => {
    let space = 16;
    let width = 100;
    let height = 100;
    let ids = [];
    let start = itemIds.length;
    for (let i=0; i<100; i++) {
      let count = start + i;
      let row = Math.floor(count / 5);
      let col = count % 5;
      let x = space * (col + 1) + width * col;
      let y = space * (row + 1) + height * row;
      let id = createNewShape({ x, y, width, height });
      ids.push(id);
    }

    setItemIds([...itemIds, ...ids]);
    setSelectedIds([]);
  }


  return (
    <Button style={styles.root} onClick={handleClick}>
      <Text style={styles.text}>Add 100 Rects</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#12850b'
  },
  text: {
    color: 'white',
  }
})
