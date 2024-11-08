import IconButton from '@app/Components/IconButton';
import Modal from '@app/Components/Modal';
import type {CurrentPath} from '@app/Provider/ProviderTypes';
import {useCanvasCtx} from '@app/Provider';
import type {SkPath} from '@shopify/react-native-skia';
import {
  Matrix4,
  rect,
  Skia,
  multiply4,
  translate,
} from '@shopify/react-native-skia';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {makeMutable} from 'react-native-reanimated';
import { COLORS } from '@app/Assets/Colors';

const RenderShapeListItem = ({
  group,
  onSelect,
}: {
  group: ShapeItemList;
  onSelect: (item: SkPath) => void;
}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => (group.value ? onSelect(group.value) : undefined)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 12,
            paddingHorizontal: 16,
          }}>
          <IconButton
          // @ts-ignore
            icon={group.type}
            color="#ffffff"
            style={{marginRight: 32}}
          />
          <Text style={{color: '#ffffff'}}>{group.type.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
      {/* <Divider style={{backgroundColor: '#fefefe55', marginHorizontal: 32}} /> */}
    </>
  );
};

type ShapeItemList = {
  type: string;
  icon: string;
  value: SkPath | null;
  options: string[];
};

const shapeList: ShapeItemList[] = [
  {
    type: 'star',
    icon: 'star',
    value: Skia.Path.MakeFromSVGString(
      'M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z',
    ),
    options: ['stroke', 'color'],
  },
  {
    type: 'circle',
    icon: 'checkbox-multiple-blank-circle',
    value: Skia.Path.MakeFromSVGString(
      'M 100 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0',
    ),
    options: ['stroke', 'color'],
  },
  {
    type: 'square',
    icon: 'square-rounded',
    value: Skia.Path.MakeFromSVGString(
      'M 100 100 L 200 100 L 200 200 L 100 200 Z',
    ),
    options: ['stroke', 'color', 'radius'],
  },
  {
    type: 'triangle',
    icon: 'triangle',
    value: Skia.Path.MakeFromSVGString('M100 0 L0 100 L200 100 Z'),
    options: ['stroke', 'color'],
  },
  {
    type: 'line',
    icon: 'vector-line',
    value: Skia.Path.MakeFromSVGString('M50 50 L150 150'),
    options: ['stroke', 'color'],
  },
  // {
  //   type: 'arrow',
  //   icon: 'arrow-top-right',
  //   options: ['stroke', 'color'],
  // },
];

const ShapeList = () => {
  const [visible, setVisible] = React.useState<null | boolean>(null);
  const [addPath, color, stroke] = useCanvasCtx(f => [
    f.addPath,
    f.currentColor,
    f.stroke,
  ]);
  const ctx = useCanvasCtx(f => f);

  const {width, height} = useWindowDimensions();

  return (
    <>
      <IconButton
        icon="shape-plus"
        color="#ffffff"
        onPress={() => {
          setVisible(true);
        }}
      />
      {visible !== null && (
        <Modal
          isVisible={visible}
          onDismiss={() => setVisible(false)}
          onModalHide={() => setVisible(null)}
          containerStyle={styles.modal}
          title="ShapeList">
          <FlatList
            data={shapeList}
            renderItem={({item, index}) => (
              <RenderShapeListItem
                group={item}
                key={index}
                onSelect={() => {
                  const bounds = item.value?.computeTightBounds();
                  if (!bounds) return;
                  const matrx = makeMutable(Matrix4());
                  matrx.value = multiply4(
                    translate((width - bounds.width) / 2, (height - bounds.height) /2),
                    matrx.value,
                  );
                  let newShape: CurrentPath = {
                    id: Date.now().toString(32),
                    type: 'draw',
                    color: color?.value||COLORS.redRouge,
                    // @ts-ignore
                    path: item.value?.copy(),
                    paint: stroke.value.copy(),
                    matrix: matrx,
                    // options: item.options,
                    dimensions: makeMutable(
                      rect(0,0, bounds.width, bounds.height),
                    ),
                  };
                  addPath(newShape);
                }}
              />
            )}
          />
        </Modal>
      )}
    </>
  );
};

export default ShapeList;

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    height: 400,
    backgroundColor: '#000111',
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
