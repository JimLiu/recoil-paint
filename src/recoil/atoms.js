import { atom } from 'recoil';
import memoize from '../utils/memoize';
import { getDefaultShape } from './defaults';

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

export const privateItemStateWithId =
  memoize(id => atom({
    key: `private-item${id}`,
    default: getDefaultShape(id),
  }));
