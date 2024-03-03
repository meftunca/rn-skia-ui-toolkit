import type { CanvasShapeStyles } from '@/Provider';
import { Circle } from '@shopify/react-native-skia';

export const CanvasShapeStar = (props: CanvasShapeStyles) => {
  return <Circle {...props} cx={props.size} cy={props.size} />;
};
