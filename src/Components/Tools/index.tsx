import useDrawingStore from '@/store';
import React,{ useMemo } from 'react';
import {COLORS} from '@/Assets/Colors';
import ColorSlider from './ColorSlider';
import TextSelectionListener from './TextListener';

const CanvasRuntimeTools = () => {
  const {selectedList, completedPaths, setCompletedPaths} = useDrawingStore();

  const selectedColor = useMemo(() => {
    if (selectedList.length === 0) return COLORS.redRouge;
    let id = selectedList[0];
    return (
      completedPaths.find(path => path.id === id)?.color || COLORS.redRouge
    );
  }, [selectedList, completedPaths]);

  const changeColor = (color:string) => {
    "worklet"
    console.log('color',color)
    let index = completedPaths.findIndex(path =>
      selectedList.includes(path.id),
    );
    let newCompletedPaths = [...completedPaths];
    newCompletedPaths[index].color = color;
    setCompletedPaths([...newCompletedPaths]);
  };


  const iselectedText = !!completedPaths.find(
    a => a.type === 'text' && selectedList.includes(a.id),
  )

    if(selectedList.length === 0) return null
  return (
    <>
        {iselectedText && <TextSelectionListener/>}
        <ColorSlider color={selectedColor} onColorChange={changeColor} />
    </>
  );
};

export default CanvasRuntimeTools;
