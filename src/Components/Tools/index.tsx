import { COLORS } from '@app/Assets/Colors'
import { useCanvasCtx } from '@app/Provider'
import React, { useMemo } from 'react'
import ColorSlider from './ColorSlider'
import TextSelectionListener from './TextListener'

const CanvasRuntimeTools = () => {
  const [currentSelected, paths] = useCanvasCtx((f) => [f.currentSelected,f.paths]);

  const selectedColor = useMemo(() => {
    if (currentSelected ==="") return COLORS.redRouge;
    const path = (paths||[]).find((path) => path.id === currentSelected)
    return (
      !path||path.type === "sticker" ? COLORS.redRouge:path?.color||COLORS.redRouge
    );
  }, [currentSelected, paths]);

  const changeColor = (color: string) => {
     ;
    // let index = paths.value.findIndex(path =>
    //   selectedList.includes(path.id),
    // );
    // // let newCompletedPaths = [...paths];
    // // newCompletedPaths[index].color = color;
    // // setPaths([...newCompletedPaths]);
    // paths.value[index].color = color;
  };

  const iselectedText = (paths||[]).some(
    (a) => a.type === "text" && currentSelected === a.id,
  );

  if (currentSelected==="") return null;
  return (
    <>
      {iselectedText && <TextSelectionListener />}
      <ColorSlider color={selectedColor} onColorChange={changeColor} />
    </>
  );
};

export default CanvasRuntimeTools;
