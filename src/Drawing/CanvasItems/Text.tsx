import {COLORS} from '@app/Assets/Colors';
import type {
  CanvasTextArrayItem,
  CanvasTextPath,
} from '@app/Provider/ProviderTypes';
import type {SkFont, SkRect} from '@shopify/react-native-skia';
import {
  Group,
  listFontFamilies,
  matchFont,
  SkFontMgr,
  rect,
  Matrix4,
  Text,
  useFont,
  Paragraph,
  Skia,
  multiply4,
  translate,
  FontStyle,
  TextAlign,
} from '@shopify/react-native-skia';
import {useMemo} from 'react';
import {Dimensions, Platform} from 'react-native';
import {makeMutable} from 'react-native-reanimated';
const defaultFontFamily = Platform.select({ios: 'Helvetica', default: 'serif'});
const defaultFontStyle = {
  fontFamily: defaultFontFamily,
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 'bold',
};
// @ts-ignore
const defaultFont = matchFont(defaultFontStyle);

const selectSystemFont = (familyName: string,fontSize:number=24) => {
  // Get the system font manager
  const fontMgr = Skia.FontMgr.System();
  // The custom font manager is available via Skia.TypefaceFontProvider.Make()
  const customFontMgr = Skia.TypefaceFontProvider.Make();
  // typeface needs to be loaded via Skia.Data and instanciated via
  // Skia.Typeface.MakeFreeTypeFaceFromData()
  // customFontMgr.registerTypeface(customTypeFace, "Roboto");

  // Matching a font
  const typeface = fontMgr.matchFamilyStyle(familyName, FontStyle.Bold);
  const font = Skia.Font(typeface, fontSize);
  return font;
};

export const makeCanvasText = (
  text: string,
  font: SkFont = defaultFont,
): CanvasTextPath => {
  const [textArray, dimension] = calculateTextBounds(
    text,
    font,
    'center',
  );
  console.log("makeCanvasText -> textArray", textArray,dimension)
  // const ref = createRef<SkRRect>(rect(0, 0, 200, 24));
  // generate matrix with the dimension
  const matrix = translate(dimension.x, dimension.y);
  return {
    id: Date.now().toString(32) + '-canvas-text',
    type: 'text',
    original: text,
    textArray,
    fontSize: 24,
    weight: 'bold',
    color: COLORS.redRouge,
    align: 'center',
    dimensions: makeMutable(dimension),
    matrix: makeMutable(matrix),
    // dimension: ValueApi.createValue(rect(x, y, width, height)),
    // dimension: ref,
  };
};
//
const calculateTextBounds = (
  text: string,
  font: SkFont = selectSystemFont(defaultFontFamily, 24),
  align: 'left' | 'center' | 'right' = 'center',
): [CanvasTextArrayItem[], SkRect] => {
  let initialBounds = font.getMetrics().bounds;
  let initialHeight = initialBounds?.height||0;
  if(!initialBounds) return [[], rect(0, 0, 0, 0)];
  const {width,height,x,y} = font.measureText(text);
  const windowSize = Dimensions.get('window');
  const wx = windowSize.width / 2 - width / 2;
  const wy = windowSize.height / 3 - height / 2;
 
  return [[{
    text: text,
    width: width,
    height: height,
    x: wx,
    y: wy,
  }], rect(wx, wy-height, width, height)];
};

const CanvasText = ({
  matrix,
  weight = 'bold',
  textArray,
  fontSize,
  color,
}: CanvasTextPath & {matrix: Matrix4}) => {
  //  const rubikMediumFont = useFont(require('./fonts/Rubik-Medium.ttf'), 24);
  const paragraph = useMemo(() => {
    const para = Skia.ParagraphBuilder.Make({
      textAlign: 2, // 2 = TextAlign.Center
  })
  for (let i = 0; i < textArray.length; i++) {
    para.addText(textArray[i].text,);
  }
  return para.build();
  }, [textArray]);
  return (
        <Paragraph paragraph={paragraph} x={0} y={0} width={200}/>
         
  );
};
// export const makeCanvasText = (text: string): CanvasTextPath => {
//   // const [textArray, dimension] = calculateTextBounds(text, 'center');
//   // const ref = createRef<SkRRect>(rect(0, 0, 200, 24));


//   return {
//     id: Date.now().toString(32) ,
//     type: 'text',
//     original: text,
//     text: text,
//     fontSize: 20,
//     weight: 'bold',
//     color: COLORS.redRouge,
//     align: 'center',
//     dimensions: makeMutable(rect(0, 0, 200, 50)),
//     matrix:makeMutable(Matrix4()),
//     font: selectSystemFont(defaultFontFamily, 20),
//     // dimension: ValueApi.createValue(rect(x, y, width, height)),
//     // dimension: ref,
//   };
// };
// //
 

// const CanvasText = ({
//   weight = 'bold',
//   text,
//   fontSize,
//   color,
//   dimensions,
//   font,
// }: CanvasTextPath) => {
//   const paragraph = useMemo(() => {
 
//     const paragraphStyle = {
//       textAlign: TextAlign.Center
//     };
//     const textStyle = {
//       color: Skia.Color(color),
//       // fontFamilies: ["Roboto"],
//       fontSize: fontSize,
//     };
//     return Skia.ParagraphBuilder.Make(paragraphStyle, )
//       .pushStyle(textStyle)
//       .addText(text)
//       .pushStyle({ ...textStyle, fontStyle: { weight: 500 } })
//       .pop()
//       .build();
//   }, [text,font]);
//   return <Paragraph paragraph={paragraph} x={0} y={0} width={200} />;
// };

export default CanvasText;
