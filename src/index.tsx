import React from 'react';
import { Drawing } from './Drawing';
import CanvasProvider from './Provider';
import ExampleMatrix from './ExampleMatrix';

export default () => {
  
  // return <ExampleMatrix />;
  return (
  <CanvasProvider>
    <Drawing />
  </CanvasProvider>
);}
