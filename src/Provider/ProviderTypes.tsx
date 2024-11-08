import type {
  DrawingInfo,
  SkFont,
  SkPaint,
  SkParagraph,
  SkPath,
  SkRect,
} from "@shopify/react-native-skia";
import { Matrix4 } from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";

export type Modes = "draw" | "erase" | "select" | "text";

export type DrawPath = {
  type: "draw";
  path: SkPath;
  paint: SkPaint;
  color?: string;
  size?: number;
  dimensions: SharedValue<SkRect>;
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
  text: string;
  color: string;
  fontSize: number;
  align: "left" | "center" | "right";
  weight: "bold" | "medium" | "regular" | "light" | "thin";
  dimensions: SharedValue<SkRect>;
  matrix: SharedValue<Matrix4>;
  font:SkFont
};
export type StickerPath = {
  type: "sticker";
  path: string;
  dimensions: SharedValue<SkRect>;
  matrix: SharedValue<Matrix4>;
};

type BasePathType = {
  id: string;
};

export type CurrentPath = BasePathType &
  (DrawPath | CanvasTextPath | StickerPath);

export type CanvasProviderType = {
  currentColor?: SharedValue<string>;
  changeColor: (color: string) => void;
  /**
   * Array of completed paths for redrawing
   */
  paths?: CurrentPath[];

  /**
   * A function to update completed paths
   */
  setPaths: (paths: CurrentPath[]) => void;
  addPath: (path: CurrentPath) => void;
  dropPath: (id: string) => void;
  mode: Modes;
  setMode: (mode: Modes) => void;
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

  currentSelected:string;
  toggleSelected: (id: string) => void;
  clearSelected: () => void;
  setColor: (color: string) => void;
  setStroke: (stroke: SkPaint) => void;
  canvasInfo: Partial<DrawingInfo> | null;
  setCanvasInfo: (canvasInfo: Partial<DrawingInfo>) => void;

  modifyById: (id: string, callback: (f: CurrentPath) => CurrentPath) => void;
};

export type CanvasStorageType = {
  currentColor: string;
  strokeWidth: number;
  paths: CurrentPath[];
};
type SharedValuesActon =
  | {
      type: "add";
      payload: CurrentPath;
    }
  | {
      type: "set";
      payload: CurrentPath[];
    }
  | {
      type: "reset";
    }
  | {
      type: "drop";
      payload: string;
    }
  | {
      type: "modify";
      payload: [string, CurrentPath];
    };
