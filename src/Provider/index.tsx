import { COLORS } from "@app/Assets/Colors";
import type {
  DrawingInfo,
  SkPaint,
  SkPath,
  SkRect,
} from "@shopify/react-native-skia";
import { Matrix4 } from "@shopify/react-native-skia";
import React, { createContext, useContext, useState } from "react";
import type { SharedValue } from "react-native-reanimated";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import { getPaint } from "../Drawing/utils";
import { CurrentPath, Modes, CanvasProviderType } from "./ProviderTypes";

const CanvasContext = createContext<CanvasProviderType | undefined>(undefined);

const useSharedValues = (initialValues: CurrentPath[] = []) => {
  const [paths, setPaths] = useState<CurrentPath[]>(initialValues);

  const addPath = (value: CurrentPath) => {
    // dispatch({ type: "add", payload: value });
    setPaths((f) => Array.from([...f, value]));
  };

  const dropPath = (id: string) => {
    // dispatch({ type: "drop", payload: id  });
    setPaths((f) => f.filter((g) => g.id !== id));
  };

  const modifyPath = (
    id: string,
    callback: (f: CurrentPath) => CurrentPath
  ) => {
    // dispatch({
    //   type: "modify",
    //   payload: [id,callback(paths.find((f) => f.id === id) as CurrentPath)]
    // });
    setPaths((f) =>
      f.map((g) => {
        if (g.id === id) {
          return callback(g);
        }
        return g;
      })
    );
  };

  const resetPaths = () => {
    // dispatch({ type: "reset" });
    setPaths([]);
  };

  return {
    paths,
    addPath,
    dropPath,
    modifyPath,
    setPaths,
    resetPaths,
  } as const;
};

const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<Modes>("select");
  const { paths, addPath, dropPath, modifyPath, setPaths, resetPaths } =
    useSharedValues([]);
  const sharedStroke = useSharedValue(getPaint(2, COLORS.redRouge));
  const [currentSelected,setCurrentSelected] = useState("");
  const currentColor = useSharedValue(COLORS.redRouge);

  const changeColor = (color: string) => {
    currentColor.value = color;
  };

  const toggleSelected = (id: string) => {
    setCurrentSelected(
      (f) => (f === id ? "" : id)
    )
  };
  
  const clearSelected = () => {
    setCurrentSelected("");
  };

  return (
    <CanvasContext.Provider
      value={{
        mode,
        setMode,
        currentColor,
        changeColor,
        paths,
        addPath,
        dropPath,
        setPaths,
        currentSelected,
        stroke: sharedStroke,
        clearSelected,
        setColor: (color: string) => {
          // setColor(color);
        },
        setStroke: (stroke: SkPaint) => {
          // setStroke(stroke);
        },
        canvasInfo: null,
        setCanvasInfo: () => {},
        toggleSelected,
        modifyById: modifyPath,
        color: COLORS.redRouge,
        strokeWidth: 2,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasCtx = <P extends Object, R>(
  selector?: (ctx: CanvasProviderType) => P
): P => {
  const ctx = useContext(CanvasContext);
  if (!ctx) {
    throw new Error("useCanvasCtx must be used within a CanvasProvider");
  }
  // @ts-ignore
  if (!selector) return ctx;
  return selector(ctx);
};

export default CanvasProvider;
