import {FlashList} from '@shopify/flash-list';
import constants from '@//Drawing/constants';
import useDrawingStore from '@/store';
import React from 'react';
import IconButton from '@/Components/IconButton';
import { View } from 'react-native';

// import Snackbar from 'react-native-snackbar';
const RenderStoreItem = ({
  mode,
  onClose,
}: {
  mode: 'draw' | 'erase' | 'select' | 'text';
  onClose: () => void;
}) => {
  const [currentMode, setMode] = useDrawingStore(state => [
    state.mode,
    state.setMode,
  ]);

  return (
    <IconButton
      icon={mode}
      color={currentMode === mode ? '#2C8D03' : '#ffffff'}
      onPress={() => {
        setMode(mode);
        onClose();
      }}
      onLongPress={() => {
        // Snackbar.show({
        //   text: capitalize(mode),
        //   duration: Snackbar.LENGTH_SHORT,
        // });
      }}
    />
  );
};

const ModeList = ({onClose}: {onClose: () => void}) => {
  return (
    <View
      style={{
        borderRadius: 12,
        elevation: 2,
      }}>
      <FlashList
        data={constants.modes}
        estimatedItemSize={12}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <RenderStoreItem mode={item} key={item} onClose={() => onClose()} />}
      />
    </View>
  );
};

export default ModeList;
