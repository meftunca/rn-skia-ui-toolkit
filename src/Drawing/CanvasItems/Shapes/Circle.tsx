import {Circle, Path, RoundedRect} from '@shopify/react-native-skia';
import {CanvasShapeStyles} from '@/store';

export const CanvasShapeStar = (props: CanvasShapeStyles) => {
  return <Circle {...props} cx={props.size} cy={props.size} />;
};
