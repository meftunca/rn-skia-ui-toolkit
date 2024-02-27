import {useFloating} from '@floating-ui/react-native';
import Color from 'color';
import constants from '@/Drawing/constants';
import utils from '@/Drawing/utils';
import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View,FlatList} from 'react-native';
import { useCanvasCtx } from '@/Provider';
const RenderStoreItem = ({
  strokeWidth,
  onClose,
}: {
  strokeWidth: number;
  onClose: () => void;
}) => {
  const [currentStrokeWidth, color, setStrokeWidth] = useCanvasCtx(state => [
    state.strokeWidth,
    state.color,
    state.setStrokeWidth,
  ]);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        setStrokeWidth(strokeWidth);
        onClose();
      }}
      style={[
        {
          height: 40,
          backgroundColor: '#0002',
          marginRight: 12,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          width: 40,
        },
      ]}>
      <View
        style={{
          width: 16,
          backgroundColor:
            strokeWidth !== currentStrokeWidth
              ? Color(color).alpha(0.2).hex()
              : color,
          height: strokeWidth,
          borderRadius: 10,
          transform: [
            {
              rotateZ: '-45deg',
            },
          ],
        }}
      />
    </TouchableOpacity>
  );
};

const StrokeList = ({onClose}: {onClose: () => void}) => {
  return (
    <View
      style={{
        borderRadius: 12,
        elevation: 2,
      }}>
      <FlatList
        data={constants.strokes}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          padding: 4,
        }}
        renderItem={({item}) => <RenderStoreItem strokeWidth={item} key={item} onClose={() => onClose()} />}
      />
    </View>
  );
};

export default StrokeList;

const styles = StyleSheet.create({
  color: {
    width: 35,
    height: 35,
    marginRight: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#f0f0f0',
    ...utils.getElevation(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white',
  },
});
