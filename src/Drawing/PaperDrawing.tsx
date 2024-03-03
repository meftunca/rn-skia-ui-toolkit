import { Canvas, Matrix4, Path, Skia, SkiaDomView,useCanvasRef } from '@shopify/react-native-skia'
import React, { useRef } from 'react'
import { useWindowDimensions, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import { makeMutable, runOnJS, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useCanvasCtx } from '../Provider'



// TODO Reanimated kullanarak performans arttırılabilir
const PaperDrawing = () => {
  let canvas = useCanvasRef();
  // const [currentPath, setCurrentPath] = useState("M 0 0");
  const currentPath = useSharedValue("M 0 0");
  const { width, height: windowHeight } = useWindowDimensions();

  // const {matrixes: matrixexMap, dimensions: dimensionsMap, paths:ctxPaths} = useCanvasCtx(f => f);
  const insets = useSafeAreaInsets();
  const layoutHeight = windowHeight - insets.top - insets.bottom - 120;
  const [paths, addPath, color, stroke] = useCanvasCtx((f) => [
    f.paths,
    f.addPath,
    f.currentColor,
    f.stroke,
  ]);

  const pan = Gesture.Pan()
    // .runOnJS(true)
    .onBegin((g) => {
      //  const newPaths = [...paths];

      //  newPaths[paths.length] = {
      //    segments: [],
      //    color: '#06d6a0',
      //  };
      //  newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      //  setPaths([...newPaths]);
      // setCurrentPath(() => `M ${g.x} ${g.y}`);
      currentPath.value = `M ${g.x} ${g.y}`;
    })
    .onChange((g) => {
      // setCurrentPath((value) => value + ` L ${g.x} ${g.y}`);
      currentPath.value = currentPath.value + ` L ${g.x} ${g.y}`;
    })
    .onFinalize(() => {
        // setCurrentPath((value) => "M 0 0");
        const path = Skia.Path.MakeFromSVGString(currentPath.value);
        if (!path) return;
        const rect = makeMutable(path.getBounds());
        const newPath = {
          id: Date.now().toString(32),
          type: "draw",
          path,
          paint: stroke.value.copy(),
          color: color.value,
          dimension: rect,
          matrix: makeMutable(Matrix4()),
        }
        currentPath.value = "M 0 0";
        // addPath(newPath);
        // paths.modify((f:Record<string,CurrentPath>) => {
        //   "worklet"
        //   f[newPath.id] = newPath;
        //   return f;
        // },true)
        runOnJS(addPath)(newPath);
    })
    .minDistance(1);

  return (
    <View
      style={{
        position: "absolute",
        height: layoutHeight,
        width: width - 24,
        zIndex: 10,
      }}
    >
      <GestureDetector gesture={pan}>
        <Canvas
          ref={canvas}
          style={{
            flex: 8,
          }}
        >
          {!!currentPath && (
            <Path
              path={currentPath}
              paint={stroke}
              style="stroke"
              color={color}
            />
          )}
          {/* {paths.map((p, index) => (
            <Path key={index} path={p.segments.join(' ')} strokeWidth={5} style="stroke" color={p.color} />
          ))} */}
        </Canvas>
      </GestureDetector>
    </View>
  );
};

export default PaperDrawing;
