import React from "react";
import { SafeAreaView, useWindowDimensions, View } from "react-native";
import Footer from "../Components/Footer";
import Toolbar from "../Components/Toolbar";
import CanvasRuntimeTools from "../Components/Tools";
import type { CurrentPath } from "../Provider/ProviderTypes";
import { useCanvasCtx } from "../Provider";
import GestureHandler from "./GestureHandler";
import PaperDrawing from "./PaperDrawing";
import PathRenderer from "./PathRenderer";

export const Drawing = () => {
  const { width, height: windowHeight } = useWindowDimensions();
  const [mode,  paths] = useCanvasCtx((f) => [
    f.mode,
    f.paths,
  ]);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#121212",
        flex: 1,
        alignItems: "center",
      }}
    >
        <View
          // onLayout={onLayout}
          style={{
            width: width - 24,
            backgroundColor: "#000000",
            borderRadius: 10,
            overflow: "hidden",
            elevation: 1,
            zIndex: 0,
            flex: 1,
          }}
        >
          <PathRenderer />

          {mode === "draw" ? (
            <PaperDrawing />
          ) : (
            (paths||[]).map((path: CurrentPath) => (
              <GestureHandler
                key={path.id + "matrix"}
                {...path}
              />
            ))
          )}
        </View>

      {/* <CanvasRuntimeTools /> */}
      {/* <View style={{ zIndex: 99, alignItems: "center", position: "relative" }}>
        <Toolbar />
      </View> */}
      <Footer>
        <Toolbar />
      </Footer>
    </SafeAreaView>
  );
};
