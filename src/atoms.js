import { atom, selector } from 'recoil';

let id = 1;
export function generateId() {
  return id++;
}

const newItemOrigin = { x: 0, y: 0};
export function setNewItemOrigin(x, y) {
  Object.assign(newItemOrigin, { x, y });
}

function memoize(fn) {
  let cached = new Map();
  return (id, ...params) => {
    if (cached.has(id)) {
      return cached.get(id);
    }

    const result = fn(id, ...params);
    cached.set(id, result);

    return result;
  }
}

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

export const canvasLayoutState = atom({
  key: 'canvasLayoutState',
  default: {
    x: 0,
    y: 0,
    width: 800,
    height: 600,
  }
});

export const itemWithId =
  memoize(id => atom({
    key: `item${id}`,
    default: {
      type: 'rect',
      id,
      x: newItemOrigin.x,
      y: newItemOrigin.y,
      width: 200,
      height: 100,
      fill: '#dbdde4',
      label: ''
    }
  }));


function computeBoundingBox(items) {
  if (!items.length) {
    return null;
  }

  let left = null;
  let right = null;
  let top = null;
  let bottom = null;

  items.forEach(item => {
    if (left === null || item.x < left) {
      left = item.x;
    }

    if (top === null || item.y < top) {
      top = item.y;
    }

    if (right === null || item.x + item.width > right) {
      right = item.x + item.width;
    }

    if (bottom === null || item.y + item.height > bottom) {
      bottom = item.y + item.height;
    }
  });

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    isMutilple: items.length > 1,
  };
}

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
  get: ({ get }) => {
    return computeBoundingBox(get(selectedItemsSelector));
  }
});

export const backgroundColorState = atom({
  key: 'backgroundColorState',
  default: 'white'
});
