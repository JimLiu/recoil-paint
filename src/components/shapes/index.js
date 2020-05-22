import Rectangle from './Rectangle';
import Ellipse from './Ellipse';

const shapes = {
  rect: Rectangle,
  ellipse: Ellipse,
}

function createShape(shape) {
  const { type } = shape;
  return shapes[type];
}

export {
  Rectangle,
  Ellipse,
  createShape,
}
