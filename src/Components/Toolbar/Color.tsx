import {FlashList} from '@shopify/flash-list';
import constants from '@//Drawing/constants';
import utils from '@//Drawing/utils';
import useDrawingStore from '@/store';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
const RenderColorItem = ({color}: {color: string}) => {
  const [currentColor, setColor] = useDrawingStore(state => [
    state.color,
    state.setColor,
  ]);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => setColor(color)}
      style={[
        {
          backgroundColor: color,
        },
        styles.color,
      ]}>
      {color === currentColor && (
        <View
          style={{
            width: 5,
            height: 5,
            borderRadius: 100,
            backgroundColor: 'white',
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const Color = () => {
  return (
    <FlashList
      data={constants.colors}
      horizontal
      estimatedItemSize={12}
      renderItem={({item}) => <RenderColorItem color={item} key={item} />}
    />
  );
};

export default Color;

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
