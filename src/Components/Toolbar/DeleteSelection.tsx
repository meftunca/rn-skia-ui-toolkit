import useDrawingStore from '@/store';
import {AnimatePresence, MotiView} from 'moti';
import React from 'react';
import IconButton from '@/Components/IconButton';

const DeleteSelection = () => {
  const [selectedList, completedPaths, setCompletedPaths,clearSelected] = useDrawingStore(
    state => [state.selectedList, state.completedPaths, state.setCompletedPaths, state.clearSelected],
  );
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}>
      <AnimatePresence>
        {selectedList.length > 0 && (
          <IconButton
            icon={'delete'}
            color={'red'}
            onPress={() => {
              let newCompletedPaths = completedPaths.filter(path => {
                return !selectedList.includes(path.id);
              });
              setCompletedPaths(newCompletedPaths);
              clearSelected();
            }}
          />
        )}
      </AnimatePresence>
    </MotiView>
  );
};

export default DeleteSelection;
