import {makeCanvasText} from '@//Drawing/CanvasItems/Text';
import {useCanvasCtx} from '@//Provider';
import useDrawingStore from '@/store';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import IconButton from '@/Components/IconButton';
import {runOnJS} from 'react-native-reanimated';
// world emoji=
let bulkText = 'Hello World';
const AppendText = () => {
  const {completedPaths, setCompletedPaths} = useDrawingStore();
  const [font, dimensions, changeDimensions, addPath] = useCanvasCtx(f => [
    f.font['rubik']['bold'],
    f.dimensions,
    f.changeDimensions,
    f.addPath,
  ]);
  const appendText = () => {
    'worklet';
    const newText = makeCanvasText(bulkText, font);
    // dimensions[newText.id] = newText.dimension;
    changeDimensions(newText.id, newText.dimension);
    addPath(newText);
    setCompletedPaths([...completedPaths, newText]);
  };
  return <IconButton icon="format-text" color="white" onPress={runOnJS(appendText)} />;
};

export default AppendText;
