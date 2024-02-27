import {
  Canvas,
  Matrix4,
  Path,
  Skia,
  useCanvasRef,
  useDerivedValueOnJS,
  useFont
} from "@shopify/react-native-skia";
import React from "react";
import { SafeAreaView, View, useWindowDimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { CanvasBackgroundImage } from "../CanvasItems/Picture";
import { StickerSource } from "../CanvasItems/Sticker";
import CanvasText from "../CanvasItems/Text";
import { CurrentPath, useCanvasCtx } from "../../Provider";
export const imageURL =
  "https://images.unsplash.com/photo-1703593191760-ff33fe19c56d?q=80&w=500&fm=webp&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
 const PathRenderer = () => {
  const canvasRef = useCanvasRef();
  const backgroundImageMatrix = useSharedValue(Matrix4());
  const paths = useCanvasCtx((f) =>f.paths);
  // const onLayout = useCallback((event: LayoutChangeEvent) => {
  //   layoutHeight = event.nativeEvent.layout.height;
  // }, []);

  return (
    <Canvas
    ref={ canvasRef }
    style={ {
      // height: layoutHeight,
      // width: width - 24,
      flex: 1,
      backgroundColor: "#121212",
    } }
    // onTouch={console.log}
    debug={ __DEV__ }
  >
    <CanvasBackgroundImage
      id="canvas-background"
      matrix={ backgroundImageMatrix }
      path={ imageURL } />

    { paths.map((path) => path.type === "draw" ? (
      <Path key={ path.id } path={path.path} color={path.color} paint={path.paint} matrix={path.matrix}  />
    ) : path.type === "text" ? (
      <CanvasText key={ path.id } { ...path } />
    ) : path.type === "sticker" ? (
      <StickerSource
        key={ path.id }
        { ...path } />
    ) : null
    ) }
  </Canvas>
  );
};


export default PathRenderer