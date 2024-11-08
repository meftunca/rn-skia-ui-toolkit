import ArrowIcon from '@app/Assets/icons/Arrow'
import CircleIcon from '@app/Assets/icons/Circle'
import DeleteIcon from '@app/Assets/icons/delete'
import DrawIcon from '@app/Assets/icons/draw'
import DrawPenIcon from '@app/Assets/icons/DrawPen'
import EraseIcon from '@app/Assets/icons/erase'
import LineIcon from '@app/Assets/icons/Line'
import RedoIcon from '@app/Assets/icons/redo'
import SelectIcon from '@app/Assets/icons/select'
import SendIcon from '@app/Assets/icons/send'
import ShapePlusIcon from '@app/Assets/icons/ShapePlus'
import SquareIcon from '@app/Assets/icons/Square'
import StarIcon from '@app/Assets/icons/Star'
import StickerEmojiIcon from '@app/Assets/icons/stickerSmile'
import TextIcon from '@app/Assets/icons/text'
import TriangleIcon from '@app/Assets/icons/Triangle'
import UndoIcon from '@app/Assets/icons/undo'
import * as React from "react"
import type { TouchableOpacityProps, ViewProps } from 'react-native'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

type IconButtonProps = TouchableOpacityProps & {
  color?: string;
  icon:
    | "select"
    | "text"
    | "delete"
    | "draw"
    | "erase"
    | "undo"
    | "redo"
    | "arrow"
    | "star"
    | "circle"
    | "square"
    | "send"
    | "triangle"
    | "shape-plus"
    | "reload"
    | "line"
    | "draw-pen"
    |"sticker-emoji"
    | "format-text"
    | "format-text-bold"
  size?: number;
  style?: ViewProps["style"];
};

const iconsPath = {
  select:SelectIcon,
  text:TextIcon,
  delete:DeleteIcon,
  draw:DrawIcon,
  erase:EraseIcon,
  undo:UndoIcon,
  redo:RedoIcon,
  reload:RedoIcon,
  "format-text":TextIcon,
  "format-text-bold":TextIcon,
  send:SendIcon,
  "sticker-emoji":StickerEmojiIcon,
  arrow:ArrowIcon,
  star:StarIcon,
  circle:CircleIcon,
  square:SquareIcon,
  line:LineIcon,
  triangle:TriangleIcon,
  "draw-pen":DrawPenIcon,
  "shape-plus":ShapePlusIcon

};
const Style = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const IconButton: React.FC<IconButtonProps> = ({
  color="#fff",
  icon,
  size = 24,
  style,
  ...props
}: IconButtonProps) => {
  const RenderedIcon = iconsPath[icon]||View;
  return (
    <TouchableOpacity style={{
      padding:8,
      borderRadius:16
    }} {...props}>
      <View style={[Style.icon, style]}>
        <RenderedIcon color={color} width={size} height={size} />
      </View>
    </TouchableOpacity>
  );
  }

export default IconButton;