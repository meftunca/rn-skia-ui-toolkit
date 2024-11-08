// import { PaintStyle, Matrix4, Skia, StrokeCap, StrokeJoin } from '@shopify/react-native-skia';
// import type { CurrentPath, DrawPath } from '@app/Provider/ProviderTypes';

// //@ts-ignore adding a function to get random value from array
// Array.prototype.sample = function () {
//   return this[Math.floor(Math.random() * this.length)];
// };

// export const toM4 = (m3: Matrix4) => {
//   "worklet";
//   const m = m3.get();
//   const tx = m[MatrixIndex.TransX];
//   const ty = m[MatrixIndex.TransY];
//   const sx = m[MatrixIndex.ScaleX];
//   const sy = m[MatrixIndex.ScaleY];
//   const skewX = m[MatrixIndex.SkewX];
//   const skewY = m[MatrixIndex.SkewY];
//   const persp0 = m[MatrixIndex.Persp0];
//   const persp1 = m[MatrixIndex.Persp1];
//   const persp2 = m[MatrixIndex.persp2];
//   return [
//     sx,
//     skewY,
//     persp0,
//     0,
//     skewX,
//     sy,
//     persp1,
//     0,
//     0,
//     0,
//     1,
//     0,
//     tx,
//     ty,
//     persp2,
//     1,
//   ];
// };
// const makeSvgFromPaths = (
//   paths: CurrentPath[],
//   options: {
//     width: number;
//     height: number;
//     backgroundColor?: string;
//   },
// ) => {
//   return `<svg width="${options.width}" height="${
//     options.height
//   }" viewBox="0 0 ${options.width} ${
//     options.height
//   }" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <rect width="${options.width}" height="${options.height}" fill="${
//     options.backgroundColor || 'white'
//   }"/>
//   <g>

//     ${paths
//       .filter(a => a.type === 'draw')
//       .map((path: DrawPath) =>
//         path.paint && path.path
//           ? `<path d="${path.path.toSVGString()}" stroke="${
//               path.color
//             }" stroke-width="${path.paint.getStrokeWidth()}" stroke-linecap="${path.paint.getStrokeCap()}" stroke-linejoin="${path.paint.getStrokeJoin()}"/>`
//           : '',
//       )}
//     </g>
//     </svg>`;
// };

// export default {getPaint, getElevation, makeSvgFromPaths};
import { PaintStyle, StrokeCap, StrokeJoin , Skia, notifyChange } from "@shopify/react-native-skia";

import type { Matrix4, Vector } from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";
export enum MatrixIndex {
  ScaleX = 0,
  SkewX = 1,
  TransX = 2,
  SkewY = 3,
  ScaleY = 4,
  TransY = 5,
  Persp0 = 6,
  Persp1 = 7,
  persp2 = 8,
}
/**
 * Get a stroke with the given parameters
 *
 * @param strokeWidth
 * @param color
 * @returns
 */
export const getPaint = (strokeWidth: number, color: string) => {
  const paint = Skia.Paint();
  paint.setStrokeWidth(strokeWidth);
  paint.setStrokeMiter(5);
  paint.setStyle(PaintStyle.Stroke);
  paint.setStrokeCap(StrokeCap.Round);
  paint.setStrokeJoin(StrokeJoin.Round);
  paint.setAntiAlias(true);
  const _color = paint.copy();
  _color.setColor(Skia.Color(color));
  return _color;
};

/**
 * A function get get elevation style for android/ios.
 * @param elevation
 * @returns
 */
export const getElevation = (elevation: number) => {
  return {
    elevation,
    shadowColor: 'black',
    shadowOffset: {width: 0.3 * elevation, height: 0.5 * elevation},
    shadowOpacity: 0.2,
    shadowRadius: 0.7 * elevation,
  };
};
export const scale = (
  matrix: SharedValue<Matrix4>,
  offset: Matrix4,
  s: number,
  origin: Vector
) => {
  "worklet";
  const source = matrix.value;
  source.identity();
  source.concat(offset);
  source.translate(origin.x, origin.y);
  source.scale(s, s);
  source.translate(-origin.x, -origin.y);
  notifyChange(matrix);
};

export const rotateZ = (
  matrix: SharedValue<Matrix4>,
  offset: Matrix4,
  theta: number,
  origin: Vector
) => {
  "worklet";
  const source = matrix.value;
  source.identity();
  source.concat(offset);
  source.translate(origin.x, origin.y);
  source.rotate(theta);
  source.translate(-origin.x, -origin.y);
  notifyChange(matrix);
};

export const translate = (
  matrix: SharedValue<Matrix4>,
  x: number,
  y: number
) => {
  "worklet";
  const source = matrix.value;
  source.postTranslate(x, y);
  notifyChange(matrix);
};

export const toM4 = (m3: Matrix4) => {
  "worklet";
  const m = m3.get();
  const tx = m[MatrixIndex.TransX];
  const ty = m[MatrixIndex.TransY];
  const sx = m[MatrixIndex.ScaleX];
  const sy = m[MatrixIndex.ScaleY];
  const skewX = m[MatrixIndex.SkewX];
  const skewY = m[MatrixIndex.SkewY];
  const persp0 = m[MatrixIndex.Persp0];
  const persp1 = m[MatrixIndex.Persp1];
  const persp2 = m[MatrixIndex.persp2];
  return [
    sx,
    skewY,
    persp0,
    0,
    skewX,
    sy,
    persp1,
    0,
    0,
    0,
    1,
    0,
    tx,
    ty,
    persp2,
    1,
  ];
};