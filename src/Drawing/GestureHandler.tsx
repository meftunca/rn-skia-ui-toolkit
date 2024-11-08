// Code:
import type {SkRect} from '@shopify/react-native-skia';
import {
  Matrix4,
  Skia,
  convertToColumnMajor,
  multiply4,
  rotateZ,
  scale,
  translate,
} from '@shopify/react-native-skia';
import {Pressable} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useCanvasCtx} from '@app/Provider';

interface GestureHandlerProps {
  matrix: SharedValue<Matrix4>;
  dimensions: SharedValue<SkRect>;
  debug?: boolean;
  id: string;
}
const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);
const GestureHandler = ({
  matrix,
  dimensions,
  debug,
  id,
}: GestureHandlerProps) => {
  const origin = useSharedValue({x: 0, y: 0});
  const offset = useSharedValue(Matrix4());
  const [currentSelected,toggleSelected,clearSelected] = useCanvasCtx(f => [f.currentSelected,f.toggleSelected,f.clearSelected]);
  const isSelected = currentSelected === id;
  const pan = Gesture.Pan().onChange(e => {
    matrix.value = multiply4(translate(e.changeX, e.changeY), matrix.value);
  }).enabled(isSelected);
  const rotate = Gesture.Rotation()
    .onBegin(e => {
      origin.value = {x: e.anchorX, y: e.anchorY};
      offset.value = matrix.value;
    })
    .onChange(e => {
      matrix.value = multiply4(offset.value, rotateZ(e.rotation, origin.value));
    });

  const pinch = Gesture.Pinch()
    .onBegin(e => {
      origin.value = {x: e.focalX, y: e.focalY};
      offset.value = matrix.value;
    })
    .onChange(e => {
      matrix.value = multiply4(
        offset.value,
        scale(e.scale, e.scale, 1, origin.value),
      );
    });

  const style = useAnimatedStyle(() => {
    const m4 = convertToColumnMajor(matrix.value);
    const {x, y, width, height} = dimensions.value || {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }; // dimensions.value artık useAnimatedStyle içinde
    return {
      position: 'absolute',
      left: x,
      top: y,
      width,
      height,
      backgroundColor: isSelected ? 'rgba(100, 200, 300, 0.2)' : '#fff5',
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
  }, [matrix, dimensions, debug, isSelected]); // dimensions bağımlılık olarak eklendi
  const gesture = Gesture.Race(pinch,  rotate,  pan);
  return (
    <GestureDetector gesture={gesture}>
      <AnimatedTouchable
        // onPressOut={() => {
        //   if (isSelected) clearSelected();
        // }}
        // onPressIn={() => {
        //   if (!isSelected) toggleSelected(id);
        // }}
        onPress={() => {
          toggleSelected(id);
        }}
        // pressRetentionOffset={{top: 10, left: 10, right: 10, bottom: 10}}
        style={style}
      />
    </GestureDetector>
  );
};

export default GestureHandler;