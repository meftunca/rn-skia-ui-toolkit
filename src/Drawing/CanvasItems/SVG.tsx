import {
  DataSourceParam,
  Group,
  ImageSVG,
  rect,
  SkiaValue,
  SkMatrix,
  useSVG,
} from '@shopify/react-native-skia';
import React from 'react';
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
export const PictureDimensions = rect(0, 0, width, height);

interface PictureProps {
  matrix: SkiaValue<SkMatrix>;
  source: DataSourceParam;
}

export const Picture = ({matrix, source}: PictureProps) => {
  const svg = useSVG(source);
  return (
    <Group matrix={matrix}>
      <ImageSVG x={0} y={0} width={width} height={height} svg={svg} />
    </Group>
  );
};
