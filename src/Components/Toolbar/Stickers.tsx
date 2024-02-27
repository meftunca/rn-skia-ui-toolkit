import {rect, Matrix4, } from '@shopify/react-native-skia';
import { useCanvasCtx,CurrentPath } from "@//Provider";
import React,{ useMemo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,Image,FlatList
} from 'react-native';
import {List,ListItem } from '@/Components/List';
import IconButton from "@/Components/IconButton"
import iconList from './stickers.json';
import Modal from '../Modal';
type Icons = [string, string];
type Groups = {
  name: string;
  slug: string;
  link: string;
  icons: Icons[];
};

const chunk = (list: Icons[], chunkSize: number) => {
  const chunked = [];
  for (let i = 0; i < list.length; i += chunkSize) {
    chunked.push(list.slice(i, i + chunkSize));
  }
  return chunked;
}

const RenderStickersItem = ({
  group,
  selectedList,
  onSelect,
}: {
  group: Icons[] | string;
  selectedList: CurrentPath[];
  onSelect: (item: CurrentPath) => void;
}) => {
  const {width,height} = useWindowDimensions();
  return (
    <>
      {typeof group === 'string' ? (
        <ListItem
          title={group}
          titleStyle={{fontSize: 18, fontWeight: '500', color: '#f1f1f1'}}
          style={{flex: 1, margin: 8}}
        />
      ) : (
        <View style={{flexDirection: 'row'}}>
          {group.map(([iconName, link], index) => (
            <TouchableOpacity
              onPress={() => {
                onSelect({
                  id: Date.now().toString(32) + iconName,
                  type: 'sticker',
                  path: `https://cdn-icons-png.flaticon.com/512/${link}`,
                  dimension: rect((width-128)/2, (height-128)/3, 128, 128),
                  matrix:Matrix4(),
                });
              }}
              key={index}>
              <Image
                source={{uri: `https://cdn-icons-png.flaticon.com/512/${link}`}}
                style={styles.image}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
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
    return paths.filter(path => path.type === 'sticker');
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
