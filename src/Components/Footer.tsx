import {useCanvasCtx} from '@app/Provider';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import history from '../Drawing/history';
import * as utils from '../Drawing/utils';

// import Snackbar from 'react-native-snackbar';
const Footer = ({children}:{
  children: React.ReactNode
}) => {
  // const [setPaths, setStroke, setColor] = useCanvasCtx(
  //   f => ([f.setPaths,
  //     f.setStroke,
  //    f.setColor]),
  // );
  /**
   * Reset the canvas & draw state
   */
  // const reset = () => {
  //   setPaths([]);
  //   setStroke(utils.getPaint(2, 'black'));
  //   setColor('black');
  //   // setStrokeWidth(2);
  //   history.clear();
  // };

  const save = () => {
    // if (paths.value.length === 0) return;
    // if (canvasInfo?.width && canvasInfo?.height) {
    //   utils.makeSvgFromPaths(paths.value, {
    //     width: canvasInfo.width,
    //     height: canvasInfo.height,
    //   });
    // }
  };

  // const undo = () => {
  //   history.undo();
  // };

  // const redo = () => {
  //   history.redo();
  // };
  return (
    <View
      style={styles.footerWrapper}>
      {/* <View
        style={{
          flexDirection: 'row',
        }}>
        <IconButton
          icon="undo"
          size={16}
          onPress={() => {
           undo();
          }}
          color={history.history.undo.length > 0 ? '#ffffff' : '#ffffff77'}
        />
        <IconButton
          icon="redo"
          size={16}
          onPress={() => {
          redo();
          }}
          color={history.history.redo.length > 0 ? '#ffffff' : '#ffffff77'}
          style={[{marginRight: 10}]}
        />
        {history.history.undo.length > 0 && <IconButton size={20} icon="reload" onPress={reset} color="#ffffff" />}
      </View> */}
      {children}
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={save}
          style={[styles.button, {marginLeft: 10}]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper:{
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: "relative",
    zIndex: 99,
  },
  button: {
    paddingHorizontal: 12,
    backgroundColor: 'white',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  buttonText: {
    color: 'black',
  },
});

export default Footer;
