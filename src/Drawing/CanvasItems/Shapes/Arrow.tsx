import {
  fitbox,
  Group,
  Path,
  rect,
  Skia,
  SkiaValue,
  SkMatrix,
} from '@shopify/react-native-skia';
import {CanvasShapeStyles} from '@/store';

const path = Skia.Path.MakeFromSVGString(
  'M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z',
)!;
const bounds = path.computeTightBounds();
const StarrDimensions = rect(0, 0, 120, 120);

export const CanvasShapeArrow = (
  props: CanvasShapeStyles & {matrix: SkiaValue<SkMatrix>},
) => {
  return (
    <Group matrix={props.matrix}>
      <Group transform={fitbox('contain', bounds, StarrDimensions)}>
        <Path path={path} {...props} />
      </Group>
    </Group>
  );
};
