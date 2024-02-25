import {Canvas, Skia, Path, SkCanvas, Matrix4, SkiaDomView, useDerivedValueOnJS} from '@shopify/react-native-skia';
import useDrawingStore, {CurrentPath} from '@/store';
import React, {useState, useRef} from 'react';
import {useWindowDimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import history from './Drawing/history';
import {View} from 'react-native';
import {uid} from 'radash';
export const useCanvasRef = () => useRef<SkiaDomView>(null);
interface IPath {
  segments: String[];
  color?: string;
}

// TODO Reanimated kullanarak performans arttırılabilir
const ImageEditorDrawing = () => {
  let canvas = useCanvasRef();
  const [currentPath, setCurrentPath] = useState('M 0 0');
  const {width, height: windowHeight} = useWindowDimensions();

  // const {matrixes: matrixexMap, dimensions: dimensionsMap, paths:ctxPaths} = useCanvasCtx(f => f);
  const insets = useSafeAreaInsets();
  const layoutHeight = windowHeight - insets.top - insets.bottom - 120;
  const {mode, completedPaths, setCompletedPaths, color, stroke, setCanvasInfo} = useDrawingStore();

  const [paths, setPaths] = useState<IPath[]>([]);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart(g => {
      //  const newPaths = [...paths];

      //  newPaths[paths.length] = {
      //    segments: [],
      //    color: '#06d6a0',
      //  };
      //  newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      //  setPaths([...newPaths]);
      setCurrentPath(() => `M ${g.x} ${g.y}`);
    })
    .onUpdate(g => {
      setCurrentPath(value => value + ` L ${g.x} ${g.y}`);
    })
    .onEnd(() => {
      setCurrentPath(value => 'M 0 0');
      const path = Skia.Path.MakeFromSVGString(currentPath)
      if(!path)return ;
      const rect = path.getBounds()
      setCompletedPaths([
        ...completedPaths,
        {
          id: uid(6),
          type: 'draw',
          path: currentPath,
          paint: stroke.copy(),
          color: color,
          dimension:rect,
          matrix:Matrix4(),
        },
      ]);
    }).minDistance(1);

return (
    <View
      style={{
        position: 'absolute',
        height: layoutHeight,
        width: width - 24,
        zIndex: 10,
      }}>
      <GestureDetector gesture={pan}>
        <Canvas
          ref={canvas}
          style={{
            flex: 8,
          }}>
          {!!currentPath && <Path path={currentPath} paint={stroke} style="stroke" color={color} />}
          {/* {paths.map((p, index) => (
            <Path key={index} path={p.segments.join(' ')} strokeWidth={5} style="stroke" color={p.color} />
          ))} */}
        
        </Canvas>
      </GestureDetector>
    </View>
  );
};

export default ImageEditorDrawing;
