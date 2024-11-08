import type {StickerPath} from '@app/Provider/ProviderTypes';
import type {Matrix4} from '@shopify/react-native-skia';
import {Group, Image, useImage} from '@shopify/react-native-skia';
import React, {useMemo} from 'react';
import type {SharedValue} from 'react-native-reanimated';

export const StickerSource = ({
  path: imagePath,
  dimensions,
}: StickerPath) => {
  const image = useImage(imagePath, console.error);
  if (!image) return null;
  return (
    <Image
      x={dimensions.value.x}
      y={dimensions.value.y}
      width={dimensions.value.width}
      height={dimensions.value.height}
      image={image}
    />
  );
};
