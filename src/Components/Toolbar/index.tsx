import IconButton from '@app/Components/IconButton'
import { useCanvasCtx } from '@app/Provider'
import React, { useState } from 'react'
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import AppendText from './AppendText'
import DeleteSelection from './DeleteSelection'
import ModeList from './Modes'
import ShapeList from './Shapes'
import Stickers from './Stickers'
import StrokeList from './Stroke'

const Toolbar = () => {
  const { mode } = useCanvasCtx((f) => ({
    currentColor: f.color,
    currentStrokeWidth: f.strokeWidth,
    mode: f.mode,
  }));

  const [previewType, setPreviewType] = useState<"stroke" | "color" | "mode">(
    "stroke"
  );
  const [visible, setVisible] = useState(false);
  return (
    <>
      {visible && (
        <View
          style={{
            position: "absolute",
            left:0,top:-40,
            right: 0,
            borderRadius: 12,
            width: "100%",
            backgroundColor: "#333333",
          }}
        >
          {
            previewType === "stroke" ? (
              <StrokeList onClose={() => setVisible(false)} />
            ) : previewType === "mode" ? (
              <ModeList onClose={() => setVisible(false)} />
            ) : null
            // <Color />
          }
        </View>
      )}
      <View
        style={[styles.toolbar]}
      >
        <IconButton
          icon={mode}
          color="#ffffff"
          onPress={() => {
            setPreviewType("mode");
            setVisible((f) => !f);
          }}
        />
       {mode === "draw" && <IconButton
          icon="draw-pen"
          color="#ffffff"
          onPress={() => {
            setPreviewType("stroke");
            setVisible((f) => !f);
          }}
        />}
        {/* <IconButton
          icon="palette"
          color="#ffffff"
          onPress={() => {
            setPreviewType('color');
            setVisible(f => !f);
          }}
        /> */}
        <ShapeList />
        <Stickers />
        <AppendText />
        <DeleteSelection />
      </View>
    </>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
  },
  color: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#000000",
    // ...utils.getElevation(1),
    justifyContent: "center",
    alignItems: "center",
  },
});
