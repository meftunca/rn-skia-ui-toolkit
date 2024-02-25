import {
  Canvas,
  ExtendedTouchInfo,
  Path,
  SkCanvas,
  Skia,
  TouchInfo,
  SkPoint,
  SkMatrix,
  useCanvasRef,
  useFont,
  useTouchHandler,
  Matrix4,
} from '@shopify/react-native-skia';
import Footer from './Components/Footer';
import Toolbar from './Components/Toolbar';
import useDrawingStore, {CurrentPath, StickerPath} from './store';
import React, {useCallback, useEffect, useRef} from 'react';
import {SafeAreaView, useWindowDimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CanvasRuntimeTools from './Components/Tools';
import {CanvasBackgroundImage} from './Drawing/CanvasItems/Picture';
import {StickerSource} from './Drawing/CanvasItems/Sticker';
import CanvasText from './Drawing/CanvasItems/Text';
import GestureHandler from './Drawing/GestureHandler';
import history from './Drawing/history';
import ImageEditorDrawing from './DrawingMode';
import CanvasProvider, {useCanvasCtx} from './Provider';
import { useSharedValue } from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';
const imageURL =
  'https://images.unsplash.com/photo-1703593191760-ff33fe19c56d?q=80&w=500&fm=webp&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
const Drawing = () => {
  const canvasRef = useCanvasRef();
  const {width, height: windowHeight} = useWindowDimensions();
  const locationMatrix = useSharedValue(Skia.Matrix());
  const backgroundImageMatrix = useSharedValue(Matrix4());
  const insets = useSafeAreaInsets();
  const layoutHeight = windowHeight - insets.top - insets.bottom - 120;
  const layoutWidth = width - 32;
  const {mode, completedPaths, setCompletedPaths, color, stroke, setCanvasInfo, selectedList, toggleSelected} =
    useDrawingStore();
  const font = useFont(require('./Drawing/CanvasItems/fonts/Rubik-Medium.ttf'), 24);

  // const onLayout = useCallback((event: LayoutChangeEvent) => {
  //   layoutHeight = event.nativeEvent.layout.height;
  // }, []);
  if (!font) {
    return null;
  }

  return (
   
      <TapGestureHandler>
        <SafeAreaView
          style={{
            backgroundColor: '#121212',
            flex: 1,
            alignItems: 'center',
          }}>
          <View style={{zIndex: 99,alignItems:"center"}}>
            <Toolbar />
          </View>

          <View
            // onLayout={onLayout}
            style={{
              width: width - 24,
              backgroundColor: '#000000',
              borderRadius: 10,
              overflow: 'hidden',
              elevation: 1,
              zIndex: 0,
              flex: 1,
            }}>
            <Canvas
              ref={canvasRef}
              style={{
                // height: layoutHeight,
                // width: width - 24,
                flex:1
              }}
              // onTouch={console.log}
              debug={__DEV__}>
              <CanvasBackgroundImage
                id="canvas-background"
                matrix={backgroundImageMatrix}
                path={
                 imageURL
                }
              />

              {completedPaths.map(path =>
                path.type === 'draw' ? (
                  <Path key={path.id} {...path} />
                ) : path.type === 'text' ? (
                  <CanvasText key={path.id} {...path} />
                ) : path.type === 'sticker' ? (
                  <StickerSource
                    key={path.id}
                    {...path}
                    // matrix={matrixexMap.value?.[path.id]}
                  />
                ) : null,
              )}
            </Canvas>
            {mode === 'draw' && <ImageEditorDrawing />}
            {mode !== 'draw' &&
              completedPaths
                // .filter(
                //   a =>
                //     !!matrixexMap.value?.[a.id] &&
                //    !! dimensionsMap.value?.[a.id],
                // )
                .map((path: CurrentPath) => (
                  <GestureHandler
                    key={path.id + 'matrix'}
                    {...path}
                    // matrix={locationMatrix}
                    selectedList={selectedList}
                    toggleSelected={toggleSelected}
                  />
                ))}
          </View>

          <CanvasRuntimeTools />
          <Footer />
        </SafeAreaView>
      </TapGestureHandler>
  );
};

export default () => (
  <CanvasProvider>
    <Drawing />
  </CanvasProvider>
);
