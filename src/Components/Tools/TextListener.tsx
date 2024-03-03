import IconButton from '@/Components/IconButton'
import { makeCanvasText } from '@/Drawing/CanvasItems/Text'
import { getElevation } from '@/Drawing/utils'
import { useCanvasCtx } from '@/Provider'
import React, { useCallback, useMemo } from 'react'
import { KeyboardAvoidingView, TextInput, useWindowDimensions, View } from 'react-native'

const TextSelectionListener = () => {
  const layout = useWindowDimensions();
  const {selectedList, paths, replacePath} =
    useCanvasCtx(f=>({
      selectedList: f.selectedList,
      paths: f.paths,
      replacePath: f.replacePath,
    }));

  const selectedText = useMemo(
    () =>
      paths.value.find(
        a => a.type === 'text' && selectedList.includes(a.id),
      ),
    [paths, selectedList],
  );
  const [font, dimensions] = useCanvasCtx(f => [
    f.font['rubik']['bold'],
    f.dimensions,
  ]);

  const replaceContent = useCallback(
    (content: string) => {
      'worklet';
      const newText = makeCanvasText(content, font, layout.width - 32);
      newText.id = selectedText.id;
      dimensions[newText.id] = newText.dimension;
      replacePath(selectedText.id, newText);
    },
    [selectedList, selectedText],
  );
  // show from bottom-up
  // hide from top-down
  if (!!selectedText) {
    return (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            minHeight: layout.height / 4,
            maxHeight: layout.height / 2,
            backgroundColor: '#010101',
          }}>
          {
              <KeyboardAvoidingView style={{flexDirection: 'row', flex: 1, padding: 16}} >
                <TextInput
                  multiline
                  maxLength={120}
                  maxFontSizeMultiplier={1.5}
                  style={{
                    flex: 1,
                    maxHeight: 100,
                    backgroundColor: '#121212',
                    margin: 12,
                    padding: 8,
                    borderRadius: 8,
                    color: '#fff',
                    ...getElevation(3),
                  }}
                  value={selectedText?.original || 'No Text'}
                  onChangeText={replaceContent}
                />
                <IconButton icon="send" color="white" />
              </KeyboardAvoidingView>
          }
        </View>
    );
  }
  return null;
};

export default TextSelectionListener;
