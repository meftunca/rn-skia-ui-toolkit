import { ListItem } from '@app/Components/List';
import type { CurrentPath } from '@app/Provider/ProviderTypes';
import { rect, Matrix4 ,multiply4
  ,translate} from '@shopify/react-native-skia';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { makeMutable } from 'react-native-reanimated';
import { Icons  } from '.';
import { ScrollView } from 'react-native-gesture-handler';
 const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export const RenderStickersItem = ({
  group, selectedList, onSelect,
}: {
  group: Icons[] | string;
  selectedList: CurrentPath[];
  onSelect: (item: CurrentPath) => void;
}) => {
  const { width, height } = useWindowDimensions();
  return (
    <>
      { typeof group === 'string' ? (
        <ListItem
          title={ group }
          style={ { flex: 1, margin: 8 } } />
      ) : (
        <ScrollView horizontal>
          <View style={ { flexDirection: 'row' } }>
          { group.map(([iconName, link], index) => (
            <TouchableOpacity
              onPress={ () => {
                let matrx =makeMutable(Matrix4());
                 matrx.value  = multiply4(translate((width - 128) / 2, (height - 128) / 3), matrx.value)
                onSelect({
                  id: Date.now().toString(32),
                  type: 'sticker',
                  path: `https://cdn-icons-png.flaticon.com/512/${link}`,
                  dimensions: makeMutable(rect(0, 0, 128, 128)),
                  matrix: matrx,
                });
              } }
              key={ index }>
              <Image
                source={ { uri: `https://cdn-icons-png.flaticon.com/512/${link}` } }
                style={ styles.image } />
            </TouchableOpacity>
          )) }
        </View>
        </ScrollView>
      ) }
    </>
  );
};
