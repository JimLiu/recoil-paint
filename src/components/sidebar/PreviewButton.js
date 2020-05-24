import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native-web';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Button from '../common/Button';
import { itemIdsState, selectedIdsState } from '../../recoil/atoms';
import { createNewShape } from '../../recoil/defaults';

export default function PreviewButton() {
  const [itemIds, setItemIds] = useRecoilState(itemIdsState);
  const setSelectedIds = useSetRecoilState(selectedIdsState);
  const [created, setCreated] = useState(false);

  const handleClick = () => {
    let space = 16;
    let width = 100;
    let height = 100;
    let ids = [];
    for (let row=0; row<20; row++) {
      for (let col=0; col<5; col++) {
        let x = space * (col + 1) + width * col;
        let y = space * (row + 1) + height * row;
        let id = createNewShape({ x, y, width, height });
        ids.push(id);
      }
    }

    setItemIds([...itemIds, ...ids]);
    setSelectedIds([]);
    setCreated(true);
  }


  return (
    <Button style={styles.root} onClick={handleClick} disabled={created}>
      <Text style={styles.text}>Preview</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#3c8227'
  },
  text: {
    color: 'white',
  }
})
