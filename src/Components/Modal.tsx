import styled from '@emotion/native'
import React, { useCallback, useState } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { StyleSheet, View } from 'react-native'
import type { ModalProps } from 'react-native-modal'
import Modal from 'react-native-modal'

interface MapleModalProps extends Partial<ModalProps> {
  placement?: 'top' | 'bottom';
  containerStyle?: StyleProp<ViewStyle> | undefined;
  fullPage?: boolean;
  swipeDisable?: boolean;
  title?: React.ReactNode;
  disableHeader?: boolean;
  right?: React.ReactNode;
  closeable?: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
const MapleModal: React.FC<MapleModalProps> = ({
  onDismiss,
  placement = 'bottom',
  children,
  onBackdropPress,
  onBackButtonPress,
  style,
  containerStyle,
  fullPage,
  swipeDisable = false,
  disableHeader,
  title,
  right,
  closeable = true,
  ...rest
}) => {
  const [enableSwipe, setEnableSwipe] = useState<boolean>(false);
  const SwipeDetector = useCallback(
    () => (
      <View
        style={styles.SwipeTarget}
        onTouchStart={enableSwipe === false ? () => setEnableSwipe(true) : undefined}
        onTouchEnd={enableSwipe === true ? () => setEnableSwipe(false) : undefined}
      />
    ),
    [enableSwipe],
  );
  return (
    <Modal
      onDismiss={onDismiss}
      onBackdropPress={onBackdropPress || onDismiss}
      onBackButtonPress={onBackButtonPress || onDismiss}
      onSwipeComplete={onDismiss}
      {...rest}
      useNativeDriver={true}
      // swipeDirection={'down'}
      swipeDirection={swipeDisable ? undefined : placement === 'top' ? 'up' : 'down'}
      // propagateSwipe={!enableSwipe}
      propagateSwipe={true}
      style={[
        {
          justifyContent: placement === 'top' ? 'flex-start' : 'flex-end',
          padding: 0,
          margin: 0,
        },
        style,
      ]}>

        <View style={[styles.container,containerStyle]}>
          {placement === 'bottom' && <SwipeDetector />}
          {children}
          {placement === 'top' && <SwipeDetector />}
        </View>
    </Modal>
  );
};


export default MapleModal;

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 16,
    paddingVertical: 24,
    margin:8,
    borderRadius:16
  },
  SwipeTarget: {
    width: "20%",
    marginLeft: "40%",
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    marginBottom: 12,
    marginTop: 10,
  },
  modalTitle: {
    flexGrow: 1,
    fontSize: 18,
    marginLeft: 16,
    fontWeight: '500',
  },
  modalHeader: {
    elevation: 2,
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 24,
    zIndex: 99999,
  },
});
