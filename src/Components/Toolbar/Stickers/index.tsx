import IconButton from '@app/Components/IconButton'
import { useCanvasCtx } from '@app/Provider'
import React, { useMemo } from 'react'
import { FlatList, StyleSheet, useWindowDimensions } from 'react-native'
import Modal from '../../Modal'
import iconList from '../stickers.json'
import {  RenderStickersItem } from './RenderStickersItem'

export const chunk = (list: Icons[], chunkSize: number) => {
  const chunked = [];
  for (let i = 0; i < list.length; i += chunkSize) {
    chunked.push(list.slice(i, i + chunkSize));
  }
  return chunked;
};
export type Icons = [string, string];
type Groups = {
  name: string;
  slug: string;
  link: string;
  icons: Icons[];
};

const Stickers = () => {
  const [visible, setVisible] = React.useState<null | boolean>(null);
  const window = useWindowDimensions();
  const [paths, addPath] = useCanvasCtx(f=>[
    f.paths,
    f.addPath,
  ]);
  const selectedList = useMemo(() => {
    // return ctx.paths?.value?.filter(path => path.type === 'sticker')||[];
    return paths?.filter(path => path.type === 'sticker');
  }, [paths]);
  const sourcesList = useMemo(() => {
    const list: (Icons[] | string)[] = [];
    (iconList as Groups[]).forEach((group: Groups) => {
      list.push(group.name);
      let chunkList: Icons[] = [];
      group.icons.forEach(icon => {
        chunkList.push(icon);
      });
      list.push(...chunk(chunkList, Math.round(window.width / 76)));
    });
    return list;
  }, []);

  return (
    <>
      <IconButton
        icon="sticker-emoji"
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
          title="Stickers">
          <FlatList
            data={sourcesList}
            renderItem={({item, index}) => (
              <RenderStickersItem
                group={item}
                key={index}
                selectedList={selectedList}
                onSelect={path => {
                  // ctx.dimensions.value = {
                  //   ...ctx.dimensions.value,
                  //   [path.id]: path.dimension,
                  // };
                  // ctx.paths.value[path.id] = path;
                  // ctx.changeDimensions(path.id, path.dimensions);
                  // setPaths([...paths, path]);
                  addPath(path);
                  setVisible(false);
                  // paths.value = [...paths.value, path];

                }}
              />
            )}
          />
        </Modal>
      )}
    </>
  );
};

export default Stickers;

export const styles = StyleSheet.create({
 
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
