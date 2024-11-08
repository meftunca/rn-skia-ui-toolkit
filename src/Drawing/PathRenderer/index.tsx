import {
  Canvas,
  Group,
  Matrix4,
  Path,
  Skia,
  useCanvasRef,
} from "@shopify/react-native-skia";
import React, { useEffect } from "react";

import { useCanvasCtx } from "@app/Provider";
import { CanvasBackgroundImage } from "../CanvasItems/Picture";
import { StickerSource } from "../CanvasItems/Sticker";
import CanvasText from "../CanvasItems/Text";
import { CurrentPath } from "@app/Provider/ProviderTypes";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

export const imageURL =
  "https://images.unsplash.com/photo-1703593191760-ff33fe19c56d?q=80&w=500&fm=webp&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const PathRenderer = () => {
  const canvasRef = useCanvasRef();
  const paths = useCanvasCtx((f) => f.paths);
  const bgImageMatrix = useSharedValue(Matrix4());
  return (
    <Canvas
      ref={canvasRef}
      // mode="continuous"
      style={{
        // height: layoutHeight,
        // width: width - 24,
        flex: 1,
        backgroundColor: "#000000",
      }}
      // onTouch={console.log}
      debug={__DEV__}
    >
      <CanvasBackgroundImage
        id="canvas-background"
        matrix={bgImageMatrix}
        path={imageURL}
      />

      {paths.map(({ matrix, ...path }, index) => (
        <GroupPath key={index} {...path} matrix={matrix} />
      ))}
    </Canvas>
  );
};

const GroupPath = ({ id, type, matrix, dimensions, ...path }: CurrentPath) => {
  if (type === "draw") {
    return (
      <Group matrix={matrix}>
        <Path {...path} />
      </Group>
    );
  } else if (type === "text") {
    return (
      <Group matrix={matrix}>
        <CanvasText {...path} />
      </Group>
    );
  } else if (type === "sticker") {
    console.log("StickerPath", path);
    return (
      <Group matrix={matrix}>
        <StickerSource  {...path}  dimensions={dimensions}/>
      </Group>
    );
  }
};

export default PathRenderer;
