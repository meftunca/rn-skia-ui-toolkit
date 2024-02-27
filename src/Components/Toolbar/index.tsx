import utils from "@//Drawing/utils";
import IconButton from "@/Components/IconButton";
import { shift, useFloating } from "@floating-ui/react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";

import { useCanvasCtx } from "@/Provider";
import AppendText from "./AppendText";
import DeleteSelection from "./DeleteSelection";
import ModeList from "./Modes";
import ShapeList from "./Shapes";
import Stickers from "./Stickers";
import StrokeList from "./Stroke";

const Toolbar = () => {
  const { currentColor, currentStrokeWidth, mode } = useCanvasCtx((f) => ({
    currentColor: f.color,
    currentStrokeWidth: f.strokeWidth,
    mode: f.mode,
  }));
  const { width } = useWindowDimensions();
  const { refs, floatingStyles } = useFloating({
    placement: "left",
    middleware: [shift()],
  });
  const [previewType, setPreviewType] = useState<"stroke" | "color" | "mode">(
    "stroke"
  );
  const [visible, setVisible] = useState(false);
  console.log("currentMode", mode);
  return (
    <View
      style={{
        position: "relative",
        width: width,
        zIndex: 99,
        // flexDirection: 'row',
        // justifyContent: 'flex-start',

        // overflow: 'visible',
      }}
    >
      {visible && (
        <View
          style={{
            position: "absolute",
            left:0,top:-40,
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
        style={[styles.toolbar, { width: "100%", justifyContent: "center" }]}
      >
        <IconButton
          icon={mode}
          color="#ffffff"
          onPress={() => {
            setPreviewType("mode");
            setVisible((f) => !f);
          }}
        />
        <IconButton
          icon="draw-pen"
          color="#ffffff"
          onPress={() => {
            setPreviewType("stroke");
            setVisible((f) => !f);
          }}
        />
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
        {/* <View style={{flexGrow: 1}} /> */}
        <DeleteSelection />
      </View>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  color: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#000000",
    ...utils.getElevation(1),
    justifyContent: "center",
    alignItems: "center",
  },
});
