import { atom, atomFamily } from 'recoil';
import memoize from '../utils/memoize';

let id = 1;
export function generateId() {
  return id++;
}

const newItemOrigin = { x: 0, y: 0};
export function setNewItemOrigin(x, y) {
  Object.assign(newItemOrigin, { x, y });
}

export const canvasLayoutState = atom({
  key: 'canvasLayoutState',
  default: {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
  }
});

export const backgroundColorState = atom({
  key: 'backgroundColorState',
  default: 'white'
});

export const itemIdsState = atom({
  key: 'itemIdsState',
  default: [],
});

export const selectedIdsState = atom({
  key: 'selectedIdsState',
  default: [],
});

export const movingItemIdsState = atom({
  key: 'movingItemIdsState',
  default: [],
});

export const movingItemsSnapshotState = atom({
  key: 'movingItemsSnapshotState',
  default: {},
});

export const itemWithId =
  memoize(id => atom({
    key: `item${id}`,
    default: {
      id,
      type: 'rect',
      label: '',
      fill: '#dbdde4',
      x: newItemOrigin.x,
      y: newItemOrigin.y,
      width: 200,
      height: 100,
    },
  }));

// export const itemWithId = atomFamily({
//   key: 'element',
//   default: (id) => {
//     return {
//       id,
//       type: 'rect',
//       label: '',
//       fill: '#dbdde4',
//       x: newItemOrigin.x,
//       y: newItemOrigin.y,
//       width: 200,
//       height: 100,
//     }
//   },
// })


// const dimensionStateFamily = atomFamily({
//   key: 'dimension',
//   default: [0, 0, 200, 100],
// });
