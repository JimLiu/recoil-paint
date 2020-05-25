import { useRecoilCallback } from 'recoil';
import { itemWithId } from './selectors';
import { createNewShape } from './defaults';

export function useUpdateItem() {
  return useRecoilCallback(({ set }, newValue) => {
    set(itemWithId(newValue.id), newValue)
  });
}

export function useNewItem() {
  return useRecoilCallback(async ({ getPromise }, shapeParam) => {
    let id = createNewShape(shapeParam);
    const item = await getPromise(itemWithId(id));

    return item;
  });
}

export function useLoadItems() {
  return useRecoilCallback(async ({ getPromise }, itemIds) => {
    return await Promise.all(
      itemIds.map(id => getPromise(itemWithId(id)))
    );
  });
}

export function useUpdateItems() {
  return useRecoilCallback(({ set }, newValue) => {
    newValue.forEach(item => {
      set(itemWithId(item.id), item);
    })
  });
}
