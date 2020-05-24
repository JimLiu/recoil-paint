import React from 'react';
import { View, StyleSheet } from 'react-native-web';
import { useRecoilValue } from 'recoil';
import ItemInfo from './ItemInfo';
import { itemIdsState } from '../../recoil/atoms';

export default function ItemInfoList() {
  const itemIds = useRecoilValue(itemIdsState);

  return (
    <View style={styles.root}>
      {itemIds.map(id => <ItemInfo key={`item-info-${id}`} id={id} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    overflow: 'auto'
  },
})
