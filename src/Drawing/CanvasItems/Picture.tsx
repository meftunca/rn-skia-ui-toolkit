import {
  Group,
  Image,
  Matrix4,
  useImage
} from '@shopify/react-native-skia';
import React,{ useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export const CanvasBackgroundImage = ({
  matrix,
  path: imagePath,
  id,
}:  {matrix: SharedValue<Matrix4>,path:string,id:string}) => {

  const layout = useWindowDimensions();
  const image = useImage(imagePath, console.error);
  const calculatedSizes = useMemo(() => {
    if(!!image){
      const width = image.width();
      const height = image.height();
      const scale = Math.max(layout.width / width, layout.height / height);
      return {
        x: (layout.width - width*scale)/2,
        y: (layout.height - height*scale)/2,
        width: width*scale,
        height: height*scale,
      }
    }else{
      return {
        x: 0,
        y: 0,
        width: layout.width,
        height: layout.height,
      }
    }
  }, [image, layout])
  return (
    <Group data-test-id={id} matrix={matrix}>
      {image && (
        <Group>
          <Image

            // x={calculatedSizes.x}
            // y={calculatedSizes.y}
            width={calculatedSizes.width}
            height={calculatedSizes.height}
            image={image}
            fit="contain"
          />
        </Group>
      )}
    </Group>
  );
};
