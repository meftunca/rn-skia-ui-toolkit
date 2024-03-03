import type { SkRect, } from '@shopify/react-native-skia'
import { convertToColumnMajor, Matrix4, multiply4, rotateZ, scale, Skia, translate, } from '@shopify/react-native-skia'
import React, { useEffect } from 'react'
import { Pressable } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { makeMutable, useAnimatedStyle, useSharedValue,SharedValue } from 'react-native-reanimated'
import { useCanvasCtx } from '../Provider'

interface GestureHandlerProps {
  matrix: SharedValue<Matrix4>;
  dimensions: SharedValue<SkRect>;
  debug?: boolean;
  id: string;
  selectedList: string[];
  toggleSelected: (id: string) => void;
}
const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);
 const GestureHandler = ({ matrix,dimensions, debug, id, selectedList, toggleSelected}: GestureHandlerProps) => {
  const {x, y, width, height} = dimensions.value || {x: 0, y: 0, width: 0, height: 0};
  const origin = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue(Matrix4());
  const isSelected = selectedList.includes(id);
  const modifyById = useCanvasCtx((f) => f.modifyById);
  const pan = Gesture.Pan().runOnJS(true)
    // .onBegin(() => {
    //   'worklet';
    //   console.log("pan");
    //   // runOnJS(toggleSelected)(id);
    //   toggleSelected(id);
    // })
    .onChange(e => {
      // matrix.value = multiply4(translate(e.changeX, e.changeY), matrix.value);
      let newMatrix = multiply4(translate(e.changeX, e.changeY), matrix.value);
      matrix.value = newMatrix;
      // modifyById(id, f => ({...f, matrix: newMatrix}));
      // modifyById(id, f => ({...f, matrix: multiply4(translate(e.changeX, e.changeY), f.matrix)}));
      //  set dimensions
      // let newDimensions = {
      //   x: dimensions.x + e.changeX,
      //   y: dimensions.y + e.changeY,
      //   width: dimensions.width,
      //   height: dimensions.height,
      // };
      // modifyById(id, f => ({...f, dimensions: newDimensions}));
    
    })
    // .onEnd(e => {
    //   "worklet";
    //   toggleSelected(id);
 
    // });

  const rotate = Gesture.Rotation()  .runOnJS(true)
    .onBegin(e => {
      "worklet";
      origin.value = {x: e.anchorX, y: e.anchorY};
      offset.value = matrix
    })
    .onChange(e => {
      "worklet";
    //  modifyById(id, f => ({...f, matrix: multiply4(offset.value, rotateZ(e.rotation, origin.value))}));
    matrix.value = multiply4(offset.value, rotateZ(e.rotation, origin.value))
    
    });

  const pinch = Gesture.Pinch()
    .onBegin(e => {
      "worklet";
      origin.value = {x: e.focalX, y: e.focalY};
      offset.value = matrix.value
    })
    .onChange(e => {
      "worklet";
     matrix.value = multiply4(offset.value, scale(e.scale, e.scale, 1, origin.value))
    });

  const style = useAnimatedStyle(() => {
    const m4 = convertToColumnMajor(matrix.value);
    return {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      backgroundColor: isSelected ? 'rgba(100, 200, 300, 0.2)' :debug  ? "#fff00030"  : '#3fa5',
      transform: [
        {translateX: -width / 2},
        {translateY: -height / 2},
        {
          matrix: m4 as unknown as number[],
        },
        {translateX: width / 2},
        {translateY: height / 2},
      ],
    };
  }, [matrix, width, height, debug, isSelected]);
  const gesture = Gesture.Race( pan);
  return (
    <GestureDetector gesture={gesture}>
      <AnimatedTouchable
        onPressOut={()=>{
          if(isSelected)toggleSelected(id);
        }}
        onLongPress={() => {
         if(!isSelected) toggleSelected(id);
        }}
        style={style}
      />
    </GestureDetector>
  );
};

export default GestureHandler;
