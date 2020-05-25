export default function applyConstraints(item) {
  const { type, originWidth, originHeight, width } = item;

  if (type !== 'image') {
    return item;
  }

  const ratio = originWidth / originHeight;
  let newHeight = width / ratio;
  return {
    ...item,
    height: newHeight,
  }
}
