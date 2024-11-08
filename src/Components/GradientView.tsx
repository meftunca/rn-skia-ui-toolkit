import { useLayout } from '@react-native-community/hooks'
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia'
import React from 'react'
import type { ViewProps } from 'react-native'
import { View } from 'react-native'


export const GradientView:React.FC<ViewProps&{
  colors:string[],
}> = ({children,style={},colors,...props}) => {
  const {x,y,width,height,onLayout} = useLayout();
  return (//@ts-ignore
    <View {...props} style={[{ flex: 1,overflow:"hidden" },style].flat()} onLayout={(e)=>{
      onLayout(e);
      if(!!props.onLayout) props.onLayout(e);
    }}>
      <View style={{position:"absolute",top:0,left:0,right:0,bottom:0}}>
      <Canvas style={{ flex: 1 }}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(width, height)}
          colors={colors}
        />
      </Rect>
    </Canvas>
      </View>
      {
        children
      }
  </View>
  );
};