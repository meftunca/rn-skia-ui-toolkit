import IconButton from '@/Components/IconButton';
import { useCanvasCtx } from '@/Provider';
import React from 'react';
import { View } from 'react-native';

const DeleteSelection = () => {
  const [selectedList, paths, setPaths,clearSelected] = useCanvasCtx(
    state => [state.selectedList, state.paths, state.setPaths, state.clearSelected],
  );
  return (
    <View
     >
        {selectedList.length > 0 && (
          <IconButton
            icon={'delete'}
            color={'red'}
            onPress={() => {
              let newCompletedPaths = paths.filter(path => {
                return !selectedList.includes(path.id);
              });
              setPaths(newCompletedPaths);
              clearSelected();
            }}
          />
        )}
    </View>
  );
};

export default DeleteSelection;
