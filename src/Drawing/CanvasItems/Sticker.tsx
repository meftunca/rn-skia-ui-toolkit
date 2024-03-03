import type { StickerPath } from '@/Provider'
import type { Matrix4 } from '@shopify/react-native-skia'
import { Group, Image, useImage } from '@shopify/react-native-skia'
import React, { useMemo } from 'react'
import type { SharedValue } from 'react-native-reanimated'

export const StickerSource = ({
  matrix,
  path: imagePath,
  id,
  dimensions,
}: StickerPath & {matrix:Matrix4}) => {
  const image = useImage(imagePath, console.error);

  return (
          <Image
            x={dimensions.x}
            y={dimensions.y}
            width={dimensions.width}
            height={dimensions.height}
            image={image}
          />
  );
};
