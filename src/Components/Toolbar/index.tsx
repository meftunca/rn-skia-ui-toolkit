import {shift, useFloating} from '@floating-ui/react-native';
import constants from '@//Drawing/constants';
import utils from '@//Drawing/utils';
import useDrawingStore from '@/store';
import {AnimatePresence, MotiView} from 'moti';
import React, {useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import IconButton from '@/Components/IconButton';

import AppendText from './AppendText';
import Color from './Color';
import DeleteSelection from './DeleteSelection';
import ModeList from './Modes';
import ShapeList from './Shapes';
import Stickers from './Stickers';
import StrokeList from './Stroke';

const Toolbar = () => {
  const {color: currentColor, strokeWidth: currentStrokeWidth, mode: currentMode} = useDrawingStore();
  const {width} = useWindowDimensions();
  const {refs, floatingStyles} = useFloating({
    placement: 'left',
    middleware: [shift()],
  });
  const [previewType, setPreviewType] = useState<'stroke' | 'color' | 'mode'>('stroke');
  const [visible, setVisible] = useState(false);

  return (
    <View
      style={{
        position: 'relative',
        width: width,
        zIndex: 99,
        // flexDirection: 'row',
        // justifyContent: 'flex-start',

        // overflow: 'visible',
      }}>
      <View ref={refs.setReference} style={[styles.toolbar, {width: '100%', justifyContent: 'center'}]}>
        <IconButton
          icon={currentMode}
          color="#ffffff"
          onPress={() => {
            setPreviewType('mode');
            setVisible(f => !f);
          }}
        />
        <IconButton
          icon="draw-pen"
          color="#ffffff"
          onPress={() => {
            setPreviewType('stroke');
            setVisible(f => !f);
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
      <MotiView
        collapsable={false}
        animate={{
          opacity: 1,
          top: (floatingStyles.top ?? 0) + 30,
          left: floatingStyles.left + 16,
          scale: 1,
        }}
        from={{scale: 0.1, opacity: 0}}
        exit={{scale: 0, opacity: 0}}
        ref={refs.setFloating}
        transition={{
          type: 'timing',
          duration: 600,
        }}
        style={{
          position: 'absolute',
          opacity: 0,
          top: -100,
          left: floatingStyles.left - 100,
          maxWidth: 300,
        }}>
        <AnimatePresence>
          {visible && (
            <View
              style={{
                borderRadius: 12,
                backgroundColor: '#333333',
              }}>
              {
                previewType === 'stroke' ? (
                  <StrokeList onClose={() => setVisible(false)} />
                ) : previewType === 'mode' ? (
                  <ModeList onClose={() => setVisible(false)} />
                ) : null
                // <Color />
              }
            </View>
          )}
        </AnimatePresence>
      </MotiView>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  toolbar: {
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  color: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#000000',
    ...utils.getElevation(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
