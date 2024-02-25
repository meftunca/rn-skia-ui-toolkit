import {DrawingInfo, Matrix4, SkFont, SkMatrix, SkPaint, SkPath, SkRect, Skia, useDerivedValueOnJS, useFont} from '@shopify/react-native-skia';
import {COLORS} from "@/Assets/Colors";
import React, {createContext, useContext, useLayoutEffect, MutableRefObject, useEffect, useState} from 'react';
import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {CurrentPath} from './store';


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


type CanvasProviderType = {
  currentSelection?: SharedValue<null | string>;
  currentSelectionMatrix?: SharedValue<Matrix4>;
  currentSelectionDimensions?: SharedValue<SkRect>;
  font: {[k: string]: {[k: string]: SkFont}};
  currentColor?: SharedValue<string>;
  dimensions?: SharedValue<Record<string, SkRect>>;
  matrixes?: SharedValue<Record<string, Matrix4>>;
  changeColor: (color: string) => void;
  changeDimensions: (id: string, rect: SkRect) => void;
  changeMatrix: (id: string, matrix: Matrix4) => void;
  paths?: SharedValue<CurrentPath[]>;
  addPath: (path: CurrentPath) => void;
  replacePath: (id: string, path: CurrentPath) => void;
  dropPath: (id: string) => void;
  mode: Modes;
  /**
   * Array of completed paths for redrawing
   */
  completedPaths: CurrentPath[];
  /**
   * A function to update completed paths
   */
  setCompletedPaths: (completedPaths: CurrentPath[]) => void;
  /**
   * A function to replace the  path with id
   */
  replaceCompletedPath: (id: string, path: CurrentPath) => void;
  /**
   * Current stroke
   */
  stroke: SkPaint;
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
const CanvasContext = createContext<CanvasProviderType>({ 
  mode: 'draw',
  setMode: () => {},
  completedPaths: [],
  setCompletedPaths: () => {},
  replaceCompletedPath: () => {},
  stroke: Skia.Paint(),
  strokeWidth: 1,
  color: COLORS.redRouge,
  selectedList: [],
  setStrokeWidth: () => {},
  setColor: () => {},
  setStroke: () => {},
  canvasInfo: null,
  setCanvasInfo: () => {},
  currentSelection: undefined,  
  currentSelectionMatrix: undefined,
  currentSelectionDimensions: undefined,
  font: {},
  currentColor: undefined,
  dimensions: undefined,
  matrixes: undefined,
  paths: undefined,
  changeColor: color => {},
  changeDimensions: (id, rect) => {},
  changeMatrix: (id, matrix) => {},
  addPath: (path: CurrentPath) => {},
  replacePath: (id: string, path: CurrentPath) => {},
  dropPath: (id: string) => {},
});

export type CanvasStorageType = {
  currentColor: string;
  dimensions: Record<string, SkRect>;
  matrixes: Record<string, SkMatrix>;
  paths: CurrentPath[];
};

const CanvasProvider = ({children}: {children: React.ReactNode}) => {
  const [mode, setMode] = useState<Modes>('draw');
  const rubikBoldFont = useFont(require('./Drawing/CanvasItems/fonts/Rubik-Bold.ttf'), 24);
  const rubikMediumFont = useFont(require('./Drawing/CanvasItems/fonts/Rubik-Medium.ttf'), 24);
  const dimensions = useSharedValue<Record<string, SkRect>>({});

  const matrixes = useSharedValue<Record<string, Matrix4>>({});

  const completedPaths = useSharedValue<CurrentPath[]>([]);

  const currentSelection = useSharedValue<null | string>(null);
  const currentPathIndex = useSharedValue<null | number>(null);

  const currentSelectionMatrix = useSharedValue(Matrix4());
  const currentColor = useDerivedValueOnJS(() => {
    // if (Storage.contains('currentCanvas')) {
    //   const currentCanvas = Storage.getString('currentCanvas');
    //   const parsedCanvasData = !currentCanvas ? {} : JSON.parse(currentCanvas);
    //   return parsedCanvasData.currentColor || COLORS.redRouge;
    // }
    return COLORS.redRouge;
  }, []);

  const syncCurrentPath = () => {
    if (currentSelection.value === null) return;
    if (!!currentPathIndex.value && currentPathIndex.value !== null) {
      // let item = completedPaths[currentPathIndex.value];
      let item = completedPaths.value.find(a => a.id === currentSelection.value);
      if(item){
        currentSelectionMatrix.value = item.matrix;
        completedPaths.value[currentPathIndex.value] = {
          ...item,
          matrix: currentSelectionMatrix.value,
        };
      }
    }
  };
  useEffect(() => {
    if (!!currentSelection.value) {
      let targetPath = completedPaths.value.find(a => a.id === currentSelection.value);
    } else {
      syncCurrentPath();
      currentSelectionMatrix.value = Matrix4();
    }
  }, [syncCurrentPath, currentSelection.value]);

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
    "worklet"
    completedPaths.modify((f) => {
      "worklet"
      f.push(path)
      return f
    },true)

    // currentSelection.value = path.id;
    currentSelection.value = path.id;
    currentPathIndex.value = completedPaths.value.length-1;
    // currentSelectionMatrix.value = path.matrix;
    currentSelectionMatrix.value = path.matrix;
  };

  const replacePath = (id: string, path: CurrentPath) => {
    // completedPaths.value = completedPaths.value.map(p => {
    //   if (p.id === id) {
    //     return path;
    //   }
    //   return p;
    // });
    completedPaths.modify((f:CurrentPath[]) => {
      "worklet"
      return f.map(p => {
        if (p.id === id) {
          return path;
        }
        return p;
      });
    },)
  };

  const dropPath = (id: string) => {
    completedPaths.value = completedPaths.value.filter(path => path.id !== id);
  };

  const acceptedPaths = useDerivedValueOnJS(() => {
    return completedPaths.value
  }, [completedPaths]);
  if(rubikBoldFont === null || rubikMediumFont === null){
    return null;
  }
  return (
    <CanvasContext.Provider
      value={{
        mode: mode.value,
        setMode: (mode: Modes) => {
          setMode(mode);
        },
        matrixes,
        dimensions,
        font: {
          rubik: {
            bold: rubikBoldFont,
            medium: rubikMediumFont,
          },
        },
        currentColor: currentColor,
        changeColor,
        changeDimensions,
        changeMatrix,
        paths: acceptedPaths,
        addPath,
        dropPath,
        replacePath,
        currentSelection,
        currentSelectionMatrix,
      }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasCtx = <P extends Object>(selector: (ctx: CanvasProviderType) => P): P => {
  const ctx = useContext(CanvasContext);
  return selector(ctx);
};

export default CanvasProvider;
