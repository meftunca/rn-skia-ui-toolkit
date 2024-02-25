import { GradientView } from '@/Components/GradientView';
import React, {useCallback} from 'react';
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';

import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
const TRACK_R = 10;
export type hslColor = string;
const gradientColors = [
  'hsl(0, 100%, 100%) 00%',
  'hsl(0, 100%, 50%) 10%',
  'hsl(45, 100%, 50%) 20%',
  'hsl(90, 100%, 50%) 30%',
  'hsl(135, 100%, 50%) 40%',
  'hsl(180, 100%, 50%) 50%',
  'hsl(225, 100%, 50%) 60%',
  'hsl(270, 100%, 50%) 70%',
  'hsl(315, 100%, 50%) 80%',
  'hsl(360, 100%, 50%) 90%',
  'hsl(0, 100%, 0%) 100%  ',
];

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 64,
    top: 64,
    right: 8,
    zIndex: 1000,
  },
  thumb: {
    position: 'absolute',
    width: TRACK_R * 2,
    height: TRACK_R * 2,
    borderRadius: TRACK_R,
    top: 0,
    backgroundColor: 'white',
  },
  track: {width: 10, flex: 1, borderRadius: 5, borderWidth: 1},
  indicator: {
    width: 22,
    height: 22,
    borderRadius: 22,
    marginTop: 20,
    left:-2
  },
});

const ColorSlider = ({
  color: SelectedColor,
  onColorChange,
}: {
  color: string;
  onColorChange: (color: string) => void;
}) => {
  const color = useSharedValue(SelectedColor);
  const sliderHeight = useSharedValue(0);

  const position = useDerivedValue(() => {
    const hslRegExp = new RegExp(/hsl\(([\d.]+),\s*(\d+)%,\s*([\d.]+)%\)/);
    const res = hslRegExp.exec(color.value);

    const lum = res ? parseFloat(res[3]) : 0;

    const tint = res ? parseFloat(res[1]) : 0;

    if (lum > 50) {
      return ((sliderHeight.value * 0.1) / 50) * (100 - lum);
    }

    if (lum < 50) {
      return sliderHeight.value - ((sliderHeight.value * 0.1) / 50) * lum;
    }

    return Math.min(
      sliderHeight.value,
      Math.max(
        0,
        sliderHeight.value * 0.1 +
          tint * ((sliderHeight.value - sliderHeight.value * 0.2) / 360),
      ),
    );
  }, [sliderHeight.value,color.value]);
  const startY = useSharedValue(0);
  const newGestureEvent =  Gesture.Pan()
  .runOnJS(true).onBegin(e=>{
    "worklet";
    startY.value = e.y;
  }).onChange((e) => {
    'worklet';
    const translationY = e.translationY;
    const slidePos = Math.min(sliderHeight.value, startY.value + translationY);

    if (slidePos < 0.1 * sliderHeight.value) {
      color.value = `hsl(0, 100%, ${Math.min(
        100,
        100 - (slidePos / (0.1 * sliderHeight.value)) * 50,
      ).toFixed(10)}%)`;
    } else if (slidePos > 0.9 * sliderHeight.value) {
      color.value = `hsl(0, 100%, ${Math.max(
        50 -
          ((slidePos - 0.9 * sliderHeight.value) /
            (0.1 * sliderHeight.value)) *
            50,
        0,
      ).toFixed(10)}%)`;
    } else {
      color.value = `hsl(${
        ((slidePos - sliderHeight.value * 0.1) /
          (sliderHeight.value - sliderHeight.value * 0.2)) *
        360
      }, 100%, 50%)`;
    }
  }).onEnd(() => {
    'worklet';
    onColorChange(color.value);
  });


  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateY: position.value - TRACK_R}],
    };
  }, [position.value]);

  const selectedColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: color.value,
    };
  }, [color.value]);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      sliderHeight.value = event.nativeEvent.layout.height;
    },
    [sliderHeight],
  );
  const gesture = Gesture.Race( newGestureEvent);
 
  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.container}>
          <GradientView
            colors={gradientColors}
            onLayout={onLayout}
            style={styles.track}
          />
          <Animated.View style={[styles.thumb, style]} />
        </Animated.View>
      </GestureDetector>

      <Animated.View style={[styles.indicator, selectedColorStyle]} />
    </View>
  );
};

export default ColorSlider;
