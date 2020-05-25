import Rectangle from './Rectangle';
import Ellipse from './Ellipse';
import Image from './Image';
import Statistics from './Statistics';

const shapes = {
  rect: Rectangle,
  ellipse: Ellipse,
  image: Image,
  statistics: Statistics,
}

function createShape(shape) {
  const { type } = shape;
  return shapes[type];
}

export {
  Rectangle,
  Ellipse,
  Statistics,
  createShape,
}
