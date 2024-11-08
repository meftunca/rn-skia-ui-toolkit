import IconButton from '@app/Components/IconButton'
import { makeCanvasText } from '@app/Drawing/CanvasItems/Text'
import { useCanvasCtx } from '@app/Provider'
import React from 'react'

// world emoji=
let bulkText = 'Hello World';
const AppendText = () => {
  const [ addPath,] = useCanvasCtx(f => [
    f.addPath,
  ]);
 
  const appendText = () => {
    'worklet';
    const newText = makeCanvasText(bulkText, );
    // dimensions[newText.id] = newText.dimension;
    console.log(newText);
    addPath(newText);

  };
  return <IconButton icon="format-text" color="white" onPress={()=>appendText()} />;
};

export default AppendText;
