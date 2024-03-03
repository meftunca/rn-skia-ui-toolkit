import ArrowIcon from '@/Assets/icons/Arrow'
import CircleIcon from '@/Assets/icons/Circle'
import DeleteIcon from '@/Assets/icons/delete'
import DrawIcon from '@/Assets/icons/draw'
import DrawPenIcon from '@/Assets/icons/DrawPen'
import EraseIcon from '@/Assets/icons/erase'
import LineIcon from '@/Assets/icons/Line'
import RedoIcon from '@/Assets/icons/redo'
import SelectIcon from '@/Assets/icons/select'
import SendIcon from '@/Assets/icons/send'
import ShapePlusIcon from '@/Assets/icons/ShapePlus'
import SquareIcon from '@/Assets/icons/Square'
import StarIcon from '@/Assets/icons/Star'
import StickerEmojiIcon from '@/Assets/icons/stickerSmile'
import TextIcon from '@/Assets/icons/text'
import TriangleIcon from '@/Assets/icons/Triangle'
import UndoIcon from '@/Assets/icons/undo'
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
    | "line"
    | "draw-pen"
    |"sticker-emoji"
    | "format-text-bold";
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