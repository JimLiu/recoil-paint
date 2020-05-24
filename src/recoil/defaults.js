export const shapes = {};
export const defaultShape = {
  type: 'rect',
  x: 0,
  y: 0,
  label: 'Recoil',
  fill: '#dbdde4',
  width: 200,
  height: 100,
};

let gId = 1;
function generateId() {
  return gId++;
}

export function createNewShape(props) {
  let id = generateId();
  shapes[id] = Object.assign({ id }, defaultShape, props);

  return id;
}

export function getDefaultShape(id) {
  return shapes[id] || defaultShape;
}
