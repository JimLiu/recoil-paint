import { selector } from 'recoil';
import computeBoundingBox from '../utils/computeBoundingBox';
import { privateItemStateWithId, selectedIdsState } from './atoms';
import applyConstraints from '../utils/applyConstraints';

export const itemWithId = id => selector({
  key: `item${id}`,
  get: ({ get }) => {
    const state = get(privateItemStateWithId(id));
    return applyConstraints(state);
  },
  set: ({ set }, newValue) => {
    const state = privateItemStateWithId(id);
    set(state, newValue);
  }
});

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

export const selectionBoundingBox = selector({
  key: 'selectionBoundingBox',
  get: ({ get }) => computeBoundingBox(get(selectedItemsSelector))
});
