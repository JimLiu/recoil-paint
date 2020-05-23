import { selector } from 'recoil';
import computeBoundingBox from '../utils/computeBoundingBox';
import {
  itemWithId, itemIdsState, selectedIdsState, movingItemIdsState
} from './atoms';

function itemsSelector(key, state) {
  return selector({
    key,
    get: ({ get }) => {
      const ids = get(state);
      if (!ids.length) {
        return [];
      }

      return ids.map(id => get(itemWithId(id)));
    },
    set: ({ set }, newValue) => {
      newValue.forEach(item => {
        let id = item.id;
        set(itemWithId(id), item);
      });
    }
  });
}

export const selectedItemsSelector = itemsSelector('selectedItemsSelector', selectedIdsState);
export const movingItemsSelector = itemsSelector('movingItemsSelector', movingItemIdsState);
export const allItemsSelector = itemsSelector('allItemsSelector', itemIdsState);

export const selectionBoundingBox = selector({
  key: 'selectionBoundingBox',
  get: ({ get }) => computeBoundingBox(get(selectedItemsSelector))
});
