import IconButton from '@/Components/IconButton'
import { useCanvasCtx } from '@/Provider'
import React from 'react'
import { View } from 'react-native'

// import Snackbar from 'react-native-snackbar';
const RenderStoreItem = ({
  mode,
  onClose,
}: {
  mode: "draw" | "erase" | "select" | "text";
  onClose: () => void;
}) => {
  const [currentMode, setMode] = useCanvasCtx((state) => [
    state.mode,
    state.setMode,
  ]);

  return (
    <IconButton
      icon={mode}
      color={currentMode === mode ? "#2C8D03" : "#ffffff"}
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

const ModeList = ({ onClose }: { onClose: () => void }) => {
  return (
    <View
      style={{
        borderRadius: 12,
        elevation: 2,
        flexDirection: "row",
        justifyContent: "center",
        flex:1,
        width: "100%",
      }}
    >
      <RenderStoreItem mode="draw" onClose={() => onClose()} />
      <RenderStoreItem mode="erase" onClose={() => onClose()} />
      <RenderStoreItem mode="select" onClose={() => onClose()} />
      <RenderStoreItem mode="text" onClose={() => onClose()} />
    </View>
  );
};

export default ModeList;
