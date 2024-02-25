import {DrawingInfo, Matrix4, SkPaint, SkPath, SkRect} from '@shopify/react-native-skia';
import {COLORS} from '@/Assets/Colors';
import {create} from 'zustand';
import utils from '../Drawing/utils';
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

interface DrawingStore {
  mode: 'draw' | 'erase' | 'select' | 'text';
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
  setMode: (mode: 'draw' | 'erase' | 'select' | 'text') => void;
  deleteCompletedPath: (id: string) => void;
  assignSelectedList: (id: string[]) => void;
  toggleSelected: (id: string) => void;
  clearSelected: () => void;

  modifyById: (id: string, callback: (f: CurrentPath) => CurrentPath) => void;
}

const useDrawingStore = create<DrawingStore>((set, get) => {
  'worklet';
  return {
    mode: 'select',
    setMode: (mode: 'draw' | 'erase' | 'select' | 'text') => set({mode}),
    completedPaths: [],
    selectedList: [],
    assignSelectedList: (ids: string[]) => {
      // set({selectedList: [...ids]});
      set({selectedList: [...ids]});
    },
    toggleSelected: (id: string) => {
      set(f => {
        // let newSelectedList = [...f.selectedList];
        // if (newSelectedList.includes(id)) {
        //   newSelectedList = newSelectedList.filter(item => item !== id);
        // } else {
        //   newSelectedList.push(id);
        // }
        // console.log('toggleSelected', newSelectedList);
        // return {...f, selectedList: newSelectedList};
        return {...f, selectedList: f.selectedList.includes(id) ? [] : [id]};
      });
    },

    setCompletedPaths: completedPaths => {
      'worklet';
      set(f => ({...f, completedPaths: [...completedPaths]}));
    },
    replaceCompletedPath: (id: string, path: CurrentPath) => {
      'worklet';
      set(f => {
        const newCompletedPaths = [...f.completedPaths];
        const index = newCompletedPaths.findIndex(item => item.id === id);
        if (index !== -1) {
          newCompletedPaths[index] = path;
        }
        return {...f, completedPaths: newCompletedPaths};
      });
    },
    deleteCompletedPath: (id: string) => {
      'worklet';
      set(f => ({
        ...f,
        completedPaths: f.completedPaths.filter(p => p.id !== id),
      }));
    },
    strokeWidth: 2,
    color: COLORS.redRouge,
    stroke: utils.getPaint(2, COLORS.redRouge),
    setStrokeWidth: strokeWidth => {
      set(f => ({
        ...f,
        strokeWidth,
        stroke: utils.getPaint(strokeWidth, f.color),
      }));
    },
    setColor: color => {
      set(f => ({...f, color, stroke: utils.getPaint(f.strokeWidth, color)}));
    },
    setStroke: stroke => {
      set(f => ({...f, stroke}));
    },
    canvasInfo: null,
    setCanvasInfo: canvasInfo => {
      set(f => ({...f, canvasInfo}));
    },
    clearSelected: () => {
      set(f => ({...f, selectedList: []}));
    },
    modifyById: (id, callback) => {
      set(f => {
        const index = f.completedPaths.findIndex(item => item.id === id);
        if (index !== -1) {
          const newPath = callback(f.completedPaths[index]);
          const newCompletedPaths = [...f.completedPaths];
          newCompletedPaths[index] = newPath;
          return {...f, completedPaths: newCompletedPaths};
        }
        return f;
      });
    },
  };
});

export default useDrawingStore;
