import Rectangle from './Rectangle';
import Ellipse from './Ellipse';
import Image from './Image';

const shapes = {
  rect: Rectangle,
  ellipse: Ellipse,
  image: Image,
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
