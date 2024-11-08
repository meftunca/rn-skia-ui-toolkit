import IconButton from '@app/Components/IconButton';
import { useCanvasCtx } from '@app/Provider';
import React from 'react';
import { View } from 'react-native';

const DeleteSelection = () => {
  const [currentSelected, paths, setPaths,clearSelected] = useCanvasCtx(
    s => [s.currentSelected, s.paths, s.setPaths,s.clearSelected],
  );
  if(currentSelected === "") return null;
  return (
 
           <IconButton
            icon={'delete'}
            color={'red'}
            onPress={() => {
              let newCompletedPaths = (paths||[]).filter(path => {
                return currentSelected !== path.id
              });
              setPaths(newCompletedPaths);
              clearSelected()
            }}
          />
 
  );
};

export default DeleteSelection;
