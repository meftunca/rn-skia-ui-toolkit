import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconButton from '@/Components/IconButton';
// import Snackbar from 'react-native-snackbar';
import history from '../Drawing/history';
import utils from '../Drawing/utils';
import useDrawingStore from '../store';

const Footer = () => {
  const {setCompletedPaths, setStroke, setColor, setStrokeWidth, canvasInfo, completedPaths} = useDrawingStore();
  /**
   * Reset the canvas & draw state
   */
  const reset = () => {
    setCompletedPaths([]);
    setStroke(utils.getPaint(2, 'black'));
    setColor('black');
    setStrokeWidth(2);
    history.clear();
  };

  const save = () => {
    let paths = completedPaths;
    if (paths.length === 0) return;
    if (canvasInfo?.width && canvasInfo?.height) {
      utils.makeSvgFromPaths(paths, {
        width: canvasInfo.width,
        height: canvasInfo.height,
      });
    }
  };

  const undo = () => {
    history.undo();
  };

  const redo = () => {
    history.redo();
  };
  return (
    <View
      style={{
        height: 50,
        width: '100%',
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <IconButton
          icon="undo"
          size={20}
          onPress={() => {
            /* history.history.undo.length === 0
              ? Snackbar.show({
                  text: 'Nothing to undo',
                })
              :  */undo();
          }}
          color={history.history.undo.length > 0 ? '#ffffff' : '#ffffff77'}
          style={[{marginRight: 10}]}
        />
        <IconButton
          icon="redo"
          size={20}
          onPress={() => {
           /*  history.history.redo.length === 0
              ? Snackbar.show({
                  text: 'Nothing to redo',
                })
              :  */redo();
          }}
          color={history.history.redo.length > 0 ? '#ffffff' : '#ffffff77'}
          style={[{marginRight: 10}]}
        />
        {history.history.undo.length > 0 && <IconButton size={20} icon="reload" onPress={reset} color="#ffffff" />}
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity activeOpacity={0.6} onPress={save} style={[styles.button, {marginLeft: 10}]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    backgroundColor: 'white',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    ...utils.getElevation(1),
  },
  buttonText: {
    color: 'black',
  },
});

export default Footer;
