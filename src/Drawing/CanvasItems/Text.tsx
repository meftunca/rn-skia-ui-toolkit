import { COLORS } from '@/Assets/Colors'
import type { CanvasTextArrayItem, CanvasTextPath } from '@/Provider'
import type { SharedValueType, SkFont,  SkRect, } from '@shopify/react-native-skia'
import { Group, listFontFamilies,rect, Matrix4, Text, useFont, Paragraph, Skia } from '@shopify/react-native-skia'
import { useMemo } from 'react'
import { Dimensions } from 'react-native'
import { makeMutable } from 'react-native-reanimated'

console.log(listFontFamilies());
const x = 60;
const y = 200;
const width = 200;
const height = 75;

export const makeCanvasText = (
  text: string,
  font: SkFont,
): CanvasTextPath => {
  const [textArray, dimension] = calculateTextBounds(
    text,
    font,
    'center',
  );
  // const ref = createRef<SkRRect>(rect(0, 0, 200, 24));
  return {
    id: Date.now().toString(32) + '-canvas-text',
    type: 'text',
    original: text,
    textArray,
    fontSize: 24,
    weight: 'bold',
    color: COLORS.redRouge,
    align: 'center',
    dimensions: dimension,
    matrix:makeMutable(Matrix4()),
    // dimension: ValueApi.createValue(rect(x, y, width, height)),
    // dimension: ref,
  };
};
//
const calculateTextBounds = (
  text: string,
  font: SkFont,
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
  dimension,
}: CanvasTextPath & {matrix: Matrix4}) => {
   const rubikMediumFont = useFont(require('./fonts/Rubik-Medium.ttf'), 24);
  if (!rubikMediumFont) return null;
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
      <Group matrix={matrix}>
        <Paragraph paragraph={paragraph} x={0} y={0} width={200}/>
          {/* <Text x={0} y={fontSize} font={font} color={color} text={text} /> */}
          {/* {textArray.map(({x, y, text}, index) => (
            <Text
              key={index}
              x={x}
              y={y}
              // y={fontSize * index}
              font={rubikMediumFont}
              color={color}
              text={text}
            />
          ))} */}
          {/* <Text x={0} y={fontSize} font={font} text={text} color={color} /> */}
      </Group>
  );
};

export default CanvasText;
