import {
  Canvas,
  Group,
  Matrix4,
  Path,
  Skia,
  convertToAffineMatrix,
  convertToColumnMajor,
  toMatrix3,
  translate,
  useCanvasRef,
} from "@shopify/react-native-skia";
import React, { useMemo } from "react";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { CurrentPath, useCanvasCtx } from "@/Provider";
import { CanvasBackgroundImage } from "../CanvasItems/Picture";
import { StickerSource } from "../CanvasItems/Sticker";
import CanvasText from "../CanvasItems/Text";
import { useContextBridge } from "its-fine";

export const imageURL =
  "https://images.unsplash.com/photo-1703593191760-ff33fe19c56d?q=80&w=500&fm=webp&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const PathRenderer = () => {
  const canvasRef = useCanvasRef();
  const ContextBridge = useContextBridge();

  const { paths } = useCanvasCtx((f) => f);
  return (
    <Canvas
      ref={canvasRef}
      style={{
        // height: layoutHeight,
        // width: width - 24,
        flex: 1,
        backgroundColor: "#321831",
      }}
      // onTouch={console.log}
      debug={__DEV__}
    >
      <ContextBridge>
        <CanvasBackgroundImage
          id="canvas-background"
          // matrix={backgroundImageMatrix}
          path={imageURL}
        />

       {paths.map((path) => (
          <GroupPath key={path.id} {...path} />
        ))}
      </ContextBridge>
    </Canvas>
  );
};

const GroupPath = ({ id, type, matrix, ...path }: CurrentPath) => {
  // if (type === "draw") {
  //   item = <Path {...path} />;
  // } else if (type === "text") {
  //   item = <CanvasText {...path} />;
  // } else if (type === "sticker") {
  //   item = <StickerSource {...path} />;
  // }
  const item = useMemo(() => {
    if (type === "draw") {
      return <Path {...path} />;
    } else if (type === "text") {
      return <CanvasText {...path} />;
    } else if (type === "sticker") {
      return <StickerSource {...path} />;
    }
  }, [type, path]);
  console.log("matrix", matrix.value);
  return <Group matrix={matrix}>{item}</Group>;
};

export default PathRenderer;
