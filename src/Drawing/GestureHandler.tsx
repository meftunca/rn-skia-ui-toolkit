import {
  Skia,
  SkMatrix,
  SkRect,
  Matrix4,
  multiply4,
  rotateZ,
  scale,
  translate,
  convertToColumnMajor,
  convertToAffineMatrix,
} from '@shopify/react-native-skia';
import React, {useEffect, useMemo} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {runOnJS, SharedValue, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import {useCanvasCtx} from '../Provider';
import {Pressable} from 'react-native';

interface GestureHandlerProps {
  matrix: Matrix4;
  dimension: SkRect;
  debug?: boolean;
  id: string;
  selectedList: string[];
  toggleSelected: (id: string) => void;
}
const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

 const GestureHandler = ({matrix, dimension, debug, id, selectedList, toggleSelected}: GestureHandlerProps) => {
  const {x, y, width, height} = dimension || {x: 0, y: 0, width: 0, height: 0};
  const origin = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue(Matrix4());
  const isSelected = selectedList.includes(id);
  const modifyById = useCanvasCtx(f => f.modifyById);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // skMatrix.value = Skia.Matrix(toMatrix3(matrix.value) as any);
    // modifyById(id, f => ({...f, matrix: Skia.Matrix(matrix.value)}));
  }, [matrix]);
  console.log('matrix', matrix);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      'worklet';
      // runOnJS(toggleSelected)(id);
    })
    .onChange(e => {
      // matrix.value = multiply4(translate(e.changeX, e.changeY), matrix.value);
      modifyById(id, f => ({...f, matrix: multiply4(translate(e.changeX, e.changeY), matrix)}));
    })
    .onEnd(e => {
      offset.value = matrix;
    });
  // const press = Gesture.Tap().onTouchesUp(() => {
  //   'worklet';
  //   // toggleSelected(id);
  //   runOnJS(toggleSelected)(id);
  // });

  const rotate = Gesture.Rotation()
    .onBegin(e => {
      origin.value = {x: e.anchorX, y: e.anchorY};
      offset.value = matrix;
    })
    .onChange(e => {
      // matrix.value = multiply4(offset.value, rotateZ(e.rotation, origin.value));
      modifyById(id, f => ({...f, matrix: multiply4(offset.value, rotateZ(e.rotation, origin.value))}));
    });

  const pinch = Gesture.Pinch()
    .onBegin(e => {
      origin.value = {x: e.focalX, y: e.focalY};
      offset.value = matrix;
    })
    .onChange(e => {
      // matrix.value = multiply4(offset.value, scale(e.scale, e.scale, 1, origin.value));
      modifyById(id, f => ({...f, matrix: multiply4(offset.value, scale(e.scale, e.scale, 1, origin.value))}));
    });

  const style = useAnimatedStyle(() => {
    const m4 = convertToColumnMajor(matrix);
    return {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      backgroundColor: isSelected ? 'rgba(100, 200, 300, 0.2)' :debug  ? "#fff00030"  : 'transparent',
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
  const gesture = Gesture.Race(pinch, rotate, pan);
  return (
    <GestureDetector gesture={gesture}>
      <AnimatedTouchable
        onPress={() => {
          toggleSelected(id);
        }}
        style={style}
      />
    </GestureDetector>
  );
};

export default GestureHandler;
