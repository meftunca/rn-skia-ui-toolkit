import {
  Group,
  Image,
  SkMatrix,
  useImage
} from '@shopify/react-native-skia';
import { StickerPath } from '@/store';
import React from 'react';
import { SharedValue } from 'react-native-reanimated';
export const StickerSource = ({
  matrix,
  path: imagePath,
  id,
  dimension,
}: StickerPath & {matrix: SharedValue<SkMatrix>}) => {
  const image = useImage(imagePath, console.error);
  return (
    <Group data-test-id={id} matrix={matrix}>
        {image && (
          <Image
            x={dimension.x}
            y={dimension.y}
            width={dimension.width}
            height={dimension.height}
            image={image}
            fit="cover"
          />
        )}
    </Group>
  );
};
