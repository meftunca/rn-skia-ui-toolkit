import React from 'react';
import { Drawing } from './Drawing';
import CanvasProvider from './Provider';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';

// This is the default configuration
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: true, // Reanimated runs in strict mode by default
});
export default () => {
  
  // return <ExampleMatrix />;
  return (
  <CanvasProvider>
    <Drawing />
  </CanvasProvider>
);}
