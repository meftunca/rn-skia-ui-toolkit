import { COLORS } from "@/Assets/Colors";
import type {
  DrawingInfo,
  SkPaint,
  SkPath,
  SkRect,
} from "@shopify/react-native-skia";
import { Matrix4 } from "@shopify/react-native-skia";
import React, { createContext, useContext, useReducer, useState } from "react";
import type { SharedValue } from "react-native-reanimated";
import { runOnJS, useSharedValue } from "react-native-reanimated";
import utils from "./Drawing/utils";
import { FiberProvider } from "its-fine";

export type Modes = "draw" | "erase" | "select" | "text";

export type DrawPath = {
  id: string;
  type: "draw";
  path: SkPath;
  paint: SkPaint;
  color?: string;
  size?: number;
  dimensions: SkRect;
  matrix: SharedValue<Matrix4>;
};
export type CanvasTextArrayItem = {
  text: string;
  width: number;
  height: number;
  x: number;
  y: number;
};
export type CanvasTextPath = {
  id: string;
  original: string;
  type: "text";
  textArray: CanvasTextArrayItem[];
  color: string;
  fontSize: number;
  align: "left" | "center" | "right";
  weight: "bold" | "medium" | "regular" | "light" | "thin";
  dimensions: SkRect;
  matrix: SharedValue<Matrix4>;
};
export type StickerPath = {
  id: string;
  type: "sticker";
  path: string;
  dimensions: SkRect;
  matrix: SharedValue<Matrix4>;
};
export type CanvasShapeStyles = {
  style: "fill" | "stroke";
  color: string;
  size: number;
  shape: "circle" | "square" | "triangle";
  strokeJoin: "miter" | "round" | "bevel";
  strokeCap: "butt" | "round" | "square";
} & {
  shape: "square" | "circle" | "triangle";
  x: number;
  y: number;
  r: number;
  width: number;
  height: number;
};
export type CanvasShapeType = {
  id: string;
  type: "shape";
};

export type CurrentPath = CanvasTextPath | DrawPath | StickerPath;

type CanvasProviderType = {
  currentColor?: SharedValue<string>;
  changeColor: (color: string) => void;
  changeMatrix: (id: string, matrix: Matrix4) => void;
  /**
   * Array of completed paths for redrawing
   */
  paths?: CurrentPath[];
  addPath: (path: CurrentPath) => void;
  dropPath: (id: string) => void;
  mode: Modes;

  /**
   * A function to update completed paths
   */
  setPaths: (paths: CurrentPath[]) => void;
  /**
   * A function to replace the  path with id
   */
  replacePath: (id: string, path: CurrentPath) => void;
  /**
   * Current stroke
   */
  stroke: SharedValue<SkPaint>;
  /**
   * Width of the stroke
   */
  strokeWidth: number;
  /**
   * Color of the stroke
   */
  color: string;

  selectedList: string[];

  setColor: (color: string) => void;
  setStroke: (stroke: SkPaint) => void;
  canvasInfo: Partial<DrawingInfo> | null;
  setCanvasInfo: (canvasInfo: Partial<DrawingInfo>) => void;
  setMode: (mode: Modes) => void;
  toggleSelected: (id: string) => void;
  clearSelected: () => void;

  modifyById: (id: string, callback: (f: CurrentPath) => CurrentPath) => void;
};
const CanvasContext = createContext<CanvasProviderType | undefined>(undefined);

export type CanvasStorageType = {
  currentColor: string;
  strokeWidth: number;
  paths: CurrentPath[];
};
type SharedValuesActon =
  | {
      type: "add";
      payload: CurrentPath;
    }|{
      type:"set",
      payload: CurrentPath[]
    }|{
      type:"reset"
    }
  | {
      type: "drop";
      payload: string;
    }
  | {
      type: "modify";
      payload: [string, CurrentPath];
    };
const useSharedValues = (initialValues: CurrentPath[]) => {
  const [paths, dispatch] = useReducer(
    (before: CurrentPath[], action: SharedValuesActon) => {
      switch (action.type) {
        case "add":
          return [...before, action.payload];
        case "drop":
          return before.filter((f) => f.id !== action.payload.id);
        case "modify":
          return before.map((f) => {
            if (f.id === action.payload[0]) {
              return action.payload[1];
            }
            return f;
          });
        case "set":
          return action.payload;
        case "reset":
          return [];
      }
      return before
    },
    initialValues
  );

  const addPath = (value: CurrentPath) => {
    dispatch({ type: "add", payload: value });
  };

  const dropPath = (id: string) => {
    dispatch({ type: "drop", payload: id  });
  };

  const modifyPath = (id: string, callback: (f: CurrentPath) => CurrentPath) => {
    dispatch({
      type: "modify",
      payload: [id,callback(paths.find((f) => f.id === id) as CurrentPath)]
    });
  };

  const setPaths = (value: CurrentPath[]) => {
    dispatch({ type: "set", payload: value });
  }

  const resetPaths = () => {
    dispatch({ type: "reset" });
  }

  return {paths, addPath, dropPath, modifyPath,setPaths,resetPaths} as const;
};

const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<Modes>("select");
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const matrixes = useSharedValue<Record<string, Matrix4>>({});
  const {paths, addPath, dropPath, modifyPath,setPaths,resetPaths} = useSharedValues([]);
  const sharedStroke = useSharedValue(utils.getPaint(2, COLORS.redRouge));

  const currentColor = useSharedValue(COLORS.redRouge);

  const changeColor = (color: string) => {
    currentColor.value = color;
  };

  const changeMatrix = (id: string, matrix: Matrix4) => {
    matrixes.value = {
      ...matrixes.value,
      [id]: matrix,
    };
  };




  const toggleSelected = (id: string) => {
    setSelectedList((f) => {
      if (f.includes(id)) {
        return f.filter((a) => a !== id);
      }
      return [...f, id];
    });
  };

  return (
    <FiberProvider>
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
          selectedList,
          stroke: sharedStroke,

          setColor: (color: string) => {
            // setColor(color);
          },
          setStroke: (stroke: SkPaint) => {
            // setStroke(stroke);
          },
          canvasInfo: null,
          setCanvasInfo: () => {},
          clearSelected: () => {
            // clearSelected();
          },
          toggleSelected,
          modifyById: modifyPath,
          color: COLORS.redRouge,
          strokeWidth: 2,
        }}
      >
        {children}
      </CanvasContext.Provider>
    </FiberProvider>
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
  if (!selector) selector = (f: CanvasProviderType) => f;
  return selector(ctx);
};

export default CanvasProvider;
