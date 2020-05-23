
export default function computeBoundingBox(items) {
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
