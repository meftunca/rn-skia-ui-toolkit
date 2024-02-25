import styled from '@emotion/native';
import React, { useCallback, useState } from 'react';
import { ImageBackground, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';

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
      <SwipeTarget
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

        <ModalContainer placement={placement} style={containerStyle}>
          {placement === 'bottom' && <SwipeDetector />}
          {children}
          {placement === 'top' && <SwipeDetector />}
        </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled(View)<{ placement?: 'top' | 'bottom' }>`
  /* margin: 16px; */
  box-shadow: 0 -3px 15px rgba(0, 0, 0, 0.3);
  /* padding: 16px; */
  border-radius: 32px 32px 0 0;
  /* border-top-left-radius: ${({ placement }) => (placement === 'bottom' ? 30 : 0)}px;
  border-top-right-radius: ${({ placement }) => (placement === 'bottom' ? 30 : 0)}px;
  border-bottom-left-radius: ${({ placement }) => (placement === 'top' ? 30 : 0)}px;
  border-bottom-right-radius: ${({ placement }) => (placement === 'top' ? 30 : 0)}px; */
`;

const SwipeTarget = styled.View`
  width: 18%;
  margin-left: 41%;
  height: 8px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.45);
  margin-bottom: 12px;
  margin-top: 10px;
`;

export default MapleModal;

const styles = StyleSheet.create({
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
