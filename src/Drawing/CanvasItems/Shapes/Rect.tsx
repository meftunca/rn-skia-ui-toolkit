import type { CanvasShapeStyles } from '@/Provider';
import { RoundedRect } from '@shopify/react-native-skia';

export const CanvasShapeStar = (props: CanvasShapeStyles) => {
  return <RoundedRect {...props} />;
};
