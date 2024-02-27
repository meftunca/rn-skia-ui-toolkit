import { COLORS } from "@/Assets/Colors";
import { useCanvasCtx } from "@/Provider";
import React, { useMemo } from "react";
import ColorSlider from "./ColorSlider";
import TextSelectionListener from "./TextListener";

const CanvasRuntimeTools = () => {
  const { selectedList, paths} = useCanvasCtx((f) => ({
    selectedList: f.selectedList,
    paths: f.paths,
  }));

  const selectedColor = useMemo(() => {
    if (selectedList.length === 0) return COLORS.redRouge;
    let id = selectedList[0];
    return (
      Object.values(paths.value).find((path) => path.id === id)?.color ||
      COLORS.redRouge
    );
  }, [selectedList, paths]);

  const changeColor = (color: string) => {
    "worklet";
    console.log("color", color);
    // let index = paths.value.findIndex(path =>
    //   selectedList.includes(path.id),
    // );
    // // let newCompletedPaths = [...paths];
    // // newCompletedPaths[index].color = color;
    // // setPaths([...newCompletedPaths]);
    // paths.value[index].color = color;
  };

  const iselectedText = paths.some(
    (a) => a.type === "text" && selectedList.includes(a.id)
  );

  if (selectedList.length === 0) return null;
  return (
    <>
      {iselectedText && <TextSelectionListener />}
      <ColorSlider color={selectedColor} onColorChange={changeColor} />
    </>
  );
};

export default CanvasRuntimeTools;
