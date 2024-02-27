import {DrawingInfo, Matrix4, SkFont, SkMatrix, SkPaint, SkPath, SkRect, Skia, useDerivedValueOnJS, useFont} from '@shopify/react-native-skia';
import {COLORS} from "@/Assets/Colors";
import React, {createContext, useContext, useLayoutEffect, MutableRefObject, useEffect, useState} from 'react';
import {SharedValue, runOnJS, runOnUI, useSharedValue} from 'react-native-reanimated';
import utils from './Drawing/utils';


export type Modes = 'draw' | 'erase' | 'select' | 'text'
 

export type DrawPath = {
  id: string;
  type: 'draw';
  path: SkPath;
  paint: SkPaint;
  color?: string;
  size?: number;
  dimension: SkRect;
  matrix: Matrix4;
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
  type: 'text';
  textArray: CanvasTextArrayItem[];
  color: string;
  fontSize: number;
  align: 'left' | 'center' | 'right';
  weight: 'bold' | 'medium' | 'regular' | 'light' | 'thin';
  dimension: SkRect;
  matrix: Matrix4;
};
export type StickerPath = {
  id: string;
  type: 'sticker';
  path: string;
  dimension: SkRect;
  matrix: Matrix4;
};
export type CanvasShapeStyles = {
  style: 'fill' | 'stroke';
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'triangle';
  strokeJoin: 'miter' | 'round' | 'bevel';
  strokeCap: 'butt' | 'round' | 'square';
} & {
  shape: 'square' | 'circle' | 'triangle';
  x: number;
  y: number;
  r: number;
  width: number;
  height: number;
};
export type CanvasShapeType = {
  id: string;
  type: 'shape';
};

export type CurrentPath = CanvasTextPath | DrawPath | StickerPath;

type CanvasProviderType = {
  currentSelection?:null|string;
  currentSelectionMatrix?: SharedValue<Matrix4>;
  currentSelectionDimensions?: SharedValue<SkRect>;
  currentColor?: SharedValue<string>;
  dimensions?: SharedValue<Record<string, SkRect>>;
  matrixes?: SharedValue<Record<string, Matrix4>>;
  changeColor: (color: string) => void;
  changeDimensions: (id: string, rect: SkRect) => void;
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

  setStrokeWidth: (strokeWidth: number) => void;
  setColor: (color: string) => void;
  setStroke: (stroke: SkPaint) => void;
  canvasInfo: Partial<DrawingInfo> | null;
  setCanvasInfo: (canvasInfo: Partial<DrawingInfo>) => void;
  setMode: (mode: Modes) => void;
  deleteCompletedPath: (id: string) => void;
  toggleSelected: (id: string) => void;
  clearSelected: () => void;

  modifyById: (id: string, callback: (f: CurrentPath) => CurrentPath) => void;
};
const CanvasContext = createContext<CanvasProviderType|undefined>(undefined);

export type CanvasStorageType = {
  currentColor: string;
  dimensions: Record<string, SkRect>;
  matrixes: Record<string, SkMatrix>;
  paths: CurrentPath[];
};

const CanvasProvider = ({children}: {children: React.ReactNode}) => {
  const [mode, setMode] = useState<Modes>('draw');
  const [currentSelection, setCurrentSelection] = useState<null | string>(null);
  const dimensions = useSharedValue<Record<string, SkRect>>({});

  const matrixes = useSharedValue<Record<string, Matrix4>>({});

  const [paths,setPaths] = useState<CurrentPath[]>([])
  const sharedStroke = useSharedValue(utils.getPaint(2, COLORS.redRouge));

  const currentSelectionMatrix = useSharedValue(Matrix4());
  const currentColor = useSharedValue(COLORS.redRouge);

  // const syncCurrentPath = () => {
  //   if (currentSelection === null) return;
  //   if (!!currentPathIndex.value && currentPathIndex.value !== null) {
  //     // let item = paths[currentPathIndex.value];
  //     let item = paths.value?.[currentSelection];
  //     if(item){
  //       currentSelectionMatrix.value = item.matrix;
  //       paths.value[currentPathIndex.value] = {
  //         ...item,
  //         matrix: currentSelectionMatrix.value,
  //       };
  //     }
  //   }
  // };
  // useEffect(() => {
  //   if (!!currentSelection) {
  //     let targetPath = paths.value.find(a => a.id === currentSelection);
  //   } else {
  //     syncCurrentPath();
  //     currentSelectionMatrix.value = Matrix4();
  //   }
  // }, [syncCurrentPath, currentSelection]);

  const changeColor = (color: string) => {
    currentColor.value = color
  };

  const changeDimensions = (id: string, rect: SkRect) => {
    dimensions.value = {...dimensions.value, [id]: rect};
  };

  const changeMatrix = (id: string, matrix: Matrix4) => {
    matrixes.value = {
      ...matrixes.value,
      [id]: matrix,
    };

  };

  const addPath = (path: CurrentPath) => {
    setPaths(f=>[...f,path])
  }

  const replacePath = (id: string, path: CurrentPath) => {
    // paths.value = paths.value.map(p => {
    //   if (p.id === id) {
    //     return path;
    //   }
    //   return p;
    // });
    // paths.modify((f:CurrentPath[]) => {
    //   "worklet"
    //   return f.map(p => {
    //     if (p.id === id) {
    //       return path;
    //     }
    //     return p;
    //   });
    // },)
    modifyById(id, () => path);
    // setCounter(f=>f+1)
  };

  const dropPath = (id: string) => {
    // paths.value = paths.value.filter(path => path.id !== id);
    setPaths(f=>f.filter(path => path.id !== id))
  };

  const modifyById = (id: string, callback: (f: CurrentPath) => CurrentPath) => {
    "worklet"
    setPaths(f=>f.map(p => {
      if (p.id === id) {
        return callback(p);
      }
      return p;
    }))
  }


  return (
    <CanvasContext.Provider
      value={{
        mode,
        setMode,
        matrixes,
        dimensions,
        currentColor,
        changeColor,
        changeDimensions,
        changeMatrix,
        paths,
        addPath,
        dropPath,
        replacePath,
        currentSelection,
        currentSelectionMatrix,
        setPaths,
        deleteCompletedPath: (id: string) => {
          dropPath(id);
        },
        stroke: sharedStroke,
        selectedList: [],
        setStrokeWidth: (strokeWidth: number) => {
          // setStrokeWidth(strokeWidth);
        },
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
        toggleSelected: (id: string) => {
          // toggleSelected(id);
        },
        modifyById,
        color: COLORS.redRouge,
        strokeWidth: 2,
      }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasCtx = <P extends Object,R>(selector?: (ctx: CanvasProviderType) => P):P => {
  const ctx = useContext(CanvasContext);
  if (!ctx) {
    throw new Error('useCanvasCtx must be used within a CanvasProvider');
  }
  // @ts-ignore
  if (!selector) selector = (f:CanvasProviderType) => f;
  return selector(ctx);
};

export default CanvasProvider;
