import React from "react";
import CanvasProvider from "./Provider";
import { Drawing } from "./Drawing";

export default () => (
  <CanvasProvider>
    <Drawing />
  </CanvasProvider>
);
